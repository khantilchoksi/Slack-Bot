var Promise = require("bluebird");
var _ = require("underscore");
var request = require("request");
var querystring = require('querystring');


var token = "token " + "758d909df10f258875ce8c294d90b288553ec3c2d6e1ad408b8be1cb2987f9b3";
var urlRoot = "https://api.trello.com";

var new_storyboard = {
	"name" : "Swati2",
	"defaultLists" : false
};


function createNewStoryBoard(boardName)
{
	var options = {
        url: urlRoot + "/1/boards",
        method: 'POST',
        json: new_storyboard,
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
            //console.log("Inside trello.js");
            //console.log(body);
			//var obj = JSON.parse(body);
            resolve(body);
		});
	});
}

function createNewList(new_list)
{

	//making fool
	//please remove this when we do original api call
	var new_list = {
		"name" : "list1",
		"idBoard" : "59eff60e5920e126b94ee55d"
	  };

	var options = {
        url: urlRoot + "/1/lists",
        method: 'POST',
        json: new_list,
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
            //console.log("Inside create new list");
            //console.log(body);
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
        json: new_card,
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
            console.log("retrieveLists API CALL: ");
            console.log(body);
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
            console.log("retrieveCards API CALL: ");
            console.log(body);
            resolve(body);
		});
	});
}


function addAttachments(cardId, url)
{
	var new_attachment = {
		"url" : url
	  };
	var options = {
        url: urlRoot + "1/cards/" + cardId + "/attachments",
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
            console.log("Attachment to card: ");
            console.log(body);
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