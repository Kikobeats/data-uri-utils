'use strict'

const test = require('ava').default

const dataUriUtils = require('..')

const { dataUri } = require('./helpers')

test('true', t => {
  t.true(dataUriUtils.test(dataUri.base))
  t.true(dataUriUtils.test(dataUri.withNullMediaType))
  t.true(dataUriUtils.test(dataUri.withoutMediaType))
  t.true(dataUriUtils.test(dataUri.withCharset))
  t.true(dataUriUtils.test(dataUri.withCharsetAndBase64))
})

test('false', t => {
  t.false(dataUriUtils.test('http://'))
  t.false(dataUriUtils.test('foo'))
})
