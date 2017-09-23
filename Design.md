## Task Management Bot

## 1. Problem Statement:  
  * Slack is one of the most popular team collaboration tools. Most of the leading companies are now using Slack for better communication within the team. Trello is a web application that helps with project management in the sense of giving a visual overview of tasks that need to be managed in the team. While teams communicate on Slack, and then go on to Trello to manage their task activities, we thought that bridging the gap between these two applications would make project management handy by providing Trello related functionalities right there in Slack. There could be times when task specific details are needed at some spontaneous time (during team meeting). Imagine the swiftness and control one experiences, when team member receives the relevant information like getting the due date of a particular task there itself in Slack. Thus, managing tasks in Trello can now be done without having to move away from Slack. We plan to solve this problem using a Task Management bot that will help us with use cases defined below. We hope this bot will increase the productivity within the team by decreasing the number of times a developer/manager needs to visit the Trello site and instead work his way through, from Slack.
  

## 2. Bot Description:  
  * The task management bot is a Slack based interactive conversational bot which simplifies our job of managing the Slack channel and Trello board for a single project management.  
  * The bot provides the user various alternatives to start their new board with templates related to different software development lifecycles.  
  Moreover, the user can also do modifications/personalization they require at the time of creating the new board 
  from Slack itself. So, the user doesn’t have to create individual lists for the storyboard, every time they create a new one in Trello. This way bot saves the Software Engineer the time for initial setup process and helps them to increase the productivity of the software. 
  * The manager and team members can easily look for their backlogs, on-going tasks and tasks which will have the deadline soon, 
  just by asking a simple question to the bot in the Slack for their specific requests. The user or team lead can also assign the task to other team members while also assigning a deadline to the same.
  In addition to this, the software engineer can also look for the highly prioritized tasks which he/she needs to complete with 
  highest priority. This way, the manager and other members also get updated about the task activity of team members.
  * Now, when the user has completed the task and they want to show their completed work,  they can simply attach the link (drive link/ github link) by telling the bot that they have completed with this reference. This way team lead / other team-mates can look for it to track the record when required in an organized way.  
### Bot's Design Pattern: Conversationists Bot  
  * Our bot will converse with the user and keep the conversational state intact. Since the Bot will learn from what the user wishes to do and react accordingly, we will follow the Conversationist Bot pattern.The Bot will have to remember the knowledge of the conversation in terms of what has been said from the previous conversation, in order to carry out some subtasks in some use cases.

## 3. Three Use Cases:  
### Use Case I : Creating templates for new message board  
  **(i) Preconditions:**  
   User must have a team created on the Trello and should have invited the bot into the channel for their Trello team.  
  
  **(ii) Main Flow:**  
 * User will request to create a new board with specific name [S1].   
 * Bot will provide  possible pre-defined options for the different templates for the board [S2].   
 * Bot further asks for the modifications required to in the template [S3].  
 * Bot then creates the board and returns the url of the board [S4].  

**(iii) Subflows**  
   * [S1] User writes that "I want to create a new board with my team for module 2".  
   * [S2] Bot shows a list of options for the templates in the from of drop-down list and user can pick any one of them.  
   * [S3] Bot will ask if there is any modificaiton needs to be done in the template and user replies that " I want to add 'On Hold' list to be added and delete the 'Next-Up' list".  
   * [S4] Bot creates the new board with the personalized board and return the url of the newly created board.    
   
 **(iv) Alternative Flows:**  
   * [E1] User doesn't select any pre-defined template and choose to create the new board with their specific lists. (So, after that, he can tell the bot that he wants to create some particular lists. Use Case 2)  
  
### Use Case II : Creating / Managing Tasks  
 **(i) Preconditions:**  
  User should have the url for the board in which they wants to create/manage tasks and the list on which taks to be added should be configured.
 
 **(ii) Main Flow:**  
  * User will request to show their or others tasks according to different parameters like priority, deadline, back-logs.[S1]   
  * Assign a member to the task.[S2]
  * Set/update the priority and deadline of the task.[S3]
  
 **(iii) Sub Flows:**  
  * [S1] User requests that "Which tasks are due tomorrow?", "Which tasks @user1 completed today?", "Task XYZ is assigned to which team-mates?", "Which tasks are running in backlog and 
  * [S2] User can ask that "Please assign @user2(slack mention) to task ABC?"
  * [S3] User requests that "I want to extend the deadline of task ABC to next Monday.", "I want to increase the priority of the task XYZ to highest."  
 
