import React, { Component } from 'react';

import Board from './Board.js';

import './App.css';



class EditorApp extends Component {
  render() {
    return (
      <div className="App">
        <EditorBoard />
      </div>
    );
  }
}

export default EditorApp;
