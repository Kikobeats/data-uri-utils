'use strict'

const test = require('ava')

const dataUriUtils = require('..')

const { dataUri } = require('./helpers')

test('true', t => {
  t.true(dataUriUtils.test(dataUri.base))
  t.true(dataUriUtils.test(dataUri.withNullMediaType))
  t.true(dataUriUtils.test(dataUri.withoutMediaType))
})

test('false', t => {
  t.false(dataUriUtils.test('http://'))
  t.false(dataUriUtils.test('foo'))
})
