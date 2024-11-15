import React from 'react';
import {Image, TouchableOpacity, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//Screens
import Home from './screens/Home';
import Game from './screens/Games';
import PlayGame from './screens/PlayGame';
import Profile from './screens/Profile';
import GameScore from './screens/GameScore';
import Login from './screens/Login';

//Globle Context
import {GameProvider} from './context/Context';
import {AuthProvider, useAuth} from './context/AuthContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Game"
        component={Game}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PlayGame"
        component={PlayGame}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GameScore"
        component={GameScore}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let iconSource;

          if (route.name === 'Main') {
            iconSource = require('./assets/icons/home-icon.png');
          } else if (route.name === 'Profile') {
            iconSource = require('./assets/icons/profile-icon.png');
          }

          return (
            <Image
              source={iconSource}
              style={[styles.tabBarIcon, focused && styles.tabBarIconFocused]}
              resizeMode="contain"
            />
          );
        },
        tabBarButton: props => (
          <TouchableOpacity
            {...props}
            delayLongPress={undefined}
            style={[
              styles.tabBarButton,
              props.accessibilityState?.selected && styles.tabBarButtonSelected,
            ]}
          />
        ),
        tabBarStyle: styles.tabBarStyle,
        tabBarActiveTintColor: '#42f44b',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="Main"
        component={HomeStackNavigator}
        options={{headerShown: false, tabBarLabel: ''}}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false, tabBarLabel: ''}}
      />
    </Tab.Navigator>
  );
}

function App() {

  return (
    <NavigationContainer>
      <AuthProvider>
        <GameProvider>
          <TabNavigator />
        </GameProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBarIcon: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    marginTop: 15,
  },
  tabBarIconFocused: {
    width: 50,
    height: 50,
  },
  tabBarButton: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarButtonSelected: {
    backgroundColor: '#42f44b',
  },
  tabBarStyle: {
    backgroundColor: '#fff',
    height: 70,
  },
});

export default App;

// error while build : go to clean gredlew and rebuild the app
// Authentication error of SHA1: re generate debug.keystore file  inside android/app
// #ERROR-bunddling_or_metro-not-connecting-to-app
//step-1: add assets folder inside android/app/src/main
//step-2: command- 'npx react-native bundle --platform android --dev false --entry-file index.js
//--bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res'
