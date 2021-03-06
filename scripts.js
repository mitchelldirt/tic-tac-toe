// This is the player object that will be used to generate player 1 and 2.
const Player = (name, sign) => {
    // `this` is used so that you can get the name or sign of each created Player object respectively.
    this.name = name;
    this.sign = sign;

    // object method that returns the sign of the Player object.
    const getSign = () => {
        return sign
    };

    // getName is used for displaying the players turn each round indicating that it's there round.
    const getName = () => {
        return name;
    };

    // setName changes the name from Player1 or Player2 to whatever name the user inputs.
    const setName = (newName) => {
        name = newName;
    }
    //return getSign method so that it's available.
    return { getSign, getName, setName }
};

// Declaring default player objects in case the user hits submit without actually entering names.
let Player1 = Player("Player1", "X");
let Player2 = Player("Player2", "O");

const gameDisplay = document.getElementById("gameDisplay");
const playerSelectScreen = document.getElementById("playerSelect");
const submitButton = document.getElementById("submitBtn");

submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    const player1Name = document.getElementById("Player1");
    const player2Name = document.getElementById("Player2");
    if (player1Name.value === "") {
        player1Name.value = "Player1"
    } else {
        Player1.setName(player1Name.value);
    }

    if (player2Name.value === "") {
        player2Name.value = "Player2"
    } else {
        Player2.setName(player2Name.value);
    }

    playerSelectScreen.classList.toggle("displayNone");
    gameDisplay.classList.toggle("displayNone");
    const displayedMessage = document.getElementById("displayedMessage");
    displayedMessage.textContent = `${Player1.getName()}'s Turn!`
});

const gameBoard = (() => {
    /* location is used to pick out square on the board and status is used to 
     update the board in the `_updateBoard()` function */
    let gameBoardArray = [{ location: "L1", status: "" }, { location: "L2", status: "" },
    { location: "L3", status: "" }, { location: "M1", status: "" }, { location: "M2", status: "" },
    { location: "M3", status: "" }, { location: "R1", status: "" }, { location: "R2", status: "" },
    { location: "R3", status: "" }];

    /* resets the array and visible board but keeps the same players active. 
    It then calls `resetGameController()` to reset the backend game functionality. */
    const resetGame = () => {
        for (let i = 0; i < gameBoardArray.length; i++) {
            gameBoardArray[i].status = "";
            displayController._updateBoard(i);
        }
        gameController.resetGameController();
        return;
    };

    // changes the status in `gameBoardArray`
    const changeStatus = (location, sign) => {
        for (let i = 0; i < gameBoardArray.length; i++) {
            if (gameBoardArray[i].location === location) {
                gameBoardArray[i].status = sign;
                displayController._updateBoard(i)
                console.log(gameBoardArray);
                break;
            }
        }
    };

    // grabs status so that the status can be updated. Used in `_updateBoard()`
    const getStatus = (index) => {
        return gameBoardArray[index].status;
    };

    return { changeStatus, getStatus, resetGame }
})();

// This module sets up the game board and functionality for it as well.
const gameController = ((p1, p2) => {
    p1 = Player1;
    p2 = Player2;
    let round = 1;
    let gameOver = false;
    const displayedMessage = document.getElementById("displayedMessage");
    /* This controls the turn based play, checks if the game is over, and 
    changes the display message for which player is active */
    const playRound = (location) => {
        let p1Name = p1.getName();
        let p2Name = p2.getName();
        if (gameOver === true) {
            return;
        }
        else if (round % 2 === 1) {
            let sign = Player1.getSign();
            gameBoard.changeStatus(location, sign)
            round++
            displayedMessage.textContent = `${p2Name}'s Turn!`;
        } else {
            let sign = Player2.getSign();
            gameBoard.changeStatus(location, sign)
            round++;
            displayedMessage.textContent = `${p1Name}'s Turn!`;
        }
        isGameOver();
    };

    // checks if the game uis over or not
    const isGameOver = () => {
        let statusArray = [];
        for (let i = 0; i < 9; i++) {
            statusArray.push(gameBoard.getStatus(i));
        };

        // Below code is a little cringe. Try and ignore it lol
        if ((statusArray[0] === "X" && statusArray[1] === "X" && statusArray[2] === "X") || (statusArray[3] === "X" && statusArray[4] === "X" && statusArray[5] === "X") || (statusArray[6] === "X" && statusArray[7] === "X" && statusArray[8] === "X") || (statusArray[0] === "X" && statusArray[4] === "X" && statusArray[8] === "X") || (statusArray[2] === "X" && statusArray[4] === "X" && statusArray[6] === "X") || (statusArray[0] === "X" && statusArray[3] === "X" && statusArray[6] === "X") || (statusArray[1] === "X" && statusArray[4] === "X" && statusArray[7] === "X") || (statusArray[2] === "X" && statusArray[5] === "X" && statusArray[8] === "X")) {
            gameOver = true;
            displayedMessage.textContent = `${p1.getName()} Won!`;
            return;
        }

        if ((statusArray[0] === "O" && statusArray[1] === "O" && statusArray[2] === "O") || (statusArray[3] === "O" && statusArray[4] === "O" && statusArray[5] === "O") || (statusArray[6] === "O" && statusArray[7] === "O" && statusArray[8] === "O") || (statusArray[0] === "O" && statusArray[4] === "O" && statusArray[8] === "O") || (statusArray[2] === "O" && statusArray[4] === "O" && statusArray[6] === "O") || (statusArray[0] === "O" && statusArray[3] === "O" && statusArray[6] === "O") || (statusArray[1] === "O" && statusArray[4] === "O" && statusArray[7] === "O") || (statusArray[2] === "O" && statusArray[5] === "O" && statusArray[8] === "O")) {
            gameOver = true;
            displayedMessage.textContent = `${p2.getName()} Won!`;
            return;
        }
        // If it's round 10 then all squares are full.
        if (round === 10) {
            gameOver = true
            displayedMessage.textContent = `Uh oh, you tied!`;
        }
        console.log(statusArray);
        statusArray = [];
    };

    // Resets the game 
    const resetGameController = () => {
        gameOver = false;
        round = 1
        displayedMessage.textContent = `${p1.getName()}'s Turn!`
    };

    return { playRound, isGameOver, resetGameController }

})();

// This module will control how the player can interact with `gameBoard`.
const displayController = (() => {
    // find the location of the square in the gameBoardArray and in the HTML grid.
    const _updateBoard = (index) => {
        const gamePiece = document.querySelectorAll('.gameSquare > p');
        gamePiece[index].textContent = gameBoard.getStatus(index);
    };

    return { _updateBoard }
})();

// When the page loads it adds the event listeners to each tic tac toe square.
window.addEventListener("load", () => {
    const gameSquareDom = document.querySelectorAll('.gameSquare');
    const gamePiece = document.querySelectorAll('.gameSquare > p');

    for (let i = 0; i < gameSquareDom.length; i++) {
        gameSquareDom[i].addEventListener("click", () => {
            // TODO: will need to add checks here to make sure the game isn't over and that the Square isn't already filled
            if (gamePiece[i].textContent != "") {
                return
            }
            gameController.playRound(gameSquareDom[i].id);
            console.log("hi")
        })
    };
});

const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", gameBoard.resetGame);
