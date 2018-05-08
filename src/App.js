import React, { Component } from 'react';

import Lobby from './Lobby.js'
import Board from './Board.js';
import EditorBoard from './EditorBoard.js';
import GameStore from './GameStore.js';

import './App.css';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = GameStore.getGameState();
  }

  componentWillMount() {
    GameStore.subscribe(this.updateGameState.bind(this));
  }

  componentWillUnmount() {
    GameStore.unsubscribe(this.updateGameState.bind(this));
  }

  updateGameState() {
      this.setState(GameStore.getGameState());
  }

  goToLobby() {
    GameStore.updateGameState('AppGoto', 'lobby');
  }

  goToGame() {
    GameStore.updateGameState('AppGoto', 'game');
  }

  goToEditor() {
    GameStore.updateGameState('AppGoto', 'editor');
  }

  render() {

    switch (this.state.app.screen) {
      case 'editor':
        return (
          <div className="App">
            <EditorBoard />
          </div>
        );
      case 'game':
        return (
          <div className="App">
            <Board />
          </div>
        );
      case 'lobby':
        return (
          <div className="App">
            <Lobby />
          </div>
        );
      case 'title':
      default:
        return (
          <div className="App">
            <button onClick={this.goToLobby}>Play</button> <button onClick={this.goToEditor}>Editor</button>
          </div>
        );  
    }

    
  }
}

export default App;
