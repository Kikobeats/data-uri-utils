'use strict'

const test = require('ava')

const dataUriUtils = require('..')

const { dataUri } = require('./helpers')

test('normalize `null` media type', t => {
  t.is(
    dataUriUtils.normalize(dataUri.withNullMediaType),
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='
  )
})

test('normalize empty media type', t => {
  t.is(
    dataUriUtils.normalize(dataUri.withoutMediaType),
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='
  )
})
