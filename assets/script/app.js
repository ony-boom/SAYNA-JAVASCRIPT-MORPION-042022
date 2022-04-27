const items = document.getElementsByClassName('grid-item');
const playerXEl = document.getElementById("player-x");
const playerOEl = document.getElementById("player-o");
const resetBtn = document.getElementById("reset-btn");
const itemsArray = Array.from(items);

const gameBoard = [
	"", "", "",
	"", "", "",
	"", "", ""
];

const PLAYERS = {
	X: {
		mark: "X",
		score: 0
	},
	O: {
		mark: "O",
		score: 0
	}
};

const winningConditionIdx = [
	//row
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	//column
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	//diagonal
	[0, 4, 8],
	[2, 4, 6]
]
let choice = "";
let turn = "";
let cpu = "";

function setTurn(event) {
	choice = event.target.textContent.trim();
	turn = choice;
	setCpu();
	removeLayer();
}

function setCpu() {
	if (choice === "X") {
		cpu = "O"
	} else {
		cpu = "X"
	}
}

function removeLayer() {
	toggleBackdrop();
	document.querySelector(".layer").classList.toggle("d-none");
}

function toggleBackdrop() {
	document.querySelector(".backdrop").classList.toggle("d-none");
}

/**
 * Si le joueur actuel est X, alors le tour est O, sinon le tour est X.
 * @param currentPLayer - Le joueur actuel.
 */
function switchTurn(currentPLayer) {
	if (currentPLayer === PLAYERS.X.mark) {
		turn = PLAYERS.O.mark;
	} else {
		turn = PLAYERS.X.mark
	}
}

/**
 * Il renvoie l'index de la cellule actuelle dans le tableau des éléments
 * @param currentCell - La cellule actuelle sur laquelle se trouve l'utilisateur.
 * @returns Index de la cellule actuelle dans le tableau des éléments.
 */
function getCurrentItemsIndex(currentCell) {
	return itemsArray.indexOf(currentCell);
}

/**
 * Il prend un identifiant comme paramètre, puis il change le contenu du texte de la cellule avec cet identifiant en X ou
 * en O, selon le tour actuel
 * @param id - l'identifiant de la cellule sur laquelle on a cliqué
 */
function chooseCase(id) {
	const haveWinner = hasWinner();
	
	const currentCell = document.getElementById(id);
	const currentItemIdx = getCurrentItemsIndex(currentCell);
	if (gameBoard[currentItemIdx] !== '' && !haveWinner) {
		return;
	}
	if (haveWinner) {
		const winner = getWinner();
		showWinner(winner);
		outputScore();
		return;
	}
	
	if (turn === PLAYERS[choice].mark && !haveWinner) {
		currentCell.textContent = PLAYERS[choice].mark;
		updateGameBoard(currentItemIdx, PLAYERS[choice].mark);
		setTimeout(cpuTurn, 100); // attendre 400ms avant de lancer l'ordinateur
	} else if (turn === PLAYERS[cpu].mark && !haveWinner) {
		currentCell.textContent = PLAYERS[cpu].mark;
		updateGameBoard(currentItemIdx, PLAYERS[cpu].mark);
		switchTurn(turn);
	}
	
	resetIfNoOneWin();
}

/**
 * S'il n'y a pas de cellule vide, renvoie false.
 * @returns une valeur booléenne.
 */
function hasEmptyCell() {
	let hasEmptyCell = true;
	if (!(itemsArray.some(element => element.textContent === ""))) {
		hasEmptyCell = false;
	}
	return hasEmptyCell;
}

/**
 * Il renvoie un index aléatoire du tableau gameBoard qui est vide
 * @returns Index d'une cellule vide aléatoire.
 */
function getFreeCell() {
	let randomIdx = 0;
	do {
		randomIdx = Math.floor(Math.random() * gameBoard.length);
	} while (gameBoard[randomIdx] !== "" && hasEmptyCell())
	
	return randomIdx;
}

/**
 * Récupère l'identifiant de l'élément que l'ordinateur a choisi.
 * @returns L'identifiant de la cellule libre.
 */
function getCpuChosenElementId() {
	let freeCell = getFreeCell();
	return itemsArray[freeCell].id;
}

