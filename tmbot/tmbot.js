// Import express and request modules
var express = require('express');
var request = require('request');
var Botkit = require('botkit');
var Promise = require("bluebird");
var main = require('./main.js');
var chai = require("chai");
var expect = chai.expect;
var HashMap = require('hashmap');
require('dotenv').config();
var trello = require('./trello.js');
// Store our app's ID and Secret. These we got from Step 1.
// For this tutorial, we'll keep your API credentials right here. But for an actual app, you'll want to  store them securely in environment variables.
var clientid = process.env.CLIENT_ID;
var clientsecret = process.env.CLIENT_SECRET;

var persistStoryboardID;
var persistCardID;

const { createMessageAdapter } = require('@slack/interactive-messages');

// Initialize adapter using slack verification token from environment variables
const slackMessages = createMessageAdapter(process.env.SLACK_VERIFICATION_TOKEN);

// Attach action handlers by `callback_id`
// (See: https://api.slack.com/docs/interactive-message-field-guide#attachment_fields)
slackMessages.action('button_tutorial', (payload,bot) => {
 // `payload` is JSON that describes an interaction with a message.
 console.log(`The user ${payload.user.name} in team ${payload.team.domain} pressed the welcome button`);

 console.log('******* PAYLOAD : ', payload);
 // The `actions` array contains details about the specific action (button press, menu selection, etc.)
 const action = payload.actions[0];
 console.log(`The button had name ${action.name} and value ${action.value}`);

 // You should return a JSON object which describes a message to replace the original.
 // Note that the payload contains a copy of the original message (`payload.original_message`).

 //const updatedMessage = acknowledgeActionFromMessage(payload.original_message, 'button_tutorial',
 //'I\'m getting an order started for you.');

 var ackText = `You have selected ${action.value}`;
 var replacement = payload.original_message;
 // Typically, you want to acknowledge the action and remove the interactive elements from the message

 //replacement.text =`Welcome ${payload.user.name}`;


 // Start an order, and when that completes, send another message to the user.
//  bot.startOrder(payload.user.id)
//  .then(respond)
//  .catch(console.error);

replacement.attachments[0].text = `:white_check_mark: ${ackText}`;
delete replacement.attachments[0].actions;
 return replacement;
});


slackMessages.action('template_selection_callback', (payload,bot) => {
    // `payload` is JSON that describes an interaction with a message.
    console.log(`The user ${payload.user.name} in team ${payload.team.domain} pressed the welcome button`);

    console.log('******* Template PAYLOAD : ', payload);
    // The `actions` array contains details about the specific action (button press, menu selection, etc.)
    const action = payload.actions[0];

    // You should return a JSON object which describes a message to replace the original.
    // Note that the payload contains a copy of the original message (`payload.original_message`).

    //const updatedMessage = acknowledgeActionFromMessage(payload.original_message, 'button_tutorial',
    //'I\'m getting an order started for you.');
    var selected_options = action.selected_options[0];
   console.log("Selected options: ",JSON.stringify(selected_options));
   //console.log(`The dropdown menu had name ${action.name} and value ${action.value}`);
    var ackText = `You have selected ${selected_options.value} board.`;
    const replacement = payload.original_message;
    // Typically, you want to acknowledge the action and remove the interactive elements from the message

    //attachment.text =`Welcome ${payload.user.name}`;
    var createdListsNames;
    // Start an order, and when that completes, send another message to the user.
    main.getNewStoryBoard(selected_options.value, "Nov12Board")
    .then((response) => {
      // Keep the context from the updated message but use the new text and attachment
      var storyboardlink = response[0].url;
      console.log(" Received Storyboard link: "+storyboardlink);

      console.log(" ********** Received Storyboard ID: "+response[0].id);
      persistStoryboardID = response[0].id;
      
      ackText = `Your story board is created and here is the link: ${storyboardlink} and board id : ${persistStoryboardID}.`;

        return persistStoryboardID;
        //return ackText;
    }).then((persistStoryboardID) => {
        main.getListsInBoard(persistStoryboardID)
        .then((responseLists) => {
            console.log(" LINE 96");
            createdListsNames = responseLists.values();
            createdListsIds = responseLists.keys();
            console.log(" LINE 98");

            var map = new HashMap();

            console.log("** Attachement: "+JSON.stringify(replacement.attachments[0]));
            replacement.attachments[0].text = `:white_check_mark:  ${ackText}`;
            delete replacement.attachments[0].actions;


            var lists = `I have created board with ${createdListsNames} lists.`;
            var listsAttach =
              {
                  "text": lists,
                  "color": "#FF5733"
              };
              replacement.attachments.push(listsAttach);
                var mylist = [];

            responseLists.forEach(function(value, key){

              var cards = main.getCardsInList(key).then(function(cardsMap) {
                  //cardsArray = JSON.parse(cardsArray);
                  console.log("\n ## CARDS ARRAY for");
                  var cardNames = [];
                  cardsMap.forEach(function(value, key) {
                      console.log( "CARD NAME: "+value+" CARD ID: "+key);
                      cardNames.push(value);
                  });

                  var listcard = `I have created ${cardNames} cards in ${value} list.`;
                  console.log( "LIST CARDs: "+listcard);
                  var listcards =
                    {
                        "text": listcard,
                        "color": "#FFE400"
                    };
                    
                    //replacement.attachments.push(listcards);
                    return listcards; 
              });
              
              console.log(" mylist.push(cards) for cards: "+cards);
              mylist.push(cards);
            });
            console.log(" 149 mylist.push(cards) for cards: ");
            return Promise.all(mylist);
            }).then((listlist) => {
                listlist.forEach(function(entry){
                    replacement.attachments.push(entry);
                });
                
                return replacement;
            }).then(bot);

            
        });
    });
