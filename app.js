//Base requirements
// * **Render a game in the browser**
// * **Switch turns** between two players
// * **Design logic for winning** & **visually display which player won**
// * **Include separate HTML / CSS / JavaScript files**
// * Stick with **KISS (Keep It Simple Stupid)** and **DRY (Don't Repeat Yourself)** principles
// * Use **Javascript or jQuery** for **DOM manipulation**
// * **Deploy your game online**, where the rest of the world can access it
// * Use **semantic markup** for HTML and CSS (adhere to best practices)

var gameBoard;
var inPlay = true;
var currentPlayer = 1;

function getPlayers(){}

function endGame(){}

function isThereAWinner(){
  var tokens = [];
  var lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]
  function checkLine(one, two, three){
    if (tokens[one] && tokens[one] === tokens[two] && tokens[one] === tokens[three]){
      gameBoard[one].className = "win";
      gameBoard[two].className = "win";
      gameBoard[three].className = "win";
      inPlay = false;
      return tokens[one];
    } else {
      return false;
    }
  }
  //Extract tokens from the board and add them to tokens array for ease of checking
  for (var i = 0; i < gameBoard.length; i++){
    var token = gameBoard[i].innerHTML;
    tokens.push(token);
  }
  for (i = 0; i < lines.length; i++){
    var result = checkLine(lines[i][0], lines[i][1], lines[i][2]);
    if (result){
      console.log(result);
      return result;
    }
  }
  console.log(tokens);
  return false;
}

function placeToken(){
  //Check that the cell is empty before allowing the player to place a token.
  if (!event.target.innerHTML && inPlay){
    //Place the token of the current player then switch the player
    if (currentPlayer === 1){
      var x = document.createTextNode("X");
      event.target.appendChild(x);
    } else {
      var o = document.createTextNode("O");
      event.target.appendChild(o);
    }
    //Check end game condition
    var win = isThereAWinner();
    if (win){
      endGame(win);
    } else {
      switchPlayer();
    }
  }
}

function switchPlayer(){
  if (currentPlayer === 1){
    currentPlayer = 2;
  } else {
    currentPlayer = 1;
  }
}

function resetBoard(){
  for (var i = 0; i < gameBoard.length; i++){
    gameBoard[i].innerHTML = "";
  }
  inPlay = true;
}

window.onload = function(){
  //Get the game board
  gameBoard = document.getElementById("board");
  gameBoard.addEventListener("click", placeToken);
  //Assign cells to global variable
  gameBoard = gameBoard.children;
};

//Bonus functionality
// Use timers to display "waiting..." messages while users are waiting to be matched
// Keep track of multiple game rounds with a win counter
// Allow game customizable options, time limits, board size, game rounds, name & profiles etc
// Allow players to customize their token (X, O, name, picture, avatar etc)
// Get inventive with your styling ** use CSS effects, animations or HTML canvas API to spiff things up
// Use LocalStorage or SessionStorage to persist data locally to allow games to continue after page refresh or loss of internet connectivity
// Be creative! Bend the rules and give it a twist!
