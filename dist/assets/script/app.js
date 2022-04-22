/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/tictactoe-complex-ai/index.js":
/*!****************************************************!*\
  !*** ./node_modules/tictactoe-complex-ai/index.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const EasyAI = __webpack_require__(/*! ./src/EasyAI.js */ \"./node_modules/tictactoe-complex-ai/src/EasyAI.js\");\r\nconst MediumAI = __webpack_require__(/*! ./src/MediumAI.js */ \"./node_modules/tictactoe-complex-ai/src/MediumAI.js\");\r\nconst HardAI = __webpack_require__(/*! ./src/HardAI.js */ \"./node_modules/tictactoe-complex-ai/src/HardAI.js\");\r\nconst ExpertAI = __webpack_require__(/*! ./src/ExpertAI.js */ \"./node_modules/tictactoe-complex-ai/src/ExpertAI.js\");\r\n\r\nfunction createAI(config) {\r\n\tif(config !== undefined && config.level !== undefined) {\r\n\t\tswitch(config.level) {\r\n\t\t\tcase 'easy':\r\n\t\t\t\treturn new EasyAI(config);\r\n\t\t\tcase 'medium':\r\n\t\t\t\treturn new MediumAI(config);\r\n\t\t\tcase 'hard':\r\n\t\t\t\treturn new HardAI(config);\r\n\t\t\tcase 'expert':\r\n\t\t\t\treturn new ExpertAI(config);\r\n\t\t\tdefault:\r\n\t\t\t\treturn new EasyAI(config);\r\n\t\t}\r\n\t}\r\n}\r\n\r\nmodule.exports.createAI = createAI;\n\n//# sourceURL=webpack://sayna-javascript-morpion/./node_modules/tictactoe-complex-ai/index.js?");

/***/ }),

