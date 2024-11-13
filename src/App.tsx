import React from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/Home';
import Game from './screens/Games';
import PlayGame from './screens/PlayGame';
import Profile from './screens/Profile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { GameProvider } from './context/Context';
import GameScore from './screens/GameScore';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStackNavigator() {
  return (
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
            <Stack.Screen name="Game" component={Game} options={{ headerShown: false }} />
            <Stack.Screen name="PlayGame" component={PlayGame} options={{ headerShown: false }} />
            <Stack.Screen name="GameScore" component={GameScore} options={{ headerShown: false }} />
          </Stack.Navigator>
  )
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let iconSource;

          // Set the icon source based on the route name
          if (route.name === 'Main') {
            iconSource = require('./assets/icons/home-icon.png');
          } else if (route.name === 'Profile') {
            iconSource = require('./assets/icons/profile-icon.png');
          }

          // Return the custom icon
          return (
            <Image
              source={iconSource}
              style={{
                width: focused ? 52 : 50,
                height: focused ? 52 : 50,
                alignSelf:'center',
                marginTop:35,

              }}
              resizeMode="contain"
            />
          );
        },
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        },
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 70,
        },
        tabBarActiveTintColor: '#42f44b',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Main" component={HomeStackNavigator} options={{ headerShown: false, tabBarLabel: '' }}/>
      <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false, tabBarLabel: '' }} />
    </Tab.Navigator>
  );
}

function App(): JSX.Element {
  return (
    <GameProvider>
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
    </GameProvider>
  );
}

// function App() : JSX.Element {
//   return (
//         <NavigationContainer>
//           <Stack.Navigator initialRouteName="Login">
//             <Stack.Screen name="Home" component={Home} />
//             <Stack.Screen name="Profile" component={Profile} />

//             {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
//             {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
//             {/* <Stack.Screen name="Game" component={GameScreen} /> */}
//           </Stack.Navigator>
//         </NavigationContainer>
//   );
// }

export default App;

// error while build : go to clean gredlew and rebuild the app
// Authentication error of SHA1: re generate debug.keystore file  inside android/app
// #ERROR-bunddling_or_metro-not-connecting-to-app
//step-1: add assets folder inside android/app/src/main
//step-2: command- 'npx react-native bundle --platform android --dev false --entry-file index.js
//--bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res'
