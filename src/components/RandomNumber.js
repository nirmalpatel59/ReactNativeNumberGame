import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
class RandomNumber extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    number: PropTypes.number.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired,
  };
  handlePress = () => {
    if(this.props.isDisabled) {
      return;  
    }
    this.props.onPress(this.props.id)
  }
  render() {
    return (
      <TouchableOpacity onPress={this.handlePress}>
        <Text style={[style.option, this.props.isDisabled && style.disabled]}>{this.props.number}</Text>
      </TouchableOpacity>
    );
  }
}
const style = StyleSheet.create({
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
  disabled: {
    opacity: 0.3
  }
});

export default RandomNumber;
