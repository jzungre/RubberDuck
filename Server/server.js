//R require express body parser, and eventually routes

var express = require('express');
//var router = require('./router.js')
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var bodyParser = require('body-parser');
var path = require('path')
var fs = require("fs");


//I instantiate server
var server = express();
var list = [];



//M add middleware
server.use(bodyParser.json())

var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, '../Client/uploads');
        },
        filename: function (req, file, cb) {
            console.log('infilename! with file', file, 'and cb', cb);
            var datetimestamp = Date.now();
            cb(null, file.originalname);
            // cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
        } // format for saving with multer
    });

var upload = multer({ //generate multer instance with storage and single file settings
                    storage: storage
                }).single('file');

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

    server.post('/upload', function(req, res) {
        console.log('the image req', req.body);
        upload(req,res,function(err){
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
             res.json({error_code:0,err_desc:null});
        });
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