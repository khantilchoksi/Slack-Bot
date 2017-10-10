var Promise = require("bluebird");
var chai = require("chai");
var expect = chai.expect;
var nock = require("nock");
var _ = require("underscore");
//var data = require("mock.json")
var trello = require("./trello.js");


// Which person is assigned to most to issues?

function getNewStoryBoard()
{
	return new Promise(function (resolve, reject) 
	{
		// mock data needs .
		trello.createNewStoryBoard().then(function (created_storyboard) 
		{
            //var storyboard_url = _.pluck(created_storyboard,"url");
            console.log("Is this json");
            console.log(created_storyboard.url);
			resolve(created_storyboard.url);
		});
	});
}

exports.getNewStoryBoard = getNewStoryBoard;
