var Promise = require("bluebird");
var chai = require("chai");
var expect = chai.expect;
var nock = require("nock");
var _ = require("underscore");
var data = require("./mock.json")
var list_data = require("./list_mock.json")
var card_data = require("./card_mock.json")
var trello = require("./trello.js");
var getList_data = require("./createdLists.json")

var new_storyboard = {
	"name" : "Scrum"
  };
  
  var new_list = {
	"name" : "list1",
	"idBoard" : "899698658"
  };

  var new_card = {
	  "name" : "Acceptance Testing",
	  "idList" : "59dd74d4b1143f5c19c12589"
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

var mockService_card = nock("https://api.trello.com")
.persist() // This will persist mock interception for lifetime of program.
.post("/1/cards", new_card)
.reply(200, JSON.stringify(card_data.created_card));

var mockService_getLists = nock("https://api.trello.com")
.persist() // This will persist mock interception for lifetime of program.
.get("/1/boards/59eff60e5920e126b94ee55d/lists")
.reply(200, (getList_data.listsFormed));

var scrum_lists = ['Done', 'Current Sprint', 'In progress', 'QA', 'On Hold', 'Next-Up']
var waterfall_lists = ['Requirements', 'Design', 'Implementation', 'Verification', 'Maintenance']

var current_boardid = "59eff60e5920e126b94ee55d";

function getNewStoryBoard(template_type, boardName)
{
	var listArray;
	if(template_type == "Scrum") {
		listArray = scrum_lists;
	}
	else {
		listArray = waterfall_lists;
	}
	// No need to know the template, the list names determine the template
	
	
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
	listArray.forEach(function(list) {
		var promise = getNewList("list1",current_boardid );
		list_promises.push(promise);
	});
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
			// created list comes as array
			var parsedJson
			resolve(created_list.id);
		});
	});

}

function getNewCard(card_name, listId) {
	return new Promise(function (resolve, reject) 
	{
		// mock data needs .
		trello.createNewCard(card_name, listId).then(function (created_card) 
		{
            console.log("Is this json");
            console.log(created_card);
			resolve(created_card.id);
		});
	});

}


function getListsInBoard(boardId) {
	return new Promise(function (resolve, reject) 
	{
		// mock data needs .
		var sendListsToUser = []
		trello.retrieveLists(card_name, listId).then(function (listsArray) 
		{
            for(var item in listsArray) {
				sendListsToUser.push(item.name)
			}
			resolve(sendListsToUser);
		});
	});

}
exports.getNewStoryBoard = getNewStoryBoard;
exports.getNewList = getNewList;
exports.getNewCard = getNewCard;
exports.getListsInBoard = getListsInBoard;