/***/ "./node_modules/tictactoe-complex-ai/src/AI.js":
/*!*****************************************************!*\
  !*** ./node_modules/tictactoe-complex-ai/src/AI.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const MinimaxNode = __webpack_require__(/*! ./MinimaxNode.js */ \"./node_modules/tictactoe-complex-ai/src/MinimaxNode.js\");\r\n\r\nconst WIN_POS = [\r\n\t[0, 1, 2], // horizontal line 1\r\n\t[3, 4, 5], // horizontal line 2\r\n\t[6, 7, 8], // horizontal line 3\r\n\t[0, 3, 6], // vertical column 1\r\n\t[1, 4, 7], // vertical column 2\r\n\t[2, 5, 8], // vertical column 3\r\n\t[0, 4, 8], // diagonal left-top TO right-bottom\r\n\t[6, 4, 2] // diagonal left-bottom TO right-top\r\n];\r\n\r\nfunction TicTacToeAI(config) {\r\n\t// Default AI\r\n\tthis.config = {\r\n\t\tai: 'O',\r\n\t\tplayer: 'X',\r\n\t\tempty: '',\r\n\t\tmaxResponseTime: 5000,\r\n\t\tminResponseTime: 2000\r\n\t}\r\n\t\r\n\tthis.config = Object.assign({}, this.config, config);\r\n}\r\n\r\nTicTacToeAI.prototype.isValidBoard = function(board) {\r\n\treturn board !== undefined && board.length === 9 && this.getEmptyPositions(board).length > 0;\r\n};\r\n\r\nTicTacToeAI.prototype.isEmpty = function(elem) {\r\n\treturn elem === this.config.empty;\r\n};\r\n\r\nTicTacToeAI.prototype.getTotalPlays = function(board) {\r\n\tlet count = 0;\r\n\tboard.forEach((elem) => {\r\n\t\tif(!this.isEmpty(elem))\r\n\t\t\tcount++;\t\t\r\n\t});\r\n\treturn count;\r\n};\r\n\r\nTicTacToeAI.prototype.getEmptyPositions = function(board) {\r\n\tlet result = [];\r\n\tboard.forEach((elem, id) => {\r\n\t\tif(this.isEmpty(elem))\r\n\t\t\tresult.push(id);\r\n\t});\r\n\treturn result;\r\n};\r\n\r\nTicTacToeAI.prototype.getRandomPosition = function(values) {\r\n\tif(values !== undefined && values.length > 0) {\r\n\t\t// Only one value.\r\n\t\tif(values.length === 1)\r\n\t\t\treturn values[0];\r\n\t\t\r\n\t\treturn values[Math.trunc(Math.random() * values.length)];\r\n\t\t\r\n\t}\r\n};\r\n\r\nTicTacToeAI.prototype.delay = function() {\r\n\treturn new Promise( (resolve) => {\r\n\t\tsetTimeout(() => {\r\n\t\t\tresolve();\r\n\t\t}, this.config.minResponseTime + ((this.config.maxResponseTime - this.config.minResponseTime) * Math.random()));\r\n\t});\r\n};\r\n\r\nTicTacToeAI.prototype.isWinPossible = function(board, player) {\r\n\tlet result = [];\r\n\tWIN_POS.forEach((elem) => {\r\n\tif(board[elem[0]] === board[elem[1]] && board[elem[0]] === player && board[elem[2]] === this.config.empty)\r\n\t\t\tresult.push(elem[2]);\r\n\t\telse if(board[elem[1]] === board[elem[2]] && board[elem[1]] === player && board[elem[0]] === this.config.empty)\r\n\t\t\tresult.push(elem[0]);\r\n\t\telse if(board[elem[0]] === board[elem[2]] && board[elem[0]] === player && board[elem[1]] === this.config.empty)\r\n\t\t\tresult.push(elem[1]);\r\n\t});\r\n\t\r\n\treturn result;\r\n}\r\n\r\nTicTacToeAI.prototype.getEmptyEdges = function(board) {\r\n\tlet result = [];\r\n\t\r\n\tif(board[0] === this.config.empty)\r\n\t\tresult.push(0);\r\n\tif(board[2] === this.config.empty)\r\n\t\tresult.push(2);\r\n\tif(board[6] === this.config.empty)\r\n\t\tresult.push(6);\r\n\tif(board[8] === this.config.empty)\r\n\t\tresult.push(8);\r\n\t\r\n\treturn result;\r\n};\r\n\r\nTicTacToeAI.prototype.getMark = function(turn) {\r\n\treturn turn === 1 ? this.config.ai : this.config.player;\r\n}\r\n\r\nTicTacToeAI.prototype.minimax = function(board, node, turn, depth) {\r\n\t// Check if it can go more depth.\r\n\tif(depth < 1)\r\n\t\treturn;\r\n\t\r\n\tlet mark = this.getMark(turn);\r\n\t// Check if it can win in one play.\r\n\tif(turn === 1) {\r\n\t\tlet wins = this.isWinPossible(board, mark);\r\n\r\n\t\tif(wins.length > 0) {\r\n\t\t\twins.forEach((elem) => {\r\n\t\t\t\tlet childNode = new MinimaxNode(node, elem, 1, turn);\r\n\t\t\t\tnode.addChild(childNode);\t\t\t\t\r\n\t\t\t});\r\n\t\t\t// returns not to calculate other plays.\r\n\t\t\treturn;\r\n\t\t}\r\n\t}\r\n\t// Get all empty positions.\r\n\tlet possiblePlays = this.getEmptyPositions(board);\r\n\tpossiblePlays.forEach((elem) => {\r\n\t\t// Create the new board.\r\n\t\tlet newBoard = Object.assign([], board);\r\n\t\tnewBoard[elem] = mark;\r\n\t\t// Change the turn\t\r\n\t\tlet newTurn = turn * -1;\t\t\r\n\t\tlet newMark = this.getMark(newTurn);\t\t\r\n\t\t// Get the score.\r\n\t\tlet score = (this.isWinPossible(newBoard, newMark).length > 0 ? 1 : 0) * newTurn;\t\r\n\t\t// Save the score.\t\r\n\t\tlet childNode = new MinimaxNode(node, elem, score, turn);\r\n\t\tnode.addChild(childNode);\t\t\r\n\t\t// Check if I don't lose, then go ahead.\r\n\t\tif(score > -1) {\t\t\t\r\n\t\t\t// Decreases depth and calls minimax.\r\n\t\t\tlet newDepth = depth - 1;\r\n\t\t\tthis.minimax(newBoard, childNode, newTurn, newDepth);\r\n\t\t}\r\n\t});\r\n};\r\n\r\nTicTacToeAI.prototype.getBestPlay = function(board, depth) {\r\n\t// Create root node.\r\n\tlet rootNode = new MinimaxNode(undefined, -1, 0, 0);\t\r\n\t// Calculate the play tree.\r\n\tthis.minimax(board, rootNode, 1, depth);\r\n\t// get the branch scores.\t\r\n\tlet scores = rootNode.getChildrenBranchScore();\r\n\tif(scores !== undefined && scores.length > 0) {\r\n\t\t// get the best score.\r\n\t\tlet bestIdx = 0;\r\n\t\tlet bestScore = scores[0];\r\n\t\tscores.forEach((elem, idx) => {\r\n\t\t\tif(elem > bestScore) {\r\n\t\t\t\tbestIdx = idx;\r\n\t\t\t\tbestScore = elem;\r\n\t\t\t}\t\t\t\t\r\n\t\t});\r\n\t\t// Return the best play.\r\n\t\treturn rootNode.getChild(bestIdx).getPos();\r\n\t} else {\r\n\t\t// Return an aleatory play.\r\n\t\treturn this.getRandomPosition(this.getEmptyPositions(board));\r\n\t}\r\n};\r\n\r\nmodule.exports = TicTacToeAI;\n\n//# sourceURL=webpack://sayna-javascript-morpion/./node_modules/tictactoe-complex-ai/src/AI.js?");

