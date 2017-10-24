// Import express and request modules
var express = require('express');
var request = require('request');
var Botkit = require('botkit');
var Promise = require("bluebird");
var main = require('./main.js');
var chai = require("chai");
var expect = chai.expect;

// Store our app's ID and Secret. These we got from Step 1. 
// For this tutorial, we'll keep your API credentials right here. But for an actual app, you'll want to  store them securely in environment variables. 
var clientid = '242175471667.260972372135';
var clientsecret = 'bc75f2893363d5aeb5b178c1b68c9ac1';

// Instantiates Express and assigns our app variable to it
var app = express();
// Again, we define a port we want to listen to
const PORT=4390;
var controller = Botkit.slackbot({
    debug: false
    //include "log: false" to disable logging
    //or a "logLevel" integer from 0 to 7 to adjust logging verbosity
  }).configureSlackApp(
    {
      clientId: clientid,
      clientSecret: clientsecret,
      scopes: ['bot'],
    }
  );
controller.spawn({
    token: "xoxb-259926960994-cv6gxdFR7woDT6VkGrvDzphp",
    // incoming_webhook: {
    //     url: my_webhook_url
    //   }
}).startRTM()

// controller.setupWebserver(4390,function(err,webserver) {
//     controller.createWebhookEndpoints(controller.webserver);
  
//     controller.createOauthEndpoints(controller.webserver,function(err,req,res) {
//       if (err) {
//         res.status(500).send('ERROR: ' + err);
//       } else {
//         res.send('Success!');
//       }
//     });
//   });

controller.hears('task',['mention', 'direct_mention','direct_message'], function(bot,message) 
{
  console.log(message);
  //bot.reply(message,"Wow! You want to work on Task management with me. Awesome!");

  var mg = {
    "text": "This is your first interactive message",
    "attachments": [
        {
            "text": "Building buttons is easy right?",
            "fallback": "Shame... buttons aren't supported in this land",
            "callback_id": "button_tutorial",
            "color": "#3AA3E3",
            "attachment_type": "default",
            "actions": [
                {
                    "name": "yes",
                    "text": "yes",
                    "type": "button",
                    "value": "yes"
                },
                {
                    "name": "no",
                    "text": "no",
                    "type": "button",
                    "value": "no"
                },
                {
                    "name": "maybe",
                    "text": "maybe",
                    "type": "button",
                    "value": "maybe",
                    "style": "danger"
                }
            ]
        }
    ]
};

bot.reply(message,mg);
//bot.app.send(mg);

//sendMessageToSlackResponseURL(responseURL, message);
});

// controller.on('button_tutorial', ['mention', 'direct_mention','direct_message'], function(bot, message) {
//     console.log("interactive messgae callback");
//     // check message.actions and message.callback_id to see what action to take...

//     bot.replyInteractive(message, {
//         text: '...',
//         attachments: [
//             {
//                 title: 'My buttons',
//                 callback_id: 'btn_callback',
//                 attachment_type: 'default',
//                 actions: [
//                     {
//                         "name":"yes",
//                         "text": "Yes!",
//                         "value": "yes",
//                         "type": "button",
//                     },
//                     {
//                        "text": "No!",
//                         "name": "no",
//                         "value": "delete",
//                         "style": "danger",
//                         "type": "button",
//                         "confirm": {
//                           "title": "Are you sure?",
//                           "text": "This will do something!",
//                           "ok_text": "Yes",
//                           "dismiss_text": "No"
//                         }
//                     }
//                 ]
//             }
//         ]
//     });

// });

controller.hears('template',['mention', 'direct_mention','direct_message'], function(bot,message) 
{
  console.log("RECEIVED MESSAGE: "+message.text);
  //Calling 
  var storyboardlink = '';
  var boardName= "Scrum";
  var list_lists = ['list1'];
  
  main.getNewStoryBoard(list_lists, boardName).then(function(results){
    
    storyboardlink = results[0];
    console.log('In here!!! '+storyboardlink);
    
    bot.reply(message,{
      "text": "Khantil following are templates of storyboards:",
      "attachments": [
          {
              "title": storyboardlink,
              "text": "Select one template from the dropdown: "
          },

      
      
          {
              "callback": "Would you like to add more lists?",
              "title": "Would you like to add more lists in this template?",
              "callback_id": "btn_callback",
              "color": "#CBCFF1",
              "attachment_type": "default",
              "actions": [
                  {
                      "name": "recommend",
                      "text": "Yes",
                      "type": "button",
                      "value": "yes"
                  },
                  {
                      "name": "no",
                      "text": "No",
                      "type": "button",
                      "value": "bad"
                  }
              ]
          }
      ]
  });


  });
});



