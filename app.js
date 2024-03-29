/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLoBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*
New Updates:

- Winning score Input where we can define and play. If there is no input or less than 10, then game should not start.
- Players Name. If no name is selected, it will be Player 1 and Player 2.
- Alerts - After selecting Winner Score, After reaching winning score in current round so that player can hold and win.
*/



// Game Logic Controller
var gameController = (function () {

    var data, nextPlayer, nodeListForEach;

    data = {
        scores: [0, 0],
        globalScores: [0, 0],
        playersName: ['Player 1', 'Player 2'],
        currentActivePlayer: 0,
        gamePlaying: false
    };


    // Nodelist as Array
    nodeListForEach = function (list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };


    // Next Player
    nextPlayer = function () {
        var activePlayer, playerPanel;

        activePlayer = data.currentActivePlayer;

        data.scores[activePlayer] = 0;
        
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

        data.currentActivePlayer = activePlayer;

        document.querySelector('.dice').style.display = 'none';

        playerPanel = document.querySelectorAll('.player-panel');

        nodeListForEach(playerPanel, function (current, index) {
            current.classList.remove('winner', 'active');
        });

        document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
        document.getElementById('current-1').textContent = 0;
        document.getElementById('current-0').textContent = 0;

    };

    // Returning Functions
    return {

        // Node List as Array
        nodeListForEach: function (list, callback) {
            return nodeListForEach(list, callback);
        },

        // Add Scores
        addScores: function (currentActive, diceValue) {
            if (diceValue !== 1) {
                var roundScore = 0;
                data.scores[currentActive] += diceValue;
                roundScore = data.scores[currentActive];
                console.log("[addScores] Round Score of Current Active is " + data.scores[currentActive]);

                return roundScore;

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

        // Final Score
        finalScoreInput: function () {
            var finalScore = document.querySelector('.final-score').value;
            finalScore = parseInt(finalScore);

            if (finalScore < 10 || finalScore === null || finalScore === undefined || isNaN(finalScore)) {
                data.gamePlaying = false;
                finalScore = 0;
            } else {
                data.gamePlaying = true;
                return finalScore;
            }

        },

        // If Game Ends
        gameStatusFalse: function () {
            document.querySelector('.final-score').value = '';
            data.gamePlaying = false;
        },

        // Get Active Current Player
        getCurrentActivePlayer: function () {
            return data.currentActivePlayer;
        },
        
        getCurrentPlayerName: function(currentPlayer){
            return data.playersName[currentPlayer];
        },

        getCurrentPlayerScore: function (currentActivePlayer) {
            return data.scores[currentActivePlayer];
        },

        getScores: function () {
            return data.scores;
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
                playersName: ['Player 1', 'Player 2'],
                roundScore: 0,
                currentActivePlayer: 0,
                gamePlaying: false
            }
        },
        
        // Return All Data
        returnData: function(){
            return data;
        },

        // Input Players' Name Mode
        inputNameMode: function (event, targetClass, callback, inputViewClass) {

            if (targetClass == targetClass) {
                callback;
                event.target.parentNode.classList.add(inputViewClass);

            } else {
                var targetClass = event.target.parentNode.classList[1];

                if (targetClass !== inputViewClass) {
                    callback;
                    event.target.parentNode.classList.remove(inputViewClass);
                }

            }

        },


        // Spliting dot from Class
        splittingClass: function (input) {

            input = input.split('.');
            input = input[1];

            return input;

        },

    }

})();




// UI Controller
var UIConroller = (function () {

    // Declaring Variables
    var DOMStrings, gameInit, resetClasses;

    DOMStrings = {
        diceBtn: '.btn-roll',
        holdBtn: '.btn-hold',
        newGameBtn: '.btn-new',
        dice: '.dice',
        namePlayer1: 'playerName-0',
        namePlayer2: 'playerName-1',
        playerNameInput: '.player-name-input',
        finalScore: '.final-score',
        alert: '.alert',
        alertClose: '.alert-close',
        wrapper: '.wrapper',
        inputView: '.input-view'
    };


    resetClasses = function () {
        var playerPanel;

        playerPanel = document.querySelectorAll('.player-panel');

        gameController.nodeListForEach(playerPanel, function (current, index) {
            current.classList.remove('winner', 'active');
        });


    };

    gameInit = function () {
        var playerScores;
        playerScores = document.querySelectorAll('.player-score, .player-current-score');

        gameController.nodeListForEach(playerScores, function (current, index) {
            current.textContent = 0;
        });

        resetClasses();

        document.querySelector(DOMStrings.dice).style.display = 'none';
        document.getElementById(DOMStrings.namePlayer1).textContent = 'Player 1';
        document.getElementById(DOMStrings.namePlayer2).textContent = 'Player 2';
        document.querySelector('.player-0-panel').classList.add('active');
        document.querySelector(DOMStrings.finalScore).disabled = false;
        document.querySelector('body').classList.remove('game-ends');

        gameController.resetGame();

    };



    // Returning Functions
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

        // Clear Input
        clearInput: function () {
            document.querySelector(DOMStrings.finalScore).disabled = true;
        },

        // Correct Dice Image
        getDiceImage: function (currentRoll) {
            document.querySelector(DOMStrings.dice).src = "dice-" + currentRoll + ".png";
        },

        // Update Current Score
        getCurrentScore: function (roundScore, currentPlayer) {

            if (roundScore === undefined) {
                roundScore = 0;
            }

            document.getElementById("current-" + currentPlayer).textContent = roundScore;
        },


        // Show Global Score
        displayGlobalScore: function (currentPlayer, currentPlayerGlobalScore) {
            document.getElementById("score-" + currentPlayer).textContent = currentPlayerGlobalScore;
        },

        // Show Game Winner
        displayGameWinner: function (currentPlayer, currentPlayerGlobalScore, winningScore) {

            if (currentPlayerGlobalScore > winningScore) {
                document.getElementById("playerName-" + currentPlayer).textContent = "Winner!";
                document.querySelector('.player-' + currentPlayer + '-panel').classList.remove('active');
                document.querySelector('.player-' + currentPlayer + '-panel').classList.add('winner');
                document.getElementById('playerName-' + currentPlayer).textContent = 'Winner!';
                document.querySelector('.dice').style.display = 'none';
                document.querySelector('body').classList.add('game-ends');

                resetClasses();

                document.querySelector('.player-' + currentPlayer + '-panel').classList.add('winner');

                gameController.gameStatusFalse();
                
                
                return true;
            }
            
            return false;
        },


        // Show Alert
        showAlert: function (msg) {
            /*var alerts = document.querySelectorAll(DOMStrings.alert);
            alerts = Array.prototype.slice.call(alerts);
            
            alerts.forEach(function(current, index){
                current.style.display = "none";
            });*/
            
            document.querySelector(DOMStrings.alert).style.display = "block";
            document.querySelector(DOMStrings.alert + "-text").textContent = msg;
            setTimeout(hideAlert, 2000);

            function hideAlert() {
                document.querySelector(DOMStrings.alert).style.display = "none";
            }
        },

        // Change Player's Name
        changePlayerName: function () {
            var playerNameInput = document.querySelectorAll(DOMStrings.playerNameInput);

            playerNameInput = Array.prototype.slice.call(playerNameInput);

            playerNameInput.forEach(function (current, index) {
                current.addEventListener('change', function () {
                    var inputText = current.value;
                    document.getElementById("playerName-" + index).textContent = inputText;
                    
                });
            });
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
        document.querySelector(DOM.finalScore).addEventListener('change', gameStartAlert);
        document.querySelector(DOM.alertClose).addEventListener('click', hidingAlert);
        document.querySelector(DOM.wrapper).addEventListener('click', claimWin);
        document.querySelector(DOM.wrapper).addEventListener('click', playerName);
    };


    // Changing Players' Name      
    UICtrl.changePlayerName();

    // Roll Dice
    var rollDice = function () {

        var isGamePlaying, currentPlayer;

        currentPlayer = gameCtrl.getCurrentActivePlayer();

        // Getting Game Status 
        isGamePlaying = gameCtrl.getGameStatus();

        if (isGamePlaying) {
            console.log('Dice is rolled');

            var diceInput, roundScore;

            // Getting Random Dice Value Generated
            diceInput = gameCtrl.diceVal();

            // Getting RoundScore of Current Player
            roundScore = gameCtrl.addScores(currentPlayer, diceInput);

            // Display Dice
            UICtrl.displayDice();

            // Clearing Input
            UICtrl.clearInput();

            // Consoling Current Dice
            console.log("Current Dice from rollDice() is " + diceInput);

            // Showing Correct Dice Image
            UICtrl.getDiceImage(diceInput);

            // Updating Players' Current Score
            UICtrl.getCurrentScore(roundScore, currentPlayer);

        }
    };


    // Hold Dice 
    var holdDice = function () {
        var isGamePlaying, winningScore;

        // To make Game Status true or false based on input 
        finalScoreInput = gameCtrl.finalScoreInput();

        isGamePlaying = gameCtrl.getGameStatus();
        winningScore = gameCtrl.finalScoreInput();

        if (isGamePlaying) {
            console.log('Dice is on Hold now');

            var currentPlayer, currentPlayerScore, globalScore, gameWinnerStatus;

            currentPlayer = gameCtrl.getCurrentActivePlayer();

            currentPlayerScore = gameCtrl.getCurrentPlayerScore(currentPlayer);

            // Move to Next Player on Hold
            gameCtrl.getNextPlayer();

            // Update Global Score on Hold
            gameCtrl.updateGlobalScore(currentPlayerScore, currentPlayer);

            // Receiving Global Score
            globalScore = parseInt(gameCtrl.getGlobalScore(currentPlayer));

            // Display Global Score in UI
            UICtrl.displayGlobalScore(currentPlayer, globalScore);

            // Display Winner if it reaches Score
            gameWinnerStatus = UICtrl.displayGameWinner(currentPlayer, globalScore, winningScore);
            
            // Show Alert if Player Won
            if(gameWinnerStatus) {
            UICtrl.showAlert("Player " + (currentPlayer + 1) + " You have won with total of " + winningScore + " score.");
            }

        }

    };


    // Hiding Alert
    var hidingAlert = function (event) {
        event.target.parentElement.style.display = "none";
    };

    // Show Alert when we input values
    var gameStartAlert = function () {
        var winningScore = gameCtrl.finalScoreInput();
        UICtrl.showAlert("Game is started. Winning Score is " + winningScore + " Good Luck!");
    };


    // If RoundScore of current Player reaches Winning Score
    var claimWin = function () {
        var winningScore, currentPlayer, currentPlayerName, currentScore, currentGlobalScore, estimatedGlobalScore, currentPlayerScore;

        winningScore = gameCtrl.finalScoreInput();
        currentPlayer = gameCtrl.getCurrentActivePlayer();
        currentScore = gameCtrl.getScores();
        currentPlayerScore = currentScore[currentPlayer];
        currentGlobalScore = gameCtrl.getGlobalScore(currentPlayer);
        estimatedGlobalScore = currentGlobalScore + currentPlayerScore;
        currentPlayerName = gameCtrl.getCurrentPlayerName(currentPlayer);

        if (estimatedGlobalScore > winningScore) {
            UICtrl.showAlert(currentPlayerName + " You have reached the winning total of " + winningScore + ". Hold and claim your Victory!");
        }
    };

    // Player Name Setup
    var playerName = function (event) {
        
        var isGamePlaying, targetClass, playerName, currentPlayer, currentPlayerScore, removeClass, inputViewClass, gameClass;

        inputViewClass = gameCtrl.splittingClass(DOM.inputView);
        isGamePlaying = gameCtrl.getGameStatus();
        gameClass = document.querySelector('body').classList;
        
        currentPlayer = gameCtrl.getCurrentActivePlayer();
        currentPlayerScore = gameCtrl.getCurrentPlayerScore(currentPlayer);
        
        console.log("currentPlayerScore is " + currentPlayerScore + " and isGamePlaying is " + isGamePlaying);

        targetClass = event.target.parentNode.classList;
        playerName = document.querySelectorAll('.player-name');

        removeClass = function () {
            gameCtrl.nodeListForEach(playerName, function (current, index) {
                current.classList.remove(inputViewClass);
            });
        };
        

        // Showing Input Fields on clicking Players' Name
        if(isGamePlaying === false && currentPlayerScore === 0 && gameClass != "game-ends") {
            
        gameCtrl.inputNameMode(event, 'player-name', removeClass(), inputViewClass);
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

/*
function $(x) {return document.getElementById(x);} 
$('heading').classList.add("testig");
*/
