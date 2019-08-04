/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLoBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/



// Game Logic Controller
var gameController = (function () {

    var data = {
        scores: [0, 0],
        globalScores: [0, 0],
        roundScore: 0,
        currentActivePlayer: 0,
        gamePlaying: true
    };



    // Next Player
    var nextPlayer = function () {
        var activePlayer, roundScore;

        activePlayer = data.currentActivePlayer;
        data.roundScore = 0;

        document.getElementById('current-' + activePlayer).textContent = '0';
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;


        data.currentActivePlayer = activePlayer;
        data.scores[activePlayer] = 0;

        document.querySelector('.dice').style.display = 'none';

        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.remove('active');

        document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');

    };

    return {

        // Get Active Current Player
        getCurrentActivePlayer: function () {
            return data.currentActivePlayer;
        },

        getCurrentPlayerScore: function (currentActivePlayer) {
            return data.scores[currentActivePlayer];
        },

        getRoundScore: function () {
            return data.roundScore;
        },

        getNextPlayer: function () {
            return nextPlayer();
        },

        getGameStatus: function () {
            return data.gamePlaying;
        },

        getGlobalScore: function (currentPlayer) {
            return data.globalScores[currentPlayer];
        },

        // Reset Game
        resetGame: function () {

            return data = {
                scores: [0, 0],
                globalScores: [0, 0],
                roundScore: 0,
                currentActivePlayer: 0,
                gamePlaying: true
            }
        },

        // Add Scores
        addScores: function (currentActive, diceValue) {
            if (diceValue !== 1) {
                var roundScore = 0;
                data.scores[currentActive] += diceValue;
                roundScore = data.scores[currentActive];
                document.getElementById('current-' + currentActive).textContent = roundScore;
                console.log(data.scores[0]);
            } else {
                nextPlayer();
            }
        },

        // Dice Values
        diceVal: function () {
            var dice = Math.floor(Math.random() * 6) + 1;
            return dice;
        },

        // Update Global Score
        updateGlobalScore: function (roundScore, currentPlayer) {
            data.globalScores[currentPlayer] += roundScore;
        },

        // If Game Ends
        gameStatusFalse: function () {
            data.gamePlaying = false;
        },

        // Final Score
        getFinalScore: function (finalScore) {
            if (finalScore < 10 || finalScore === null || finalScore === '' || finalScore === NaN) {
                return finalScore = 10;
            } else {
                console.log("returned final score");
                return finalScore;
            }
        },


    }

})();




// UI Controller
var UIConroller = (function () {

    // Declaring Variables
    var DOMStrings, gameInit, nodeListForEach;

    DOMStrings = {
        diceBtn: '.btn-roll',
        holdBtn: '.btn-hold',
        newGameBtn: '.btn-new',
        dice: '.dice',
        currentScorePlayer1: 'current-0',
        currentScorePlayer2: 'current-1',
        globalScorePlayer1: 'score-0',
        globalScorePlayer2: 'score-1',
        namePlayer1: 'name-0',
        namePlayer2: 'name-1',
        finalScore: '.final-score'
    };
    
    
    nodeListForEach = function (list, callback) {

        for (var i = 0; i < list.length; i++) {
            callback(list[i], i);

        }
    };

    gameInit = function () {
        var playerPanel, playerScores;

        document.querySelector(DOMStrings.dice).style.display = 'none';
        /*document.getElementById(DOMStrings.currentScorePlayer1).textContent = 0;
        document.getElementById(DOMStrings.currentScorePlayer2).textContent = 0;*/
        /*document.getElementById(DOMStrings.globalScorePlayer1).textContent = 0;
        document.getElementById(DOMStrings.globalScorePlayer2).textContent = 0;*/
        document.getElementById(DOMStrings.namePlayer1).textContent = 'Player 1';
        document.getElementById(DOMStrings.namePlayer2).textContent = 'Player 2';


        playerPanel = document.querySelectorAll('.player-panel'); 
        playerScores = document.querySelectorAll('.player-score, .player-current-score');  //player-current-score
        /*playerCurrentScore = document.querySelectorAll('.player-current-score'); */
        
        nodeListForEach(playerPanel, function(current, index){
            current.classList.remove('winner', 'active');
        });
        
        nodeListForEach(playerScores, function(current, index){
            current.textContent = 0;
        });
        
        
        
        document.querySelector('.player-0-panel').classList.add('active');

        gameController.resetGame();
    };



    // Returning Values
    return {

        // Game Init
        gameInitialSetting: function () {
            return gameInit();
        },

        // Get DOMStrings
        getDOMStrings: function () {
            return DOMStrings;
        },


        // Display Dice
        displayDice: function () {
            document.querySelector(DOMStrings.dice).style.display = 'block';
        },

        // Correct Dice Image
        getDiceImage: function (currentRoll) {
            document.querySelector(DOMStrings.dice).src = "dice-" + currentRoll + ".png";
        },

        // Update Current Score
        getCurrentScore: function (currentRoll) {
            document.getElementById("current-" + gameController.getCurrentActivePlayer()).textContent = currentRoll;
        },

        // Show Global Score
        displayGlobalScore: function (currentPlayer, currentPlayerGlobalScore) {
            document.getElementById("score-" + currentPlayer).textContent = currentPlayerGlobalScore;
        },

        // Show Game Winner
        displayGameWinner: function (currentPlayer, currentPlayerGlobalScore) {
            var finalScoreInput, finalScore;

            // Get Final Score
            finalScoreInput = document.querySelector(DOMStrings.finalScore).value;
            finalScore = gameController.getFinalScore(finalScoreInput);

            if (currentPlayerGlobalScore > finalScore) {
                document.getElementById("name-" + currentPlayer).textContent = "Winner!";

                document.querySelector('.player-' + currentPlayer + '-panel').classList.remove('active');
                document.querySelector('.player-' + currentPlayer + '-panel').classList.add('winner');
                document.getElementById('name-' + currentPlayer).textContent = 'Winner!';
                document.querySelector('.dice').style.display = 'none';

                document.querySelector('.player-0-panel').classList.remove('winner');
                document.querySelector('.player-1-panel').classList.remove('winner');
                document.querySelector('.player-0-panel').classList.remove('active');
                document.querySelector('.player-1-panel').classList.remove('active');

                document.querySelector('.player-' + currentPlayer + '-panel').classList.add('winner');

                gameController.gameStatusFalse();
            }
        },


    };

})();

