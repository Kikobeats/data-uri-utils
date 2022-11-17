# data-uri-utils

![Last version](https://img.shields.io/github/tag/Kikobeats/data-uri-utils.svg?style=flat-square)
[![Coverage Status](https://img.shields.io/coveralls/Kikobeats/data-uri-utils.svg?style=flat-square)](https://coveralls.io/github/Kikobeats/data-uri-utils)
[![NPM Status](https://img.shields.io/npm/dm/data-uri-utils.svg?style=flat-square)](https://www.npmjs.org/package/data-uri-utils)

> A set of functions for manipuliating data URIs.

## Install

```bash
$ npm install data-uri-utils --save
```

## Usage

```js
const dataUri = require('data-uri-utils')

const uri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='

dataUri.normalize(uri)
dataUri.toBuffer(uri).byteLength // => 89
dataUri.test(uri) // => true
dataUri.exec(uri)[2] // => 'image/png'
```

## License

**data-uri-utils** © [Kiko Beats](https://kikobeats.com), released under the [MIT](https://github.com/Kikobeats/data-uri-utils/blob/master/LICENSE.md) License.<br>
Authored and maintained by [Kiko Beats](https://kikobeats.com) with help from [contributors](https://github.com/Kikobeats/data-uri-utils/contributors).

> [kikobeats.com](https://kikobeats.com) · GitHub [Kiko Beats](https://github.com/Kikobeats) · Twitter [@Kikobeats](https://twitter.com/Kikobeats)
