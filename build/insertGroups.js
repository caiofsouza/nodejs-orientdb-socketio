/**
 * Insert 5 default groups on class Group to create the Edges
 */
const orientDB = require('orientjs')
const db_config = require('../config/database')
const server = orientDB(db_config)
const db = server.use('test')
const sleep = require('sleep')

const create_op = require('../operations/insert')

let names = ['Atendimento', 'Desenvolvimento', 'Diretoria', 'Marketing', 'Design']

let loop = 4

let insertRec = () => {

  let data = {
    name: names[loop],
    '@class': 'Group'
  }

  create_op.create(db, data).then((rec) => {
    console.log(`Inserted group :${data['@rid']}`)
    sleep.msleep(5)
    loop -= 1
    if ( loop >= 0 ){
      insertRec()
    } else {
      process.exit()
    }
  })

}

insertRec()