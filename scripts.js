// This is the player object that will be used to generate player 1 and 2.
const Player = (name, sign) => {
    // `this` is used so that you can get the name or sign of each created Player object respectively.
    this.name = name;
    this.sign = sign;

    // object method that returns the sign of the Player object.
    const getSign = () => {
        return sign
    };

    const getName = () => {
        return name;
    };

    //return getSign method so that it's available.
    return { getSign, getName }
};

let Player1 = Player("Player1", "X");
let Player2 = Player("Player2", "O");

const gameBoard = (() => {
    let gameBoardArray = [{ location: "L1", status: "" }, { location: "L2", status: "" },
    { location: "L3", status: "" }, { location: "M1", status: "" }, { location: "M2", status: "" },
    { location: "M3", status: "" }, { location: "R1", status: "" }, { location: "R2", status: "" },
    { location: "R3", status: "" }];

    const resetGame = () => {
        for (let i = 0; i < gameBoardArray.length; i++) {
            gameBoardArray[i].status = "";
            displayController._updateBoard(i);
        }
        gameController.resetGameController();
        return;
    }

    const changeStatus = (location, sign) => {
        for (let i = 0; i < gameBoardArray.length; i++) {
            if (gameBoardArray[i].location === location) {
                gameBoardArray[i].status = sign;
                displayController._updateBoard(i)
                console.log(gameBoardArray);
                break;
            }
        }
    }

    const getStatus = (index) => {
        return gameBoardArray[index].status;
    }
    return { changeStatus, getStatus, resetGame }
})();

// This module sets up the game board and functionality for it as well.
const gameController = ((p1, p2) => {
    //TODO: When you submit names make the left one be an X and right one be an O. Make the input boxes be P1 and P2 and set that variable in the let player1 and let player2 assignments below.
    p1 = Player1;
    p2 = Player2
    let round = 1;
    let gameOver = false;
    const displayedMessage = document.getElementById("displayedMessage");
    const playRound = (location) => {
        let p1Name = p1.getName();
        let p2Name = p2.getName();
        // insert checks here for if the game is done (win conditions and max round)
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
    }

    const isGameOver = () => {
        let statusArray = [];
        for (let i = 0; i < 9; i++) {
            statusArray.push(gameBoard.getStatus(i));
        }


        if ((statusArray[0] === "X" && statusArray[1] === "X" && statusArray[2] === "X") || (statusArray[3] === "X" && statusArray[4] === "X" && statusArray[5] === "X") || (statusArray[6] === "X" && statusArray[7] === "X" && statusArray[8] === "X") || (statusArray[0] === "X" && statusArray[4] === "X" && statusArray[8] === "X") || (statusArray[2] === "X" && statusArray[4] === "X" && statusArray[6] === "X") || (statusArray[0] === "X" && statusArray[3] === "X" && statusArray[6] === "X") || (statusArray[1] === "X" && statusArray[4] === "X" && statusArray[7] === "X") || (statusArray[2] === "X" && statusArray[5] === "X" && statusArray[8] === "X")) {
            gameOver = true;
            displayedMessage.textContent = `${p1.getName()} Won!`;
        }

        if ((statusArray[0] === "O" && statusArray[1] === "O" && statusArray[2] === "O") || (statusArray[3] === "O" && statusArray[4] === "O" && statusArray[5] === "O") || (statusArray[6] === "O" && statusArray[7] === "O" && statusArray[8] === "O") || (statusArray[0] === "O" && statusArray[4] === "O" && statusArray[8] === "O") || (statusArray[2] === "O" && statusArray[4] === "O" && statusArray[6] === "O") || (statusArray[0] === "O" && statusArray[3] === "O" && statusArray[6] === "O") || (statusArray[1] === "O" && statusArray[4] === "O" && statusArray[7] === "O") || (statusArray[2] === "O" && statusArray[5] === "O" && statusArray[8] === "O")) {
            gameOver = true;
            displayedMessage.textContent = `${p2.getName()} Won!`;
        }
        if (round === 10) {
            gameOver = true
            displayedMessage.textContent = `Uh oh, you tied!`;
        }
        console.log(statusArray);
        statusArray = [];
    }

    const resetGameController = () => {
        gameOver = false;
        round = 1
        displayedMessage.textContent = `${p1.getName()}'s Turn!`
    }

    return { playRound, isGameOver, resetGameController }

})();

// This module will control how the player can interact with `gameBoard`.
const displayController = (() => {
    // find the location of the square in the gameBoardArray and in the HTML grid.
    const _updateBoard = (index) => {
        const gameSquareDom = document.querySelectorAll('.gameSquare');
        gameSquareDom[index].textContent = gameBoard.getStatus(index);
    }

    return { _updateBoard }
})();

/*const playGameButton = document.getElementById("submitBtn");
playGameButton.onclick()*/

window.addEventListener("load", () => {
    const displayedMessage = document.getElementById("displayedMessage");
    displayedMessage.textContent = `${Player1.getName()}'s Turn!`
    const gameSquareDom = document.querySelectorAll('.gameSquare');
    for (let i = 0; i < gameSquareDom.length; i++) {
        gameSquareDom[i].addEventListener("click", () => {
            // TODO: will need to add checks here to make sure the game isn't over and that the Square isn't already filled
            if (gameSquareDom[i].textContent != "") {
                return
            }
            gameController.playRound(gameSquareDom[i].id);
            console.log("hi")
        })
    }
})

const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", gameBoard.resetGame);