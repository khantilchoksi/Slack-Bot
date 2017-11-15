var Promise = require("bluebird");
var chai = require("chai");
var expect = chai.expect;
//var nock = require("nock");
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

// var new_storyboard = {
// 	"name" : "Swati2",
// 	"defaultLists" : false
// };
  
// //   var new_list = {
// // 	"name" : "list1",
// // 	"idBoard" : "59eff60e5920e126b94ee55d"
// //   };
  
//   var new_attachment = {
// 	"url" : "https://www.google.com"
//   };

//   var new_card = {
// 	  "name" : "Acceptance Testing",
// 	  "idList" : "59dd74d4b1143f5c19c12589"
//   };

//   var mockService_list = nock("https://api.trello.com")
//   .persist() // This will persist mock interception for lifetime of program.
//   .post("/1/lists", new_list)
//   .reply(200, JSON.stringify(list_data.created_list));


// // Which person is assigned to most to issues?
// var mockService = nock("https://api.trello.com")
// .persist() // This will persist mock interception for lifetime of program.
// .post("/1/boards", new_storyboard)
// .reply(200, JSON.stringify(data.created_storyboard));



// var mockService_card = nock("https://api.trello.com")
// .persist() // This will persist mock interception for lifetime of program.
// .post("/1/cards", new_card)
// .reply(200, JSON.stringify(card_data.created_card));

// var mockService_getLists = nock("https://api.trello.com")
// .persist() // This will persist mock interception for lifetime of program.
// .get("/1/boards/59eff60e5920e126b94ee55d/lists")
// .reply(200, (getList_data.listsFormed));

// var mockService_getCards = nock("https://api.trello.com")
// .persist()
// .get("/1/lists/59dd74d4b1143f5c19c12589/cards")
// .reply(200, (getCards_data));

// //Mock for adding attachments to cards
// var mockService_addAttachments = nock("https://api.trello.com")
// .persist()
// .post("/1/cards/59ef86b92f34dbc457ec4d84/attachments", new_attachment)
// .reply(200, JSON.stringify(cardAttachment_data.card_attachment));


var scrum_lists = ['Done', 'Current Sprint', 'In progress', 'QA', 'On Hold', 'Next-Up']
var waterfall_lists = ['Requirements', 'Design', 'Implementation', 'Verification', 'Maintenance']

var current_boardId;

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
			current_boardId = created_storyboard.id;
			
			resolve(created_storyboard);
		});
	});
	var list_promises = [promise1];
	return promise1.then(function(result){
		
		listArray.forEach(function(listName) {
			var promise = createNewListWithTemplateCards(listName.name);
			list_promises.push(promise);
		});
		return Promise.all(list_promises);
	});
	
	//return promise1;
	/*
	return promise1.then(function(result){
		resolve(result);
	});
	*/
	console.log(" MAIN JS 86 Did you come here");
	

}

function getNewList(listName, storyBoardId)
{
    return new Promise(function (resolve, reject) 
	{
		// mock data needs .
		console.log(" This is my story board id: "+current_boardId);
		var new_list = {
			"name" : listName,
			"idBoard" : storyBoardId
	   };

		trello.createNewList(new_list).then(function (created_list) 
		{
            console.log("Is this json");
			console.log(created_list);
			// created list comes as array
			
			resolve(created_list);
		});
	});
}

function createNewListWithTemplateCards(listName)
{
		// mock data needs .
		//console.log(" This is my story board id: "+current_boardId);
		console.log("\n MAIN JS: createNewListWithTemplateCards FUNCITON CALL");
		var new_list = {
			"name" : listName,
			"idBoard" : current_boardId
	   };
	   var generatedListID;
	   var promise2 =  new Promise(function (resolve, reject) 
	   {
		trello.createNewList(new_list).then(function (created_list) 
		{
			console.log(created_list);
			// created list comes as array
			generatedListID = created_list.id;
			resolve(created_list.id);
		});
	});
	var cardsArray;
	switch(listName){
		case "Story": 
			cardsArray = menu.listOfStoryCards();
			break;
		case "To_Do":
			cardsArray = menu.listOfToDoCards();
			break;
		case "In_Progress":
			cardsArray = menu.listOfInProgressCards();
			break;
		case "To_Verify":
			cardsArray = menu.listOfToVerifyCards();
			break;
		case "Done":
			cardsArray = menu.listOfDoneCards();
			break;
		case "Requirements": 
			cardsArray = menu.listOfRequirementsCards();
			break;
		case "Design":
			cardsArray = menu.listOfDesignCards();
			break;
		case "Implementation":
			cardsArray = menu.listOfImplementationCards();
			break;
		case "Verification":
			cardsArray = menu.listOfVerificationCards();
			break;
		case "Maintenance":
			cardsArray = menu.listOfMaintenanceCards();
			break;
	}
	
	var list_promises2 = [promise2];
	return promise2.then(function(result){
		
		cardsArray.forEach(function(cardName) {
			console.log("cardNAME: "+cardName.name);
			var promise = getNewCard(cardName.name, generatedListID);
			list_promises2.push(promise);
		});
		return Promise.all(list_promises2);
	});
	

}