/***/ }),

/***/ "./node_modules/tictactoe-complex-ai/src/EasyAI.js":
/*!*********************************************************!*\
  !*** ./node_modules/tictactoe-complex-ai/src/EasyAI.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const ai = __webpack_require__(/*! ./AI.js */ \"./node_modules/tictactoe-complex-ai/src/AI.js\");\r\n\r\n\r\nfunction EasyAI(config) {\r\n\tai.call(this, config);\r\n}\r\n\r\nEasyAI.prototype = Object.create(ai.prototype);\r\n\r\nEasyAI.prototype.play = function(board) {\t\r\n\treturn new Promise( (resolve, reject) => {\t\t\r\n\t\tif(this.isValidBoard(board)) {\r\n\t\t\tthis.delay().then(() => {\t\t\r\n\t\t\t\t// Only makes random plays.\r\n\t\t\t\tresolve(this.getRandomPosition(this.getEmptyPositions(board)));\r\n\t\t\t});\r\n\t\t} else {\r\n\t\t\treject();\r\n\t\t}\r\n\t});\t\r\n}\r\n\r\nmodule.exports = EasyAI;\n\n//# sourceURL=webpack://sayna-javascript-morpion/./node_modules/tictactoe-complex-ai/src/EasyAI.js?");

/***/ }),

/***/ "./node_modules/tictactoe-complex-ai/src/ExpertAI.js":
/*!***********************************************************!*\
  !*** ./node_modules/tictactoe-complex-ai/src/ExpertAI.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const HardAI = __webpack_require__(/*! ./HardAI.js */ \"./node_modules/tictactoe-complex-ai/src/HardAI.js\");\r\n\r\nfunction ExpertAI(config) {\r\n    HardAI.call(this, config);\r\n}\r\n\r\nExpertAI.prototype = Object.create(HardAI.prototype);\r\n\r\nExpertAI.prototype.play = function(board) {\r\n    return this.defaultPlay(board, 9);\r\n};\r\n\r\nmodule.exports = ExpertAI;\n\n//# sourceURL=webpack://sayna-javascript-morpion/./node_modules/tictactoe-complex-ai/src/ExpertAI.js?");

/***/ }),

