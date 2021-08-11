// This is the player object that will be used to generate player 1 and 2.
const Player = (name, sign, active) => {
    // `this` is used so that you can get the name or sign of each created Player object respectively.
    this.name = name;
    this.sign = sign;
    this.active = active;

    // object method that returns the sign of the Player object.
    const getSign = () => {
        return sign
    };

    //return getSign method so that it's available.
    return { getSign }
};

const gameBoard = (() => {
    let gameBoardArray = [{ location: "L1", status: "" }, { location: "L2", status: "" },
    { location: "L3", status: "" }, { location: "M1", status: "" }, { location: "M2", status: "" },
    { location: "M3", status: "" }, { location: "R1", status: "" }, { location: "R2", status: "" },
    { location: "R3", status: "" }];

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
    return { changeStatus, getStatus }
})();

// This module sets up the game board and functionality for it as well.
const gameController = (() => {
    let Player1 = Player("Mitchell", "X");
    let Player2 = Player("person", "O");
    let round = 1;

    const playRound = (location) => {
        // insert checks here for if the game is done (win conditions and max round)
        if (round % 2 === 1) {
            let sign = Player1.getSign();
            gameBoard.changeStatus(location, sign)
            round++
        } else {
            let sign = Player2.getSign();
            gameBoard.changeStatus(location, sign)
            round++;
        }
        isGameOver();
    }

    const isGameOver = () => {
        let statusArray = [];
        for (let i = 0; i < 9; i++) {
            statusArray.push(gameBoard.getStatus(i));
        }

        if (round === 9) {
            return console.log("both players tied");
        }
        console.log(statusArray);
        statusArray = [];
    }
    return { playRound, isGameOver }

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
