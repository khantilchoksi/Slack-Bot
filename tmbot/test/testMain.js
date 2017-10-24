var chai = require("chai");
var expect = chai.expect;
var nock = require("nock");

var main = require("../main.js");

// Load mock data
var data = require("../mock.json")
var list_data = require("../list_mock.json")
var card_data = require("../card_mock.json")

var new_storyboard = {
  "name" : "Scrum"
};

var new_list = {
	"name" : "list2",
	"idBoard" : "899698658"
  };

var new_card = {
	  "name" : "Acceptance Testing",
	  "idList" : "59dd74d4b1143f5c19c12589"
  };

///////////////////////////
// TEST SUITE FOR MOCHA
///////////////////////////

describe('testMain', function(){

  // MOCK SERVICE
    var mockService = nock("https://api.trello.com")
    .persist() // This will persist mock interception for lifetime of program.
    .post("/1/boards", new_storyboard)
    .reply(200, JSON.stringify(data.created_storyboard));

    listArray= ['testList1'];

    
  
    console.log("Is mock data coming");
    console.log(JSON.stringify(data.created_storyboard));
    describe('#getNewStoryBoard()', function(){
    // TEST CASE
   	it('should return valid storyboard url', function() {
        return main.getNewStoryBoard(listArray, "Scrum" ).then(function (results) 
        {
          //expect(results) be actually array of promises.
          //first promise has the storyboard promise
          
          expect(results[0]).to.equal("https://trello.com/b/zGA35tkV/scrum");
          console.log("test main result");
          
        });
    });


    describe('#getNewList()', function(){
      // TEST CASE
      var mockService_list = nock("https://api.trello.com")
      .persist() // This will persist mock interception for lifetime of program.
      .post("/1/lists", new_list)
      .reply(200, JSON.stringify(list_data.created_list));
      var boardId = "9435uiwhf";
       it('should return valid list id', function() {
          return main.getNewList("list1", boardId).then(function (results) 
          {
            //expect(results).to.have.property("url");
            console.log("In test main , checking results");
            console.log(results);
            expect(results).to.equal("59dd74d4b1143f5c19c12589");
            console.log("test main result");
            
          });
      });
    });

    describe('#getNewCard()', function(){
      // TEST CASE
      var mockService_card = nock("https://api.trello.com")
      .persist() // This will persist mock interception for lifetime of program.
      .post("/1/cards", new_card)
      .reply(200, JSON.stringify(card_data.created_card));
      
      var listId = "59dd74d4b1143f5c19c12589";
       it('should return valid card id', function() {
          return main.getNewCard("Acceptance Testing", listId).then(function (results) 
          {
            //expect(results).to.have.property("url");
            console.log("In test main , checking results");
            console.log(results);
            expect(results).to.equal("59ef86b92f34dbc457ec4d84");
            console.log("test main result");
            
          });
      });
    });
});
});
