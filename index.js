const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const sleep = require('sleep')

const orientDB = require('orientjs')
const db_config = require('./config/database')
const server = orientDB(db_config)
const db = server.use('test')

// db operations
const get_op = require('./operations/get')
const create_op = require('./operations/insert')

// On Socket connected
io.on('connection', function(socket){
  console.log('Connected on socket');

  // get all users
  get_op.getAllUsers(db).then((rec) => { 
    socket.emit('allUsers', rec)
  })

  // when a new user is inserted
  db.liveQuery("live select *, out('UserGroup').name as user_group from User")
     .on('live-insert', function(data){
        // for any reason, the inserted User not return the edge 'UserGroup' :/
        sleep.msleep(100)

        let id = '#' + data.cluster + ':' + data.position
        data.content['@rid'] = id

        // get the 'UserGroup' edge
        db.query(`select *, out('UserGroup').name[0] as user_group from User where @rid = ${id}`)
          .then((rec) => {
            socket.emit('userIn', rec);
          })
     })

  // when a user is deleted, delete from front-end page
  db.liveQuery("live select from User ")
     .on('live-delete', function(data){
        let id = '#' + data.cluster + ':' + data.position
        socket.emit('removeUser', id);
     })

});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

http.listen(8000, function(){
  console.log('Listening on port 8000');
});
