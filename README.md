# himawari-urls

Get URLs for Himawari 8 image tiles based on a given date.

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]
[![standard][standard-image]][standard-url]

[npm-image]: https://img.shields.io/npm/v/himawari-urls.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/himawari-urls
[travis-image]: https://img.shields.io/travis/ungoldman/himawari-urls.svg?style=flat-square
[travis-url]: https://travis-ci.org/ungoldman/himawari-urls
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://npm.im/standard

## Install

```
npm install himawari-urls
```

## Usage

```js
var himawariURLs = require('himawari-urls')

himawariURLs({
  date: 'latest',   // default: 'latest' (must be Date object, timestamp, or 'latest')
  infrared: true,   // default: false
  zoom: 1,          // default: 2
  timeout: 20000    // default: 10000 (milliseconds)
}, function (err, tiles) {
  if (err) console.error(err)
  tiles.map(function (t) { console.log(t) })
})

// { name: '0_0.png',
//  url: 'http://himawari8-dl.nict.go.jp/himawari8/img/INFRARED_FULL/1d/550/2016/02/10/192000_0_0.png',
//  x: 0,
//  y: 0 }
```

## Contributing

Contributions welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.

## Acknowledgment

All source code in `index.js` has been adapted from [jakiestfu](https://github.com/jakiestfu)'s work in [himawari.js](https://github.com/jakiestfu/himawari.js).

## See Also

- [hi8](https://github.com/ungoldman/hi8): See Earth from Himawari-8 on your desktop every 10 minutes.
- [himawari-bg](https://github.com/ungoldman/himawari-bg): Set the latest image from Himawari 8 as your desktop background.
- [himawari-history](https://github.com/ungoldman/himawari-history): Download all Himawari 8 images in a date range.

## License

Original and modified work is released under the [MIT](LICENSE.md) license.
