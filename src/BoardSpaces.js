import React, { Component } from 'react';

import GameStore from './GameStore';

class Board extends Component {

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

  editorSpaceClick(ev) {
    console.log('unimplemented',this,ev);
  }

  debugRenderSpace(s,board,k) {
    // TODO: precalc this 

    let style = {
      left: (100.0*s.x/board.width)+'%',
      top: (100.0*s.y/board.height)+'%',
      zIndex: 1
    };
    let onClick = this.state.gameState.app.screen==='editor'?this.editorSpaceClick.bind(this):null;
    console.log(k,onClick);
    return (
      <div key={k} className={'Space Space-'+s.t} onClick={onClick} style={style}></div>
    );
  }

  render() {

    let gameSpaces = [];
    let board = this.state.gameState.board;

    for (let k in Object.keys(board.spaces)) {
      gameSpaces.push(this.debugRenderSpace(board.spaces[k],board,k));
    }

    return (
      <div>
        {gameSpaces}
      </div>
    );
  }
}

export default Board;