/***/ "./node_modules/tictactoe-complex-ai/src/HardAI.js":
/*!*********************************************************!*\
  !*** ./node_modules/tictactoe-complex-ai/src/HardAI.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const ai = __webpack_require__(/*! ./AI.js */ \"./node_modules/tictactoe-complex-ai/src/AI.js\");\r\n\r\nfunction HardAI(config) {\r\n\tai.call(this, config);\r\n}\r\n\r\nHardAI.prototype = Object.create(ai.prototype);\r\n\r\nHardAI.prototype.defaultPlay = function(board, depth) {\r\n\treturn new Promise( (resolve, reject) => {\r\n\t\tif(this.isValidBoard(board)) {\r\n\t\t\tthis.delay().then(() => {\r\n\t\t\t\t\r\n\t\t\t\tif(this.getTotalPlays(board) === 0) {\r\n\t\t\t\t\tlet aux = this.getEmptyEdges(board);\r\n\t\t\t\t\tif(aux.length > 0) {\t\t\t\t\t\t\r\n\t\t\t\t\t\tresolve(this.getRandomPosition(aux));\r\n\t\t\t\t\t\treturn;\r\n\t\t\t\t\t}\r\n\t\t\t\t} else if(this.getTotalPlays(board) === 1 && this.isEmpty(board[4])) {\r\n\t\t\t\t\t// 4 = CENTER\t\t\t\t\t\r\n\t\t\t\t\tresolve(4);\r\n\t\t\t\t\treturn;\r\n\t\t\t\t}\r\n\t\t\t\t// I win\r\n\t\t\t\tlet aux = this.isWinPossible(board, this.config.ai);\r\n\t\t\t\tif(aux.length > 0) {\t\t\t\t\t\r\n\t\t\t\t\tresolve(this.getRandomPosition(aux));\r\n\t\t\t\t\treturn;\r\n\t\t\t\t}\r\n\t\t\t\t// I try to avoid losing the round.\r\n\t\t\t\taux = this.isWinPossible(board, this.config.player);\r\n\t\t\t\tif(aux.length > 0) {\t\t\t\t\t\r\n\t\t\t\t\tresolve(this.getRandomPosition(aux));\r\n\t\t\t\t\treturn;\r\n\t\t\t\t}\t\t\t\t\r\n\t\t\t\tresolve(this.getBestPlay(board, depth));\r\n\t\t\t\t\r\n\t\t\t});\r\n\t\t} else {\r\n\t\t\treject();\r\n\t\t}\r\n\t});\r\n};\r\n\r\nHardAI.prototype.play = function(board) {\r\n\treturn this.defaultPlay(board, 2);\r\n}\r\n\r\nmodule.exports = HardAI;\n\n//# sourceURL=webpack://sayna-javascript-morpion/./node_modules/tictactoe-complex-ai/src/HardAI.js?");

/***/ }),

/***/ "./node_modules/tictactoe-complex-ai/src/MediumAI.js":
/*!***********************************************************!*\
  !*** ./node_modules/tictactoe-complex-ai/src/MediumAI.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const ai = __webpack_require__(/*! ./AI.js */ \"./node_modules/tictactoe-complex-ai/src/AI.js\");\r\n\r\nfunction MediumAI(config) {\r\n\tai.call(this, config);\r\n}\r\n\r\nMediumAI.prototype = Object.create(ai.prototype);\r\n\r\nMediumAI.prototype.play = function(board) {\r\n\treturn new Promise( (resolve, reject) => {\r\n\t\tif(this.isValidBoard(board)) {\r\n\t\t\tthis.delay().then(() => {\r\n\t\t\t\t\r\n\t\t\t\tif(this.getTotalPlays(board) < 2) {\r\n\t\t\t\t\tresolve(this.getRandomPosition(this.getEmptyPositions(board)));\r\n\t\t\t\t\treturn;\r\n\t\t\t\t}\r\n\t\t\t\t// I win\r\n\t\t\t\tlet aux = this.isWinPossible(board, this.config.ai);\r\n\t\t\t\tif(aux.length > 0) {\r\n\t\t\t\t\tresolve(this.getRandomPosition(aux));\r\n\t\t\t\t\treturn;\r\n\t\t\t\t}\r\n\t\t\t\t// I try to avoid losing the round.\r\n\t\t\t\taux = this.isWinPossible(board, this.config.player);\r\n\t\t\t\tif(aux.length > 0) {\r\n\t\t\t\t\tresolve(this.getRandomPosition(aux));\r\n\t\t\t\t\treturn;\r\n\t\t\t\t}\r\n\t\t\t\t\r\n\t\t\t\tresolve(this.getRandomPosition(this.getEmptyPositions(board)));\r\n\t\t\t\t\r\n\t\t\t});\r\n\t\t} else {\r\n\t\t\treject();\r\n\t\t}\r\n\t});\r\n};\r\n\r\nmodule.exports = MediumAI;\n\n//# sourceURL=webpack://sayna-javascript-morpion/./node_modules/tictactoe-complex-ai/src/MediumAI.js?");

