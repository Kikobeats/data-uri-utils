'use strict'

const dataUri = {
  base:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='
}

dataUri.withNullMediaType = dataUri.base.replace('image/png', 'null')
dataUri.withoutMediaType = dataUri.base.replace('image/png', '')
dataUri.withCharset = 'data:text/plain;charset=utf-8,hello%20world'
dataUri.withCharsetAndBase64 = 'data:text/plain;charset=UTF-8;base64,SGVsbG8='

module.exports.dataUri = dataUri
