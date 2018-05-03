import React, { Component } from 'react';

import EditorMenu from './EditorMenu';
import EditorDetails from './EditorDetails';
import EditorOutput from './EditorOutput';

import GameStore from './GameStore';

class EditorUIOverlay extends Component {

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

  makePlayerElement(p,i) {
  	return (
  		<div key={i} className={'Player'+i}>
  			Player: {p.name}
  		</div>
  	);
  }

  render() {

  	if (!this.state) {
  		return (<div>DEBUG: Not Loaded</div>);
  	}

  	let shownElements = [];
    let editor = this.state.gameState.editor;
    if (editor.showMenu) {
      shownElements.push(<EditorMenu key='EditorMenu'></EditorMenu>);
    }
    if (editor.selected !== null) {
      shownElements.push(<EditorDetails key='EditorDetails'></EditorDetails>);
    }
    if (editor.showOutput) {
      shownElements.push(<EditorOutput key='EditorOutput'></EditorOutput>);
    }

  	return (
      <div className="GameOverlay">
        {shownElements}
      </div>
    );
  }

}

export default EditorUIOverlay;