//.then(bot);

//     console.log("\n At line 116 ***************");

//     return replacement;
//    });

//Use Case 1 : Copy lists from one board to another board
slackMessages.action('boards_lists_callback', (payload,bot) => {
    // `payload` is JSON that describes an interaction with a message.
    //console.log(`The user ${payload.user.name} in team ${payload.team.domain} pressed the welcome button`);
   
    //console.log('******* LIST PAYLOAD : ', payload);
    // The `actions` array contains details about the specific action (button press, menu selection, etc.)
    const action = payload.actions[0];

    var selected_options = action.selected_options[0];
   console.log("\n\n Board Selected options: ",JSON.stringify(action.selected_options));
   console.log("\n\n BOARD Selected options KEY: ",JSON.stringify(action.selected_options[1]));
   
    var ackText = `You have selected ${selected_options.value} board.`;
    const replacement = payload.original_message;

    var createdListsNames;
    // Start an order, and when that completes, send another message to the user.
    main.copyListsToBoard(selected_options.value, persistStoryboardID)
    .then((response) => {
      // Keep the context from the updated message but use the new text and attachment
      
      ackText = `All the lists from ${selected_options.text} board has been copied to your linked board with this channel.`;
      
      replacement.attachments[0].text = `:white_check_mark:  ${ackText}`;
      delete replacement.attachments[0].actions;
      
        return replacement;
        
    }).then(bot);



    return replacement;
   });

   //Use Case 1 : Link pre-existing storyboard to channel
slackMessages.action('link_boards_lists_callback', (payload,bot) => {
    // `payload` is JSON that describes an interaction with a message.
    //console.log(`The user ${payload.user.name} in team ${payload.team.domain} pressed the welcome button`);
   
    //console.log('******* LIST PAYLOAD : ', payload);
    // The `actions` array contains details about the specific action (button press, menu selection, etc.)
    const action = payload.actions[0];

    var selected_options = action.selected_options[0];
   console.log("\n\n Board Selected options: ",JSON.stringify(action.selected_options));
   console.log("\n\n BOARD Selected options KEY: ",JSON.stringify(action.selected_options[1]));
   persistStoryboardID = action.selected_options[0].value;
   const selectedType = findSelectedOption(payload.original_message, 
                                'link_boards_lists_callback', 
                                payload.actions[0].selected_options[0].value);

    var ackText = `${selectedType.text} board has been linked with this channel.`;


    const replacement = payload.original_message;
    replacement.attachments[0].text = `:white_check_mark:  ${ackText}`;
    delete replacement.attachments[0].actions;
    
      return replacement;
   });


