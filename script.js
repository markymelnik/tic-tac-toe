// Tic-tac-toe

const playerCreator = (() => {

    const playerFactory = (player, choice) => {
        return {
            player,
            choice
        }
    }

    let playerOne = playerFactory('Mark', 'X');
    let playerTwo = playerFactory('Kareem', 'O');

    return {
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

    let playerOne = playerCreator.playerOne.choice;
    let playerTwo = playerCreator.playerTwo.choice;

    let win = false;
    let loss = false;

    const checkRoundResult = (arr) => {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                if (arr[i][0] === playerOne  && arr[i][1] === playerOne && arr[i][2] === playerOne) {
                   win = true;
                } else if (arr[0][j] === playerOne && arr[1][j] === playerOne && arr[2][j] === playerOne) {
                    win = true;
                } else if (arr[0][0] === playerOne && arr[1][1] === playerOne && arr[2][2] === playerOne) {
                    win = true;
                } else if (arr[0][2] === playerOne && arr[1][1] === playerOne && arr[2][0] === playerOne) {
                    win = true;
                } else if (arr[i][0] === playerTwo  && arr[i][1] === playerTwo && arr[i][2] === playerTwo) {
                    loss = true;
                } else if (arr[0][j] === playerTwo && arr[1][j] === playerTwo && arr[2][j] === playerTwo) {
                    loss = true;
                } else if (arr[0][0] === playerTwo && arr[1][1] === playerTwo && arr[2][2] === playerTwo) {
                    loss = true;
                } else if (arr[0][2] === playerTwo && arr[1][1] === playerTwo && arr[2][0] === playerTwo) {
                    loss = true;
                }
            }
        }
    }

    const displayRoundResult = (counter) => {
        if (counter < 9 && !win && !loss) {
            resultMessage.textContent = `Keep going!`;
        } else if (counter == 9 && !win && !loss) {
            resultMessage.textContent = `Tie game. No winner.`;
        } else if (win) {
            resultMessage.textContent = `You won!`;
        } else if (loss) {
            resultMessage.textContent = `You lost!`;
        }
        
    }

    return {
        checkRoundResult,
        displayRoundResult
    }

})();

const gameFlowController = (() => {

    let isPlayerOneTurn = true;

    const playerTurn = () => {
        if (isPlayerOneTurn) {
            isPlayerOneTurn = false;
            return playerCreator.playerOne.choice;
        } 
        isPlayerOneTurn = true;
        return playerCreator.playerTwo.choice;
    }

    const gameBoardArea = displayController.gameBoard;


    let placementCounter = 0;

    displayController.createTiles(gameBoard.newBoard());

    gameBoardArea.addEventListener('click', (tile) => {
        
        const row = tile.target.getAttribute('row');
        const col = tile.target.getAttribute('col');

        if (gameBoard.newBoard()[row][col]) return;

        placementCounter++;

        gameBoard.setTiles(row, col, playerTurn());

        displayController.replaceBoard();

        displayController.createTiles(gameBoard.newBoard());

        roundCheck.checkRoundResult(gameBoard.newBoard());

        roundCheck.displayRoundResult(placementCounter);

    })
    
})();