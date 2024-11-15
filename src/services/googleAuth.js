import {GoogleSignin, statusCodes} from '@react-native-google-signin/google-signin';
import {storeData} from '../utils/asyncStorage';
import Config from 'react-native-config';
import { jwtDecode } from 'jwt-decode';

const WEB_CLIENT_ID = Config.GOOGLE_WEB_CLIENT_ID;


  console.log("WEB_CLIENT_ID", WEB_CLIENT_ID)

GoogleSignin.configure({
  webClientId: '458040499380-er76gohdqjlp3r61fbtasptjl5fkiu20.apps.googleusercontent.com', 
  offlineAccess: true,
  forceCodeForRefreshToken: true,
});

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

   const decoded = jwtDecode(data.token);

    return decoded;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

export const googleLogin = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();

    const mylAppUser = await fetchUserData(userInfo.data);
    await storeData('user', mylAppUser);

    return mylAppUser;
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
    console.error('Error with Google login:', error);
  }
};
