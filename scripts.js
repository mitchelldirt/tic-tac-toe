// This module sets up the game board and functionality for it as well.
const gameBoard = (() => {
    let gameBoardArray = [{ L1: "empty" }, { L2: "empty" }, { L3: "empty" }, { M1: "empty" }, { M2: "empty" },
    { M3: "empty" }, { R1: "empty" }, { R2: "empty" }, { R3: "empty" }];
    const gameSquareDom = document.getElementsByClassName("gameSquare");

    //TODO: This function is probably wrong right now. Make sure you change the corresponding gameBoardArray item based on which square was clicked. Write this out
    _addGamePiece = (function (gameSquareDom) {
        for (let i = 0; i < gameSquareDom.length; i++) {
            gameSquareDom.onClick = () => {
                if (gameSquareDom[i] !== "empty") {
                    break;
                } else if (Player1 === "active") {
                    gameSquareDom[i] = "x"
                } else {
                    gameSquareDom[i] = "o"
                }
            }
        }
    })

})();

// This module will control how the player can interact with `gameBoard`.
const displayController = (() => {

})();

// TODO: maybe add color as a property for Player in the future. Would change the color of the X and O

// This is the player object that will be used to generate player 1 and 2.
const Player = (name) => {
    const getName = () => name;
};



