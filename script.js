// Tic-tac-toe

const playerCreator = (() => {

    const playerFactory = (name, choice) => {
        return {
            name,
            choice
        }
    }

    let choice = { choiceOne: 'X', choiceTwo: 'O' };

    let playerOne = playerFactory('Mark', choice.choiceOne);
    let playerTwo = playerFactory('Kareem', choice.choiceTwo);

    return {
        choice,
        playerOne,
        playerTwo
    }

})();

const Gameboard = (() => {

    let board = [['','',''],
                 ['','',''],
                 ['','','']];

    const newBoard = () => [...board];

    const setTiles = (row, col, choice) => {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                board[row][col] = choice;
            }
        }
    }

    let resetBoard = () => {
        board = [['','',''], ['','',''], ['','','']];
    }
    
    return {
        newBoard,
        setTiles,
        resetBoard
    }

})();

const displayController = (() => {

    const gameBoard = document.querySelector('.game-board');

    const createTiles = (arr) => {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                let tile = document.createElement('div');
                tile.classList = 'tile';
                tile.textContent = arr[i][j];
                tile.setAttribute('row', i);
                tile.setAttribute('col', j);
                gameBoard.append(tile);
            }
        }   
    }

    const replaceBoard = () => {
        while (gameBoard.hasChildNodes()) {
            gameBoard.removeChild(gameBoard.firstChild)
        }
    }

    return {
        gameBoard,
        createTiles,
        replaceBoard
    }

})();

const roundWinCheck = (() => {

    const resultMessage = document.querySelector('.results-msg');
    const nextRoundBtn = document.querySelector('.next-round-btn');

    const playerOneScore = document.querySelector('.player-one-score');
    const playerTwoScore = document.querySelector('.player-two-score');

    playerOneScore.textContent = `${playerCreator.playerOne.name}'s Score:`;
    playerTwoScore.textContent = `${playerCreator.playerTwo.name}'s Score:`;

    let playerOneScoreTracker = 0;
    let playerTwoScoreTracker = 0;


    let isThree = false;
    let win = false;
    let loss = false;

    const checkForRoundWin = (arr, choice) => {
        for (let i = 0; i < 3; i++) {
            if (arr[i][0] === choice && arr[i][1] === choice && arr[i][2] === choice) {
                isThree = true;
            } else if (arr[0][i] === choice && arr[1][i] === choice && arr[2][i] === choice) {
                isThree = true;
            } else if (arr[1][1] === choice && arr[0][0] === choice && arr[2][2] === choice) {
                isThree = true;
            } else if (arr[1][1] === choice && arr[2][0] === choice && arr[0][2] === choice) {
                isThree = true;
            }       
        }

        if (isThree) {
            if (choice === playerCreator.choice.choiceOne) {
                win = true;
            } else if (choice === playerCreator.choice.choiceTwo) {
                loss = true;
            }
        }
    }

    const displayRoundResult = (counter) => {
        if (counter < 9 && !win && !loss) {
            resultMessage.textContent = `Keep going!`;
        } else if (counter == 9 && !win && !loss) {
            resultMessage.textContent = `Tie round. No winner.`;
        } else if (win && !loss) {
            resultMessage.textContent = `${playerCreator.playerOne.name} won this round!`;
        } else if (loss && !win) {
            resultMessage.textContent = `${playerCreator.playerTwo.name} won this round!`;
        }
    }

    const newRound = (counter) => {
        if (win && !loss) { 
            playerOneScoreTracker++;
            nextRoundBtn.style.visibility = "visible";
            playerOneScore.textContent = `${playerCreator.playerOne.name}'s Score: ${playerOneScoreTracker}`;
        } else if (!win && loss) {
            playerTwoScoreTracker++;
            nextRoundBtn.style.visibility = "visible";
            playerTwoScore.textContent = `${playerCreator.playerTwo.name}'s Score: ${playerTwoScoreTracker}`;
        } else if (counter == 9) {
            nextRoundBtn.style.visibility = "visible";
        }
    }

    const roundReset = () => {
        isThree = false;
        win = false;
        loss = false;
        resultMessage.textContent = 'Make your move!';
    }


    return {
        checkForRoundWin,
        displayRoundResult,
        newRound,
        playerOneScore,
        playerTwoScore,
        nextRoundBtn,
        roundReset
    }

})();

const gameFlowController = (() => {

    const choiceOne = playerCreator.choice.choiceOne;
    const choiceTwo = playerCreator.choice.choiceTwo;

    let playerChoice = '';
    let isPlayerOneTurn = true;

    let turnCounter = 0;

    const playerTurn = () => {
        if (isPlayerOneTurn) {
            isPlayerOneTurn = false;
            playerChoice = choiceOne;
            return choiceOne;
        } 
        isPlayerOneTurn = true;
        playerChoice = choiceTwo;
        return choiceTwo;
    }

    const gameBoardArea = displayController.gameBoard;
    const nextRoundBtn = document.querySelector('.next-round-btn');

    displayController.createTiles(Gameboard.newBoard());

    gameBoardArea.addEventListener('click', (tile) => {
        
        const row = tile.target.getAttribute('row');
        const col = tile.target.getAttribute('col');

        if (Gameboard.newBoard()[row][col]) return;

        turnCounter++;

        Gameboard.setTiles(row, col, playerTurn());

        displayController.replaceBoard();

        displayController.createTiles(Gameboard.newBoard());

        roundWinCheck.checkForRoundWin(Gameboard.newBoard(), playerChoice);

        roundWinCheck.displayRoundResult(turnCounter);

        roundWinCheck.newRound(turnCounter);
    
    })

    nextRoundBtn.addEventListener('click', () => {

        nextRoundBtn.style.visibility = "hidden";
    
        Gameboard.resetBoard(Gameboard.newBoard);

        turnCounter = 0;

        displayController.replaceBoard();

        displayController.createTiles(Gameboard.newBoard());

        roundWinCheck.roundReset();

    })

})();