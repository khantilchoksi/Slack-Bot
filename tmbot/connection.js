// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
  if(!err) {
    console.log("We are connected");
	
//	db.mappings.insert(
//   {
//      "Khelan": "ABC",
//	  "Khantil": "DEF",
//	  "Swati" : "GHI",
//	  "Prashanth" : "JKL",
//	  "Ahay" : "MNO"
//   }
	db.createCollection("log", { capped : true, size : 5242880, max : 5000 } )
	var assert = require('assert');
	var ObjectId = require('mongodb').ObjectID;
	var url = 'mongodb://localhost:27017/test';
	
	var insertDocument = function(db, callback) {
	db.collection('map').insertOne( {
		
		"Khelan": {
			"key" : "ABCD"
		},
		"Khantil": {
			"key" : "EFGH"
		}
		
      
      //"Khelan" : "ABC",
      //"Khantil" : "DEF",
      //"Swati" : "GHI",
	  //"Prashanth" : "JKL",
	  //"Abhay" : "MNO"
    
	}, function(err, result) {
		assert.equal(err, null);
		console.log("Inserted edited document into the map collection.");
		callback();
	});
	};
	MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
	insertDocument(db, function() {
    db.close();
	});
	});
	console.log("collection created")
	console.log(db.listCollections())
	db.map.find({},{Khelan:1}).pretty();
  }
});

