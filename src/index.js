'use strict'

/* based on https://github.com/ragingwind/data-uri-regex/blob/master/index.js
the last update never published at npm */
// charset and base64 are independent parameters (RFC 2397); both may appear.
const regex = () =>
  /^(data:)([\w/+-]*)((?:;charset=[\w-]+)?(?:;base64)?),(.*)/i

module.exports = {
  normalize: input =>
    input
      .replace('data:;', 'data:null;')
      .replace('data:null;', 'data:image/png;'),
  toBuffer: require('data-uri-to-buffer').dataUriToBuffer,
  test: input => regex().test(input),
  exec: input => regex().exec(input)
}
