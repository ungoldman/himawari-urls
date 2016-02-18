var himawariURLs = require('./')

himawariURLs({
  zoom: 2
}, function (err, tiles) {
  if (err) console.error(err)
  tiles.map(function (t) { console.log(t.url) })
})
