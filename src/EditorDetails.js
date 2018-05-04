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

  detailsFieldChange(key, field, ev) {
    GameStore.editorFunctions.updateSpace(key, field, ev.target.value);
  }

  render() {
    let selectedId = this.state.gameState.editor.selected;
    if (selectedId == null) {
      return (
        <div className="EditorDetails">
          (nothing selected)
        </div>
      );
    }

    let spaceInfo = this.state.gameState.board.spaces[selectedId];

    return (
        <div className="EditorDetails">
          Id: <input type="text" 
                     onChange={this.detailsFieldChange.bind(this, selectedId, 'id')}
                     value={this.state.gameState.editor.selected} /><br/>
          Type: <input type="text" 
                      onChange={this.detailsFieldChange.bind(this, selectedId, 't')}
                      value={spaceInfo.t} /><br/>
          X: <input type="text" 
                      onChange={this.detailsFieldChange.bind(this, selectedId, 'x')}
                      value={spaceInfo.x} /><br/>
          Y: <input type="text" 
                      onChange={this.detailsFieldChange.bind(this, selectedId, 'y')}
                      value={spaceInfo.y} /><br/>
          Links: <input type="text" 
                        onChange={this.detailsFieldChange.bind(this, selectedId, 'n')}
                        value={spaceInfo.n.join(',')} />
        </div>
      );
  }
}

export default EditorDetails;
