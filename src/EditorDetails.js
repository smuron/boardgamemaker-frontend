import React, { Component } from 'react';

import GameStore from './GameStore';

class EditorDetails extends Component {

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
    if (this.state.gameState.editor.selected == null) {
      return (
        <div className="EditorDetails">
          (nothing selected)
        </div>
      );
    }

    let spaceInfo = this.state.gameState.board.spaces[this.state.gameState.editor.selected];

    return (
        <div className="EditorDetails">
          Id: <input type="text" value={this.state.gameState.editor.selected} /><br/>
          Type: <input type="text" value={spaceInfo.t} /><br/>
          X: <input type="text" value={spaceInfo.x} /><br/>
          Y: <input type="text" value={spaceInfo.y} /><br/>
          Links: <input type="text" value={spaceInfo.n.join(',')} />
        </div>
      );
  }
}

export default EditorDetails;
