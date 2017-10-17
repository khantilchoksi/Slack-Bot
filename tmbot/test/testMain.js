var chai = require("chai");
var expect = chai.expect;
var nock = require("nock");

var main = require("../main.js");

// Load mock data
var data = require("../mock.json")
var list_data = require("../list_mock.json")

var new_storyboard = {
  "name" : "Scrum"
};

var new_list = {
  "name" : "list1"
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
  
    console.log("Is mock data coming");
    console.log(JSON.stringify(data.created_storyboard));
    describe('#getNewStoryBoard()', function(){
    // TEST CASE
   	it('should return valid storyboard url', function() {
        return main.getNewStoryBoard().then(function (results) 
        {
          //expect(results).to.have.property("url");
          console.log("In test main.js , checking results");
          console.log(results);
          expect(results).to.equal("https://trello.com/b/zGA35tkV/scrum");
          console.log("test main result");
          
        });
    });


    describe('#getNewList()', function(){
      // TEST CASE
      var mockService_list = nock("https://api.trello.com")
      .persist() // This will persist mock interception for lifetime of program.
      .post("/1/lists", new_list)
      .reply(200, JSON.stringify(list_data.created_list));
       it('should return valid storyboard url', function() {
          return main.getNewList("list1").then(function (results) 
          {
            //expect(results).to.have.property("url");
            console.log("In test main , checking results");
            console.log(results);
            expect(results).to.have.property("name");
            console.log("test main result");
            
          });
      });
    });
});
});
