import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button, StyleSheet } from 'react-native';
import RandomNumber from './RandomNumber';
import shuffle from 'lodash.shuffle';

class Game extends Component {
  static propTypes = {
    randomNumberCount: PropTypes.number.isRequired,
    initialSeconds: PropTypes.number.isRequired,
    onPlayAgain: PropTypes.func.isRequired
  };
  state = {
    selectedIds: [],
    remainingSeconds: this.props.initialSeconds
  };
  gameStatus = "PLAYING";

  randomNumbers = Array
    .from({length: this.props.randomNumberCount})
    .map(() => 1 + Math.floor(10* Math.random()));
  shuffleRandomNumbers = shuffle(this.randomNumbers);
  target = this.randomNumbers.slice(0,this.props.randomNumberCount - 2).reduce((acc, curr) => acc + curr, 0);
  
  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState((prevState) => {
        return {remainingSeconds: prevState.remainingSeconds - 1}
      }, () => {
        if(this.state.remainingSeconds === 0) {
          clearInterval(this.intervalId);
        }
      })
    }, 1000);
  }

  componentWillUpdate(nextProps, nextState) {
    if(nextState.selectedIds !== this.state.selectedIds || nextState.remainingSeconds === 0) {
      this.gameStatus = this.calcGameStatus(nextState)
      if(this.gameStatus !== 'PLAYING') {
        clearInterval(this.intervalId)
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  isNumberSelected = (numberIndex) => {
    return this.state.selectedIds.indexOf(numberIndex) >= 0;
  };
  selectNumber = (numberIndex) => {
    this.setState((prevState) => ({
      selectedIds: [...prevState.selectedIds, numberIndex]
    }))
  };
  calcGameStatus = (nextState) => {
    const sumSelected = nextState.selectedIds.reduce((acc, curr) => {
      return acc + this.shuffleRandomNumbers[curr]; 
    }, 0);

    if(nextState.remainingSeconds === 0) {
      return 'LOST';
    }
    if(sumSelected < this.target) {
      return 'PLAYING';
    }
    if(sumSelected === this.target) {
      return 'WIN'
    }
    if(sumSelected > this.target) {
      return 'LOST'
    }
    // console.warn(sumSelected);
  }
  render() {
    const gameStatus = this.gameStatus;
    return (
      <View style={style.container}>
        <View style={style.targetContainer}>
          <Text style={[style.target, style[`STATUS_${gameStatus}`]]}>{this.target}</Text>
        </View>
        <View style={style.optionContainer}>
          <View style={style.optionInnerContainer}>
            {this.shuffleRandomNumbers.map((rn, index)=> 
              <RandomNumber 
                key={index} 
                id={index}
                number={rn} 
                isDisabled={this.isNumberSelected(index)}
                onPress={this.selectNumber}
              />
            )}
          </View>
        </View>
        {this.gameStatus !== "PLAYING" && ( 
          <Button title="Play Again" onPress={this.props.onPlayAgain} />)
        }
        
        <Text>{this.state.remainingSeconds}</Text>
      </View>  
    );
  };
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  },
  targetContainer: {
    paddingTop:10,
    alignItems: 'center',
    flex: 1
  },
  target: {
    backgroundColor: '#24f',
    margin: 10,
    padding: 10,
    fontWeight: 'bold',
    color: 'white',
    fontSize: 28,
    width: 150,
    textAlign: 'center'
  },
  optionContainer: {
    paddingTop:10,
    flex: 3,
  },
  optionInnerContainer: {
    justifyContent: 'space-around',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  option: {
    backgroundColor: '#ddd',
    margin: 10,
    padding: 10,
    fontWeight: 'bold',
    color: 'black',
    fontSize: 28,
    textAlign: 'center',
    width: 125
  },
  STATUS_PLAYING: {
    backgroundColor: '#bbb'
  },
  STATUS_WIN: {
    backgroundColor: 'green'
  },
  STATUS_LOST: {
    backgroundColor: 'red'
  }
});

export default Game;