'use strict'

const test = require('ava').default

const dataUriUtils = require('..')

const { dataUri } = require('./helpers')

test('get content type', t => {
  const [, , contentType] = dataUriUtils.exec(dataUri.base)
  t.is(contentType, 'image/png')
})
