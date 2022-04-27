import ai from "tictactoe-complex-ai";

const items = document.getElementsByClassName("grid-item");

const grid = document.getElementById("grid");
const itemsArray = Array.from(items);
const spinner = document.querySelector(".spinner");

const gameBoard = [
  "", "", "",
  "", "", "",
  "", "", ""
];

const PLAYERS = {
  x: {
    mark: "X",
    score: 0,
  },
  o: {
    mark: "O",
    score: 0,
  },
};

const options = {
  opponent: PLAYERS.x.mark,
  computer: PLAYERS.o.mark,
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
  [2, 4, 6],
];

let turn = PLAYERS.x.mark;

/**
 * Si le joueur actuel est X, alors le tour est O, sinon le tour est X.
 * @param currentPLayer - Le joueur actuel.
 */
function switchTurn(currentPLayer) {
  if (currentPLayer === PLAYERS.x.mark) {
    turn = PLAYERS.o.mark;
  } else {
    turn = PLAYERS.x.mark;
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

  if (gameBoard[currentItemIdx] !== "" && !haveWinner) {
    return;
  }

  if (turn === PLAYERS.x.mark && !haveWinner) {
    currentCell.textContent = PLAYERS.x.mark;
    updateGameBoard(currentItemIdx, PLAYERS.x.mark);
    cpuTurn();
  } else if (turn === PLAYERS.o.mark && !haveWinner) {
    currentCell.textContent = PLAYERS.o.mark;
    updateGameBoard(currentItemIdx, PLAYERS.o.mark);
    switchTurn(turn);
  }

  if (haveWinner) {
    const winner = getWinner();
    showWinner(winner);
    outputScore();
    reset();
  }
  resetIfNoOneWin();
}

/**
 * S'il n'y a pas de cellule vide, renvoie false.
 * @returns une valeur booléenne.
 */
function hasEmptyCell() {
  let hasEmptyCell = true;
  if (!itemsArray.some((element) => element.textContent === "")) {
    hasEmptyCell = false;
  }
  return hasEmptyCell;
}

const getAiResponse = async (difficulty) => {
  let aiInstance = ai.createAI({ level: difficulty, maxResponseTime: 500 });
  const pos = await aiInstance.play(gameBoard);
  return +pos;
};

/**
 * Il renvoie un index aléatoire du tableau gameBoard qui est vide
 * @returns Index d'une cellule vide aléatoire.
 */
async function getFreeCell() {
  let idx = 0;
  const difficulty = getDifficulty();
  idx = await getAiResponse(difficulty);
  return idx;
}

/**
 * Récupère l'identifiant de l'élément que l'ordinateur a choisi.
 * @returns L'identifiant de la cellule libre.
 */
async function getCpuChosenElementId() {
  let freeCell = await getFreeCell();
  if (!freeCell) {
    return itemsArray[Math.floor(Math.random()) * items.length].id;
  } else return itemsArray[freeCell].id;
}

function getDifficulty() {
  let difficulty = document.getElementById("difficulty");
  return difficulty.value;
}

/**
 * La fonction `cpuTurn()` est appelée lorsque c'est au tour de l'ordinateur de jouer. Il appelle la fonction
 * `switchTurn()` pour changer le virage en tour de l'ordinateur, puis il appelle la fonction `getCpuChosenElementId()`
 * pour obtenir l'identifiant de l'élément sur lequel l'ordinateur cliquera
 */
async function cpuTurn() {
  switchTurn(turn);
  spinner.classList.toggle("d-none");
  const chosenElement = await getCpuChosenElementId();
  if (chosenElement) {
    spinner.classList.toggle("d-none");
    document.getElementById(chosenElement).click();
  }
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

    if (a === "" || b === "" || c === "") {
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
  if (turn === PLAYERS.o.mark) {
    winner = PLAYERS.x.mark;
  } else if (turn === PLAYERS.x.mark) {
    winner = PLAYERS.o.mark;
  }
  return winner;
}

/**
 * Il prend un gagnant comme argument et affiche un message d'alerte basé sur le gagnant
 * @param winner - Le gagnant du jeu.
 */
function showWinner(winner) {
  if (winner === PLAYERS.x.mark) {
    alert("You Win! 🤯👏");
  } else if (winner === PLAYERS.o.mark) {
    alert("CPU Win! 🙈👀😭😱");
  }
  setScore(winner);
}

/**
 * Il prend un gagnant et incrémente le score du joueur qui a gagné
 * @param winner - le gagnant du jeu
 */
function setScore(winner) {
  if (winner === PLAYERS.x.mark) {
    PLAYERS.x.score++;
  } else {
    PLAYERS.o.score++;
  }
}

/**
 * Il obtient les éléments avec les identifiants "player-score" et "cpu-score", et définit leur contenu textuel sur les
 * scores des joueurs
 */
function outputScore() {
  const playerScoreOutput = document.getElementById("player-score");
  const cpuScoreOutput = document.getElementById("cpu-score");

  playerScoreOutput.textContent = PLAYERS.x.score;
  cpuScoreOutput.textContent = PLAYERS.o.score;
}

/**
 * Il réinitialise le plateau de jeu et le contenu textuel des éléments du itemsArray
 */
function reset() {
  for (const item of itemsArray) {
    item.textContent = "";
  }

  for (let i = 0; i < gameBoard.length; i++) {
    gameBoard[i] = "";
  }

  if (getWinner() === PLAYERS.x.mark) {
    switchTurn(turn);
  }
}

/**
 * S'il n'y a pas de gagnant et qu'il n'y a pas de cellule vide, réinitialisez le jeu
 */
function resetIfNoOneWin() {
  if (!hasWinner() && !hasEmptyCell()) {
    const resetConfirmation = confirm("No One Win🤷‍♂️, reset ? 🙃");
    if (resetConfirmation) {
      reset();
    } else {
      if (confirm("Won't reset ? so we'll close the window ?")) {
        window.close();
      } else reset();
    }
  }
}

grid.addEventListener("click", (event) => {
  const currentElement = event.target;
  const id = currentElement.id;
  chooseCase(id);
});
