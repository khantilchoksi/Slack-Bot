var Promise = require("bluebird");
var _ = require("underscore");
var request = require("request");
var querystring = require('querystring');
var Trello = require("node-trello");
var t = new Trello("b34dabae973dea4150fb7fce14970aae", "a8130dacb252bd4b897219a939febb3fc42b76e51634831dae8ad3858ab4d5c7");

var token = "token " + "a8130dacb252bd4b897219a939febb3fc42b76e51634831dae8ad3858ab4d5c7";
var key = "b34dabae973dea4150fb7fce14970aae";
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

function retreiveLists(boardId)
{
    return new Promise(function (resolve, reject) 
    {
    	t.get("/1/boards/" + boardId+ "/lists", function (error, body) {
            if (error) throw new Error(error);
            resolve(body);

        });
    });
}

function retreiveCards(listId)
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
exports.retreiveLists = retreiveLists;
exports.retreiveCards = retreiveCards;
exports.addAttachment = addAttachment;