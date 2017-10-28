var Promise = require("bluebird");
var chai = require("chai");
var expect = chai.expect;
var nock = require("nock");
var _ = require("underscore");
var data = require("./mock.json")
var list_data = require("./list_mock.json")
var card_data = require("./card_mock.json")
var trello = require("./trello.js");
var getList_data = require("./createdLists.json");
var getCards_data = require("./cardsInList.json");
const menu = require("./lib/menu.js");
var HashMap = require('hashmap');
var cardAttachment_data = require('./card_attachment.json')

var new_storyboard = {
	"name" : "Swati2",
	"defaultLists" : false
};
  
  var new_list = {
	"name" : "list1",
	"idBoard" : "59eff60e5920e126b94ee55d"
  };
  
  var new_attachment = {
	"url" : "https://www.google.com"
  };

  var new_card = {
	  "name" : "Acceptance Testing",
	  "idList" : "59dd74d4b1143f5c19c12589"
  };

  var mockService_list = nock("https://api.trello.com")
  .persist() // This will persist mock interception for lifetime of program.
  .post("/1/lists", new_list)
  .reply(200, JSON.stringify(list_data.created_list));


// Which person is assigned to most to issues?
var mockService = nock("https://api.trello.com")
.persist() // This will persist mock interception for lifetime of program.
.post("/1/boards", new_storyboard)
.reply(200, JSON.stringify(data.created_storyboard));



var mockService_card = nock("https://api.trello.com")
.persist() // This will persist mock interception for lifetime of program.
.post("/1/cards", new_card)
.reply(200, JSON.stringify(card_data.created_card));

var mockService_getLists = nock("https://api.trello.com")
.persist() // This will persist mock interception for lifetime of program.
.get("/1/boards/59eff60e5920e126b94ee55d/lists")
.reply(200, (getList_data.listsFormed));

var mockService_getCards = nock("https://api.trello.com")
.persist()
.get("/1/lists/59dd74d4b1143f5c19c12589/cards")
.reply(200, (getCards_data));

//Mock for adding attachments to cards
var mockService_addAttachments = nock("https://api.trello.com")
.persist()
.post("/1/cards/59ef86b92f34dbc457ec4d84/attachments", new_attachment)
.reply(200, JSON.stringify(cardAttachment_data.card_attachment));


var scrum_lists = ['Done', 'Current Sprint', 'In progress', 'QA', 'On Hold', 'Next-Up']
var waterfall_lists = ['Requirements', 'Design', 'Implementation', 'Verification', 'Maintenance']

var current_boardid = "59eff60e5920e126b94ee55d";
var current_board ;

function getNewStoryBoard(template_type, boardName)
{
	console.log(" TEMPLATE TYPE OF SWATI : "+template_type+" BOARD NAME: "+boardName);
	var listArray = menu.listOfScrumLists();
	if(template_type == "Scrum") {
		listArray = menu.listOfScrumLists();
		console.log(" #%$#%$%^$^$ "+listArray[1].name);
	}
	else if(template_type == "Waterfall") { 
		listArray = menu.listOfWaterfallLists();
	}
	// No need to know the template, the list names determine the template
	
	
	var promise1 =  new Promise(function (resolve, reject) 
	{
		// mock data needs .
		trello.createNewStoryBoard(boardName).then(function (created_storyboard) 
		{
            //var storyboard_url = _.pluck(created_storyboard,"url");
            console.log(" MAIN.JS : LINE 75 Is this json");
			console.log(created_storyboard.url);
			current_boardid = created_storyboard.id;
			resolve(created_storyboard);
		});
	});
	//return promise1;
	/*
	return promise1.then(function(result){
		resolve(result);
	});
	*/
	console.log(" MAIN JS 86 Did you come here");
	// can also chain above promise with .then for the below code
	
	var list_promises = [promise1];
	listArray.forEach(function(list) {
		console.log("\n @#$T^$@^%^#%$^ DELETE THIS AFTER CHECK: "+JSON.stringify(list.name));
		var promise = getNewList(list);
		list_promises.push(promise);
	});
	//return Promise.all(list_promises);//.then(values => {
		return promise1;
		//console.log(values[0]);
		//Promise.resolve(values);
	

}

function getNewList(list)
{
    return new Promise(function (resolve, reject) 
	{
		// mock data needs .
		trello.createNewList(list).then(function (created_list) 
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
		listId = "59dd74d4b1143f5c19c12589";
		// mock data needs .
		trello.createNewCard(card_name, listId).then(function (created_card) 
		{
            console.log("Is this json");
            console.log(created_card);
			resolve(created_card.id);
		});
	});

}

function addAttachment(cardId,new_attachment) {
	return new Promise(function (resolve, reject)
	{
		tempCardId = "59ef86b92f34dbc457ec4d84";
		trello.addAttachment(tempCardId, new_attachment.url).then(function (posted_attachment) 
		{
			resolve(posted_attachment.url);
		});

	});
}
function getListsInBoard(boardId) {
	var listMap =  new HashMap();
	return new Promise(function (resolve, reject) 
	{
		// mock data needs .
		trello.retrieveLists(boardId).then(function (listsArray) 
		{
			listsArray = JSON.parse(listsArray);
            listsArray.forEach(function(item) {
				listMap.set(item.id, item.name);
			});
			resolve(listMap);
		});
	});

}

function getCardsInList(listId){
	console.log("getCardsInList entered");
	var Cards = new HashMap();
	return new Promise(function (resolve, reject) 
	{
		// mock data needs .
		current_listId = "59dd74d4b1143f5c19c12589"
		trello.retrieveCards(current_listId).then(function (cardsArray) 
		{
			//console.log("CARDARRAYS: : "+cardsArray);
			//console.log(" TYPE OF : "+typeof cardsArray);
			cardsArray = JSON.parse(cardsArray);
            cardsArray.forEach(function(card) {
				Cards.set(card.id, card.name);
			});
			resolve(Cards);
		});
	});
}

exports.getNewStoryBoard = getNewStoryBoard;
exports.getNewList = getNewList;
exports.getNewCard = getNewCard;
exports.getListsInBoard = getListsInBoard;
exports.getCardsInList = getCardsInList;
exports.addAttachment = addAttachment;