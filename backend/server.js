var express= require('express');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var app=express();
var url='mongodb://localhost:27017/messageApp';
var collectionName='messages';
var ObjectID = require('mongodb').ObjectID;

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/home',function(req,res){

MongoClient.connect(url, function(err, db) {

  db.collection(collectionName).find().toArray(function(error, result) {
    if (error) throw error;
    docStore=result;
        console.log("found a document"+result);
        res.send(result);
});
}) ;

});

app.post('/save',function(req,res,err){
	console.log(req.body);
	var doc=req.body;
	
	MongoClient.connect(url, function(err, db) {
		if(err){
			res.send('{ok:0}')
		}
   db.collection(collectionName).insertOne( doc, function(err, result) {
		flag=result;
   		console.log("Inserted a document"+result);
   		db.close();	
      	res.send(JSON.stringify(result));
  });
}) ;
})

app.post('/update',function(req,res,err){
	console.log(req.body);
	var doc= { "_id" : ObjectID(req.body._id)};
	var newValues={"message":req.body.message, "topic":req.body.topic};
	
	MongoClient.connect(url, function(err, db) {
		if(err){
			res.send('{ok:0}')
		}
  db.collection(collectionName).updateOne( doc,newValues, function(err, result) {
if(err) throw err;

    console.log("Updated a document"+result);
    	res.send(JSON.stringify(result));
  });
}) ;
})


app.listen('8000',function(){
	console.log('Backend running on localhost 8000');
})