/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,FlatList,Button ,  TouchableHighlight , Alert , Modal , TextInput} from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import {SwipeableFlatList} from 'react-native-swipeable-flat-list';
import login from './src/component/login'
import mainPage from './src/component/mainPage'
import './src/storage'
// import { createStackNavigator, createAppContainer } from "react-navigation";

// type Props = {};
// export default class App extends Component<Props> {
//   render() {
//     return (
//       <AppNavigator/>
//     );
//   }
// }

const AppNavigator = createStackNavigator({
  loginScreen: {
    screen: login
  },
  mainScreen: {
    screen: mainPage
  }
},{
  initialRouteName: 'loginScreen',
});

export default createAppContainer(AppNavigator);