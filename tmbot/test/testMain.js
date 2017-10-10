var chai = require("chai");
var expect = chai.expect;
var nock = require("nock");

var main = require("../main.js");

// Load mock data
var data = require("../mock.json")

var new_storyboard = {
  "name" : "Scrum"
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
          console.log("In test main , checking results");
          console.log(results);
          expect(results).to.equal("https://trello.com/b/zGA35tkV/scrum");
          console.log("test main result");
          
        });
    });

});
/*
var http = require("http");

var api = nock("http://javascriptplayground.com")
          .get("/test/")
          .reply(200, "Hello World");

describe('testTry', function(){
http.get("http://javascriptplayground.com/test/", function(resp) {
  var str = "";
  resp.on("data", function(data) { str += data; });
  resp.on("end", function() {
    console.log("Got Result: ", resp);
  });
  */
});