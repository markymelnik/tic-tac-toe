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
            console.log("Test");
        }
    }

    return {
        newBoard,
        setTiles
    }

})();