function getNewCard(card_name, listId) {
	return new Promise(function (resolve, reject) 
	{
		trello.createNewCard(card_name, listId).then(function (created_card) 
		{
            console.log("MAIN JS: getNewCard");
            //console.log(created_card);
			resolve(created_card.id);
		});
	});

}

function addAttachment(cardId,new_attachment) {
	return new Promise(function (resolve, reject)
	{
		trello.addAttachment(cardId, new_attachment.url).then(function (posted_attachment) 
		{
			resolve(posted_attachment.url);
		});

	});
}

function addDueDate(cardId,dueDate) {
	return new Promise(function (resolve, reject)
	{
		trello.addDueDate(cardId, dueDate).then(function (updated_card) 
		{
			resolve(updated_card.due);
		});

	});
}

function addLabel(cardId, color, labelName) {
	return new Promise(function (resolve, reject)
	{
		trello.addLabel(cardId, color, labelName).then(function (updated_card) 
		{
			resolve(updated_card.name);
		});
	});
}

function archiveCard(cardId) {
	return new Promise(function (resolve, reject)
	{
		trello.archiveCard(cardId).then(function (updated_card) 
		{
			resolve(updated_card.url);
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
			console.log("Common Board id "+ boardId)
			//listsArray = JSON.parse(listsArray);
            listsArray.forEach(function(item) {
				console.log(" MAIN.JS GETLISTS IN BOARD ID : "+item.id);
				console.log(" MAIN.JS GETLISTS IN BOARD NAME : "+item.name);
				listMap.set(item.id, item.name);
			});
			resolve(listMap);
		});
	});

}

function getBoardsOfMember() {
	var listMap =  new HashMap();
	return new Promise(function (resolve, reject) 
	{
		// mock data needs .
		trello.retrieveBoards().then(function (listsArray) 
		{
			//listsArray = JSON.parse(listsArray);
            listsArray.forEach(function(item) {
				console.log(" MAIN.JS  getBoardsOfMemberGOT BOARD ID : "+item.id);
				console.log(" MAIN.JS  getBoardsOfMember GOT BOARD NAME : "+item.name);
				listMap.set(item.id, item.name);	//key, value
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
		//current_listId = "59dd74d4b1143f5c19c12589"
		trello.retrieveCards(listId).then(function (cardsArray) 
		{
			//console.log("CARDARRAYS: : "+cardsArray);
			//console.log(" TYPE OF : "+typeof cardsArray);
			//cardsArray = JSON.parse(cardsArray);
            cardsArray.forEach(function(card) {
				Cards.set(card.id, card.name);
				console.log("#$ MAIN JS: Card ID: "+card.id);
				console.log("#$ MAIN JS: Card Name: "+card.name);
			});
			resolve(Cards);
		});
	});
}


function copyListsToBoard(fromBoardId, toBoardId)
{
	return new Promise(function (resolve, reject) 
	{
		trello.retrieveLists(fromBoardId).then(function(listsArray){
		
		listsArray.forEach(function(item) {
				var new_list = {
					"name" : item.name,
					"idBoard" : toBoardId
			   };
			   trello.createNewList(new_list).then(function (created_list) 
			   {
				   // created list comes as array
				   console.log("\n\n\n CREATED COPIED LIST: "+item.name+" with created_list.url: "+created_list.url);
				   resolve(created_list.id);
			   });
		});
	});
});
	

}



exports.getNewStoryBoard = getNewStoryBoard;
exports.getNewList = getNewList;
exports.getNewCard = getNewCard;
exports.getListsInBoard = getListsInBoard;
exports.getCardsInList = getCardsInList;
exports.addAttachment = addAttachment;
exports.addDueDate = addDueDate;
exports.addLabel = addLabel;
exports.getBoardsOfMember = getBoardsOfMember;
exports.copyListsToBoard = copyListsToBoard;
exports.archiveCard = archiveCard;