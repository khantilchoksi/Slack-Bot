var Promise = require("bluebird");
var _ = require("underscore");
var request = require("request");
var querystring = require('querystring');
var Trello = require("node-trello");

require('dotenv').config();
//var token = process.env.TRELLO_TOKEN;
var token = '758d909df10f258875ce8c294d90b288553ec3c2d6e1ad408b8be1cb2987f9b3'
var urlRoot = "https://api.trello.com";
//var key = process.env.TRELLO_KEY;
var key = '48668aeb414389d2719b4b0c56183d96'
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
	/*
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
   */
	return new Promise(function (resolve, reject) 
	{
		t.post("/1/cards/", {
			"name" : card_name,
			"idList" : listId
		}, function (error, response) {
			if (error) throw new Error(error);
            console.log("Testing actual new card api call");
			console.log("NEW CARD: "+response.body);	//response is json
			
			resolve(response);

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
    	console.log("URL: " + url + " type: " + typeof url);
    	t.post("/1/cards/" + cardId+ "/attachments", {"url": url},function (error, body) {
            if (error) throw new Error(error);
            resolve(body);

        });
    });
}

function addDueDate(cardId, dueDate)
{
	
	return new Promise(function (resolve, reject) 
    {
    	console.log("Incoming due date : "+ dueDate);
    	t.put("/1/cards/" + cardId, {"due": dueDate},function (error, body) {
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