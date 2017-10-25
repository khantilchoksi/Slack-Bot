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

var persistlink;

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
    
    // Start an order, and when that completes, send another message to the user.
    main.getNewStoryBoard(selected_options.value, "Swati2")
    .then((response) => {
      // Keep the context from the updated message but use the new text and attachment
      var storyboardlink = response[0];
      console.log(" Received Storyboard link: "+storyboardlink);
      console.log(" ********** response[1]"+response[1].name);
      console.log(" ********** response[2]"+response[2].name);
      ackText = `Your story board is created and here is the link: ${storyboardlink}.`
      persistlink = storyboardlink;
    //   updatedMessage.text = response.text;
    //   if (response.attachments && response.attachments.length > 0) {
    //     updatedMessage.attachments.push(response.attachments[0]);
    //   }
        console.log("** Attachement: "+JSON.stringify(replacement.attachments[0]));
        replacement.attachments[0].text = `:white_check_mark:  ${ackText}`;
        delete replacement.attachments[0].actions;
        return replacement;
        //return ackText;
    }).then(bot);

    console.log("\n At line 98 ***************");
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
    var str = `Building buttons is easy right? ${persistlink}`;
  var mg = {
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

bot.reply(message,mg);
//bot.app.send(mg);

//sendMessageToSlackResponseURL(responseURL, message);
});

controller.hears('template',['mention', 'direct_mention','direct_message'], function(bot,message) 
{
  console.log("RECEIVED MESSAGE: "+message.text);
  //Calling 
  var storyboardlink = '';
  var boardName= "Scrum";
  var list_lists = ['list1'];

    
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



