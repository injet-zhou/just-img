const Storage = require('dom-storage')
global.localStorage = new Storage(null, { strict: true })
global.sessionStorage = new Storage(null, { strict: true })
window.localStorage = global.localStorage
window.sessionStorage = global.sessionStorage

module.exports = {
  window,
}
