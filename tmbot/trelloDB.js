var Promise = require("bluebird");
var _ = require("underscore");
var request = require("request");
var querystring = require('querystring');
var Trello = require("node-trello");
var pgUrl = require('pg-database-url')
var pg = require('pg');


   // Example config 
   // This may already be available from your database configuration or environment variables 
   var dbConfig = {
    host: 'localhost',
    port: 5432,
    database: 'TaskBotDB',
    username: 'postgres',
    password: 'taskbot'
  }
   
  var connString = pgUrl(dbConfig)
  var client = new pg.Client(connString);
  

  client.connect();
  //client.connect();
function insertIntoSlackToTrello(slackidInput, trelloidInput) 
{
  console.log("CLient ");
  console.log("Came inside insertIntoSlack with" + slackidInput);
   
  client.query("INSERT INTO slacktotrello(slackid, trelloid) values($1, $2)", [slackidInput, trelloidInput]);
 // client.end();
   /*
   var query = client.query("SELECT * FROM slacktotrello");
   query.on("row", function (row, result) {
	   result.addRow(row);
   });
   query.on("end", function (result) {
     console.log("Came inside end");
	   console.log(JSON.stringify(result.rows, null, "    "));
	   
   });
   */
   
}

function getTrelloUsername(slackidInput) 
{
  var id;
  console.log("Came inside getTrelloUserName");
  /*
  
   var query = client.query("SELECT * FROM slacktotrello WHERE values($1)", ["user4"]);
   query.on("row", function (row, result) {
	   result.addRow(row);
   });

   query.on("error", function(res) {
     console.log(res)
   });
   query.on("end", function (result) {
       if((result.rows).length == 0)
            return -1;
      
       console.log(JSON.stringify(result.rows, null, "    "));
       id = result.rows[0].trelloid;
       //client.end();
   });
   */
  
  var text= 'SELECT * FROM slacktotrello where slackid=$1'
  var values = [slackidInput]
  
  client.query(text, values, (err, res) => {
    if (err) {
      console.log(err.stack)
    } else {
      console.log("All good")
      console.log(res.rows[0].trelloid)
    }
  })
   //return id;
}

exports.insertIntoSlackToTrello = insertIntoSlackToTrello;
exports.getTrelloUsername = getTrelloUsername;
