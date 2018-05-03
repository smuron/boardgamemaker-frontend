import React, { Component } from 'react';

import UIOverlay from './UIOverlay';

import BoardSpaces from './BoardSpaces';

import GameStore from './GameStore';

class Board extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gameState: GameStore.getGameState()
    };
  }

  componentWillMount() {
    GameStore.subscribe(this.updateGameState.bind(this));
  }

  componentWillUnmount() {
    GameStore.unsubscribe(this.updateGameState.bind(this));
  }

  updateGameState() {
      this.setState({
          gameState: GameStore.getGameState()
      });
  }

  render() {
    return (
      <div className="board">
        BoardComponent
        <BoardSpaces />

        <UIOverlay />
      </div>
    );
  }
}

export default Board;
