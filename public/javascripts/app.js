var gameBoard;
var inPlay = true;
var currentPlayer = 1;
var scores = [0, 0];
var playBot = false;
//X image source: https://pixabay.com/en/dragon-green-chinese-winged-animal-29761/
var xToken = '<img src="images/dragon-29761.svg" alt="X">';
//O image source: https://pixabay.com/en/knight-sword-armed-shield-combat-156986/
var oToken = '<img src="images/knight-156986.svg" alt="O">';
var lines = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

//Seerver connectivity functions.

var socket = io();

socket.on("gameUpdate", function(data){
  currentPlayer = data.currentPlayer;
  fillTokens(data.tokens);
  checkEndGame();
});

function sendToServer(){
  var tokens = getValues();
  for (var i = 0; i < tokens.length; i++){
    //Strip styling out of tokens before sending to the server.
    if (tokens[i] === xToken){
      tokens[i] = "X";
    } else if (tokens[i] === oToken){
      tokens[i] = "O";
    }
  }
  socket.emit("gameUpdate", {tokens: tokens, currentPlayer: currentPlayer});
}

//Display functions

function fillTokens(tokens){
  for (var i = 0; i < gameBoard.length; i++){
    if (tokens[i] === "X"){
      if (gameBoard[i].innerHTML !== xToken){
        gameBoard[i].innerHTML = xToken;
        gameBoard[i].className = "filled";
      }
    } else if (tokens[i] === "O"){
      if (gameBoard[i].innerHTML !== oToken){
        gameBoard[i].innerHTML = oToken;
        gameBoard[i].className = "filled";
      }
    } else {
      if (gameBoard[i].innerHTML !== ""){
        gameBoard[i].innerHTML = "";
        gameBoard[i].className = "cell";
      }
    }
  }
}

function endGame(result){
  inPlay = false;
  document.getElementById("result").style.display = "block";
  var text;
  if (result){
    if (result === xToken){
      text = "Player One has eaten Player Two.";
    } else if (playBot){
      text = "The computer player has slain you.";
    } else {
      text = "Player Two has slain Player One.";
    }
  } else {
    text = "Everyone lives to fight another day.";
  }
  document.getElementById("result-text").innerHTML = text;
  document.getElementById("player-one").innerHTML = scores[0];
  document.getElementById("player-two").innerHTML = scores[1];
}

function showWinningLine(one, two, three){
  setTimeout(function(){
    gameBoard[one].className = "win";
    gameBoard[two].className = "win";
    gameBoard[three].className = "win";
  }, 100);
}

function resetBoard(){
  fillTokens(["", "", "", "", "", "", "", "", ""]);
  inPlay = true;
  document.getElementById("result").style.display = "hidden";
  sendToServer();
}

window.onload = function(){
  //Get the game board
  gameBoard = document.getElementById("board");
  gameBoard.addEventListener("click", placeToken);
  //Assign cells to global variable
  gameBoard = gameBoard.children;
  document.getElementsByTagName("button")[0].addEventListener("click", resetBoard);
};

//Gameplay functions

function isBoardFull(){
  for (var i = 0; i < gameBoard.length; i++){
    if (gameBoard[i].innerHTML === ""){
      return false;
    }
  }
  return true;
}

function isThereAWinner(){
  var tokens = getValues();
  function checkLine(one, two, three){
    if (tokens[one] && tokens[one] === tokens[two] && tokens[one] === tokens[three]){
      showWinningLine(one, two, three);
      return tokens[one];
    } else {
      return false;
    }
  }
  for (var i = 0; i < lines.length; i++){
    var result = checkLine(lines[i][0], lines[i][1], lines[i][2]);
    if (result){
      if (result === xToken){//Player One wins
        scores[0]++;
      } else {//Player Two wins
        scores[1]++;
      }
      return result;
    }
  }
  return false;
}

function checkEndGame(){
  //Check end game condition
  var win = isThereAWinner();
  if (win){//Game has been won, so show winning end message.
    endGame(win);
    return true;
  } else if (isBoardFull()) {//Game has tied, so show tie end message.
    endGame(false);
    return true;
  }
  //Game is stil in progres.
  return false;
}

function getValues(){
  var tokens = [];
  //Extract tokens from the board and add them to tokens array for ease of checking
  for (var i = 0; i < gameBoard.length; i++){
    var token = gameBoard[i].innerHTML;
    tokens.push(token);
  }
  return tokens;
}

function placeToken(event){
  //Only place tokens if the game is in play
  if (inPlay && currentPlayer === 1){
    //Check that the cell is empty before allowing the player to place a token.
    if (event.target.className === "cell"){
      //Place the token of the current player then switch the player
      if (currentPlayer === 1){
        event.target.innerHTML = xToken;
      } else {
        event.target.innerHTML = oToken;
      }
      event.target.className = "filled";
      currentPlayer = 2;
      sendToServer();
    }
  }
}
