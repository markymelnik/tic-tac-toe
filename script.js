// Tic-tac-toe

const Playerselection = (() => {

    const playerFactory = (player, choice) => {
        return {
            player,
            choice
        }
    }

    let playerOne = playerFactory('Mark', 'X');
    let playerTwo = playerFactory('Kareem', 'O');
    
})();

const Gameboard = (() => {

    let gameboard = [['', '', ''], ['', '', ''], ['', '', '']];

    const newBoard = () => [...gameboard];

    const setTiles = (index, choice) => {
        for (let i = 0; i < gameboard.length; i++) {
            for (let j = 0; j < gameboard[i].length; j++) {
                gameboard[i][j][index] = choice;
                console.log({index, choice})
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
            for (let j = 0; j < arr.length; j++) {
                let tile = document.createElement('div');
                tile.classList = 'tile';
                tile.setAttribute('row', i);
                tile.setAttribute('column', j);
                gameBoard.append(tile);
            }
        }
        
    }

    return {
        gameBoard,
        createTiles
    }

})();

const gameFlowController = (() => {

    displayController.createTiles(Gameboard.newBoard());

})();