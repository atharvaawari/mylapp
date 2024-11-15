import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {storeData} from '../utils/asyncStorage';
import Config from 'react-native-config';
import { jwtDecode } from 'jwt-decode';

const WEB_CLIENT_ID = Config.GOOGLE_WEB_CLIENT_ID;

GoogleSignin.configure({
  webClientId: WEB_CLIENT_ID, // From Google Cloud Console
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
    console.error('Error with Google login:', error);
  }
};
