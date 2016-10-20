import React, { Component } from 'react';
import {
  AsyncStorage,
  AppRegistry,
  Navigator,
  StyleSheet,
  TouchableHighlight,
  Text,
  View
} from 'react-native';
import wednesdayWords from '../words/wednesday.json';
import LikedWords from '../components/likedWords.js';


class MainScreen extends Component {


  constructor(props) {
   super(props);
   this.state = {
     adjective:"blank",
     definition: "Definition",
     definitionVisible: false,
   };

   this.getAdjective = this.getAdjective.bind(this)
   this.getDefinition = this.getDefinition.bind(this)
  this._likeWord = this._likeWord.bind(this)
  };

  getAdjective() {
    this.setState({
      adjective: wednesdayWords.words[Math.floor(Math.random()*wednesdayWords.words.length)],
      definitionVisible: false
    })
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

  async _likeWord() {

    //Get currently liked words

    //If there are currently liked words...
    try {
      const currentWords = await AsyncStorage.getItem("likedWords");
      if (currentWords !== null){
        //If there is an array of words
        try{
          const newWords = JSON.parse(currentWords).concat(this.state.adjective);
          this.setState({likedWords: ds.cloneWithRows(newWords) });
          try {
            await AsyncStorage.setItem('likedWords', JSON.stringify(newWords));
          } catch (error) {
            console.log("Couldn't save new words");
          }
          //If there's only one
        }catch(error){
          const newWords = [currentWords].concat(this.state.adjective);
          this.setState({likedWords: ds.cloneWithRows(newWords) });
          try {
            await AsyncStorage.setItem('likedWords', JSON.stringify(newWords));
          } catch (error) {
            console.log("Couldn't save new words");
          }
        }
      }

      //If no currently liked words found...
      else{
        try {
          await AsyncStorage.setItem('likedWords', this.state.adjective);
          this.setState({likedWords: ds.cloneWithRows([this.state.adjective]) });
        } catch (error) {
          console.log("Couldn't save new word");
        }
      }

    } catch (error) {
      console.log("Couldn't get current words" + error.message);
    }

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
        <Text>Current Scene: {this.props.title}</Text>
        <TouchableHighlight onPress={this.props.onForward}>
          <Text>View Liked Words</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.props.onBack}>
          <Text>Back</Text>
        </TouchableHighlight>
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

        <Text currentWord={this.state.adjective} onPress={this._likeWord} style={styles.instructions}>
          Like {this.state.adjective}
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

export default MainScreen;
