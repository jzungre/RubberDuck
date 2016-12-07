//R require express body parser, and eventually routes

var express = require('express');
//var router = require('./router.js')
var bodyParser = require('body-parser');

var fs = require("fs");


//I instantiate server
var server = express();
var list = [];



//M add middleware
server.use(bodyParser.json())

var db = require('knex')({
	client: 'sqlite3',
	connection: {
		filename: 'CFMlist.db'
	}
});

// creating a table

db.schema.createTableIfNotExists('list', function(table){
 	console.log("in table creation1!!!!")
 	table.string('name'); // these are the columns of the table
 }).catch(function(error){ // .catch gives the promise some code. The code acts upon the promise, which makes it exist. in short, if using promises, you need .then or .catch
 	console.log('error', error);

 });

//H handlers
//app.use(router) 



server.post('/list', function(req, res) {
	//db('list').del()
  db('list').insert({name: req.body.data})
		.then(function(result){ //send a 201 when you get a response back from db
		console.log("inside db post result: ", result);
		res.sendStatus(201)
  })
  list.push(req.body.data);
  console.log("post request is happenen!!!!", "req.body: ", req.body, "current list: ", list);
});

server.get('/list', function(req, res){
	console.log('in sever.get /list, going to DB');
	db.select().table('list')  //select everything in items table
	.then(function(result){		// once you get that do work
		console.log("in the response from the server, sending back to client: ", result);
		res.status(200).send(result); // send a status and the result
  	})


	console.log('SERVER GET REQUEST!!!!!')
	// res.status(200).send(list);


})

server.post('/signup', function (req, res) {   
	  console.log('req.body:', req.body);
  // save username and password in variables from request                   //1. grab data from req
  var username = req.body.username;                                             
  var password = req.body.password
  // ---
  // TODO:
  //   1. Make sure username is not taken
      if(User.findByUsername(username) === null){                           //2. make sure username is not taken
      //2. Create user
  console.log('POSTusername:', username, 'POSTpassword:', password);
  User.create(username, password)                                           //3. create a user
  res.sendStatus(201) // send an asset created sendStatus                   //4. send 'asset created' status
  } else {                                                                  
    //console.log('res.body.reason', res.body.reason)
    res.status(400).send({reason: "username_is_taken"});                    //5. if the username is taken send '400'
    // res.body.reason = 'username_is_taken'
    // res.status(400);
    // res.send(res.body.reason)
    //res.sendStatus(400);
  }
  //   3. Send back 201
  // ---




})

server.post('/signin', function(req, res){

    var username = req.body.username;                                          //1. save username and password in variables from request
    var password = req.body.password;
  // ---
  // TODO:
  //   1. Attempt to find user by username
    var user = User.findByUsername(username);                                  //2. find user by username
    // var verdict = User.matchesPassword(user, password);
    console.log('username: ', username, 'password: ', password, 'user: ', user);
    
  //   2. Make sure passwords match
  if(user === null){                                                           //3. send back error if user isn't found
    res.status(400).send({reason: 'no_such_username'})
  }else{

     if(User.matchesPassword(user, password) === true){                        //4. see if entered password, when hashed, matches the stored hashed password
      //   3. Create a new session
          var session = Session.create(user.id);                               //5. if they do, create a session, send back an asset created status and the session id
          console.log('Session Sweeeeezy!', session);
      //   4. Send back new session's id (201)
          res.status(201).send({sessionId: session.id})                       
     }else{
        res.status(401).send({reason: 'incorrect_password'})                   //6. send back a 401, if the passwords don't match
     }
  }
  // ---




})

//Orient ------ server up static files
server.use(express.static(__dirname + "/../Client"))

// server.get('/', function(req, res){
// 	console.log('in GET request');
// 	var homethang = fs.readFileSync('Client/index.html');
// 	console.log('homethanging!')
// 	res.send(homethang);
// 	//res.sendFile(__dirname + '/../Client/index.html')
// });


// server.get('/', function (req, res) {       //------------ Orient to first page
//   res.sendFile(__dirname + '/client.html' )
// })

//Listen ---- make server listen
server.listen(8672);
console.log("in router YO!!! listening to 8672")


//export app
module.exports = server;