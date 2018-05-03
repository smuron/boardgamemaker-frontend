import cfg from './AppConfig'
import openSocket from 'socket.io-client';
import axios from 'axios'

var EventEmitter = require('events').EventEmitter;
 
var emitter = new EventEmitter();

var gameState = null;
var socket = null;

// TODO: not half-A this
let DEBUG_AUTH_IMPLEMENT_ME = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1lIiwiaWF0IjoxNTI1Mzc2NjgzLCJleHAiOjE1MzEzNzY2ODN9.BXFx_Xrcvi--nAe8qgdwcKmQaU4etWDnkjHL-RLC1LI";
axios.defaults.headers.common['Authorization'] = DEBUG_AUTH_IMPLEMENT_ME;

export default {

	editorFunctions: {
		createNew: function() {
			let newBoard = {
				width: 640,
				height: 480,
				spaces: {}
			};

			axios.post(cfg.SERVER + "/api/board", newBoard)
				.then(function(resp) {
					console.log(resp,'resp from newBoard')
					gameState.board = resp.data;
					emitter.emit("update");
				})
				.catch(function(err) {
					console.log(err,'while trying to create a new board')
				});
		},
		saveCurrent: function() {
			// v. trusting to start
			// probably could just do upsert endpoint and look for id on server side
			axios.post(cfg.SERVER + "/api/board/" + gameState.board.id, gameState.board)
				.then(function(resp) {
					console.log(resp,'resp from saveCurrent')
				})
				.catch(function(err) {
					console.log(err,'while trying to saveCurrent')
				});
		},
		loadBoard: function(boardId) {
			axios.get(cfg.SERVER + "/api/board/" + boardId)
				.then(function(resp) {
					console.log(resp,'resp from syncBoard');
					gameState.board = resp.data;
					emitter.emit("update");
				})
				.catch(function(err) {
					console.log(err,'while trying to syncBoard')
				});
		},
		getBoardList: function() {
			axios.get(cfg.SERVER + "/api/board")
				.then(function(resp) {
					console.log(resp,'resp from getBoardList')
					gameState.boardList = resp.data;
					emitter.emit("update");
				})
				.catch(function(err) {
					console.log(err,'while trying to getBoardList')
				});
		},


		// space editing
		addSpace: function() {
			let x, xInt, spaces
			let maxId = -1;
			spaces = gameState.board.spaces
			for (x in Object.keys(spaces)) {
				xInt = parseInt(x)
				if (xInt > maxId) {
					maxId = xInt;
				}
			}

			spaces[maxId+1] = {
				t: 'debug',
				x: gameState.board.width / 2,
				y: gameState.board.height / 2,
				n: [maxId]
			}

			console.log(maxId+1,spaces);
			emitter.emit("update");
		},
		selectSpace: function(spaceId) {
			gameState.editor.selected = spaceId;
			emitter.emit("update");
		}
	},

	initialize: function() {
		// DEBUG function, should accept state from server instead...
		gameState = {
			app: {
				screen: 'title'
			},
			players: {
				0: {
					name: "A",
					badges: 0,
					bux: 10
				},
				1: {
					name: "B",
					badges: 0,
					bux: 10
				},
				2: {
					name: "C",
					badges: 0,
					bux: 10
				},
				3: {
					name: "D",
					badges: 0,
					bux: 10
				}
			},

			board: {
				id: 'dummy',
				width: 480,
				height: 480,
				spaces: {
					0: {
						t: 'debug',
						x: 0,
						y: 0,
						n: [1]
					},
					1: {
						t: 'n',
						x: 128,
						y: 128,
						n: [2]
					},
					2: {
						t: 'n',
						x: 64,
						y: 128,
						n: [3]
					},
					3: {
						t: 'n',
						x: 0,
						y: 128,
						n: [4]
					},
					4: {
						t: 'n',
						x: 0,
						y: 64,
						n: [5]
					},
					5: {
						t: 'n',
						x: 0,
						y: 0,
						n: [6]
					},
					6: {
						t: 'n',
						x: 64,
						y: 0,
						n: [7]
					},
					7: {
						t: 'n',
						x: 128,
						y: 0,
						n: [8]
					},
					8: {
						t: 'n',
						x: 128,
						y: 64,
						n: [1]
					},
				}
			},

			editor: {
				selected: null,
				showOutput: false,
				showDetails: -1,
				showMenu: true
			}
		}

		emitter.emit('update');
		// socket = openSocket(cfg.SERVER);
	},

	getGameState: function() {
		if (gameState == null) {
			this.initialize();
		}
		return gameState;
	},

	subscribe: function(cb) {
		emitter.addListener('update',cb);
	},

	unsubscribe: function(cb) {
		emitter.removeListener('update',cb);
	},

	updateGameState: function(action, data) {
		switch (action) {
			case 'AppGoto':
				// check data?
				gameState.app.screen = data;
				break;
			default:
				console.error("Unhandled action",action,data);
				return;
		}
		// change it
		emitter.emit('update');
	}
}