//Lets start our server
app.listen(PORT, function () {
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Taskbot app listening on port " + PORT);
});


// This route handles GET requests to our root ngrok address and responds with the same "Ngrok is working message" we used before
app.get('/', function(req, res) {
    console.log("APP GET");
    res.send('Task bot Ngrok is working! Path Hit: ' + req.url);
});

// This route handles get request to a /oauth endpoint. We'll use this endpoint for handling the logic of the Slack oAuth process behind our app.
app.get('/oauth', function(req, res) {
    // When a user authorizes an app, a code query parameter is passed on the oAuth endpoint. If that code is not there, we respond with an error message
    if (!req.query.code) {
        res.status(500);
        res.send({"Error": "Looks like we're not getting code."});
        console.log("Looks like we're not getting code.");
    } else {
        // If it's there...
        console.log("oatuh");
        // We'll do a GET call to Slack's `oauth.access` endpoint, passing our app's client ID, client secret, and the code we just got as query parameters.
        request({
            url: 'https://slack.com/api/oauth.access', //URL to hit
            qs: {code: req.query.code, client_id: clientId, client_secret: clientSecret}, //Query string data
            method: 'GET', //Specify the method

        }, function (error, response, body) {
            if (error) {
                console.log(error);
            } else {
                res.json(body);

            }
        })
    }
});

// Route the endpoint that our slash command will point to and send back a simple response to indicate that ngrok is working
app.post('/command', function(req, res) {
    console.log("/command");
    res.send({
        "text": "Would you like to play a game?",
        "attachments": [
            {
                "text": "Choose a game to play",
                "fallback": "You are unable to choose a game",
                "callback_id": "wopr_game",
                "color": "#3AA3E3",
                "attachment_type": "default",
                "actions": [
                    {
                        "name": "game",
                        "text": "Chess",
                        "type": "button",
                        "value": "chess"
                    },
                    {
                        "name": "game",
                        "text": "Falken's Maze",
                        "type": "button",
                        "value": "maze"
                    },
                    {
                        "name": "game",
                        "text": "Thermonuclear War",
                        "style": "danger",
                        "type": "button",
                        "value": "war",
                        "confirm": {
                            "title": "Are you sure?",
                            "text": "Wouldn't you prefer a good game of chess?",
                            "ok_text": "Yes",
                            "dismiss_text": "No"
                        }
                    }
                ]
            }
        ]
    });
});


app.post('/slack/actions', function(req, res) {
    console.log("************ Received Message Action: "+req.payload+"/n");
    req.on('message', (payload, bot) => { 
        console.log("SLACK ON and ON: ", payload.callback_id);
    });
    res.send('Thank you for responding message button.');
    // var actionJSONPayload = JSON.parse(req.body.payload) // parse URL-encoded payload JSON string
    // console.log("received json: "+actionJSONPayload);
    // var message = {
    //     "text": actionJSONPayload.user.name+" clicked: "+actionJSONPayload.actions[0].name,
    //     "replace_original": false
    // }
    // sendMessageToSlackResponseURL(actionJSONPayload.response_url,message);
});

// app.post('/slack/message_action', function(req, res) {
//     console.log("Received Message Action: "+req+"/n");
//     res.send('Thank you for responding message button.');
// });

// app.post('/slack/receive', function(req, res) {
//     console.log("Received Message Action: "+req+"/n");
//     res.send('Thank you for responding.');
// });

// function sendMessageToSlackResponseURL(responseURL, JSONmessage){
//     var postOptions = {
//         uri: responseURL,
//         method: 'POST',
//         headers: {
//             'Content-type': 'application/json'
//         },
//         json: JSONmessage
//     }
//     request(postOptions, (error, response, body) => {
//         if (error){
//             // handle errors as you see fit
//         }
//     })
// }