// Main Controller
var controller = (function (UICtrl, gameCtrl) {


    // Calling Strings from UICtrl
    var DOM = UICtrl.getDOMStrings();


    // Event Listeners
    var setupEventListeners = function () {
        document.querySelector(DOM.diceBtn).addEventListener('click', rollDice);
        document.querySelector(DOM.holdBtn).addEventListener('click', holdDice);
        document.querySelector(DOM.newGameBtn).addEventListener('click', newGame);
    };


    // Roll Dice
    var rollDice = function () {
        var isGamePlaying = gameCtrl.getGameStatus();
        if (isGamePlaying) {
            console.log('Dice is rolled');

            // Getting Random Dice Value Generated
            var diceInput = gameCtrl.diceVal();

            // Display Dice
            UICtrl.displayDice();

            // Consoling Current Dice
            console.log("Current Dice " + diceInput);

            // Showing Correct Dice Image
            UICtrl.getDiceImage(diceInput);

            // Updating Players' Current Score
            UICtrl.getCurrentScore(diceInput);

            // Adding Scores
            gameCtrl.addScores(gameCtrl.getCurrentActivePlayer(), diceInput);

        }
    };


    // Hold Dice 
    var holdDice = function () {
        var isGamePlaying = gameCtrl.getGameStatus();
        console.log("Status is " + gameCtrl.getGameStatus());


        if (isGamePlaying) {
            console.log('Dice is on Hold now');
            var currentPlayer, currentPlayerScore, globalScore;

            currentPlayer = gameCtrl.getCurrentActivePlayer();
            currentPlayerScore = gameCtrl.getCurrentPlayerScore(currentPlayer);

            // Update Global Score on Hold
            gameCtrl.updateGlobalScore(currentPlayerScore, currentPlayer);

            // Receiving Global Score
            globalScore = parseInt(gameCtrl.getGlobalScore(currentPlayer));

            // Display Global Score in UI
            UICtrl.displayGlobalScore(currentPlayer, globalScore);

            // Display Winner if it reaches Score
            UICtrl.displayGameWinner(currentPlayer, globalScore);

            // Move to Next Player on Hold
            gameCtrl.getNextPlayer();

        }

    };


    // New Game
    var newGame = function () {
        console.log('New Game has stated now');
        UICtrl.gameInitialSetting();
    };


    // Returning Values
    return {
        init: function () {
            console.log("App is started");
            setupEventListeners();
            UICtrl.gameInitialSetting();
        },
    }

})(UIConroller, gameController);


// App Init
controller.init();
