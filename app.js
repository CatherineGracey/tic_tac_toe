var gameBoard;
var inPlay = false;
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

function getPlayers(event){
  inPlay = true;
  if (event.target.id === "one-player"){
    playBot = true;
  } else {
    playBot = false;
  }
  document.getElementById("select-players").style.display = "none";
  document.getElementsByClassName("scores")[0].style.display = "block";
}

function endGame(result){
  inPlay = false;
  var resultDiv = document.createElement("div");
  resultDiv.className = "result";
  var replayButton = document.createElement("button");
  var buttonText = document.createTextNode("Replay");
  replayButton.appendChild(buttonText);
  replayButton.addEventListener("click", resetBoard);
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
    text = "Everyone lives to fight another day."
  }
  var resultText = document.createTextNode(text);
  resultDiv.appendChild(resultText);
  resultDiv.appendChild(replayButton);
  document.getElementsByClassName("wrapper")[0].appendChild(resultDiv);
  document.getElementById("player-one").innerHTML = scores[0];
  document.getElementById("player-two").innerHTML = scores[1];
}

function isBoardFull(){
  var full = true;
  for (var i = 0; i < gameBoard.length; i++){
    if (gameBoard[i].innerHTML === ""){
      full = false;
      break;
    }
  }
  if (full){
    endGame(false);
  }
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
        scores[0]++
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
  } else {
    isBoardFull();
  }
  switchPlayer();
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

function pickCell(){
  var tokens = getValues();
  var opponent = false;
  var potentialLines = [];
  function canLineWin(one, two, three){
    var placed = 0;
    for (var i = 0; i < arguments.length; i++){
      if (tokens[arguments[i]]){
        placed++;
      }
    }
    //If line is full already, line can be ignored
    if (placed === 3){
      return false;
    }
    if (placed === 2){
      //If line has two matching tokens and one gap, line must be filled
      if (tokens[one] === tokens[two] || tokens[one] === tokens[three] || tokens[two] === tokens[three]){
        //Is this playBot's line or the human player's line?
        if (tokens[one] === xToken || tokens[one] === xToken || tokens[two] === xToken){
          //Save the opponent's winning line in the variable but keep checking other lines.
          if (!tokens[one]){
            opponent = one;
          } else if (!tokens[two]){
            opponent = two;
          } else {
            opponent = three;
          }
          return false;
        } else {
          //PlayBot can win, so return the winning location.
          if (!tokens[one]){
            return one;
          } else if (!tokens[two]){
            return two;
          } else {
            return three;
          }
        }
      }
      //If line has mismatched tokens, even with gaps, line can be ignored
      else if (tokens[one] !== tokens[two] && tokens[one] !== tokens[three] && tokens[two] !== tokens[three]){
        return false;
      }
    }
    //Line is not an obvious choice, but has potential
    if (tokens[one] !== xToken && tokens[two] !== xToken && tokens[three] !== xToken){
      potentialLines.push(arguments);
    }
  }
  //Loop through lines to see if there is a potential winning line.
  for (var i = 0; i < lines.length; i++){
    var place = canLineWin(lines[i][0], lines[i][1], lines[i][2]);
    if (place){
      return place;
    }
  }
  //If the opponent can win, block them.
  if (opponent){
    return opponent;
  }
  for (i = 0; i < potentialLines.length; i++){
    for (var j = 0; j < potentialLines[i].length; j++){
      var cell = potentialLines[i][j];
      if (!tokens[cell]){
        return cell;
      }
    }
  }
  //No obvious line, so place token in the first free position.
  for (i = 0; i < tokens.length; i++){
    if (!tokens[i]){
      return i;
    }
  }
}

function placeToken(ai){
  //Only place tokens if the game is in play
  if (inPlay){
    //Check that the cell is empty before allowing the player to place a token.
    if (ai === "AI"){
      var cell = pickCell();
      gameBoard[cell].innerHTML = oToken;
      gameBoard[cell].className = "filled";
      checkEndGame();
    } else if (!event.target.innerHTML){
      //Place the token of the current player then switch the player
      if (currentPlayer === 1){
        event.target.innerHTML = xToken;
      } else {
        event.target.innerHTML = oToken;
      }
      event.target.className = "filled";
      checkEndGame();
    }
  }
}

function switchPlayer(){
  if (currentPlayer === 1){
    currentPlayer = 2;
    if (playBot){
      placeToken("AI");
    }
  } else {
    currentPlayer = 1;
  }
}

function resetBoard(){
  for (var i = 0; i < gameBoard.length; i++){
    gameBoard[i].innerHTML = "";
    gameBoard[i].className = "cell";
  }
  inPlay = true;
  var resultDiv = document.getElementsByClassName("result")[0];
  resultDiv.parentNode.removeChild(resultDiv);
  if (playBot && currentPlayer === 2){
    placeToken("AI");
  }
}

window.onload = function(){
  //Get the game board
  gameBoard = document.getElementById("board");
  gameBoard.addEventListener("click", placeToken);
  //Assign cells to global variable
  gameBoard = gameBoard.children;
  //Get second player type
  document.getElementById("select-players").addEventListener("click", getPlayers);
};
