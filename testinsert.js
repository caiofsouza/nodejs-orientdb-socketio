const orientDB = require('orientjs')
const db_config = require('./config/database')
const server = orientDB(db_config)
const db = server.use('test')
const sleep = require('sleep')

const create_op = require('./operations/insert')

let names = ['Caio', 'Vinicius', 'Julito', 'Citor', 'Muraylo']
let positions = ['Full Stack Developer', 'Front End Developer', 'Back End Developer', 'Product Manager', 'Patati', 'Patata']

let loop = 1000

let insertRec = () => {

  let binary_data = {
    name: names[Math.round(Math.random() * 4)],
    age: parseInt(Math.round(15 + Math.random() * 15)),
    position:  positions[Math.round(Math.random() * 4)],
    '@class': 'V'
  }

  create_op.create(db, binary_data).then((rec) => {
    console.log(`Inserted :${binary_data['@rid']}`)
    sleep.msleep(5)
    loop -= 1
    if ( loop > 0 ){
      insertRec()
    } else {
      process.exit()
    }
  })

}

insertRec()