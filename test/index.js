const test = require('tape')
const moment = require('moment')
const lastWeek = new Date(moment().subtract(7, 'days').format())
const himawariURLs = require('../')

test('Fetch latest URLs', function (t) {
  himawariURLs({
    date: 'latest'
  }, function (err, tiles) {
    t.error(err, 'no error')
    t.ok(tiles, 'tiles object exists')
    t.equals(tiles.length, 1, 'contains 1 object')
    t.ok(tiles[0].name, 'tile 0 contains name property: ' + tiles[0].name)
    t.ok(tiles[0].url, 'tile 0 contains url property: ' + tiles[0].url)
    t.ok(!isNaN(tiles[0].x), 'tile 0 contains x property: ' + tiles[0].x)
    t.ok(!isNaN(tiles[0].y), 'tile 0 contains y property: ' + tiles[0].y)
    t.end()
  })
})

test('Fetch URLs from last week at zoom 2', function (t) {
  himawariURLs({
    date: lastWeek,
    zoom: 2
  }, function (err, tiles) {
    t.error(err, 'no error')
    t.ok(tiles, 'tiles object exists')
    t.equals(tiles.length, 16, 'contains 16 objects')
    t.ok(tiles[15].name, 'tile 16 contains name property: ' + tiles[15].name)
    t.ok(tiles[15].url, 'tile 16 contains url property: ' + tiles[15].url)
    t.ok(!isNaN(tiles[15].x), 'tile 16 contains x property: ' + tiles[15].x)
    t.ok(!isNaN(tiles[15].x), 'tile 16 contains y property: ' + tiles[15].y)
    t.end()
  })
})

test('Fetch infared URLs', function (t) {
  himawariURLs({
    date: 'latest',
    infrared: true
  }, function (err, tiles) {
    t.error(err, 'no error')
    t.ok(tiles, 'tiles object exists')
    t.equals(tiles.length, 1, 'contains 1 object')
    t.ok(tiles[0].name, 'tile 0 contains name property: ' + tiles[0].name)
    t.ok(tiles[0].url, 'tile 0 contains url property: ' + tiles[0].url)
    t.ok(!isNaN(tiles[0].x), 'tile 0 contains x property: ' + tiles[0].x)
    t.ok(!isNaN(tiles[0].y), 'tile 0 contains y property: ' + tiles[0].y)
    t.end()
  })
})

test('Fetch URLs from last week at zoom 2', function (t) {
  himawariURLs({
    date: lastWeek,
    infrared: true,
    zoom: 2
  }, function (err, tiles) {
    t.error(err, 'no error')
    t.ok(tiles, 'tiles object exists')
    t.equals(tiles.length, 16, 'contains 16 objects')
    t.ok(tiles[15].name, 'tile 16 contains name property: ' + tiles[15].name)
    t.ok(tiles[15].url, 'tile 16 contains url property: ' + tiles[15].url)
    t.ok(!isNaN(tiles[15].x), 'tile 16 contains x property: ' + tiles[15].x)
    t.ok(!isNaN(tiles[15].y), 'tile 16 contains y property: ' + tiles[15].y)
    t.end()
  })
})