### Use Case III : Attachment to the tasks 
 **(i) Preconditions:**  
   User should have already created a card and always have to refer the cards to insert, remove or comment on the link.  

 **(ii) Main Flow:**  
  * User can add the links which they have referred to accomplish the task.[S1]    
  * User can change the status of the task to completed by providing the commit link on GitHub or related links to show the completion of the task.[S2]
  * User can fetch all the links and comments on the particular links.[S3]  
  
 **(iii) Sub Flows:**  
  * [S1] User can log that “I have used https://abc.xyz link to solve my bug while working on task ABC.”  
  * [S2] User can say that "I have completed task XYZ and here is my commit link: https://abc.xyz."  
  * [S3] User requests that "Which links @user1 had referred to complete the task?”, “Which link @user2 had given while completing the task XYZ?”.  
  
  
 
## 4. Design Sketches:   

### Storyboard
![img](StoryBoard.PNG)

### Wireframe Part 1   
![img](SlackBot_WireFrame.gif)  

### Wireframe Part 2  
![img](Wireframe_2.gif)


## 5. Architecture Design: 

### Architecture Design Diagram  
![img](TaskSlackBot_ArchitectureDesign.jpg) 


### Architecture Components  
 * Slackbot :  
Slack user interface where the user interacts with the chat bot. User can input the commands in a natural conversational language.
 * NodeJS Application :  
This application will be connected to the slack channel via botkit using slackbot API token. It uses Slack's Real Time Messaging API(RTM). The inputs from slack will be forwarded to Wit.AI module. Wit.AI output is received, processed and corresponding trigger is sent to Trello via API calls. 
 * Wit.AI :  
Wit is a semantic analysis tool. In our use case, when user enters a sentence (slack message) about performing certain action in trello, it will interpret the meaning and the intent of the statement. Wit will take care of parsing sentences to work out the intent as well as any entities that are referred to. This data is forwarded back to the NodeJS application. 
 * Trello :  
Trello API will then perform the required actions and send the feedback/response to application and it is then forwarded to Slack UI via API calls.  

### Guidelines:
  We will also provide basic trello functionalities like:  
  * Adding a member to a task
  * Adding a new list in the story board
  * Adding a new task in the list
  * Setting a due date for the task
  * Setting the story board
  
   

### Constraints:  
  * **Slack:**  
  At any point of time, there can be only one Trello board connected to Slack channel.
   So, if we want to manage different boards simultaneously, we should set the particular board apriori through the bot.  
     
    To add a member in a task, that member should be a Slack member of the team also.
   * **Trello:** There should be a team already created in Trello.
   
   
### Design Pattern:    
**(i) Observer**  
 * The most relevant design pattern would be “Observer” pattern. The project consists of different components whose properties are interrelated with each other. Change in one object’s state would have a direct impact on another, and hence the observer pattern would be the most appropriate.  
  
 * Ex: If a ticket’s status is changed from In Progress to Completed, correspondingly the items in both the list objects (In Progress, Completed) containing the tickets need to be modified.

 **(ii) Mediator**  
 * A mediator object that defines how other objects interact could also be useful.  
   
 * Ex: The object responsible for parsing the input sentence(wit.ai), need not have any	 direct interaction with the object creating trello cards. Thus there needs to be a mediator that acts as a central interface between different objects/modules in the bot.  
   
 **(iii) Factory**  
 
* When the user requests a certain change in the project management board, the user/client need not be exposed, to the underlying objects responsible for different functionalities. Thus abstractions that are offered by the Factory pattern may also apply for our bot.

## Additional Patterns:
 * We will be using the Pipe and Filter Architecture pattern for our bot. Since, our data flows from Slack to Trello through different components in between and simulates stream processing of data we believe Pipe and Filter architecture will be the most suitable pattern for our bot.


   
## [Team Information] 
Team information can be found [here!](https://github.ncsu.edu/asoni3/CSC510-Project/blob/master/Teaminfo.md)
