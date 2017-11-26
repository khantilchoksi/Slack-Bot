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
  var pool = new pg.Pool()

  //client.connect();
function insertIntoSlackToTrello(slackidInput, trelloidInput) 
{
  console.log("Came inside insertIntoSlack with" + slackidInput);
   // client.query("CREATE TABLE IF NOT EXISTS emps(firstname varchar(64), lastname varchar(64))");
   client.query("INSERT INTO slacktotrello(slackid, trelloid) values($1, $2)", [slackidInput, trelloidInput]);
   // client.query("INSERT INTO emps(firstname, lastname) values($1, $2)", ['Mayor', 'McCheese']);
   
   var query = client.query("SELECT * FROM slacktotrello");
   /*query.on("row", function (row, result) {
	   result.addRow(row);
   });
   query.on("end", function (result) {
	   console.log(JSON.stringify(result.rows, null, "    "));
	   client.end();
   });*/
}

function getTrelloUsername(slackidInput) 
{
   /*
   console.log("Slack id input recvd: "+ slackidInput);
   client.query(("SELECT * FROM slacktotrello WHERE values($1)", slackidInput), function(err, result){
  
   });
   */
  pool.connect(connString, function (err, client, done) {
    if (err) {
      // pass the error to the express error handler
      return next(err)
    }
    client.query("SELECT * FROM slacktotrello WHERE values($1)", slackidInput, function (err, result) {
      

      if (err) {
        // pass the error to the express error handler
        return next(err)
      }
      var firstRow = result.rows[0];
      return firstRow.trelloid;
      done()
      
    });
  });
}

exports.insertIntoSlackToTrello = insertIntoSlackToTrello;
exports.getTrelloUsername = getTrelloUsername;
