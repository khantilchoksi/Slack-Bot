## Task Management Bot

## 1. Problem Statement:  
 Time and task tracking in agile projects is a controversially discussed topic in many project teams.Though agile techniques are being used in a variety of unique ways, scrum based project planning is the widely discussed and hot topic in current software development era.

In a Scrum process, we typically have the standard stages TO DO, IN PROGRESS, and DONE for our tasks in addition to product backlog, Sprint Planning, Current Sprint, In Progress and work done. We also need to keep track of development tasks such as, Work Item Types, Acceptance Criteria, Prioritization, Task Owners, and Sub-tasks. It’s overly confusing to keep track of so many things. We are planning to solve this problem using a slack bot that will help us to fetch the status of an ongoing sprint and will help to complete story on time.
 

## 2. Bot Description:  
  * The task management bot is Slack based interactive bot which simplifies our job to manage the Slack channel and 
Trello board both for a single project management. The user can directly interact with the bot 
from the Slack desktop application or web browser to manage their tasks without even opening the Trello.  
  * The bot provides the user various alternatives to start their new board with templates for like Scrum board. 
  Moreover, the user can also do modifications/personalization they require at the time of creating the new board 
  from Slack itself. So, the user doesn’t have to create the individual lists for Scrum every time they create a new board 
  in Trello and the bot saves the Software Engineer time for initial setup process and helps them 
  to increase the productivity of the software.  
  * The manager and team members can easily look for their backlogs, on-going tasks and tasks which will have the deadline soon, 
  just by asking a simple question to the bot in the Slack for their specific requests, as they are interacting with a person. 
  The user or team lead can also assign the task to other team members, set the deadline while creating the new card. 
  In addition to this, the software engineer can also look for the highly prioritized tasks which he/she needs to complete with 
  highest priority. So, by interacting this kind of stuff with the bot in the channel, 
  will also eventually update the manager(team lead) and other team members, on which part he/she is working on and 
  which tasks have been completed for better productivity and communication within the team.  
  * Now, when the user has completed the task and they want to show their completed work by attaching their Github branch or 
  other documentation links, they can simply attach the link by telling the bot that they have completed 
  with this reference which team lead / other team-mates can look for and it also helps to track the record when required 
  in an organized way.  
  * This way, the task management bot simplifies the way to handle Slack and Trello both and gives power to manage the tasks 
  within the Slack in an interactive manner.


## 3. Three Use Cases:  
#### Use Case I : Creating templates for new message board  
  **(i) Preconditions:**  
   User must have a team created on the Trello and should have invited the bot into the channel for their Trello team.  
  **(ii) Main Flow:**  
   * User will request to create a new board with specific name [S1].   
   * Bot will provide  possible pre-defined options for the different templates for the board [S2].   
   * Bot further asks for the modifications required to in the template [S3].  
   * Bot then creates the board and returns the url of the board [S4].  
  **(iii) Subflows**
  [S1] User writes that he/she want to create a new board with specific name.  
  [S2] Bot shows a list of options for the templates and user can pick any one of them.  
  [S3] Bot will ask if there is any modificaiton needs to be done and user replies which type of lists he/she wants to add and delete.  
  [S4] Bot creates the new board and return the url of the board for the reference.  
 **(iv) Alternative Flows:**
  [E1] User doesn't select any pre-defined template and choose to create the new board with their specific lists.

## 4. Design Sketches  


## 5. Architecture Design  
* Slack – chatbot :  
Slack user interface where the user interacts with the chat bot. User can input the commands in a natural conversational language. The messages on slack are sent to Node-JS application via slack’s API calls.
* NodeJS Application :  
Main application in the system where the slack messages are received and sent to Wit.AI module. Wit.AI output is processed and corresponding trigger is sent to Trello via API calls. 
* Wit.AI :  
Slack messages are parsed into keywords and sent back to the NodeJS Application to perform required actions. 
* Trello :  
Trello API will then perform the required actions and send the feedback/response to application and it is then forwarded to Slack UI via API calls.
## 6. Additional Patterns

## Guidelines:
  We will also provide basic trello functionalities like:  
  * Adding a member to a task
  * Adding a new list in the story board
  * Adding a new task in the list
  * Setting a due date for the task
  * Setting the story board
  
   

## Constraints:  
  * **Slack:**
  * At any point of time, there can be only one Trello board connected to Slack channel.
   So, if we want to manage different boards simultaneously, we should set the particular board apriori through the bot.
  * To add a member in a task, that member should be a Slack member of the team also.
   * **Trello:** There should be a team already created in Trello.