/***/ }),

/***/ "./node_modules/tictactoe-complex-ai/src/MinimaxNode.js":
/*!**************************************************************!*\
  !*** ./node_modules/tictactoe-complex-ai/src/MinimaxNode.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("function MinimaxNode(parentNode, pos, score, turn) {\r\n    // Save the variables.\r\n    this.parentNode = parentNode;\r\n    this.pos = pos;\r\n    this.score = score;\r\n    this.turn = turn;\r\n    this.childNodes = [];\r\n    // Checks if it is a root node.\r\n    if(parentNode === undefined)\r\n        this.setRoot();\r\n};\r\n\r\nMinimaxNode.prototype.setRoot = function() {\r\n    this.isRoot = true;\r\n}\r\n\r\nMinimaxNode.prototype.addChild = function(node) {\r\n    this.childNodes.push(node);\r\n};\r\n\r\nMinimaxNode.prototype.hasChild = function() {\r\n    return this.childNodes.length > 0;\r\n};\r\n\r\nMinimaxNode.prototype.getChildren = function() {\r\n    return this.childNodes;\r\n};\r\n\r\nMinimaxNode.prototype.getChild = function(index) {\r\n    return this.childNodes[index];\r\n};\r\n\r\nMinimaxNode.prototype.getScore = function() {\r\n    return this.score;\r\n}\r\n\r\nMinimaxNode.prototype.getPos = function() {\r\n    return this.pos;\r\n};\r\n\r\nMinimaxNode.prototype.getEndNodes = function(arr) {  \r\n    // If it doesn't have children, put this on the array.\r\n    if(!this.hasChild()) {\r\n        arr.push(this);   \r\n        return;\r\n    } \r\n    // If it has children, get its endNodes.\r\n    this.getChildren().forEach((elem) => {\r\n        elem.getEndNodes(arr);\r\n    });    \r\n};\r\n\r\nMinimaxNode.prototype.getBranchScore = function() {\r\n    // Get the end nodes of this node.    \r\n    let endNodes = [];\r\n    this.getEndNodes(endNodes);    \r\n    // Calculate the average score and returns it.\r\n    return endNodes.reduce((acc, elem) => acc + elem.getScore(), 0) / endNodes.length;    \r\n};\r\n\r\nMinimaxNode.prototype.getChildrenBranchScore = function() {\r\n    // Gets the node's children branch score and saves it inside an array.\r\n    let arr = [];\r\n    this.getChildren().forEach((elem) => {\r\n        arr.push(elem.getBranchScore());\r\n    });\r\n    return arr;\r\n};\r\n\r\nMinimaxNode.prototype.toObject = function() {\r\n    let myObj = {\r\n        pos: this.pos,\r\n        score: this.score,\r\n        turn: this.turn,\r\n        childNodes: []\r\n    };\r\n\r\n    this.childNodes.forEach((elem) => {\r\n        myObj.childNodes.push(elem.toObject());\r\n    });\r\n\r\n    return myObj;\r\n};\r\n\r\nMinimaxNode.prototype.toString = function() {\r\n    return JSON.stringify(this.toObject());\r\n};\r\n\r\nmodule.exports = MinimaxNode;\n\n//# sourceURL=webpack://sayna-javascript-morpion/./node_modules/tictactoe-complex-ai/src/MinimaxNode.js?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var tictactoe_complex_ai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tictactoe-complex-ai */ \"./node_modules/tictactoe-complex-ai/index.js\");\n\n\nconst items = document.getElementsByClassName(\"grid-item\");\nconst grid = document.getElementById(\"grid\");\nconst itemsArray = Array.from(items);\nconst spinner = document.querySelector(\".spinner\");\n\nconst gameBoard = [\"\", \"\", \"\", \"\", \"\", \"\", \"\", \"\", \"\"];\n\nconst PLAYERS = {\n  x: {\n    mark: \"X\",\n    score: 0,\n  },\n  o: {\n    mark: \"O\",\n    score: 0,\n  },\n};\n\nconst options = {\n  opponent: PLAYERS.x.mark,\n  computer: PLAYERS.o.mark,\n};\n\nconst winningConditionIdx = [\n  //row\n  [0, 1, 2],\n  [3, 4, 5],\n  [6, 7, 8],\n  //column\n  [0, 3, 6],\n  [1, 4, 7],\n  [2, 5, 8],\n  //diagonal\n  [0, 4, 8],\n  [2, 4, 6],\n];\n\nlet turn = PLAYERS.x.mark;\n\n/**\n * Si le joueur actuel est X, alors le tour est O, sinon le tour est X.\n * @param currentPLayer - Le joueur actuel.\n */\nfunction switchTurn(currentPLayer) {\n  if (currentPLayer === PLAYERS.x.mark) {\n    turn = PLAYERS.o.mark;\n  } else {\n    turn = PLAYERS.x.mark;\n  }\n}\n\n/**\n * Il renvoie l'index de la cellule actuelle dans le tableau des éléments\n * @param currentCell - La cellule actuelle sur laquelle se trouve l'utilisateur.\n * @returns Index de la cellule actuelle dans le tableau des éléments.\n */\nfunction getCurrentItemsIndex(currentCell) {\n  return itemsArray.indexOf(currentCell);\n}\n\n/**\n * Il prend un identifiant comme paramètre, puis il change le contenu du texte de la cellule avec cet identifiant en X ou\n * en O, selon le tour actuel\n * @param id - l'identifiant de la cellule sur laquelle on a cliqué\n */\nfunction chooseCase(id) {\n  const haveWinner = hasWinner();\n\n  const currentCell = document.getElementById(id);\n  const currentItemIdx = getCurrentItemsIndex(currentCell);\n  if (gameBoard[currentItemIdx] !== \"\" && !haveWinner) {\n    return;\n  }\n\n  if (turn === PLAYERS.x.mark && !haveWinner) {\n    currentCell.textContent = PLAYERS.x.mark;\n    updateGameBoard(currentItemIdx, PLAYERS.x.mark);\n    cpuTurn();\n  } else if (turn === PLAYERS.o.mark && !haveWinner) {\n    currentCell.textContent = PLAYERS.o.mark;\n    updateGameBoard(currentItemIdx, PLAYERS.o.mark);\n    switchTurn(turn);\n  }\n\n  if (haveWinner) {\n    const winner = getWinner();\n    showWinner(winner);\n    outputScore();\n    reset();\n  }\n  resetIfNoOneWin();\n}\n\n/**\n * S'il n'y a pas de cellule vide, renvoie false.\n * @returns une valeur booléenne.\n */\nfunction hasEmptyCell() {\n  let hasEmptyCell = true;\n  if (!itemsArray.some((element) => element.textContent === \"\")) {\n    hasEmptyCell = false;\n  }\n  return hasEmptyCell;\n}\n\nconst getAiResponse = async (difficulty) => {\n  let aiInstance = tictactoe_complex_ai__WEBPACK_IMPORTED_MODULE_0__.createAI({ level: difficulty, maxResponseTime: 10000 });\n  const pos = await aiInstance.play(gameBoard);\n  return +pos;\n};\n\n/**\n * Il renvoie un index aléatoire du tableau gameBoard qui est vide\n * @returns Index d'une cellule vide aléatoire.\n */\nasync function getFreeCell() {\n  let idx = 0;\n  const difficulty = getDifficulty();\n  idx = await getAiResponse(difficulty);\n  return idx;\n}\n\n/**\n * Récupère l'identifiant de l'élément que l'ordinateur a choisi.\n * @returns L'identifiant de la cellule libre.\n */\nasync function getCpuChosenElementId() {\n  let freeCell = await getFreeCell();\n  if (!freeCell) {\n    return itemsArray[Math.floor(Math.random()) * items.length].id;\n  } else return itemsArray[freeCell].id;\n}\n\nfunction getDifficulty() {\n  let difficulty = document.getElementById(\"difficulty\");\n  return difficulty.value;\n}\n\n/**\n * La fonction `cpuTurn()` est appelée lorsque c'est au tour de l'ordinateur de jouer. Il appelle la fonction\n * `switchTurn()` pour changer le virage en tour de l'ordinateur, puis il appelle la fonction `getCpuChosenElementId()`\n * pour obtenir l'identifiant de l'élément sur lequel l'ordinateur cliquera\n */\nasync function cpuTurn() {\n  switchTurn(turn);\n  spinner.classList.toggle(\"d-none\");\n  const chosenElement = await getCpuChosenElementId();\n  if (chosenElement) {\n    spinner.classList.toggle(\"d-none\");\n    document.getElementById(chosenElement).click();\n  }\n}\n\n/**\n * Mettez à jour le tableau gameBoard à l'index spécifié par le paramètre idx avec le contenu spécifié par le paramètre\n * content.\n * @param idx - L'index du tableau gameBoard que vous souhaitez mettre à jour.\n * @param content - Le contenu de la cellule.\n */\nfunction updateGameBoard(idx, content) {\n  gameBoard[idx] = content;\n}\n\n/**\n * Si les trois éléments dans une condition gagnante sont identiques et non vides, alors il y a un gagnant\n * @returns Une valeur booléenne.\n */\nfunction hasWinner() {\n  let hasWinner = false;\n  for (const conditions of winningConditionIdx) {\n    const a = gameBoard[conditions[0]];\n    const b = gameBoard[conditions[1]];\n    const c = gameBoard[conditions[2]];\n\n    if (a === \"\" || b === \"\" || c === \"\") {\n      continue;\n    }\n\n    if (a === b && b === c) {\n      hasWinner = true;\n    }\n  }\n  return hasWinner;\n}\n\n/**\n * Si le tour en cours est O, alors le gagnant est X, et vice versa\n * @returns Le gagnant est renvoyé.\n */\nfunction getWinner() {\n  let winner = \"\";\n  if (turn === PLAYERS.o.mark) {\n    winner = PLAYERS.x.mark;\n  } else if (turn === PLAYERS.x.mark) {\n    winner = PLAYERS.o.mark;\n  }\n  return winner;\n}\n\n/**\n * Il prend un gagnant comme argument et affiche un message d'alerte basé sur le gagnant\n * @param winner - Le gagnant du jeu.\n */\nfunction showWinner(winner) {\n  if (winner === PLAYERS.x.mark) {\n    alert(\"You Win! 🤯👏\");\n  } else if (winner === PLAYERS.o.mark) {\n    alert(\"CPU Win! 🙈👀😭😱\");\n  }\n  setScore(winner);\n}\n\n/**\n * Il prend un gagnant et incrémente le score du joueur qui a gagné\n * @param winner - le gagnant du jeu\n */\nfunction setScore(winner) {\n  if (winner === PLAYERS.x.mark) {\n    PLAYERS.x.score++;\n  } else {\n    PLAYERS.o.score++;\n  }\n}\n\n/**\n * Il obtient les éléments avec les identifiants \"player-score\" et \"cpu-score\", et définit leur contenu textuel sur les\n * scores des joueurs\n */\nfunction outputScore() {\n  const playerScoreOutput = document.getElementById(\"player-score\");\n  const cpuScoreOutput = document.getElementById(\"cpu-score\");\n\n  playerScoreOutput.textContent = PLAYERS.x.score;\n  cpuScoreOutput.textContent = PLAYERS.o.score;\n}\n\n/**\n * Il réinitialise le plateau de jeu et le contenu textuel des éléments du itemsArray\n */\nfunction reset() {\n  for (const item of itemsArray) {\n    item.textContent = \"\";\n  }\n\n  for (let i = 0; i < gameBoard.length; i++) {\n    gameBoard[i] = \"\";\n  }\n\n  if (getWinner() === PLAYERS.x.mark) {\n    switchTurn(turn);\n  }\n}\n\n/**\n * S'il n'y a pas de gagnant et qu'il n'y a pas de cellule vide, réinitialisez le jeu\n */\nfunction resetIfNoOneWin() {\n  if (!hasWinner() && !hasEmptyCell()) {\n    const resetConfirmation = confirm(\"No One Win🤷‍♂️, reset ? 🙃\");\n    if (resetConfirmation) {\n      reset();\n    } else {\n      if (confirm(\"Won't reset ? so we'll close the window ?\")) {\n        window.close();\n      } else reset();\n    }\n  }\n}\n\ngrid.addEventListener(\"click\", (event) => {\n  const currentElement = event.target;\n  const id = currentElement.id;\n  chooseCase(id);\n});\n\n\n//# sourceURL=webpack://sayna-javascript-morpion/./src/app.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.js");
/******/ 	
/******/ })()
;