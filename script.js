let currentPlayer = 1;
let currentScore = 0;
let totalScore1 = 0;
let totalScore2 = 0;
let diceRolled = false;
let gameEnded = false;

function rollDice(player) {
    if (gameEnded) return;

    let diceResult = '';
    for (let i = 0; i < 3; i++) {
        const die = Math.floor(Math.random() * 6) + 1;
        diceResult += die + ' ';
        currentScore += die;
    }
    document.getElementById(`diceResult${player}`).textContent = diceResult;
    document.getElementById(`score${player}`).textContent = currentScore;
    if (diceResult.includes('1')) {
        currentScore = 0;
        document.getElementById(`score${player}`).textContent = currentScore;
        disableButtons(player);
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        enableButtons(currentPlayer);
        diceRolled = true;
    } else {
        document.getElementById(`rerollDiceBtn${player}`).disabled = false;
        document.getElementById(`endTurnBtn${player}`).disabled = false;
        document.getElementById(`rollDiceBtn${player}`).disabled = true;
        diceRolled = true;
    }
}

function rerollDice(player) {
    rollDice(player);
}

function endTurn(player) {
    if (player === 1) {
        totalScore1 += currentScore;
        document.getElementById('totalScore1').textContent = totalScore1;
        currentScore = 0;
        document.getElementById('score1').textContent = currentScore;
        disableButtons(player);
        currentPlayer = 2;
        enableButtons(currentPlayer);
    } else {
        totalScore2 += currentScore;
        document.getElementById('totalScore2').textContent = totalScore2;
        currentScore = 0;
        document.getElementById('score2').textContent = currentScore;
        disableButtons(player);
        currentPlayer = 1;
        enableButtons(currentPlayer);
    }
    if (totalScore1 >= 100 || totalScore2 >= 100) {
        gameEnded = true;
        document.getElementById('resetBtn').disabled = false;
        alert(`¡Jugador ${totalScore1 >= 100 ? 1 : 2} ha ganado!`);
    }
}

function disableButtons(player) {
    document.getElementById(`rollDiceBtn${player}`).disabled = true;
    document.getElementById(`rerollDiceBtn${player}`).disabled = true;
    document.getElementById(`endTurnBtn${player}`).disabled = true;
}

function enableButtons(player) {
    if (currentPlayer === player || !diceRolled) {
        document.getElementById(`rollDiceBtn${player}`).disabled = false;
    }
    document.getElementById(`rerollDiceBtn${player}`).disabled = true;
    document.getElementById(`endTurnBtn${player}`).disabled = true;
}

function resetGame() {
    totalScore1 = 0;
    totalScore2 = 0;
    currentScore = 0;
    document.getElementById('totalScore1').textContent = totalScore1;
    document.getElementById('totalScore2').textContent = totalScore2;
    document.getElementById('score1').textContent = currentScore;
    document.getElementById('score2').textContent = currentScore;
    document.getElementById('diceResult1').textContent = '';
    document.getElementById('diceResult2').textContent = '';
    disableButtons(1);
    disableButtons(2);
    enableButtons(1);
    gameEnded = false;
    document.getElementById('resetBtn').disabled = true;
}
