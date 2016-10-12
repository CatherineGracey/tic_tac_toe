#Project One - Tic Tac Toe
##By Catherine Gracey

###Overview

Tic Tac Toe, also known as Naughts and Crosses, is a popular game where players take alternating turns to place their token, either an "O" for Naughts or "X" for Crosses. The objective of the game is to complete a line of your own tokens while blocking the other player from forming a line. Lines can be horizontal, vertical, or diagonal. The standard board layout is a 3 x 3 grid.

###Approach

This project was divided into three sections:

- Technical Requirements
- Necessary Deliverables
- Bonus

I approached this project by completing each section in order, while also keeping an eye on future requirements so that I would not code something that went against the ultimate aim of the program.

####Technical Requirements

The technical requirements of the project required the app to:

1. **Render a game in the browser**
2. **Switch turns** between two players
3. **Design logic for winning** & **visually display which player won**
4. **Include separate HTML / CSS / JavaScript files**
5. Stick with **KISS (Keep It Simple Stupid)** and **DRY (Don't Repeat Yourself)** principles
6. Use **Javascript or jQuery** for **DOM manipulation**
7. **Deploy your game online**, where the rest of the world can access it
8. Use **semantic markup** for HTML and CSS (adhere to best practices)

I began by initialising the repository and setting up the file structure and boilerplate code to satisfy requirements 4 and 7 via GitHub.

Once the boilerplate code was created, I setup a preliminary board with HTML and CSS, so that I could wireframe the project directly on the page. In the JS file I wrote out an empty function for every task I could imagine the app would need to perform, and created a global variable for everything that the app would need to keep track of. This ensured my development was closely tied to the interface, to satisfy requirement 1.

The first functionality that I added to the site was placing alternating tokens of X and O on the board, and tracking which player's turn it is. Token placement was tracked via the content of the cells on the board, and player turn via a global variable. This was to meet requirement 2.

The second area of functionality that I wrote was to detect if a player had won the game, as per requirement 3. This naturally led into the next area of detecting if a game was over without a win. Once games are finished, a function is called to display the result to the player(s) and prompt them to play again.

DOM manipulation is done via vanilla JS, because the app is not complex enough to warrant the inclusion of a large library such as jQuery (requirement 6). I have refactored code after completing each function, so that it remains simple and clear with appropriate comments (requirement 5), and have kept HTML and CSS code as simple as possible for ease of reading (requirement 8).

### Necessary Deliverables

1. A **working game, built by you**, hosted somewhere on the internet
2. A **link to your hosted working game** in the URL section of your GitHub repo
3. A **git repository hosted on GitHub**, with a link to your hosted game, and frequent commits dating back to the very beginning of the project
4. **A ``readme.md`` file** with explanations of the technologies used, the approach taken, installation instructions, unsolved problems, etc.

To complete the necessary deliverables, I began by creating a GitHub repo and linking it to my local repo. At each commit I pushed it to GitHub, so that my most recent version would always be available online (requirements 1 and 3). I then created a GitHub Page for the repo and put the link into the URL space on the GitHub repo site (requirement 2).

### Bonus

1. Use timers to display "waiting..." messages while users are waiting to be matched
2. Keep track of multiple game rounds with a win counter
3. Allow game customizable options, time limits, board size, game rounds, name & profiles etc  
4. Allow players to customize their token (X, O, name, picture, avatar etc)
5. Get inventive with your styling use CSS effects, animations or HTML canvas API to spiff things up
6. Use **LocalStorage** or **SessionStorage** to persist data locally to allow games to continue after page refresh or loss of internet connectivity
7. Be creative! Bend the rules and give it a twist!

Because the bonus tasks were for extra credit and not part of the core requirements, I decided to include some features but otherwise develop my app in a different direction to the one suggested.

####Included Suggested Features

I liked the idea of keeping track of mutliple games, so I added a counter that displays above the board (suggestion 2).

####Included Additional Features

I wanted to add the option of a computer player. I began developing this feature by allowing the user to select between a single player or two player game. If a single player game is chosen, the playBot variable is set to true and the computer automatically takes a turn. For the first version of playBot, the computer's token was placed in the first empty cell, which made it very easy for the human player to predict playBot's next move. In the second version, the playBot would check each line to see if it was a winning line. It would then fill the first potential winning line, to either win or block the human player. This was a big improvement, but it meant that playBot would occasionally ignore a winning move for the defensive one, so I refined the check to store the blocking move in a variable and use it if no winning move was found. The next problem was that, if there was no potentially winning line, playBot would place its token regardless of how viable the move was. I added logic to make it check for the viability of lines, and to place its token based on whether the opponent had left the line free. This addition allows playBot to win against an unskilled human player, while still losing to a competent one.
