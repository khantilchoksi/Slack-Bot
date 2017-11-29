## Acceptance Tests

Purpose of bot: Purpose of bot is to create a Slack based interactive conversational bot which simplifies our job of managing the Slack channel and Trello board for a single project management.

We have deployed the chat bot to general slack channel https://se-projectworkspace.slack.com/messages/C73HN2DL0/   

We have made 1 dummy user :   

      UserID: taskbot.testing.ta@gmail.com
      Password: ta_test123

## General Instructions before making the meeting

1. Authorize Trello account with the help of below commands,
 • @taskbot Hello bot
 • @taskbot Link my Trello


## USE CASE 1: Instructions to create a new story board 

Instructions:

A. create a new story board   
   1. Say ‘@taskbot I want to create a new board in my trello’. It will prompt you to enter the name of the board.      
   2. Once you enter the name of the board, you can choose any of the default templates of the storyboards provided in the options. Example: scrum board, waterfall board etc.   
   3. On selecting one of the available options, the taskbot will provide you the link of the board it just created in trello. Since, we already provide you the templates of the board containing some lists, it will tell you what all lists the bot created on its own. Along with that, it will also inform you which default cards are added to which lists.   
   
B. Link a pre-existing Story Board   
   1.	To link an already existing board to the slack channel, say ‘@taskbot I want to link existing board here’.   
   2.	Bot will fetch all the existing boards in your trello account and will let you choose any one of the boards from the drop-down menu.   
   
C. Copy lists from another pre-existing story board to the current board linked to slack channel   
   1.	Say, ‘@taskbot I want to copy lists from my pre-existing board'   
   2.	The bot will provide a dropdown list of all the existing boards and you can choose any one of the boards. Let’s assume the board you selected is X.   
   3. The bot will then add the lists from X (excluding the cards in each lists) into the board linked to your slack channel currently.   

### USE CASE 2: Instructions to create a new list and creating card 

A. Create a new list to your linked board   
   1. Say, ‘@taskbot I want to create new list to my linked board’. Taskbot will then prompt you to enter the name of the list you want to create.   

B. Create a new card   
   1. Say, ‘@taskbot I want to create new card’. Taskbot will then prompt you to enter the name of the card you want to create.   
   2. Taskbot doesn’t know where do you want to add that card to. It will prompt you the lists in your board and you will then have to choose a list where you want to create a new card.   


### USE CASE 3: Instruction for Managing tasks

A. Say, ‘@taskbot I want to manage tasks’. Taskbot will then let you select the list and then provide you with the tasks associated to that list.   
B. When you select a list, taskbot will let you know about the possible actions you can perform for managing your tasks.    
C. Some possible actions you can perform are: Attach a URL to the card, Set a due date for that task, Add a label to the card or Archive the card if you do not need it.   

1. Setting a due date for a task   
  a. Say, ‘@taskbot I want to set due date mm/dd/yyyy for this task’   
2. Add a URL to a card   
  a. Say, ‘@taskbot URL <Enter//the url here>’   
3. Set label to a card   
  a. Say, ‘@taskbot I want to set label to this task’   
  b. Taskbot will let you select the label you want by clicking on the buttons   
4. Archive the card   
  a. Say, ‘@taskbot I want to archive card’   

[Link to worksheet](https://github.ncsu.edu/asoni3/CSC510-Project/blob/master/task_track.md)

[Link to screen-cast] ()
