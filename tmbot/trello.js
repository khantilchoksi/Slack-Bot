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
    return new Promise(function (resolve, reject) 
    {
    	t.get("/1/boards/" + boardId+ "/lists", function (error, body) {
            if (error) throw new Error(error);
            resolve(body);

        });
    });
}

function retrieveCards(listId)
{
    return new Promise(function (resolve, reject) 
    {
    	t.get("/1/lists/" + listId+ "/cards", function (error, body) {
            if (error) throw new Error(error);
            resolve(body);

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
    	console.log("URL: " + url + " type: " + typeof url);
    	t.post("/1/cards/" + cardId+ "/attachments", {"url": url},function (error, body) {
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