//Declaring the variables
const gameBoard = document.querySelector(".gameBoard");
const status = document.querySelector(".gameStatus");
const userMark = document.getElementById("userScore");
const computerMark = document.getElementById("computerScore");
const round = document.querySelector(".round");
const imgResult = document.getElementById("imgResult");
const showImg = document.querySelector(".showImg");
const player = "X";
const computer = "O";
let board = ["", "", "", "", "", "", "", "", ""];
let completedBoard = false;
let userScore = 0;
let computerScore = 0;
let rounds = 0;

//function ta add sound once the player click on the chosen cell 
function playClick() {
    const clickAudio = new Audio("../assets/sounds/clickk.mp3");
    clickAudio.play();
  }
//Create playWin function to add win audio when the user win, define the path of the audio and set it to a variable
function playWin() {
    const winAudio = new Audio("../assets/sounds/win.mp3");
    winAudio.play();
}

//Create playLoose function to add loose audio when the user loose
function playLoose() {
    const looseAudio = new Audio("../assets/sounds/loose.mp3");
    looseAudio.play();
}

//Create playWin function to add tie audio when the result is tie
function playTie() {
    const tieAudio = new Audio("../assets/sounds/tie.wav");
    tieAudio.play();
}

//check if the game board is full and completed or not !!
checkBoard = () => {
    let flag = false;
    board.forEach((userType) => {
        if (userType != player && userType != computer) {
            flag = false;
        }
    });
    completedBoard = flag;
    userScore=0;
};

//check if three cells are equal and filled by player or by computer.
const checkCells = (a, b, c) => {
    return ( board[a] == board[b] && board[b] == board[c] &&
        (board[a] == player || board[a] == computer));
    };

//To check rows , columns and diagonal
const checkMatch = () => {
    for (i = 0; i < 9; i += 3) {
        if (checkCells(i, i + 1, i + 2)) {
            return board[i];
        }
    }
    for (i = 0; i < 3; i++) {
        if (checkCells(i, i + 3, i + 6)) {
            return board[i];
        }
    }
    if (checkCells(0, 4, 8)) {
        return board[0];
    }
    if (checkCells(2, 4, 6)) {
        return board[2];
    }
    return "";
};


//create playWinner function to display the winner when it's called
function playWinner(){
    setTimeout(() => {
        status.innerText = "You Won !!🎉🎉";
        imgResult.innerHTML = `<img src = "../assets/images/win.jpg">`;
        showImg.style.display = "block";
        playWin();
        completedBoard = true;}, 1500);
        setTimeout(() => {
            showImg.style.display = "none";}, 4000);
        }
//create playLost function to display that player(x) lost when it's called
function playLost(){
    setTimeout(() => {
        status.innerText = "Winner is computer, You Lost ! 😔";
        imgResult.innerHTML = `<img src = "../assets/images/lose.jpg">`;
        showImg.style.display = "block";
        playLoose();
        completedBoard = true;}, 1000);
        setTimeout(() => {
            showImg.style.display = "none";},4600);
        }
//create playTie function to display that the result is tie and no winner when it's called
function playTied(){
    setTimeout(() => {
        status.innerText = "Tie! Play again ?";
        imgResult.innerHTML = `<img src = "../assets/images/draw.gif">`;
        showImg.style.display = "block";
        playTie();
      }, 1500);
      setTimeout(() => {
        showImg.style.display = "none";
      }, 4200);
}

//create function checkGameStatus to display the result of the game
const checkGameStatus = () => {
    let result = checkMatch();
    if (result == player) {
        userScore+=1;
        userMark.innerHTML= userScore;
        computerMark.innerHTML= computerScore;
        return playWinner();
     } 
     else if (result == computer) {
      computerScore++;
      userMark.innerHTML= userScore;
      computerMark.innerHTML= computerScore;     
      return playLost();
     } 
     else if (completedBoard) {
         userMark.innerHTML= userScore;
         computerMark.innerHTML= computerScore;
         return playTied();
  }
};
// render the board
const renderBoard = () => {
    gameBoard.innerHTML = "";
    board.forEach((e, i) => {
        gameBoard.innerHTML += `<div id="cell_${i}" class="cell" onclick="playerMove(${i})">${board[i]}</div>`;
    });
};

const game = () => {
    renderBoard();
    checkBoard();
    checkGameStatus();
};
// create arrow function to make player plays on board
const playerMove = (e) => {
    if (!completedBoard && board[e] == "") {
        playClick();
        board[e] = player;
        game();
        setTimeout(() => {
            computerMove();}, 400);
        }
    };
// create arrow function to make computer choose randomly any cell is not chosen by player
const computerMove = () => {
    if (!completedBoard) {
        do {
            randomChoice = Math.floor(Math.random() * 9);
        } while (board[randomChoice] != "");
        board[randomChoice] = computer;
        game();
    }
};


// To close the showImg and to not display it all time
function clearShowImg(e) {
    if (e.target == showImg) {
        showImg.style.display = "none";
    }
}
window.addEventListener('click', clearShowImg);

//restart function to play again
const restartBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    completedBoard = false;
    userScore=0;
    computerScore= 0;
    rounds=0;
    userMark.innerHTML= userScore;
    computerMark.innerHTML= computerScore;
    //   round.innerHTML = rounds;
    status.innerText = "";
     renderBoard();
    };

//Start the Game !!
renderBoard();
