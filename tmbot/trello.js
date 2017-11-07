var Promise = require("bluebird");
var _ = require("underscore");
var request = require("request");
var querystring = require('querystring');
var Trello = require("node-trello");


var token = "5f6d7526fca51cca6d79e18b8412bc60b3c8da2655a12851c4d5faae8afaea17";
var urlRoot = "https://api.trello.com";
var key = "c5d47d2c7b79c51013aabda4962f25b9";
var t = new Trello(key, token);

function createNewStoryBoard(boardName)
{

	return new Promise(function (resolve, reject) 
	{

		t.post("/1/boards/", {
			"name" : boardName
		}, function (error, response, body) {
			if (error) throw new Error(error);
            console.log("Inside trello.js! KHANTIL NEW BOARD API CALL");
            console.log("HELLO HELLO: "+body);
			var obj = JSON.parse(body);
			console.log("OBJECT: JSON NEW BOARD API CALL: "+obj);
			resolve(body);

		});
	});
}

function createNewList(new_list)
{

	//making fool
	//please remove this when we do original api call
	// var new_list = {
	// 	"name" : "list1",
	// 	"idBoard" : "59eff60e5920e126b94ee55d"
	//   };

	var options = {
        url: urlRoot + "/1/lists",
        method: 'POST',
        qs: new_list,
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
            console.log("Inside create new list");
            console.log(body);
			//var obj = JSON.parse(body);
            resolve(body);
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
	var options = {
        url: urlRoot + "/1/boards/"+ boardId+"/lists",
        method: 'GET',
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
            //console.log("retrieveLists API CALL: ");
            //console.log(body);
			//var obj = JSON.parse(body);
            resolve(body);
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
		// Send a http request to url and specify a callback that will be called upon its return.
		request(options, function (error, response, body) 
		{
            //console.log("retrieveCards API CALL: ");
            //console.log(body);
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