/**
 * La fonction `cpuTurn()` est appelée lorsque c'est au tour de l'ordinateur de jouer. Il appelle la fonction
 * `switchTurn()` pour changer le virage en tour de l'ordinateur, puis il appelle la fonction `getCpuChosenElementId()`
 * pour obtenir l'identifiant de l'élément sur lequel l'ordinateur cliquera
 */
function cpuTurn() {
	switchTurn(turn);
	const chosenElement = getCpuChosenElementId()
	document.getElementById(chosenElement).click();
}

/**
 * Mettez à jour le tableau gameBoard à l'index spécifié par le paramètre idx avec le contenu spécifié par le paramètre
 * content.
 * @param idx - L'index du tableau gameBoard que vous souhaitez mettre à jour.
 * @param content - Le contenu de la cellule.
 */
function updateGameBoard(idx, content) {
	gameBoard[idx] = content;
}

/**
 * Si les trois éléments dans une condition gagnante sont identiques et non vides, alors il y a un gagnant
 * @returns Une valeur booléenne.
 */
function hasWinner() {
	let hasWinner = false;
	for (const conditions of winningConditionIdx) {
		const a = gameBoard[conditions[0]];
		const b = gameBoard[conditions[1]];
		const c = gameBoard[conditions[2]];
		
		if (a === '' || b === '' || c === '') {
			continue;
		}
		
		if (a === b && b === c) {
			hasWinner = true;
		}
	}
	return hasWinner;
}

/**
 * Si le tour en cours est O, alors le gagnant est X, et vice versa
 * @returns Le gagnant est renvoyé.
 */
function getWinner() {
	let winner = "";
	if (turn === PLAYERS.O.mark) {
		winner = PLAYERS.X.mark
	} else if (turn === PLAYERS.X.mark) {
		winner = PLAYERS.O.mark
	}
	return winner;
}

/**
 * Il prend un gagnant comme argument et affiche un message d'alerte basé sur le gagnant
 * @param winner - Le gagnant du jeu.
 */
function showWinner(winner) {
	const outputEl = document.getElementById("winner-output");
	const layerBox = document.querySelector(".layer2");
	toggleBackdrop();
	if (layerBox.classList.contains("d-none")) {
		layerBox.classList.replace("d-none", "d-block");
	} else {
		layerBox.classList.add("d-block");
	}
	if (winner === choice) {
		// alert("You Win! 🤯👏");
		outputEl.textContent = "You Win! 🤯👏";
	} else if (winner === cpu) {
		// alert("CPU Win! 🙈👀😭😱");
		outputEl.textContent = "CPU Win! 🙈👀😭😱";
	}
	setScore(winner);
}

/**
 * Il prend un gagnant et incrémente le score du joueur qui a gagné
 * @param winner - le gagnant du jeu
 */
function setScore(winner) {
	PLAYERS[winner].score++;
}

/**
 * Il obtient les éléments avec les identifiants "player-score" et "cpu-score", et définit leur contenu textuel sur les
 * scores des joueurs
 */
function outputScore() {
	const playerScoreOutput = document.getElementById("player-score");
	const cpuScoreOutput = document.getElementById("cpu-score");
	
	playerScoreOutput.textContent = PLAYERS[choice].score;
	cpuScoreOutput.textContent = PLAYERS[cpu].score;
}

/**
 * Il réinitialise le plateau de jeu et le contenu textuel des éléments du itemsArray
 */
function reset() {
	if (hasWinner()) {
		toggleBackdrop();
	}
	document.querySelector(".layer2").classList.replace("d-block", "d-none");
	for (let i = 0; i < gameBoard.length; i++) {
		gameBoard[i] = "";
		itemsArray[i].textContent = "";
	}
	
	if (getWinner() === PLAYERS[choice].mark) {
		switchTurn(turn);
	}
}

/**
 * S'il n'y a pas de gagnant et qu'il n'y a pas de cellule vide, réinitialisez le jeu
 */
function resetIfNoOneWin() {
	if (!hasWinner() && !hasEmptyCell()) {
		const resetConfirmation = confirm("No One Win🤷‍♂️, reset ? 🙃")
		reset();
	}
}

playerXEl.addEventListener("click", setTurn);
playerOEl.addEventListener("click", setTurn);
resetBtn.addEventListener("click", reset);