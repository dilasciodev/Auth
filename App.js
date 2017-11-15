import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Header, Button, Spinner } from './src/components/common';
import firebase from 'firebase';
import LoginForm from './src/components/LoginForm';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
  state = {
    loggedIn: null,


  }

  componentWillMount(){
    firebase.initializeApp({
    apiKey: "AIzaSyCN6TQasHKfQsO5gKXegTFLM2aFgVCFfZ0",
    authDomain: "authentication-55b04.firebaseapp.com",
    databaseURL: "https://authentication-55b04.firebaseio.com",
    projectId: "authentication-55b04",
    storageBucket: "authentication-55b04.appspot.com",
    messagingSenderId: "131896962695"
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true});
      } else {
        this.setState({ loggedIn: false});
      }
    });
  }

  renderContent(){
    switch(this.state.loggedIn) {
      case true:
        return (
          <Button onPress={() => firebase.auth().signOut()}>
            Log Out</Button>
        )
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header headerText="Log In" />
        {this.renderContent()}
        <Text style={styles.welcome}>
          Howl Alert
        </Text>
        <Text style={styles.instructions}>
          blah
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

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
