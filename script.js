// Tic-tac-toe

const Playercreator = (() => {

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

const Gameboard = (() => {

    let board = [['','',''],['','',''],['','','']]

    const newBoard = () => [...board];

    const setTiles = (row, col, choice) => {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                board[row][col] = choice
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

const gameFlowController = (() => {

    let isPlayerOneTurn = true;

    const playerTurn = () => {
        if (isPlayerOneTurn) {
            isPlayerOneTurn = false;
            return Playercreator.playerOne.choice;
        } 
        isPlayerOneTurn = true;
        return Playercreator.playerTwo.choice;
    }

    const gameBoardArea = displayController.gameBoard;

    displayController.createTiles(Gameboard.newBoard());

    gameBoardArea.addEventListener('click', (tile) => {
        
        const row = tile.target.getAttribute('row');
        const col = tile.target.getAttribute('col');

        if (Gameboard.newBoard()[row][col]) return;
        
        Gameboard.setTiles(row, col, playerTurn());

        displayController.replaceBoard();

        displayController.createTiles(Gameboard.newBoard());

        console.log(Gameboard.newBoard());

    })

})();