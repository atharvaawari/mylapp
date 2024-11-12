import React, {useEffect, useState} from 'react';
import {View, Text, Button, TextInput, StyleSheet, Alert} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:'279595324294-9cb6e7ib6nak2ut5d2r75inku9j8j5c9.apps.googleusercontent.com'
    });
  }, []);

  async function onGoogleButtonPress() {
    try {
      console.log("1")
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      console.log("2")
      // Get the users ID token
      console.log("3")
      const {idToken, user} = await GoogleSignin.signIn();

      Alert.alert('Success Login');
      console.log("token",  idToken);

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log("error");
      Alert.alert("error");
      console.log(error);
    }
  }

  // Handle Email/Password Login
  const signInWithEmail = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Login error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* Email and Password Inputs */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Login with Email" onPress={signInWithEmail} />

      <Text style={styles.orText}>OR</Text>

      {/* Google Sign-In Button */}
      <Button title="Sign in with Google" onPress={onGoogleButtonPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  orText: {
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default LoginScreen;



import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, StyleSheet, Alert } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
// import {
// 	GOOGLE_WEB_CLIENT_ID } from '@env';

GoogleSignin.configure({
  webClientId: '151952246619-h1f79qrtlc9m2250iv2ki4kniml10bk2.apps.googleusercontent.com', // Replace with your actual Web Client ID
  offlineAccess: true,
});

const LoginScreen = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '151952246619-h1f79qrtlc9m2250iv2ki4kniml10bk2.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {user} = await GoogleSignin.signIn();
      setUserInfo(user);
      Alert.alert("Login Success", `Welcome ${user.name}`);
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert("Login Cancelled", "User cancelled the login process.");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert("Login In Progress", "Login is currently in progress.");
      } else {
        console.log(error);
        Alert.alert("Login Error", "An error occurred during login.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to MyApp</Text>
      <Text style={styles.subtitle}>Sign in with Google to continue</Text>
      {userInfo ? (
       ""
      ) : (
        <Button title="Sign in with Google" onPress={signIn} color="#4285F4" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  userInfo: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 14,
    color: 'gray',
  },
});

export default LoginScreen;