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