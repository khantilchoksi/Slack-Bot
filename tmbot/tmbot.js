//Work on SE_Project_CSC510 Slack channel tmbot and it has been linked to slack's testing_bot_channel
//API token for tmbot : xoxb-253260289844-0I3ZOtHXGmZVXynApxZ8AiEF
var Botkit = require('botkit');

var controller = Botkit.slackbot({
    debug: false
    //include "log: false" to disable logging
    //or a "logLevel" integer from 0 to 7 to adjust logging verbosity
  });
  
// connecting the bot to a stream of messages
controller.spawn({
    token: process.env.TMBOTSLACKTOKEN,
}).startRTM()

controller.hears('task',['mention', 'direct_mention','direct_message'], function(bot,message) 
{
  console.log(message);
  bot.reply(message,"Wow! You want to work on Task management with me. Awesome!");
});

controller.hears('template',['mention', 'direct_mention','direct_message'], function(bot,message) 
{
  console.log(message);
  bot.reply(message,{
    "text": "Following are templates of storyboards:",
    "attachments": [
        {
            "title": "Select one template you want to create.",
            "text": "Select one template from the dropdown: "
        },
		{	
			"text": "Choose a game to play",
            "fallback": "If you could read this message, you'd be choosing something fun to do right now.",
            "color": "#3AA3E3",
            "attachment_type": "default",
            "callback_id": "template_selection",
            "actions": [
                {
                    "name": "templates_list",
                    "text": "Select a template...",
                    "type": "select",
                    "options": [
                        {
                            "text": "Scrum Board",
                            "value": "scrum"
                        },
						{
                            "text": "Waterfall Board",
                            "value": "waterfall"
                        }
						]
				}
				]
				},
		
		
        {
            "fallback": "Would you like to add more lists?",
            "title": "Would you like to add more lists in this template?",
            "callback_id": "comic_1234_xyz",
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

