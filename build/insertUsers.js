/**
 * Insert 20 users on database and create a edge to a random group
 */
const orientDB = require('orientjs')
const db_config = require('../config/database')
const server = orientDB(db_config)
const db = server.use('test')
const sleep = require('sleep')

const create_op = require('../operations/insert')
const get_op = require('../operations/get')

let names = ['Caio', 'Vinicius', 'Julito', 'Citor', 'Muraylo']
let positions = ['Full Stack Developer', 'Front End Developer', 'Back End Developer', 'Product Manager', 'Patati', 'Patata']

let qty = 20
let groups = ['Atendimento', 'Desenvolvimento', 'Diretoria', 'Marketing', 'Design']

/**
 * Insert users recursively
 */
let insertRec = () => {

  let randomName = names[Math.round(Math.random() * 4)]
  let randomAge = parseInt(Math.round(20 + (Math.random() * 20)))
  let randomPosition = positions[Math.round(Math.random() * (positions.length - 1))]

  let binary_data = {
    name: randomName,
    age: randomAge,
    position: randomPosition,
    '@class': 'User'
  }

  get_op.getGroup(db, groups[Math.round(Math.random() * 4)]).then((rec) => {
    let group_id = rec[0]['@rid'].toString()   

    create_op.create(db, binary_data).then((rec) => {
      console.log(`Inserted user :${binary_data['@rid']}`)

      db.query(`create Edge UserGroup from ${binary_data['@rid']} to ${group_id}`).then((rec) => {

        sleep.msleep(5)
        qty -= 1
        if ( qty > 0 ){
          insertRec()
        } else {
          process.exit()
        }
      })
    })
  })
}


insertRec()
