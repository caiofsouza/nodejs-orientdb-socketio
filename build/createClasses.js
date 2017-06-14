/**
 * // Create the classes useds for test
 */
const orientDB = require('orientjs')
const db_config = require('../config/database')
const server = orientDB(db_config)
const db = server.use('test')

const startScripts = [
  'create class User extends V',
  'create class Group extends V'
]

let allScripts = []

startScripts.forEach((s) => {
  allScripts.push(db.query(s))
})

Promise.all(allScripts).then((r) => {
  console.log('Classes created!')
  process.exit()
})





