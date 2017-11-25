//Work on SE_Project_CSC510 Slack channel tmbot and it has been linked to slack's testing_bot_channel
//API token for tmbot : xoxb-253260289844-0I3ZOtHXGmZVXynApxZ8AiEF
var Promise = require("bluebird");
var Botkit = require('botkit');
var main = require('./main.js');
var chai = require("chai");
var expect = chai.expect;

var webhook_url = "https://hooks.slack.com/services/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";

var controller = Botkit.slackbot({
    debug: true
    //include "log: false" to disable logging
    //or a "logLevel" integer from 0 to 7 to adjust logging verbosity
  });
  
// connecting the bot to a stream of messages
var bott = controller.spawn({
    token: process.env.TMBOTSLACKTOKEN,
    // incoming_webhook: {
    //     url: my_webhook_url
    //   }
}).startRTM()

// send webhooks
bott.configureIncomingWebhook({url: webhook_url});


// function myincomingwebhook(owner,repoName, repoObj)
// {
// 	var options = {
// 		url: urlRoot + `/repos/${owner}/${repoName}`,
// 		method: 'PATCH',
// 		json: payload={"text": "Trying to send message via webhook and Slack web API"},
// 		headers: {
// 			"User-Agent": "EnableIssues",
// 			"content-type": "application/json",
// 			"Authorization": token
// 		}
// 	};

// 	// Send a http request to url and specify a callback that will be called upon its return.
// 	request(options, function (error, response, body) 
// 	{
// 		console.log(body);
// 	});
	
// }

controller.hears('task',['mention', 'direct_mention','direct_message'], function(bot,message) 
{
  console.log(message);
  bot.reply(message,"Wow! You want to work on Task management with me. Awesome!");
});

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

    // bot.startConversation(message, function(err, convo) {
        
    //         convo.addQuestion({
    //             attachments:[
    //                 {
    //                     title: 'Khantil , Do you want to proceed?',
    //                     callback_id: '123',
    //                     attachment_type: 'default',
    //                     actions: [
    //                         {
    //                             "name":"yes",
    //                             "text": "Yes",
    //                             "value": "yes",
    //                             "type": "button",
    //                         },
    //                         {
    //                             "name":"no",
    //                             "text": "No",
    //                             "value": "no",
    //                             "type": "button",
    //                         }
    //                     ]
    //                 }
    //             ]
    //         },[
    //             {
    //                 pattern: "yes",
    //                 callback: function(reply, convo) {
    //                     convo.say('FABULOUS!');
    //                     convo.next();
    //                     // do something awesome here.
    //                 }
    //             },
    //             {
    //                 pattern: "no",
    //                 callback: function(reply, convo) {
    //                     convo.say('Too bad');
    //                     convo.next();
    //                 }
    //             },
    //             {
    //                 default: true,
    //                 callback: function(reply, convo) {
    //                     // do nothing
    //                 }
    //             }
    //         ]);
    //     });
    
    // bot.reply(message, {
    //     attachments:[
    //         {
    //             title: 'Do you want to interact with my buttons?',
    //             callback_id: '123',
    //             attachment_type: 'default',
    //             actions: [
    //                 {
    //                     "name":"yes",
    //                     "text": "Yes",
    //                     "value": "yes",
    //                     "type": "button",
    //                 },
    //                 {
    //                     "name":"no",
    //                     "text": "No",
    //                     "value": "no",
    //                     "type": "button",
    //                 }
    //             ]
    //         }
    //     ]
    // });

    // //bot.api.chat.postMessage
    // bot.sendWebhook({
    //     text: 'Hey Khantil, this is an incoming webhook !',
    //     username: "new-bot-name-tmbot",
    //     icon_emoji: ":ghost:",
    //     channel: '#testing_bot_channel',
    //   },function(err,res) {
    //     // handle error
    //   });

    bot.startConversation(message,function(err,convo) {
        
            convo.addQuestion('Shall we proceed Say YES, NO or DONE to quit.',[
              {
                pattern: 'done',
                callback: function(response,convo) {
                  convo.say('OK you are done!');
                  convo.next();
                }
              },
              {
                pattern: "yes",
                callback: function(response,convo) {
                  convo.say('Great! I will continue...');
                  // do something else...
                  convo.next();
        
                }
              },
              {
                pattern: bot.utterances.no,
                callback: function(response,convo) {
                  convo.say('Perhaps later.');
                  // do something else...
                  convo.next();
                }
              },
              {
                default: true,
                callback: function(response,convo) {
                  // just repeat the question
                  convo.repeat();
                  convo.next();
                }
              }
            ],{},'default');
        
          });
        
//     bot.reply(message,{
//       "text": "Khantil Following are templates of storyboards:",
//       "attachments": [
//           {
//               "title": storyboardlink,
//               "text": "Select one template from the dropdown: "
//           },
//       {	
//         "text": "Choose a game to play",
//               "fallback": "If you could read this message, you'd be choosing something fun to do right now.",
//               "color": "#3AA3E3",
//               "attachment_type": "default",
//               "callback_id": "template_selection",
//               "actions": [
//                   {
//                       "name": "templates_list",
//                       "text": "Select a template...",
//                       "type": "select",
//                       "options": [
//                           {
//                               "text": "Scrum Board",
//                               "value": "scrum"
//                           },
//               {
//                               "text": "Waterfall Board",
//                               "value": "waterfall"
//                           }
//               ]
//           }
//           ]
//           },
      
      
//           {
//               "callback": "Would you like to add more lists?",
//               "title": "Would you like to add more lists in this template?",
//               "callback_id": "comic_1234_xyz",
//               "color": "#CBCFF1",
//               "attachment_type": "default",
//               "actions": [
//                   {
//                       "name": "recommend",
//                       "text": "Yes",
//                       "type": "button",
//                       "value": "yes"
//                   },
//                   {
//                       "name": "no",
//                       "text": "No",
//                       "type": "button",
//                       "value": "bad"
//                   }
//               ]
//           }
//       ]
//   });
  });
});

  // receive an interactive message, and reply with a message that will replace the original
// controller.on('interactive_message_callback', function(bot, message) {
//         console.log("interactive messgae callback");
//         // check message.actions and message.callback_id to see what action to take...
    
//         bot.replyInteractive(message, {
//             text: '...',
//             attachments: [
//                 {
//                     title: 'My buttons',
//                     callback_id: '123',
//                     attachment_type: 'default',
//                     actions: [
//                         {
//                             "name":"yes",
//                             "text": "Yes!",
//                             "value": "yes",
//                             "type": "button",
//                         },
//                         {
//                            "text": "No!",
//                             "name": "no",
//                             "value": "delete",
//                             "style": "danger",
//                             "type": "button",
//                             "confirm": {
//                               "title": "Are you sure?",
//                               "text": "This will do something!",
//                               "ok_text": "Yes",
//                               "dismiss_text": "No"
//                             }
//                         }
//                     ]
//                 }
//             ]
//         });
    
//     });

