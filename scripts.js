const gameSquareDom = document.getElementsByTagName("button");
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
        for (let i = 0; i < gameBoardArray; i++) {
            if (gameBoardArray[i].location === location) {
                gameBoardArray[i].status = sign
                return displayController._updateBoard()
            }
        }
    }   

    const getStatus = (index) => {
        return gameBoardArray[index]
    }
    return { changeStatus, getStatus }
})();

// This module sets up the game board and functionality for it as well.
const gameController = (() => {
    let Player1 = Player("Mitchell", "X", true);
    let Player2 = Player("person", "O", false);
    let round = 1;
    let isGameOver = false;
    
    const playRound = (location) => {
        // insert checks here for if the game is done (win conditions and max round)
        if (round % 2 === 1) {
            let sign = Player1.sign;
            for (let i = 0; i < gameBoard.gameBoardArray.length; i++) {
                
            }
        } else {
            let sign = Player2.sign;
        }
    }
})();

// This module will control how the player can interact with `gameBoard`.
const displayController = (() => {
    // find the location of the square in the gameBoardArray and in the HTML grid.
    const _findSquare = (function () {
        window.addEventListener("load", () => {
            gameSquareDom.forEach((field) =>
                field.addEventListener("click", (e) => {
                    // TODO: will need to add checks here to make sure the game isn't over and that the Square isn't already filled
                    gameBoard.changeStatus(e.target.name, "X");
                }))
        })
    })

    const _updateBoard = () => {
        for (let i = 0; i < 0; i++) {
            gameSquareDom[i].textContent = gameBoard.getStatus[i]
        }   
    }

    return { _findSquare, _updateBoard }
})();

/*const playGameButton = document.getElementById("submitBtn");
playGameButton.onclick()*/


