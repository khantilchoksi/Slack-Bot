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
function insertIntoSlackToTrello(slackidInput, trelloidInput) 
{
   // client.query("CREATE TABLE IF NOT EXISTS emps(firstname varchar(64), lastname varchar(64))");
   client.query("INSERT INTO slacktotrello(slackid, trelloid) values($1, $2)", [slackidInput, trelloidInput]);
   // client.query("INSERT INTO emps(firstname, lastname) values($1, $2)", ['Mayor', 'McCheese']);
   
   var query = client.query("SELECT * FROM slacktotrello");
   query.on("row", function (row, result) {
	   result.addRow(row);
   });
   query.on("end", function (result) {
	   console.log(JSON.stringify(result.rows, null, "    "));
	   client.end();
   });
}

function getTrelloUsername(slackidInput) 
{
   // client.query("CREATE TABLE IF NOT EXISTS emps(firstname varchar(64), lastname varchar(64))");
   client.query("INSERT INTO slacktotrello(slackid, trelloid) values($1, $2)", [slackidInput, trelloidInput]);
   // client.query("INSERT INTO emps(firstname, lastname) values($1, $2)", ['Mayor', 'McCheese']);
   
   var query = client.query("SELECT * FROM slacktotrello WHERE values($1)", [slackidInput]);
   query.on("row", function (row, result) {
	   result.addRow(row);
   });
   query.on("end", function (result) {
       if((result.rows).length == 0)
            return -1;
      
       console.log(JSON.stringify(result.rows, null, "    "));
       client.end();
       return  result.rows[0].trelloid;
   });
}

exports.insertIntoSlackToTrello = insertIntoSlackToTrello;
