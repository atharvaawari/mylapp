import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, Image, useColorScheme} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

// GoogleSignin.configure({
// 	webClientId: '151952246619-kiqfnubg5jkib81uenuoo9qugs5bk6hj.apps.googleusercontent.com',
// 	androidClientId: '151952246619-jli1s6sc00eu8nd4a1ho9rot470n7h91.apps.googleusercontent.com',
// 	iosClientId: '151952246619-s8ahr06nclccho95vtnsbe7l3il5n75e.apps.googleusercontent.com',
// 	scopes: ['profile', 'email'],
// });

export default function LoginScreen({navigation}) {

  const isDarkMode = useColorScheme() === 'white'

  const [user, setUser] = useState({});

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '458040499380-er76gohdqjlp3r61fbtasptjl5fkiu20.apps.googleusercontent.com', // From Google Cloud Console
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });

    // checkIfUserIsSignedIn();
  }, []);

  // const checkIfUserIsSignedIn = async () => {
  //   const isSignedIn = await GoogleSignin.isSignedIn();
  //   if (isSignedIn) {
  //     const currentUser = await GoogleSignin.getCurrentUser();

  //     setUser(currentUser.data.user); // Set the user if already signed in
  //     navigation.replace('Home', {user: currentUser.data.user});
  //   }
  // };

  const fetchUser = async userInfo => {
    try {
      // console.log('token', userInfo);
      const response = await fetch(
        `https://www.mindyourlogic.com/mobile-app-login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({userInfo}),
        },
      );
      const data = await response.json();

      // console.log('User data:', data);
      return data;
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchUserData = async userInfo => {
    
    try {
      const response = await fetch(
        `https://www.mindyourlogic.com/mobile-app-login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userInfo),
        },
      );
      const data = await response.json();

      // console.log('User data:', data);
      return data;
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // console.log('User Info:', userInfo.data.idToken);
      
      // setUser(userInfo.data.user);
      const backendUser = await fetchUserData(userInfo.data);
      setUser(backendUser);
      // console.log('backenduser', backendUser);

      navigation.replace('Home', {user: backendUser});
      // Handle successful login, maybe save user data or token here
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the sign-in');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign-in in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services not available');
      } else {
        console.error(error);
      }
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUser(null); // Clear the user data from state
      console.log('User signed out');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    // <View style={styles.container}>
    //   <Text style={styles.title}>Login To Play</Text>
    //   <Button title="Login with Google" onPress={signInWithGoogle} />
    // </View>

    // <View style={styles.container}>
    //   {user ? (
    //     <View style={styles.userInfo}>
    //       <Text style={styles.title}>Welcome, {user.name}</Text>
    //       <Image source={{uri: user.photo}} style={styles.profileImage} />
    //       <Text style={styles.subtitle}>{user.email}</Text>
    //       <Button title="Logout" onPress={signOut} />
    //     </View>
    //   ) : (
    //     <>
    //       <Text style={styles.title}>Login To Play</Text>
    //       <Button title="Login with Google" onPress={signInWithGoogle} />
    //     </>
    //   )}
    // </View>

    <View style={styles.container}>
      <Text style={[styles.title, isDarkMode ? styles.whiteText : styles.darkText]}>Login To Play</Text>
      <Button title="Login with Google" onPress={signInWithGoogle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  whiteText: {
    color:'#fff'
  },
  darkText:{
    color:"#000"
  }
});
