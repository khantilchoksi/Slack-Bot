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


function insertIntoTrelloInfo(trelloidInput, token) 
{
  
  console.log("Came inside insertIntoTrelloInfo with token" + token);
   
  client.query("INSERT INTO trelloinfo(trelloid, token) values($1, $2)", [trelloidInput, token]);
   
}

function getTrelloUsername(slackidInput) 
{
  console.log("Came inside getTrelloUserName "+ slackidInput); 
  return new Promise(function (resolve, reject)
  {
  
  var id;
  var text= 'SELECT * FROM slacktotrello where slackid=$1'
  var value = "'"+slackidInput+"'"
  console.log("What is the input "+ value);
  var values = [slackidInput]
  client.query(text, values,(err, res) => {
    if (err) {
      console.log(err.stack)
    } else {
      if(res.rows.length == 0){
        resolve(-1);
      }
      else {
        console.log("Came into client query result :" +res.rows[0])
        resolve(res.rows[0].trelloid);
      }
    }
  });
  
  /*
  client.query(text, (err, res) => {
    if( typeof res !== 'undefined'){
      console.log("Returning -1");
      id="stale";
    }
    else {
      if (err) {
        console.log(err.stack)
      } else {
        console.log("All good")
        console.log(res.rows[0].trelloid)
        id = res.rows[0].trelloid;
      }
    }
  });
  
  console.log("Reached till the end");
  resolve(id);
  });
  */
});
}


function getTrelloToken(trelloidInput) 
{
  console.log("Came inside getTrelloToken "+ trelloidInput); 
  return new Promise(function (resolve, reject)
  {
  
  var trelloToken;
  var text= 'SELECT * FROM trelloinfo where trelloid=$1'
  var value = "'"+trelloidInput+"'"
  console.log("What is the input "+ value);
  var values = [trelloidInput]
  client.query(text, values, (err, res) => {
      if (err) {
        console.log(err.stack)
      } else {
        console.log("All good")
        console.log(res.rows.length)
        if(res.rows.length == 0){
          resolve(-1);
        }
        else {
          trelloToken = res.rows[0].token;
          resolve(trelloToken);
        }
      }
  });
  console.log("Reached till the end");
  
  });
}

function getTrelloTokenFromSlackId(slackidInput) 
{
  console.log("Came inside getTrelloTokenFromSlackId "+ slackidInput); 
  return new Promise(function (resolve, reject)
  {
  
  var trelloToken;
  var text= 'SELECT * FROM trelloinfo T, slacktotrello S where S.slackid=$1 AND S.trelloid=T.trelloid '

  var values = [slackidInput]
  client.query(text, values, (err, res) => {
      if (err) {
        console.log(err.stack)
      } else {
        console.log("All good")
        console.log(res.rows.length)
        if(res.rows.length == 0){
          resolve(-1);
        }
        else {
          trelloToken = res.rows[0].token;
          resolve(trelloToken);
        }
      }
  });
  console.log("Reached till the end");
  
  });
}

exports.insertIntoSlackToTrello = insertIntoSlackToTrello;
exports.getTrelloUsername = getTrelloUsername;
exports.getTrelloToken = getTrelloToken;
exports.insertIntoTrelloInfo = insertIntoTrelloInfo;
exports.getTrelloTokenFromSlackId = getTrelloTokenFromSlackId;
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