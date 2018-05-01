import React, { Component } from 'react';

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
    GameStore.subscribe(this.updateMessages.bind(this));
  }

  componentWillUnmount() {
    GameStore.unsubscribe(this.updateMessages.bind(this));
  }

  updateMessages() {
      this.setState(GameStore.getGameState());
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
      case 'title':
      default:
        return (
          <div className="App">
            <button onClick={this.goToGame}>Game</button> <button onClick={this.goToEditor}>Editor</button>
          </div>
        );  
    }

    
  }
}

export default App;
