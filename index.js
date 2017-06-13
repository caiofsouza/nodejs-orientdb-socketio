const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)


const orientDB = require('orientjs')
const db_config = require('./config/database')
const server = orientDB(db_config)
const db = server.use('test')


// db operations
const get_op = require('./operations/get')
const create_op = require('./operations/insert')


io.on('connection', function(socket){
  console.log('Connected on socket');

  get_op.getAll(db).then((rec) => { 
    socket.emit('allUsers', rec)
  })

  db.liveQuery('LIVE SELECT FROM V')
     .on('live-insert', function(data){
        let id = '#' + data.cluster + ':' + data.position
        data.content['@rid'] = id
        socket.emit('userIn', [data.content]);
     })

  db.liveQuery('LIVE SELECT rid, name, age, position FROM V')
     .on('live-delete', function(data){
        let id = '#' + data.cluster + ':' + data.position
        console.log(id)
        socket.emit('removeUser', id);
     })

});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

http.listen(3000, function(){
  console.log('listening on port :3000');
});
