import React, { Component } from 'react';

import EditorUIOverlay from './EditorUIOverlay';

import BoardSpaces from './BoardSpaces';

import GameStore from './GameStore';

class EditorBoard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gameState: GameStore.getGameState(),
    };
  }

  componentWillMount() {
    GameStore.subscribe(this.updateMessages.bind(this));
  }

  componentWillUnmount() {
    GameStore.unsubscribe(this.updateMessages.bind(this));
  }

  updateMessages() {
      this.setState({
          gameState: GameStore.getGameState()
      });
  }

  render() {
    return (
      <div className="board">
        <BoardSpaces />

        <EditorUIOverlay />
      </div>
    );
  }
}

export default EditorBoard;
