var moment = require('moment')
var request = require('request')
var extend = require('deep-extend')

var BASE_URL = 'https://himawari8-dl.nict.go.jp/himawari8/img/'
var INFRARED = 'INFRARED_FULL'
var VISIBLE_LIGHT = 'D531106'
var WIDTH = 550
var LEVEL = [
  '1d',
  '4d',
  '8d',
  '16d',
  '20d'
]

module.exports = himawariURLs

/**
 * Returns an array of objects containing URLs and metadata
 * for Himawari 8 image tiles based on a given date.
 * Options:
 * - date: Date object, Date string, or 'latest'
 * - infrared: boolean (optional)
 * - zoom: number (default: 1)
 *
 * @param  {Object}       opts      date: Date|String, infrared: Boolean
 * @param  {Function}     callback  The function to be called when URLs are ready
 */
function himawariURLs (opts, callback) {
  // allow for options to be omitted and callback to be first argument
  if (!callback && typeof opts === 'function') {
    callback = opts
    opts = {}
  } else {
    opts = opts || {}
  }

  if (!callback) callback = function () {}

  var options = extend({
    date: 'latest',
    infrared: false,
    timeout: 5000,
    zoom: 1
  }, opts)

  var baseURL = getBaseURL(options.infrared)

  resolveDate({
    base_url: baseURL,
    date: options.date,
    timeout: options.timeout
  }, function (err, now) {
    if (err) return callback(err)

    // Normalize our date
    normalizeDate(now)

    // Define some image parameters
    var level = options.zoom ? LEVEL[options.zoom - 1] : LEVEL[0]
    var blocks = parseInt(level.replace(/[a-zA-Z]/g, ''), 10)
    var time = moment(now).format('HHmmss')
    var year = moment(now).format('YYYY')
    var month = moment(now).format('MM')
    var day = moment(now).format('DD')

    // compose URL
    var tilesURL = [baseURL, level, WIDTH, year, month, day, time].join('/')
    var tiles = []

    for (var x = 0; x < blocks; x++) {
      for (var y = 0; y < blocks; y++) {
        var name = x + '_' + y + '.png'
        var url = tilesURL + '_' + name

        tiles.push({
          name: name,
          url: url,
          x: x,
          y: y
        })
      }
    }

    callback(null, tiles)
  })
}

/**
 * Returns base URL for Himawari-8 images
 * @param   {Boolean}   infrared  returns base URL for infrared images if true
 * @returns {String}              full base URL
 */
function getBaseURL (infrared) {
  var url = BASE_URL
  if (infrared) url += INFRARED
  else url += VISIBLE_LIGHT
  return url
}

/**
 * Takes a Date and normalizes it to ten minute intervals.
 * @param   {Date}  input   Date object
 * @returns {Date}          normalized Date object
 */
function normalizeDate (date) {
  date.setMinutes(date.getMinutes() - (date.getMinutes() % 10))
  date.setSeconds(0)
  return date
}

/**
 * Takes an input, either a date object, a date timestamp, or the string 'latest'
 * and resolves to a native Date object. Requires base URL to resolve date based
 * on latest date retrieved from Himawari 8 server. Optionally override default
 * 10 second timeout.
 *
 * @param  {Object}       options   date (Date|String), uri (String), timeout (Number)
 * @param  {Function}     callback  The function to be called when date is resolved
 */
function resolveDate (options, callback) {
  var input = options.date
  var date = input

  // If provided a date string
  if (typeof input === 'string' && input !== 'latest') {
    date = new Date(input)
  }

  // If provided a date object
  if (moment.isDate(date)) return callback(null, date)

  // If provided 'latest'
  if (input === 'latest') {
    return request({
      method: 'GET',
      uri: options.base_url + '/latest.json',
      timeout: options.timeout || 10000
    }, function (err, res) {
      if (err) return callback(err)

      try {
        date = new Date(JSON.parse(res.body).date)
      } catch (e) {
        date = new Date()
      }

      return callback(null, date)
    })
  }

  // Invalid string provided, return new Date
  return callback(new Date())
}