//USE CASE 2 CREATING NEW TASK
slackMessages.action('list_selection_callback', (payload,bot) => {
    // `payload` is JSON that describes an interaction with a message.
    console.log(`The user ${payload.user.name} in team ${payload.team.domain} pressed the welcome button`);
   
    console.log('******* LIST PAYLOAD : ', payload);
    // The `actions` array contains details about the specific action (button press, menu selection, etc.)
    const action = payload.actions[0];

    var selected_options = action.selected_options[0];
   console.log("\n\n KHANTIL LIST Selected options: ",JSON.stringify(action.selected_options));
   console.log("\n\n ****(((*(*(*(*   LIST Selected options KEY: ",JSON.stringify(action.selected_options[1]));
   //console.log(`The dropdown menu had name ${action.name} and value ${action.value}`);
    var ackText = `You have selected ${selected_options.value} list.`;
    const replacement = payload.original_message;
    // Typically, you want to acknowledge the action and remove the interactive elements from the message
    console.log("\n\n ****(((*(*(*(*   SELECTED ATTACHEMENTS:: ",JSON.stringify(replacement.attachments));
    console.log("\n\n ****(((*(*(*(*   SELECTED ATTACHEMENTS:[0]: ",JSON.stringify(replacement.attachments[0]));
    //attachment.text =`Welcome ${payload.user.name}`;
    var createdListsNames;
    // Start an order, and when that completes, send another message to the user.
    main.getNewCard("Acceptance Testing", selected_options.value)
    .then((response) => {
      // Keep the context from the updated message but use the new text and attachment
      
      ackText = `Your card has been successfully created in your selected list.`;
      
      replacement.attachments[0].text = `:white_check_mark:  ${ackText}`;
      delete replacement.attachments[0].actions;
      console.log(" LINE 100");
      
        return replacement;
        //return ackText;
    }).then(bot);



    return replacement;
   });

slackMessages.action('cards_under_list_callback', (payload,bot) => {
    // `payload` is JSON that describes an interaction with a message.

    console.log('******* Template Cards under List PAYLOAD : ', payload);
    // The `actions` array contains details about the specific action (button press, menu selection, etc.)
    const action = payload.actions[0];
    var listId = action.selected_options[0].value;
   console.log("Selected options: ",JSON.stringify(action.selected_options[0]));
    var ackText = `You have selected ${listId} list.`;
    const replacement = payload.original_message;

    var createdListsNames;
    // Start an order, and when that completes, send another message to the user.

    trello.retrieveCards(listId)
    .then((cards) => {

          var cardsAttach = {
              "text": "Select your card that you want to attach the link to",
              "fallback": "If you could read this message, you'd be choosing something fun to do right now.",
                "callback_id": "card_selected_attachment_callback",
                "color": "#3AA3E3",
                "attachment_type": "default",
                "actions": [
                {
                    "name": "cards_list",
                    "text": "Select a Card...",
                    "type": "select",
                    "options": []
               }
              ]
          };
          console.log(" TYPE OF CARDS : "+typeof cards);

          cards.forEach(function(card){
            console.log("card: "+card.id+" "+card.name+" ");
            cardsAttach.actions[0].options.push({"text":card.name,"value":card.id});
          });

          // console.log("** Attachement: "+JSON.stringify(replacement.attachments[0]));
          // console.log("** Attachement1 options: "+JSON.stringify(cardsAttach.actions[0].options));
          replacement.attachments[0].text = `:white_check_mark:  ${ackText}`;
          delete replacement.attachments[0].actions;
          replacement.attachments.push(cardsAttach);
          return replacement;
    }).then(bot);

    //main.getCardsInList(listId)



    return replacement;
   });

slackMessages.action('card_selected_attachment_callback', (payload,bot) => {
    // `payload` is JSON that describes an interaction with a message.
    
    console.log('*******  Cards Attach PAYLOAD : ', payload);
    const action = payload.actions[0];
    var cardId = action.selected_options[0].value;
    console.log("Selected options: ",JSON.stringify(action.selected_options[0]));
    var ackText = `Card selected whose id is ${cardId}.`;
    const replacement = payload.original_message;
    persistCardID = cardId;
    replacement.attachments[1].text = `:white_check_mark:  ${ackText}`;
    delete replacement.attachments[1].actions;

    return replacement;
   });

// Instantiates Express and assigns our app variable to it
var app = express();

var controller = Botkit.slackbot({
    debug: true
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
    token: process.env.SLACK_BOT_TOKEN,
    // incoming_webhook: {
    //     url: my_webhook_url
    //   }
}).startRTM()


