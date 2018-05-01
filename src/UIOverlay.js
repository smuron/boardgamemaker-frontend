import React, { Component } from 'react';


import GameStore from './GameStore';

class UIOverlay extends Component {

  constructor(props) {
  	super(props);
    this.state = {
      gameState: GameStore.getGameState()
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
  	console.log(this.state.gameState);

  	let playerElements = [];
  	let p = null;
  	p = this.state.gameState.players[0];
  	if (p) {
  		playerElements.push(this.makePlayerElement(p,0))
  	}
  	p = this.state.gameState.players[1];
  	if (p) {
  		playerElements.push(this.makePlayerElement(p,1))
  	}
  	p = this.state.gameState.players[2];
  	if (p) {
  		playerElements.push(this.makePlayerElement(p,2))
  	}
  	p = this.state.gameState.players[3];
  	if (p) {
  		playerElements.push(this.makePlayerElement(p,3))
  	}

  	return (
      <div className="GameOverlay">
        {playerElements}
      </div>
    );
  }

}

export default UIOverlay;