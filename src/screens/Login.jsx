import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  loginWithEmailAndPassword,
  loginWithUsernameEmailPassword,
} from '../services/authService';
import {googleLogin} from '../services/googleAuth';
import {useAuth} from '../context/AuthContext';
import {StackActions, useNavigation} from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const {login} = useAuth();

  const handleLoginWithEmail = async () => {
    try {
      const user = await loginWithEmailAndPassword(email, password);
      login(user); // Store the user data in the global state
    } catch (error) {
      console.log('Login failed:', error);
    }
  };

  const handleLoginWithUsername = async () => {
    try {
      const user = await loginWithUsernameEmailPassword(
        username,
        email,
        password,
      );
      login(user);
    } catch (error) {
      console.log('Login failed:', error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const user = await googleLogin();
    
      navigation.dispatch(StackActions.popToTop());  //Pop To top means Home Screen 

      login(user);
    } catch (error) {
      console.log('Google login failed:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Welcome to Game World</Text>

        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          placeholderTextColor="#000"
        />

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          placeholderTextColor="#000"
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          placeholderTextColor="#000"
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLoginWithEmail}>
          <Text style={styles.buttonText}>Login </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleLogin}>
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Don't have an account? <Text style={styles.signupLink}>Sign up</Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  formContainer: {
    backgroundColor: '#ffffff',
    padding: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingLeft: 15,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f5f5f5',
  },
  loginButton: {
    backgroundColor: '#1973E8',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  googleButton: {
    backgroundColor: '#1973E8', // Google Red
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  googleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
    marginTop: 20,
  },
  signupLink: {
    color: '#1973E8',
    fontWeight: 'bold',
  },
});

export default Login;
