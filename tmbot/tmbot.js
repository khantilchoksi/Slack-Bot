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
  bot.reply(message,"Wow! You want to work on Templates with me. Great and heard from !"+message.channel+" channel");
});