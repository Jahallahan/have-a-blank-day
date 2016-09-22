/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

class AwesomeProject extends Component {

  constructor(props) {
   super(props);
   this.state = {todaysAdjective: "something"};

   this.handleButtonClick = this.handleButtonClick.bind(this)
  };

  handleButtonClick() {

    var adjectiveList = ["wacky", "wonderful", "whimsical", "wobbly"];

    var randomAdjective = adjectiveList[Math.round(Math.random()*(adjectiveList.length - 1))];

   this.setState({
       todaysAdjective: randomAdjective })
    };

  render() {

    var d = new Date();

    var weekday = new Array(7);
    weekday[0]=  "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    var day = weekday[d.getDay()];

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Have a {this.state.todaysAdjective} {day}!
        </Text>
        <Text onPress={this.handleButtonClick}>
          Go again
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
