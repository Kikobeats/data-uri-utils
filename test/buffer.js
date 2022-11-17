'use strict'

'use strict'

const test = require('ava')

const dataUriUtils = require('..')

const { dataUri } = require('./helpers')

test('returns a buffer', t => {
  ;[dataUri.withNullMediaType, dataUri.base, dataUri.withoutMediaType]
    .map(dataUriUtils.normalize)
    .map(dataUriUtils.toBuffer)
    .forEach(buffer => {
      t.is(Buffer.byteLength(buffer), 85)
      t.is(buffer.type, 'image/png')
      t.is(buffer.typeFull, 'image/png')
      t.is(buffer.charset, '')
    })
})
