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
      <div className="EditorDetails">
        Placeholder for EditorDetails
      </div>
    );
  }
}

export default EditorDetails;
