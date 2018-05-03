import React, { Component } from 'react';

import GameStore from './GameStore';


const TILE_SIZE = 16; // TODO: support changing this or using board value?

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

  editorSpaceClick(ev) {
    if (this.this.state.gameState.app.screen === "editor") {
      GameStore.editorFunctions.selectSpace(this.k);
    } else {
      console.log('unimplemented',this,ev);
    }
  }

  debugRenderSpace(s,board,k) {
    // TODO: precalc this 
    let rawCoords = {
      left: (100.0*s.x/board.width),
      top: (100.0*s.y/board.height),
      width: TILE_SIZE*100.0/board.width,
      height: TILE_SIZE*100.0/board.height
    };
    let style = {
      left: rawCoords.left+'%',
      top: rawCoords.top+'%',
      zIndex: 1
    };
    let isEditor = this.state.gameState.app.screen==='editor';
    let onClick = isEditor?this.editorSpaceClick.bind({this:this,k:k}):null;
    
    let isSelected = isEditor && this.state.gameState.editor.selected === k;
    let additionalEl = [];

    if (isEditor && isSelected) {
      // attempt to draw connecting arrows

      for (let i = 0; i < s.n.length; i++) {
        let linkedId = s.n[i];
        console.log('drawing arrows',linkedId);
        let linkedSpace = board.spaces[linkedId];
        let linkedCoords = {
          left: 100.0*linkedSpace.x/board.width,
          top: 100.0*linkedSpace.y/board.height,
          width: TILE_SIZE*100.0/board.width,
          height: TILE_SIZE*100.0/board.height
        };

        console.log(linkedId, rawCoords, linkedCoords)

        let svgStyle = {
          left: rawCoords.left+rawCoords.width/2+"%",
          top: rawCoords.top+rawCoords.height/2+"%",
        }

        let x1 = rawCoords.left;
        let x2 = linkedCoords.left;
        let y1 = rawCoords.top;
        let y2 = linkedCoords.top;

        var length = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
        var angle  = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        var transform = 'rotate('+angle+'deg)';

        let lineStyle = {transform: transform, width: length+'%', left: svgStyle.left, top: svgStyle.top};

        additionalEl.push(
          <div key={"linked"+i} className="Space-arrow" style={lineStyle}>

          </div>
        )
      }

      console.log(additionalEl);
    }

    return (
      <div key={k+'holder'} className={"Space-holder"}>
        <div id={"space-"+k} key={k} className={'Space Space-'+s.t+(isSelected?" Space-selected":"")} onClick={onClick} style={style}></div>
        {additionalEl}
      </div>
    );
  }

  render() {

    let gameSpaces = [];
    let board = this.state.gameState.board;

    for (let k in Object.keys(board.spaces)) {
      gameSpaces.push(this.debugRenderSpace(board.spaces[k],board,k));
    }

    let style = {
      width: board.width + 'px',
      height: board.height + 'px',
    }

    return (
      <div className="BoardSpaces" style={style}>
        {gameSpaces}
      </div>
    );
  }
}

export default Board;
