# Task Management Bot (Slack-Bot)

----------------------------------------------------
## Problem Statement:  
  * Slack is one of the most popular team collaboration tools. Most of the leading companies are now using Slack for better communication within the team. Trello is a web application that helps with project management in the sense of giving a visual overview of tasks that need to be managed in the team. While teams communicate on Slack, and then go on to Trello to manage their task activities, we thought that bridging the gap between these two applications would make project management handy by providing Trello related functionalities right there in Slack. There could be times when task specific details are needed at some spontaneous time (during team meeting). Imagine the swiftness and control one experiences, when team member receives the relevant information like getting the due date of a particular task there itself in Slack. Thus, managing tasks in Trello can now be done without having to move away from Slack. We plan to solve this problem using a Task Management bot that will help us with use cases defined below. We hope this bot will increase the productivity within the team by decreasing the number of times a developer/manager needs to visit the Trello site and instead work his way through, from Slack.
  
--------------------------------------------------------------------------------------
## Overview / Screencast of Product: https://youtu.be/UhBqV_MlJSo
  
--------------------------------------------------------------------------------------

## The problem our bot solved:

Slack is one of the most popular team collaboration tools. Most of the leading companies are now using Slack for better communication within the team. Trello is a web application that helps with project management in the sense of giving a visual overview of tasks that need to be managed in the team. While teams communicate on Slack, and then go on to Trello to manage their task activities, we thought that bridging the gap between these two applications would make project management handy by providing Trello related functionalities right there in Slack. There could be times when task specific details are needed at some spontaneous time (during team meeting). Imagine the swiftness and control one experiences, when team member receives the relevant information like getting the due date of a task there itself in Slack. Thus, managing tasks in Trello can now be done without having to move away from Slack. We plan to solve this problem using a Task Management bot.

## How does bot solve this problem?
The bot provides the user various alternatives to start their new board with templates related to different software development lifecycles. Moreover, the user can also do modifications/personalization they require at the time of creating the new board from Slack itself. So, the user doesn’t have to create individual lists for the storyboard, every time they create a new one in Trello. This way bot saves the Software Engineer the time for initial setup process and helps them to increase the productivity of the software. 
The manager and team members can easily look for their backlogs, on-going tasks and tasks which will have the deadline soon, just by asking a simple question to the bot in the Slack for their specific requests. The user or team lead can also assign the task to other team members while also assigning a deadline to the same. In addition to this, the software engineer can also look for the highly prioritized tasks which he/she needs to complete with highest priority. This way, the manager and other members also get updated about the task activity of team members.
When the user has completed the task and they want to show their completed work, they can simply attach the link (drive link/ GitHub link) by telling the bot that they have completed with this reference. This way team lead / other team-mates can look for it to track the record when required in an organized way.
  
 ---------------------------------------------------------------------  
 
 ## Screenshots

# Screenshot-1
![Alt text](./Screen%20Shot%202.png?raw=true "Optional Title")

# Screenshot-2
![Alt text](./master/Screen%20Shot%203.png?raw=true "Optional Title")

# Screenshot-3
![Alt text](./Screen%20Shot4.png?raw=true "Optional Title")

## 3. Our reflection on the bot development process 

As part of course requirement for Software Engineering, we needed to build a slack bot to address any software engineering issue. It is always good to work on new technologies and tools. Slack is one such tool which is gaining tremendous popularity among tech companies. Clearly developing a slack bot became our preferred choice. We started our project journey with milestone design where we need to come up with one software engineering problem and the possible solution by developing a slack bot application.
After initially brainstorming sessions and discussions with professor we decided to build Slack based interactive conversational bot which simplifies our job of managing the Slack channel and Trello board for a single project management.

For milestone-1 design, we described the problem statement for a bot along with the architecture design that we were planning to use for the development process. It was a challenging task to decide what kind of design pattern can be utilized for this project since our future strategy was dependent on it. We moved forward with Pipe and Filter Architecture pattern for our bot. Since, our data flows from Slack to Trello through different components in between and simulates stream processing of data, we believe Pipe and Filter architecture will be the most suitable pattern for our bot. Also, we had to decide the technology stack which was one of the important part of project.

