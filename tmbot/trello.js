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
			"name" : boardName
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
    var new_card = {
		"name" : card_name,
		"idList" : listId
    };

	var options = {
        url: urlRoot + "/1/cards",
        method: 'POST',
        qs: {
			"name" : card_name,
			"idList" : listId
		},
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
            console.log("Inside create new card");
            console.log(body);
			//var obj = JSON.parse(body);
            resolve(body);
		});
	});
}

function retrieveLists(boardId)
{
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

function retrieveCards(listId)
{
	var options = {
        url: urlRoot + "/1/lists/"+ listId+"/cards",
        method: 'GET',
		headers: {
			"content-type": "application/json",
			"Authorization": token
		}
	};

	return new Promise(function (resolve, reject) 
	{
		// // Send a http request to url and specify a callback that will be called upon its return.
		// request(options, function (error, response, body) 
		// {
        //     //console.log("retrieveCards API CALL: ");
        //     //console.log(body);
        //     resolve(body);
		// });

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