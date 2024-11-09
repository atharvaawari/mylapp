import React from 'react';
import {AppRegistry} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {name as appName} from './app.json';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import GameScreen from './src/screens/GameScreen';

import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';

const Stack = createStackNavigator();

function App() {
  return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Game" component={GameScreen} />
          </Stack.Navigator>
        </NavigationContainer>
  );
}



export default App;


// error while build : go to clean gredlew and rebuild the app
// Authentication error of SHA1: re generate debug.keystore file  inside android/app
// #ERROR-bunddling_or_metro-not-connecting-to-app
//step-1: add assets folder inside android/app/src/main
//step-2: command- 'npx react-native bundle --platform android --dev false --entry-file index.js 
//--bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res'