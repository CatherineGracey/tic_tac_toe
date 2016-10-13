var xToken = 'X';
var oToken = 'O';
//Array of all vertical, horizontal and diagonal lines on the board by array index.
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

function isBoardFull(tokens){
  //Check if there is a token on every square of the board.
  for (var i = 0; i < tokens.length; i++){
    if (tokens[i] === ""){
      return false;
    }
  }
  return true;
}

function isThereAWinner(tokens){
  function checkLine(one, two, three){
    if (tokens[one] && tokens[one] === tokens[two] && tokens[one] === tokens[three]){
      return true;
    } else {
      return false;
    }
  }
  //Loop through all lines and see if any meet the winning condition.
  for (var i = 0; i < lines.length; i++){
    var result = checkLine(lines[i][0], lines[i][1], lines[i][2]);
    if (result){
      return true;
    }
  }
  return false;
}

function checkEndGame(tokens){
  //Check end game condition
  if (isThereAWinner(tokens) || isBoardFull(tokens)){
    return true;
  }
  return false;
}

function pickCell(tokens){
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
  //Loop through lines that could still have good placements, and place a token.
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

function processGame(data){
  if (data.currentPlayer === 2 && !checkEndGame(data.tokens)){
    var cell = pickCell(data.tokens);
    data.tokens[cell] = "O";
    data.currentPlayer = 1;
  }
  return data;
}

module.exports = {
  processGame: processGame
};
