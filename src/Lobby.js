import React, { Component } from 'react';

import GameStore from './GameStore.js';

class Lobby extends Component {

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

  refreshLobby() {
    GameStore.refreshLobby();
  }

  createNewGame() {
    // get game info
    console.log('unimplemented! createNewGame');
  }

  goToGame() {
    GameStore.updateGameState('AppGoto', 'game');
  }

  render() {
    
    let openGames = []; // TODO

    return (
      <div className="lobby">
        <button onClick={this.refreshLobby.bind(this)}>Refresh</button><br/>
        <button onClick={this.createNewGame.bind(this)}>Create New Game</button><br/>
        <ul key="lobbyList">
          {openGames}
        </ul>
      </div>
    );
  }
}

export default Lobby;
