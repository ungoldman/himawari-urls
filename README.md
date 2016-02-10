# himawari-urls

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]
[![standard][standard-image]][standard-url]

[npm-image]: https://img.shields.io/npm/v/himawari-urls.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/himawari-urls
[travis-image]: https://img.shields.io/travis/ngoldman/himawari-urls.svg?style=flat-square
[travis-url]: https://travis-ci.org/ngoldman/himawari-urls
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://npm.im/standard

Get URLs for Himawari 8 images tiles based on a given date.

## Install

```
npm install himawari-urls
```

## Usage

```js
var himawariURLs = require('himawari-urls')

himawariURLs({
  date: 'latest',
  zoom: 2
}, function (err, tiles) {
  if (err) console.error(err)
  tiles.map(function (t) { console.log(t.url) })
})
```

## Contributing

Contributions welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.

## License

[ISC](LICENSE)
