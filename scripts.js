// This module sets up the game board and functionality for it as well.
const gameBoard = (() => {
    let gameBoardArray = [{ location: "L1", status: "empty" }, { location: "L2", status: "empty" },
    { location: "L3", status: "empty" }, { location: "M1", status: "empty" }, { location: "M2", status: "empty" },
    { location: "M3", status: "empty" }, { location: "R1", status: "empty" }, { location: "R2", status: "empty" },
    { location: "R3", status: "empty" }];

    _findSquare = (function () {
        window.addEventListener("load", function (event) {
            const gameSquareDom = document.getElementsByTagName("button");
            for (let i = 0; i < gameBoardArray.length; i++) {
                console.log(gameSquareDom[i]);
                gameSquareDom[i].addEventListener("click", () => {
                    // grab title of gamesquaredom
                    let location = gameSquareDom[i].id;
                    for (let i = 0; i < gameBoardArray.length; i++) {
                        console.log(gameBoardArray[i])
                        if (location === gameBoardArray[i].location) {
                            indexOfSquare = i;
                            return gameBoard._changeSquare(indexOfSquare, location);
                        } else {
                            console.log("Couldn't find location in array.");
                        }
                    }
                })
            }
        }
        );
    })()

    /* Check if the square already has a 'x' or an 'o'. If it doesn't add it in the object status property based 
    on which players turn it is. */
    _changeSquare = (function (indexOfSquare, location) {
        const currentSquare = gameBoardArray[indexOfSquare]
        const locationOfSquare = document.getElementById(location)
        if (currentSquare.status === "empty") {
            if (Player1.active === true) {
                currentSquare.status = "X";
                const X = document.createElement("img");
                X.src = "./imgs/xPicture.png";
                locationOfSquare.appendChild(X);
                Player1.active = false;
                Player2.active = true;
            } else {
                currentSquare.status = "O"
                const O = document.createElement("img");
                O.src = "./imgs/oCircle.png";
                locationOfSquare.appendChild(O);
                Player2.active = false;
                Player1.active = true;
            }
        } else {
            return;
        }
    })()

    // Add the 'x' or the 'o' image to the correct location on the board
    _addMarker = (function () {

    })()

    return {
        _findSquare,
        _changeSquare
    }
})();

// This module will control how the player can interact with `gameBoard`.
const displayController = (() => {
    // Start the game by setting the active player (player1).
    _startOfGame = (function () {

    })()

    /* Checks if a player has won the game. (use a switch statement here). return to the change player function
    unless a player won the game then go to the '_endOfGame' function. */
    _hasPlayerWon = (function () {

    })()

    // Displays the player that won. Adds a reset button which sets you back to the player set screen.
    _endOfGame = (function () {

    })()
    // Changes which player is active based on which player is *currently* active.
    _changePlayer = (function () {

    })()
})();

// TODO: maybe add color as a property for Player in the future. Would change the color of the X and O

// This is the player object that will be used to generate player 1 and 2.
const Player = (name) => {
    const getName = () => name;
};