controller.hears('task',['mention', 'direct_mention','direct_message'], function(bot,message)
{
  console.log(message);
  //bot.reply(message,"Wow! You want to work on Task management with me. Awesome!");

  //check first whether user has created board or not
  var responseMessage;
  if(persistStoryboardID == undefined){
    responseMessage = {
        "text": "Please create a storyboard first or link your existing story board of trello."};
        bot.reply(message,responseMessage);
  }else{
      console.log("\n 166: "+buildDropdownLists());
      const actionCallbackID = 'list_selection_callback';
    buildDropdownLists(actionCallbackID).then(function(results){
        responseMessage = results;
        bot.reply(message,responseMessage);
    });
  }
});

  controller.hears('create new list',['mention', 'direct_mention','direct_message'], function(bot,message)
  {
    console.log("!@#$%^&* create new list: "+message);
    var responseMessage;
    if(persistStoryboardID == undefined){
      responseMessage = {
          "text": "Please link your existing story board of trello or create a new storyboard first."};
          bot.reply(message,responseMessage);
    }else{
        bot.startConversation({
            user: message.user,
            channel: message.channel,
            text: 'Please enter the list name!'
            }, function(err, convo) {
              convo.ask({
              channel: message.channel,
              text: 'Please enter the name of the list!'
               }, function(res, convo) {
                 
                 main.getNewList(res.text, persistStoryboardID).then((response)=>{
                    convo.say(`\`${res.text}\`` + ' list has been created to your linked board!'); 
                    convo.next();  
                 });
                 
                 }
          )
    }

);
    }    

});

controller.hears('new board',['mention', 'direct_mention','direct_message'], function(bot,message){
  console.log("RECEIVED MESSAGE: "+message.text);

    bot.reply(message,{
      "text": "Sure!",
      "attachments": [

          {
            "text": "Choose a list from the following dropdown",
            "fallback": "If you could read this message, you'd be choosing something fun to do right now.",
              "callback_id": "template_selection_callback",
              "color": "#3AA3E3",
              "attachment_type": "default",
              "actions": [
              {
                  "name": "templates_list",
                  "text": "Select a template...",
                  "type": "select",
                  "options": [
                      {
                          "text": "Scrum Board",
                          "value": "Scrum"
                      },
                      {
                          "text": "Waterfall Board",
                          "value": "Waterfall"
                      }
                 ]
             }
            ]
        }
    ]
  });


});

controller.hears('attach',['mention', 'direct_mention','direct_message'], function(bot,message){
      lists = trello.retreiveLists("59bd64edb534a81dcd8dc79f").then(function(lists){
        var options = [];
        console.log(lists);
        lists.forEach(function(list) {
          options.push({"text": list.name, "value": list.id});
        });
        bot.reply(message,{
          "text": "Choose in sequence the card you would like to attach your link to",
          "attachments": [
              {
                "text": "Choose a List",
                "fallback": "If you could read this message, you'd be choosing something fun to do right now.",
                  "callback_id": "cards_under_list_callback",
                  "color": "#3AA3E3",
                  "attachment_type": "default",
                  "actions": [
                  {
                      "name": "list_items",
                      "text": "Select a List...",
                      "type": "select",
                      "options": options
                 }
                ]
            }
        ]
        });
      });
      
});

controller.hears('Copy lists',['mention', 'direct_mention','direct_message'], function(bot,message){
    listMap = main.getBoardsOfMember().then(function(listMap){
      var options = [];
      console.log(listMap);
      listMap.forEach(function(value, key) {
        options.push({"text": value, "value": key});
      });
      bot.reply(message,{
        "text": "Choose your pre-existing storyboard from which you want to copy your lists.",
        "attachments": [
            {
              "text": "Choose pre-existing storyboard",
              "fallback": "If you could read this message, you'd be choosing something fun to do right now.",
                "callback_id": "boards_lists_callback",
                "color": "#1ABDE3",
                "attachment_type": "default",
                "actions": [
                {
                    "name": "board_items",
                    "text": "Select a Board...",
                    "type": "select",
                    "options": options
               }
              ]
          }
      ]
      });
    });
    
});

