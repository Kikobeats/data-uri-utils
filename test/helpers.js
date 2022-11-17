'use strict'

const dataUri = {
  base:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='
}

dataUri.withNullMediaType = dataUri.base.replace('image/png', 'null')
dataUri.withoutMediaType = dataUri.base.replace('image/png', '')

module.exports.dataUri = dataUri
