/**
 * // Create the database to test
 */
const orientDB = require('orientjs')
const db_config = require('../config/database')
const server = orientDB(db_config)

let db = server.create({
  name:    'test',
  type:    'graph',
  storage: 'plocal'
}).then((created) => {
  console.log("Database test created!")
  process.exit()
})
  