import React, { Component } from 'react';
import Header from './components/Header';
import Grid from './components/Grid/';
import './app.scss';

class App extends Component {
  

  render() {
    return (
      <div className="App">
        <Header />
        <Grid />
      </div>
    );
  }
}

export default App;
