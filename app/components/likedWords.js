import React, { Component } from 'react';
import {
  AsyncStorage,
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native';

//To make a datalist
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class LikedWords extends Component {

  constructor(props) {
   super(props);
   this.state = {
     likedWords: ds.cloneWithRows([""]),
   };

   this._clearLikedWords = this._clearLikedWords.bind(this)
  };




  async _clearLikedWords(){
    try {
      await AsyncStorage.setItem('likedWords', "");
      this.setState({likedWords: ds.cloneWithRows([""]) })
    } catch (error) {
      console.log("Couldn't remove words");
    }

  };


  render() {

    return (
      <View style={styles.container}>

        <Text onPress={this.props.onBack}>
        Go Back
        </Text>



        <Text onPress={this._clearLikedWords} style={styles.instructions}>
          Clear saved words
        </Text>

        <ListView
          dataSource={this.state.likedWords} renderRow={(rowData) => <Text>{rowData}</Text>}
          />


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



export default LikedWords;
