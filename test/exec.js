'use strict'

const test = require('ava').default

const dataUriUtils = require('..')

const { dataUri } = require('./helpers')

test('get content type', t => {
  const [, , contentType] = dataUriUtils.exec(dataUri.base)
  t.is(contentType, 'image/png')
})

test('get content type with charset and base64', t => {
  const match = dataUriUtils.exec(dataUri.withCharsetAndBase64)
  t.truthy(match)
  t.is(match[2], 'text/plain')
  t.is(match[3], ';charset=UTF-8;base64')
  t.is(match[4], 'SGVsbG8=')
})
