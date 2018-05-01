import cfg from './AppConfig'
import openSocket from 'socket.io-client';

var EventEmitter = require('events').EventEmitter;
 
var emitter = new EventEmitter();

var gameState = null;
var socket = null;

export default {

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
				width: 640,
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