controller.hears('Link board',['mention', 'direct_mention','direct_message'], function(bot,message){
    listMap = main.getBoardsOfMember().then(function(listMap){
      var options = [];
      console.log(listMap);
      listMap.forEach(function(value, key) {
        options.push({"text": value, "value": key});
      });
      bot.reply(message,{
        "text": "Choose your pre-existing storyboard to which you want to link this channel.",
        "attachments": [
            {
              "text": "Choose pre-existing storyboard",
              "fallback": "If you could read this message, you'd be choosing something fun to do right now.",
                "callback_id": "link_boards_lists_callback",
                "color": "#1ABDE3",
                "attachment_type": "default",
                "actions": [
                {
                    "name": "board_items",
                    "text": "Select a Board...",
                    "type": "select",
                    "options": options
               }
              ]
          }
      ]
      });
    });
    
});

controller.hears('URL',['mention', 'direct_mention','direct_message'], function(bot,message){
      console.log("Message: "+ message);
      
      var regexpURL = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm
      url = regexpURL.exec(message.text);
      
      var card_attachment = {url: String(url[0])};
      
    //   main.addAttachment(persistCardID, card_attachment)
    //   .then((urlreceived) => {
    //     var replyMessage = "Sorry did not understand your URL";
    //     if(String(url[0])){
    //       replyMessage = "Link "+ String(url[0])+ " was attached to "+ persistCardID+ " card";
    //     }
        var replyMessage = {
            "text": "I have attached the given URL "+String(url[0])+ " to your previously selected card. "
        };
        bot.reply(message,replyMessage);

    //     return replyMessage;

    //   }).then(bot);

});

controller.hears('Hello',['mention', 'direct_mention','direct_message'], function(bot,message){
    console.log("Message: "+ message);

      bot.reply(message,{
        "text": "Hey there, I am taskbot :robot_face:. I am here to help you initialize your task management process faster. ",
        "attachments": [
            {
                "title": "Hint:",
                "text": "You can ask me to create storyboard from predefined templates! "
            }
            
        ]
    });
    
    
});

// Helper functions

function buildDropdownLists(actionCallbackId){


    //console.log("\n\n BEFORE :: BEFORE :: JSON OBJECT BUILT: "+JSON.stringify(jsonobj));
    return new Promise( function(resolve, reject){
        main.getListsInBoard(persistStoryboardID)
        .then((responseLists) => {
            var jsonobj = {
                "text": "Managing tasks? I am here to help you!",
                "attachments": [   
                
                    {
                      "text": "Choose a list from the following list to a task into that list:",
                      "fallback": "If you could read this message, you'd be choosing something fun to do right now.",
                        "callback_id": "list_selection_callback",
                        "color": "#CECDE1",
                        "attachment_type": "default",
                        "actions": [
                        {
                            "name": "lists_list",
                            "text": "Select a list...",
                            "type": "select",
                            "options": [],
                       }
                      ],
                  }
              ],
            };
            console.log("\n\n BEFORE :: JSON OBJECT BUILT: "+JSON.stringify(jsonobj));
            responseLists.forEach(function(value, key) {
                console.log(" KEY : "+key+ "VALUE: "+value);
                jsonobj.attachments[0].actions[0].options.push({ 
                    "text" : value,
                    "value"  : key,
                });
            });
            console.log("\n\n JSON OBJECT BUILT: "+JSON.stringify(jsonobj));
            resolve(jsonobj);  
        });
    });

}

function findAttachment(message, actionCallbackId) {
    console.log("Funciton findAttachment: \n message: ", message, "/n actionCallbackID: ",actionCallbackId);
    return message.attachments.find(a => a.callback_id === actionCallbackId);
  }

  function acknowledgeActionFromMessage(originalMessage, actionCallbackId, ackText) {
    console.log("Called acknowledgeActionFromMessage : \n Original Message",originalMessage);
    console.log("actionCallbackId: ",actionCallbackId);
    console.log("Ack Text: ",ackText);
    const message = cloneDeep(originalMessage);
    const attachment = findAttachment(message, actionCallbackId);
    delete attachment.actions;
    attachment.text = `:white_check_mark: ${ackText}`;
    console.log("Message:: ",message);
    return message;
  }

  function findSelectedOption(originalMessage, actionCallbackId, selectedValue) {
    const attachment = findAttachment(originalMessage, actionCallbackId);
    return attachment.actions[0].options.find(o => o.value === selectedValue);
  }

// Start the built-in HTTP server
const port = 4390;
slackMessages.start(port).then(() => {
 console.log(`server listening on port ${port}`);
});
