var Promise = require("bluebird");
var _ = require("underscore");
var request = require("request");
var querystring = require('querystring');

var token = "token " + "758d909df10f258875ce8c294d90b288553ec3c2d6e1ad408b8be1cb2987f9b3";
var urlRoot = "https://api.trello.com";

var new_storyboard = {
    "name" : "Scrum"
};

function createNewStoryBoard()
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
            console.log("Inside trello.js");
            console.log(body);
			//var obj = JSON.parse(body);
            resolve(body);
		});
	});
}

exports.createNewStoryBoard = createNewStoryBoard;