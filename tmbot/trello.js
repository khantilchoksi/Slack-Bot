var Promise = require("bluebird");
var _ = require("underscore");
var request = require("request");
var querystring = require('querystring');
var Trello = require("node-trello");
var pgUrl = require('pg-database-url')
var pg = require('pg');

require('dotenv').config();
//var token = process.env.TRELLO_TOKEN;
var urlRoot = "https://api.trello.com";
var key = process.env.TRELLO_KEY;
var t ;
/*


function trialDatabaseConnection() 
{
	
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
   
   // client.query("CREATE TABLE IF NOT EXISTS emps(firstname varchar(64), lastname varchar(64))");
   client.query("INSERT INTO slacktotrello(slackid, trelloid) values($1, $2)", ['swatijh', 'swati378']);
   // client.query("INSERT INTO emps(firstname, lastname) values($1, $2)", ['Mayor', 'McCheese']);
   
   var query = client.query("SELECT * FROM slacktotrello");
//    query.on("row", function (row, result) {
// 	   result.addRow(row);
//    });
//    query.on("end", function (result) {
// 	   console.log(JSON.stringify(result.rows, null, "    "));
// 	   client.end();
//    });
}
*/


function createNewStoryBoard(boardName, trelloToken)
{
	console.log("Token recvd in create new storyboard :"+ trelloToken + " key: "+ key );
	
	return new Promise(function (resolve, reject) 
	{
		t = new Trello(key, trelloToken);
		t.post("/1/boards/", {
			"name" : boardName,
			"defaultLists" : false,
			"prefs_permissionLevel" : "public" 
		}, function (error, response) {
			if (error) throw new Error(error);
            console.log("Inside trello.js! KHANTIL NEW BOARD API CALL");
			console.log("Received URL in API response: "+response.url);	
			resolve(response);
		});
	});
}

function createNewList(new_list,  trelloToken)
{
	return new Promise(function (resolve, reject) 
	{
		t = new Trello(key, trelloToken);
		t.post("/1/lists", new_list, function (error, response) {
			if (error) throw new Error(error);
            console.log("Inside trello.js! KHANTIL NEW LISTTTT API CALL");
			console.log("Received LIST ID in API response: "+response.id);	
			resolve(response);
		});
	});
}

function createNewCard(card_name, listId,  trelloToken)
{
	console.log("In createNewCard card_name, list_id, trelloToken "+ card_name + " "+ listId + " "+ trelloToken);
	t = new Trello(key, trelloToken);
	return new Promise(function (resolve, reject) 
	{
		t.post("/1/cards/", {
			"name" : card_name,
			"idList" : listId
		}, function (error, response) {
			if (error) throw new Error(error);
            console.log("Testing actual new card api call");
			console.log("NEW CARD: "+response.id);	//response is json
			
			resolve(response);

		});
	});
}

function retrieveLists(boardId,  trelloToken)
{
	t = new Trello(key, trelloToken);
	
    return new Promise(function (resolve, reject) 
    {
        t.get("/1/boards/"+ boardId+"/lists", function (error, response) {
            if (error) throw new Error(error);
           console.log("Testing retrieving of lists");
           console.log("RETRIEVE LIST: "+response.body);    //response is json
            
            resolve(response);
        });
    });
}
function retrieveCards(listId,  trelloToken)
{
	
	return new Promise(function (resolve, reject) 
	{
		t = new Trello(key, trelloToken);

		t.get("/1/lists/"+ listId+"/cards", function (error, response) {
            if (error) throw new Error(error);
           console.log("Testing retrieving of cards");
           console.log("RETRIEVE CARDS: "+response.body);    //response is json
            
            resolve(response);
        });
	});
}

function retrieveBoards( trelloToken)
{
    return new Promise(function (resolve, reject) 
    {
		t = new Trello(key, trelloToken);
    	t.get("/1/members/" + process.env.TRELLO_MEMBERID+ "/boards", function (error, body) {
            if (error) throw new Error(error);
            resolve(body);
        });
    });
}


function addAttachment(cardId, url,  trelloToken)
{
	t = new Trello(key, trelloToken);
	var new_attachment = {
		"url" : url
	  };

	var options = {
        url: urlRoot + "/1/cards/" + cardId + "/attachments",
		method: 'POST',
		json: new_attachment,
		headers: {
			"content-type": "application/json",
			"Authorization": token
		}
	};
	return new Promise(function (resolve, reject) 
    {
    	console.log("URL: " + url + " type: " + typeof url);
    	t.post("/1/cards/" + cardId+ "/attachments", {"url": url},function (error, body) {
            if (error) throw new Error(error);
            resolve(body);

        });
    });
}

function addDueDate(cardId, dueDate,  trelloToken)
{
	
	return new Promise(function (resolve, reject) 
    {
		t = new Trello(key, trelloToken);
    	console.log("Incoming due date : "+ dueDate);
    	t.put("/1/cards/" + cardId, {"due": dueDate},function (error, body) {
            if (error) throw new Error(error);
            resolve(body);

        });
    });
}

function addLabel(cardId, color, labelName,  trelloToken)
{
	
	return new Promise(function (resolve, reject) 
    {
		t = new Trello(key, trelloToken);
    	console.log("Incoming color : "+ color);
    	t.post("/1/cards/"+cardId+"/labels", {"color": color, "name": labelName},function (error, body) {
            if (error) throw new Error(error);
            resolve(body);

        });
    });
}

function archiveCard(cardId, trelloToken)
{
	
	return new Promise(function (resolve, reject) 
    {
		t = new Trello(key, trelloToken);
    	
    	t.put("/1/cards/"+cardId, {"closed": true},function (error, body) {
            if (error) throw new Error(error);
            resolve(body);

        });
    });
}



exports.createNewStoryBoard = createNewStoryBoard;
exports.createNewList = createNewList;
exports.createNewCard = createNewCard;
exports.retrieveLists = retrieveLists;
exports.retrieveCards = retrieveCards;
exports.addAttachment = addAttachment;
exports.addDueDate = addDueDate;
exports.addLabel = addLabel;
exports.retrieveBoards = retrieveBoards;
exports.archiveCard = archiveCard;
