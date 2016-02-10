var himawariURLs = require('./')

himawariURLs({
  date: 'latest',
  zoom: 2
}, function (err, tiles) {
  if (err) console.error(err)
  tiles.map(function (t) { console.log(t.url) })
})
