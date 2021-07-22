// This module sets up the game board and functionality for it as well.
const gameBoard = (() => {
    let gameBoardArray = [{ L1: "empty" }, { L2: "empty" }, { L3: "empty" }, { M1: "empty" }, { M2: "empty" },
    { M3: "empty" }, { R1: "empty" }, { R2: "empty" }, { R3: "empty" }];

    //TODO: This function is probably wrong right now. Make sure you change the corresponding gameBoardArray item based on which square was clicked. Write this out
    _findSquare = (function () {
        const gameSquareDom = document.getElementsByTagName("button");
        for (let i = 0; i < gameBoardArray.length; i++) {
            console.log(gameSquareDom);
            gameSquareDom.onClick = () => {
                // grab title of gamesquaredom
                let location = gameSquareDom.title;
                for (let i = 0; i < gameBoardArray.length; i++) {
                    console.log(gameBoardArray[i])
                    if (location === gameBoardArray[i]) {
                        indexOfSquare = i;
                        return;
                    } else {
                        console.log("Couldn't find location in array.");
                        return;
                    }
                }
            }
        }
    })()
    // compare that title against gameboardarray

    // return the index location of the gameboardarray value to a function that will check the value and change the value and add the game piece
    /*
    _changeSquare = (function (index) {
        if (gameSquareDom[i].title !== "empty") {
            return;
        } else if (Player1 === "active") {
            gameSquareDom[i] = "x";
        } else {
            gameSquareDom[i] = "o";
        }
    })() */
})();

// This module will control how the player can interact with `gameBoard`.
const displayController = (() => {

})();

// TODO: maybe add color as a property for Player in the future. Would change the color of the X and O

// This is the player object that will be used to generate player 1 and 2.
const Player = (name) => {
    const getName = () => name;
};



