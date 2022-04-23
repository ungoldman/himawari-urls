const himawariURLs = require('./')

himawariURLs({
  zoom: 2
}, function (err, tiles) {
  if (err) console.error(err)
  tiles.forEach(function (t) { console.log(t.url) })
})
