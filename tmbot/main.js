var Promise = require("bluebird");
var chai = require("chai");
var expect = chai.expect;
var nock = require("nock");
var _ = require("underscore");
var data = require("./mock.json")
var list_data = require("./list_mock.json")
var trello = require("./trello.js");

var new_storyboard = {
	"name" : "Scrum"
  };
  
  var new_list = {
	"name" : "list1",
	"idBoard" : "899698658"
  };
// Which person is assigned to most to issues?
var mockService = nock("https://api.trello.com")
.persist() // This will persist mock interception for lifetime of program.
.post("/1/boards", new_storyboard)
.reply(200, JSON.stringify(data.created_storyboard));

var mockService_list = nock("https://api.trello.com")
.persist() // This will persist mock interception for lifetime of program.
.post("/1/lists", new_list)
.reply(200, JSON.stringify(list_data.created_list));

function getNewStoryBoard(listArray, boardName)
{
	// No need to know the template, the list names determine the template
	var current_boardid = 0;
	
	var promise1 =  new Promise(function (resolve, reject) 
	{
		// mock data needs .
		trello.createNewStoryBoard(boardName).then(function (created_storyboard) 
		{
            //var storyboard_url = _.pluck(created_storyboard,"url");
            console.log("Is this json");
			console.log(created_storyboard.url);
			current_boardid = created_storyboard.id;
			resolve(created_storyboard.url);
		});
	});
	/*
	return promise1.then(function(result){
		resolve(result);
	});
	*/
	console.log("Did you come here");
	// can also chain above promise with .then for the below code
	var list_promises = [promise1];
	//listArray.forEach(function(list) {
		var promise = getNewList("list1","some id" );
		list_promises.push(promise);
	//});
	return Promise.all(list_promises)//.then(values => {
		//console.log(values[0]);
		//Promise.resolve(values);
	//});

}

function getNewList(list_name, boardId)
{
    return new Promise(function (resolve, reject) 
	{
		// mock data needs .
		trello.createNewList(list_name, boardId).then(function (created_list) 
		{
            console.log("Is this json");
            console.log(created_list);
			resolve(created_list.id);
		});
	});

}

exports.getNewStoryBoard = getNewStoryBoard;
exports.getNewList = getNewList;
