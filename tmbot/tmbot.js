// Import express and request modules
var express = require('express');
var request = require('request');
var Botkit = require('botkit');
var Promise = require("bluebird");
var main = require('./main.js');
var chai = require("chai");
var expect = chai.expect;
var HashMap = require('hashmap');

// Store our app's ID and Secret. These we got from Step 1.
// For this tutorial, we'll keep your API credentials right here. But for an actual app, you'll want to  store them securely in environment variables.
var clientid = '242175471667.260972372135';
var clientsecret = 'bc75f2893363d5aeb5b178c1b68c9ac1';

var persistStoryboardID;

const { createMessageAdapter } = require('@slack/interactive-messages');

// Initialize adapter using verification token from environment variables
const slackMessages = createMessageAdapter('42EBVvKTcHmHGuZFMOjEcxKx');

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
    main.getNewStoryBoard(selected_options.value, "Swati2")
    .then((response) => {
      // Keep the context from the updated message but use the new text and attachment
      var storyboardlink = response.url;
      console.log(" Received Storyboard link: "+storyboardlink);

      console.log(" ********** Received Storyboard ID: "+response.id);
      persistStoryboardID = response.id;

      ackText = `Your story board is created and here is the link: ${storyboardlink} and boardID: ${persistStoryboardID}.`


      console.log(" LINE 100");

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


            var lists = `I have created board with ${createdListsNames}.`;
            var listsAttach =
              {
                  "text": lists,
                  "color": "#3DF3E3"
              };
              replacement.attachments.push(listsAttach);

            responseLists.forEach(function(value, key){
              var cards = main.getCardsInList(key).then(function(cardsArray) {
                  cardsArray = JSON.parse(cardsArray);
                  var listcard = `I have created folllowing cards for ${value} list: ${cardsArray}`;
                  var listcards =
                    {
                        "text": listcard,
                        "color": "#1DA3E2"
                    };
                    replacement.attachments.push(listcards);
                    return replacement;
                  // cardsArray.forEach(function(card) {
                  //
                  //     QAcardNames.push(card.name);
                  //
                  //     return QAcardNames;
                  // });
              });

            });





                //   updatedMessage.text = response.text;
                //   if (response.attachments && response.attachments.length > 0) {
                //     updatedMessage.attachments.push(response.attachments[0]);
                //   }

            return replacement;
        }).then(bot);
    });
//.then(bot);

    console.log("\n At line 116 ***************");






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

    main.getCardsInList(listId)
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

              cards.forEach(function(value,key){
                console.log("card: "+key+" "+value+" ");
                cardsAttach.actions[0].options.push({"text":value,"value":key});
              });

              console.log("** Attachement: "+JSON.stringify(replacement.attachments[0]));
              console.log("** Attachement1 options: "+JSON.stringify(cardsAttach.actions[0].options));
              replacement.attachments[0].text = `:white_check_mark:  ${ackText}`;
              delete replacement.attachments[0].actions;
              console.log('before push');
              replacement.attachments.push(cardsAttach);
              console.log('after push');
        return replacement;
    }).then(bot);

    console.log("\n At line 116 ***************");






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
    token: "xoxb-259926960994-cv6gxdFR7woDT6VkGrvDzphp",
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
  }
    var str = `Building buttons is easy right? ${persistlink}`;
    responseMessage = {
    "text": "This is your first interactive message",
    "attachments": [
        {
            "text": str,
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

bot.reply(message,responseMessage);
//bot.app.send(mg);

//sendMessageToSlackResponseURL(responseURL, message);
});

controller.hears('template',['mention', 'direct_mention','direct_message'], function(bot,message)
{
  console.log("RECEIVED MESSAGE: "+message.text);
  //Calling

    bot.reply(message,{
      "text": "Hey, there!",
      "attachments": [

          {
            "text": "Choose a board template from the following list",
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
                  "options": [
                      {
                          "text": "Next-up",
                          "value": "59eff8a5892c13cd1fc14451"
                      },
                      {
                          "text": "On Hold",
                          "value": "59eff89b5dae7fffcff0abcd"
                      },
                      {
                          "text": "QA",
                          "value": "59eff8925c221c30218206f8"
                      },
                      {
                          "text": "In Progress",
                          "value": "59eff88827b56f1c329070b8"
                      },
                      {
                          "text": "Current Sprint",
                          "value": "59eff87bbcc4fd185d41c87d"
                      },
                      {
                          "text": "Done",
                          "value": "59eff86c03f047553772c269"
                      },
                 ]
             }
            ]
        }
    ]
  });
});

// Helper functions

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
