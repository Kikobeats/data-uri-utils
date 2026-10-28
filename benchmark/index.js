'use strict'

const { writeFileSync } = require('fs')
const { join } = require('path')
const { setFlagsFromString } = require('v8')
const { runInNewContext } = require('vm')

const dataUriUtils = require('..')

const RUNS = 7
const SMALL_ITERATIONS = 150_000
const LARGE_ITERATIONS = 400
const DECODE_ITERATIONS = 8000
const LARGE_BYTES = 256 * 1024
const DECODE_BYTES = 48 * 1024

setFlagsFromString('--expose-gc')
const collectGarbage = runInNewContext('gc')

const now = () => process.hrtime.bigint()

const elapsed = started => Number(now() - started) / 1e6

const median = values => {
  const sorted = values.slice().sort((a, b) => a - b)
  return sorted[Math.floor(sorted.length / 2)]
}

const seededBytes = length => {
  const bytes = Buffer.alloc(length)
  let state = 0x2545f491
  for (let index = 0; index < length; index++) {
    state = (Math.imul(state, 1103515245) + 12345) >>> 0
    bytes[index] = state >>> 24
  }
  return bytes
}

const base64Uri = (mediaType, bytes) =>
  `data:${mediaType};base64,${bytes.toString('base64')}`

const SMALL_URIS = [
  base64Uri('image/png', seededBytes(85)),
  'data:;base64,iVBORw0KGgo=',
  'data:null;base64,iVBORw0KGgo=',
  'data:text/plain;charset=UTF-8;base64,SGVsbG8=',
  'data:text/html;charset=utf-8,%3Ch1%3Ehello%3C%2Fh1%3E',
  'https://example.com/image.png'
]

const LARGE_URI = base64Uri('image/png', seededBytes(LARGE_BYTES))
const DECODE_BYTES_FIXTURE = seededBytes(DECODE_BYTES)
const DECODE_URI = base64Uri('image/png', DECODE_BYTES_FIXTURE)

const smallUrisCase = {
  name: 'normalize, test and exec small URIs',
  extra: `${SMALL_ITERATIONS} rounds over ${SMALL_URIS.length} inputs`,
  timed: () => {
    let matched = 0
    for (let round = 0; round < SMALL_ITERATIONS; round++) {
      for (const input of SMALL_URIS) {
        const normalized = dataUriUtils.normalize(input)
        if (dataUriUtils.test(normalized) && dataUriUtils.exec(normalized)[2]) {
          matched++
        }
      }
    }
    return matched
  },
  verify: matched => matched === SMALL_ITERATIONS * (SMALL_URIS.length - 1)
}

const largeUriCase = {
  name: 'exec 256KB base64 URI',
  extra: `${LARGE_ITERATIONS} test + exec calls on ${LARGE_URI.length} chars`,
  timed: () => {
    let payloadChars = 0
    for (let iteration = 0; iteration < LARGE_ITERATIONS; iteration++) {
      if (!dataUriUtils.test(LARGE_URI)) return -1
      payloadChars += dataUriUtils.exec(LARGE_URI)[4].length
    }
    return payloadChars
  },
  verify: payloadChars =>
    payloadChars ===
    LARGE_ITERATIONS * (LARGE_URI.length - LARGE_URI.indexOf(',') - 1)
}

const decodeCase = {
  name: 'toBuffer 48KB base64 URI',
  extra: `${DECODE_ITERATIONS} decodes of ${DECODE_BYTES} bytes`,
  timed: () => {
    let last
    for (let iteration = 0; iteration < DECODE_ITERATIONS; iteration++) {
      last = dataUriUtils.toBuffer(DECODE_URI)
    }
    return last
  },
  verify: buffer =>
    buffer.type === 'image/png' &&
    Buffer.from(buffer).equals(DECODE_BYTES_FIXTURE)
}

const CASES = [smallUrisCase, largeUriCase, decodeCase]

const fmt = value => value.toFixed(1)

const report = slot => {
  const med = slot.walls.length ? median(slot.walls) : Number.NaN
  const min = slot.walls.length ? Math.min(...slot.walls) : Number.NaN
  const max = slot.walls.length ? Math.max(...slot.walls) : Number.NaN
  const extra = `${slot.entry.extra}, errors ${slot.errors}, runs ${RUNS}`
  console.log(
    `${slot.entry.name}  median ${fmt(med)}ms  range ${fmt(min)}-${fmt(
      max
    )}  ${extra}`
  )
  return {
    name: slot.entry.name,
    unit: 'ms',
    value: Number(med.toFixed(1)),
    range: `${fmt(min)}-${fmt(max)}`,
    extra
  }
}

const takeSample = (slot, run) => {
  try {
    collectGarbage()
    const started = now()
    const outcome = slot.entry.timed()
    const wall = elapsed(started)
    if (!slot.entry.verify(outcome)) {
      console.error(`${slot.entry.name} run ${run} produced unexpected output`)
      slot.errors++
      return
    }
    slot.walls.push(wall)
  } catch (error) {
    console.error(error)
    slot.errors++
  }
}

const main = () => {
  const slots = CASES.map(entry => {
    entry.timed()
    return { entry, walls: [], errors: 0 }
  })
  for (let run = 0; run < RUNS; run++) {
    for (const slot of slots) takeSample(slot, run)
  }
  const results = slots.map(report)
  writeFileSync(
    join(__dirname, '..', 'benchmark-output.json'),
    JSON.stringify(results, null, 2) + '\n'
  )
  const errors = slots.reduce((total, slot) => total + slot.errors, 0)
  if (errors > 0 || results.some(result => !Number.isFinite(result.value))) {
    process.exitCode = 1
  }
}

main()
