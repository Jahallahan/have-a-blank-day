import React, { Component } from 'react';
import {
  AsyncStorage,
  AppRegistry,
  Navigator,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import MainScreen from './app/components/mainScreen.js'
import LikedWords from './app/components/likedWords.js';

//To make a datalist

class AwesomeProject extends Component {

  constructor(props) {
   super(props);
   this.state = {
     adjective:"blank",
   };
 };

 handleLike(word){

 };



  render() {

    const routes = [
      {title: 'Main Screen', index: 0},
      {title: 'List of Liked Words', index: 1}
    ];


    return (
      <Navigator
        initialRoute={routes[0]}
        initialRouteStack={routes}
        renderScene={(route, navigator) =>
          route.index === 0 ? (
            <MainScreen


              title={route.title}

              onForward={ () => {
                const nextIndex = route.index + 1;
                navigator.push({
                  title: routes[nextIndex].title,
                  index: nextIndex,
                });
              }}

              onBack={() => {
                if (route.index > 0) {
                  navigator.pop();
                }
              }}

              onLike={}

            />
        ) :
        (<LikedWords

          adjective={this.state.adjective}

          onBack={() => {
            if (route.index > 0) {
              navigator.pop();
            }
          }}

          />)


        }
      />
    );
  }
}



AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
