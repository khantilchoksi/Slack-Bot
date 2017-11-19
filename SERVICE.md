Functionalities of the bot:   
**UseCase 1**<br>    
  User can perform the following actions:   
  * User can create a new board in trello, from available templates (Scrum, Waterfall)  
    * Based on the choice of the user, standard lists will be created. And by default, standard cards are added to each list.
  *	User can link pre-existing board
    * Bot will pull up all  the existing lists created in that board which will have all the cards in each list same as the existing board.
  *	User can tell the bot to copy the lists from a previously existing board
    * Bot will copy all the lists (QA, deployment, etc).  
    
**UseCase 2**<br>
User can perform the following actions:
  * User can ask the bot to create a new list to my linked board
    * Bot will create a new list to the board linked by the user
  * User can ask to create a new card
    * Bot will prompt the user to select the list and then user will input the card details.   
    
**Usecase 3**<br>
User can perform the following actions:
  * User can set a due date to the task
    * Bot will prompt the user to select a list, then user will select the card in that list for which he wants to set a deadline
  * User can set label for the task
    *	Bot will ask the user to select the label to add for the task
  * User can add a URL to the card
    * Bot will add a URL to the card which can be later referred to recollect the issues for that task
  * User can ask to archive the card
    * Bot will move the requested card to archive as per user’s request
