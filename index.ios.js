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
   this.state = {adjective:"blank", definition: "Definition", definitionVisible: false};

   this.getAdjective = this.getAdjective.bind(this)
   this.getDefinition = this.getDefinition.bind(this)
  };

  getAdjective() {
  return fetch("https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=adjective&minCorpusCount=4000&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5")
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        adjective: responseJson.word,
        definitionVisible:false
      })
    })
    .catch((error) => {
      console.error(error);
    });
  };

  getDefinition(){

    let url = "https://api.wordnik.com/v4/word.json/" + this.state.adjective + "/definitions?limit=200&includeRelated=true&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";

    console.log(url);

    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          definition: responseJson[0].text,
          definitionVisible: true
        })
      })
      .catch((error) => {
        console.error(error);
      });

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
          Have a {this.state.adjective} {day}!
        </Text>

        <Text onPress={this.getDefinition} style={styles.instructions}>
          What does that mean?
        </Text>

        {this.state.definitionVisible && <Text style={styles.definition}>
          {this.state.definition}
        </Text>}

        <Text onPress={this.getAdjective} style={styles.instructions}>
          Refresh
        </Text>



      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    marginTop: 100,
    marginLeft: 30,

  },
  welcome: {
    fontSize: 45,
    fontWeight: 'bold',
    textAlign: 'left',
    lineHeight: 45,
    letterSpacing: -2,
    marginBottom: 20
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 20,
    color: '#0795F8'
  },
  definition:{
    fontStyle: 'italic',
    fontSize: 20,
    color: '#aaaaaa',
    marginBottom: 20
  }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
