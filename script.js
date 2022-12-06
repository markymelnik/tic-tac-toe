// Tic-tac-toe

const playerCreator = (() => {

    const playerFactory = (player, choice) => {
        return {
            player,
            choice
        }
    }

    let choice = { choiceOne: 'X', choiceTwo: 'O'};

    let playerOne = playerFactory('Mark', choice.choiceOne);
    let playerTwo = playerFactory('Kareem', choice.choiceTwo);

    return {
        choice,
        playerOne,
        playerTwo
    }

})();

const gameBoard = (() => {

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

    return {
        newBoard,
        setTiles
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

const roundCheck = (() => {

    const resultMessage = document.querySelector('.results-msg');

    let isThree = false;
    let win = false;
    let loss = false;

    const checkForWin = (arr, choice) => {
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
            resultMessage.textContent = `Tie game. No winner.`;
        } else if (win && !loss) {
            resultMessage.textContent = `You won!`;
        } else if (loss && !win) {
            resultMessage.textContent = `You lost!`;
        }
    }

    return {
        displayRoundResult,
        checkForWin
    }

})();

const gameFlowController = (() => {

    let isPlayerOneTurn = true;
    let playerChoice = '';

    let choiceOne = playerCreator.choice.choiceOne;
    let choiceTwo = playerCreator.choice.choiceTwo;

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

    let turnCounter = 0;

    displayController.createTiles(gameBoard.newBoard());

    gameBoardArea.addEventListener('click', (tile) => {
        
        const row = tile.target.getAttribute('row');
        const col = tile.target.getAttribute('col');

        if (gameBoard.newBoard()[row][col]) return;

        turnCounter++;

        gameBoard.setTiles(row, col, playerTurn());

        displayController.replaceBoard();

        displayController.createTiles(gameBoard.newBoard());

        roundCheck.checkForWin(gameBoard.newBoard(), playerChoice);

        roundCheck.displayRoundResult(turnCounter);

    })

})();