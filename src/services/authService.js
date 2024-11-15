import { storeData } from '../utils/asyncStorage';
import Config from 'react-native-config';

  const BASE_URL = Config.BASE_URL;


export const loginWithEmailAndPassword = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/`);
    await storeData('user', response.data.user);
    return response.data.user;
  } catch (error) {
    console.error('Error logging in with email/password:', error);
  }
};


export const loginWithUsernameEmailPassword = async (username, email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/`);
    await storeData('user', response.data.user);
    return response.data.user;
  } catch (error) {
    console.error('Error logging in with username/email/password:', error);
  }
};


export const registerUser = async (username, email, password) => {
  try {
    const response =  await fetch(`${BASE_URL}/`);
    return response.data.user;
  } catch (error) {
    console.error('Error registering user:', error);
  }
};

