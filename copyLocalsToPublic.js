const fs = require('fs-extra')
 const path = require('path')
// Async with promises:
fs.copy(path.join(__dirname, '/src/static/locales'), path.join(__dirname, '/public/locales'))
  .then(() => console.log('success!'))
  .catch(err => console.error(err))