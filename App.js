/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Game from './src/components/Game';

export default class App extends Component{
  state = {
    gameId: 1
  };
  resetGame = () => {
    this.setState((prevState) => {
      return { gameId: prevState.gameId + 1};
    })
  }
  render() {
    return (
      <Game 
        key={this.state.gameId} 
        onPlayAgain={this.resetGame} 
        randomNumberCount={6}
        initialSeconds={10}
      />
    );
  }
}