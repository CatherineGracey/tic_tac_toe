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
var socket = io();
socket.on("gameUpdate", function(data){
  console.log("gameUpdate received:", data);
  console.log(currentPlayer);
  currentPlayer = data.currentPlayer;
  fillTokens(data.tokens);
  console.log(currentPlayer);
  checkEndGame();
});

function fillTokens(tokens){
  for (var i = 0; i < gameBoard.length; i++){
    if (tokens[i] === "X"){
      gameBoard[i].innerHTML = xToken;
      gameBoard[i].className = "filled";
    } else if (tokens[i] === "O"){
      gameBoard[i].innerHTML = oToken;
      gameBoard[i].className = "filled";
    } else {
      gameBoard[i].innerHTML = "";
      gameBoard[i].className = "cell";
    }
  }
}

function sendToServer(){
  var tokens = getValues();
  for (var i = 0; i < tokens.length; i++){
    if (tokens[i] === xToken){
      tokens[i] = "X";
    } else if (tokens[i] === oToken){
      tokens[i] = "O";
    }
  }
  if (!checkEndGame()){
    currentPlayer = 2;
  }
  socket.emit("gameUpdate", {tokens: tokens, currentPlayer: currentPlayer});
  console.log(currentPlayer);
}

// function getPlayers(event){
//   inPlay = true;
//   if (event.target.id === "one-player"){
//     playBot = true;
//   } else {
//     playBot = false;
//   }
//   sendToServer();
//   document.getElementById("select-players").style.display = "none";
//   document.getElementsByClassName("scores")[0].style.display = "block";
// }

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
  var resultText = document.getElementById("result-text").innerHTML = text;
  document.getElementById("player-one").innerHTML = scores[0];
  document.getElementById("player-two").innerHTML = scores[1];
}

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
      gameBoard[one].className = "win";
      gameBoard[two].className = "win";
      gameBoard[three].className = "win";
      return tokens[one];
    } else {
      return false;
    }
  }
  for (i = 0; i < lines.length; i++){
    var result = checkLine(lines[i][0], lines[i][1], lines[i][2]);
    if (result){
      if (result === xToken){
        scores[0]++;
      } else {
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
  if (win){
    endGame(win);
    return true;
  } else if (isBoardFull()) {
    endGame(false);
    return true;
  }
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
    // if (ai === "AI"){
    //   var cell = pickCell();
    //   gameBoard[cell].innerHTML = oToken;
    //   gameBoard[cell].className = "filled";
    //   checkEndGame();
    // } else
    if (event.target.className === "cell"){
      //Place the token of the current player then switch the player
      if (currentPlayer === 1){
        event.target.innerHTML = xToken;
      } else {
        event.target.innerHTML = oToken;
      }
      event.target.className = "filled";
      sendToServer();
    }
  }
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
