var Promise = require("bluebird");
var _ = require("underscore");
var request = require("request");
var querystring = require('querystring');
var Trello = require("node-trello");

require('dotenv').config();
var token = process.env.TRELLO_TOKEN;
var urlRoot = "https://api.trello.com";
var key = process.env.TRELLO_KEY;
var t = new Trello(key, token);

function createNewStoryBoard(boardName)
{

	return new Promise(function (resolve, reject) 
	{

		t.post("/1/boards/", {
			"name" : boardName,
			"defaultLists" : false
		}, function (error, response) {
			if (error) throw new Error(error);
            console.log("Inside trello.js! KHANTIL NEW BOARD API CALL");
			console.log("Received URL in API response: "+response.url);	
			resolve(response);
		});
	});
}

function createNewList(new_list)
{
	return new Promise(function (resolve, reject) 
	{

		t.post("/1/lists", new_list, function (error, response) {
			if (error) throw new Error(error);
            console.log("Inside trello.js! KHANTIL NEW LISTTTT API CALL");
			console.log("Received LIST ID in API response: "+response.id);	
			resolve(response);
		});
	});
}

function createNewCard(card_name, listId)
{

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

function retrieveLists(boardId)
{
	console.log(" TRELLO.JS RETRIEVE LISTS: "+boardId);
    return new Promise(function (resolve, reject) 
    {
        t.get("/1/boards/"+ boardId+"/lists", function (error, response) {
            if (error) throw new Error(error);
           console.log("Testing retrieving of lists");
           //console.log("RETRIEVE LIST: "+response.body);    //response is json
			
		   response.forEach(function(item) {
				console.log(" TRELLO.JS GETLISTS IN LIST ID : "+item.id);
				console.log(" TRELO.JS GETLISTS IN LIST NAME : "+item.name);
			//listMap.set(item.id, item.name);
		});
            resolve(response);
        });
    });
}

function retrieveCards(listId)
{
	return new Promise(function (resolve, reject) 
	{

		t.get("/1/lists/"+ listId+"/cards", function (error, response) {
            if (error) throw new Error(error);
           console.log("Testing retrieving of cards");
           console.log("RETRIEVE CARDS: "+response.body);    //response is json
            
            resolve(response);
        });
	});
}


function addAttachment(cardId, url)
{
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
		// Send a http request to url and specify a callback that will be called upon its return.
		request(options, function (error, response, body) 
		{
			//var obj = JSON.parse(body);
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