During this phase of the milestone, we understood various aspects about the initial part for the project i.e. requirement gathering for designing a bot, understanding the problem statement and coming up with design patterns for the development of the bot etc.

For milestone-2 bot, we came up with the implementation logic for bot where we used Nodejs for writing the business logic of the application and created mock json file to render mock data consisting of calendar data to slack bot. To smoothen the development process, we used trello cards to track and manage tasks assigned to each person.

In milestone-3 Services, we implemented the service part of bot that is creating new story board, linking the existing ones, creating new labels, adding links to the tasks in story board, setting priority to the existing tasks. Most challangeing part during this milestone was to comeup with a logic to authorize a user and keep a track of all user tokens for that user. We decided to comeup with a database that can store all user tokens of the Trello, which can be later fetched for performing actions. ... (need to write here)

In milestone-4 Deployment, using Ansible script we deployed the backend of our bot to AWS EC2 console and also put the bot on slack apps. So anyone can intergrate our bot easily.

Overall, it was been a great journey with lot of learning during each of the milestones of project. Throughout this project, we made use of agile methodology which was quite helpful to understand the requirement at early stages and frequent meetings helped us in reducing the errors and defects which might’ve impacted the project milestones at later stages. Apart from that, we used pair programming during the coding phase of our project which was a successful experiment since it helped us in improving the quality of the code and eleiminating the bugs/defects which might have got neglected had there been only one developer working on that task. It also helped us in identifying the strong and weak points of the team members that made us easy to rotate the work after every milestone.

In contrast to the projects we did in our respective companies, which had hierarchical structure where mostly the team lead decides and others follow, we felt that each member in this project had flexibility of putting their idea upfront and taking the lead to make it work. We had opportunity to rotate roles and experience a developments process in every perspective.
 
 ---------------------------------------------------------------------
 
## Design Sketches:   

### Storyboard
![img](StoryBoard.PNG)

### Wireframe Part 1   
![img](SlackBot_WireFrame.gif)  

### Wireframe Part 2  
![img](Wireframe_2.gif)

-------------------------------------------------------------------------------------------------------------   

## Architecture Design: 

### Architecture Design Diagram  
![img](ArchitectureDesign.jpg) 


### Architecture Components  
 * **Slackbot :**  
Slack user interface where the user interacts with the chat bot. User can input the commands in a natural conversational language.
 * **NodeJS Application :**  
This application will be connected to the slack channel via botkit using slackbot API token. It uses Slack's Real Time Messaging API(RTM). The inputs from slack will be forwarded to Wit.AI module. Wit.AI output is received, processed and corresponding trigger is sent to Trello via API calls. 
 * **Wit.ai :**    
Wit is a semantic analysis tool. In our use case, when user enters a sentence (slack message) about performing certain action in trello, it will interpret the meaning and the intent of the statement. Wit will take care of parsing sentences to work out the intent as well as any entities that are referred to. This data is forwarded back to the NodeJS application. 
 * **Trello :**   
Trello API will then perform the required actions and send the feedback/response to application and it is then forwarded to Slack UI via API calls.  
   
---------------------------------------------------  

## Future work

1. Currently, the bot is supported for one slack team only. In future, using the “add to slack” button or by distributing the slack app to Slack store public distribution.
2. We believe that the implementation for managing tasks can be further optimized. By storing the context for each user team, we can fetch the most recent linked card and perform the actions on that. 
3. We can also set the card creator or manager can only change the priority or deadline for a given task by providing the role(manager, employee)  to each user.
4. For the template creation, right now only 2 types of templates are supported (Scrum and Waterfall board). But, in future we can expand our bot to support other software engineering boards. Furthermore, we can give certain privileges only to the employees like changing label to completed or achieving the card.
5. Rightnow, the slack channel team is not linked with the organization created on Trello for smooth interaction in a team. We can create a new database table to map the slack channel id with the Trello organization and boards inside an organization.
6. Currently, the user messages are extracted using the regular expressions and then the necessary actions are decided. In future, we can integrate the natural language processing apis like Wit.ai to make our bot more robust.


   
## Team Information
Team information can be found [here!](./Teaminfo.md)
