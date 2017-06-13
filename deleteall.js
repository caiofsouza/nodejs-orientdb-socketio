const orientDB = require('orientjs')
const db_config = require('./config/database')
const server = orientDB(db_config)
const db = server.use('test')
const sleep = require('sleep')

let iterator = 0
var recLength = 0

let deleteRec = (db, r) => {
  db.record.delete(`${r[iterator]["@rid"]}`).then((deleted) => {
    console.log('Record deleted', deleted)
    if (iterator < recLength) {
      iterator += 1
      sleep.msleep(5)
      deleteRec(db, r)
    }
  })
}

db.query('select from V').then((results) => {
  recLength = results.length - 1 

  deleteRec(db, results)
})

