# Nodejs + OrientDB + Socket.io

A study to implement a real-time communication with Node.js, OrientDB (via Docker), and Socket.io, with the `liveQuery()` method from OrientDB.


# How to install and run
* First, you need to have [Node.js](http://nodejs.org/) v7+, [NPM](https://www.npmjs.com/) and [Docker](https://www.docker.com/) in your machine.
* Clone this repository 
* Create a path in your machine to store the OrientDB databases locally. By default, the directory which will be used is `/opt/orientdb/databases`. If you create another directory, change the script `build` on `package.json` at `docker run -d --name orientdb -p 2424:2424 -p 2480:2480 -v {YOUR_DIRECTORY}:/orientdb/databases ...` 
* Run `npm install`
* Run `npm run build`
* Run `npm start`
* Open `http://localhost:8000`

# How to test the real-time communication
* Once started, open the terminal and a browser at `http://localhost:8000`
* Then, run `npm run newusers`. You will see the data changing in your page and printing in your console the new records that are saved on your database  
