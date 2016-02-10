var himawariURLs = require('./')

himawariURLs({
  date: 'latest',
  infrared: true,
  zoom: 1
}, function (err, tiles) {
  if (err) console.error(err)
  tiles.map(function (t) { console.log(t) })
})
