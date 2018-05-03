import React, { Component } from 'react';

import GameStore from './GameStore';

class EditorMenu extends Component {

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

  createNewBoard() {
    GameStore.editorFunctions.createNew()
  }

  loadBoard() {
    let boardId = prompt("Debug: Board ID?");
    GameStore.editorFunctions.loadBoard(boardId)
  }

  saveBoard() {
    GameStore.editorFunctions.saveCurrent()
  }

  addSpace() {
    GameStore.editorFunctions.addSpace();
  }

  render() {
    // TODO: make these dropdowns so we can fit more
    return (
      <div className="EditorMenu">
        <button onClick={this.createNewBoard.bind(this)}>New Board</button>
        <button onClick={this.loadBoard.bind(this)}>Load Board</button>
        <button onClick={this.saveBoard.bind(this)}>Save</button>
        <br/>
        <button onClick={this.addSpace.bind(this)}>+ Space</button>
      </div>
    );
  }
}

export default EditorMenu;
