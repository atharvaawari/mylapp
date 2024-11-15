import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useAuth} from '../context/AuthContext';
import { GameContext } from '../context/Context';

const Profile = () => {
  const navigation = useNavigation();


  //states fetching for score and user data
  const {userState, logout} = useAuth();
  const {user} = userState;
  const {state} = useContext(GameContext);
  const [userScore, setUserScore] = useState(null);
  

  //fetching user globalScore
  const fetchUserGlobalScore = (userName) => {
    const score = state.globalScore?.find(userScore => {
      return userScore.user_name === userName;
    });
    setUserScore(score); 
  };

  //for fetchig every time the state update
  useEffect(() => {
    const userName = user?.user_name;
    if (userName) {
      fetchUserGlobalScore(userName);
    }
  }, [state.globalScore, user]);



  const handleRankPress = () => {
    const title = 'Score Board';

    navigation.navigate('Main', {
      screen: 'GameScore',
      params: {title: 'Global Score'},
    }); // The GameScore screen is in the HomeStackNavigator. If you’re navigating from a screen outside this stack, you’ll need to target the nested navigator explicitly.
  };

    const handleLoginPress = () => {
      navigation.navigate('Main', {
        screen:'Login',
      })
    }


  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.wrapper}>
          <View style={styles.container}>
            <Image
              source={user ? {uri: user.userPicture} : require('../assets/icons/profile.jpeg')}
              style={styles.profilePhoto}
            />

            <View style={styles.details}> 
              <Text style={styles.name}>{user ? user.name : "Login for your score"}</Text>
              <Text style={styles.username}>{user ? user.user_name : "Guest"}</Text>
              <TouchableOpacity 
              onPress={user ? logout : handleLoginPress }
              style={styles.logoutbtn}
              >
                <Text style={styles.profileButton}>
                  {user ? "Logout" : "Login"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoText}>Game Score</Text>
            <View style={styles.line} />
            <View style={styles.container2}>
              <View style={styles.rankContainer}>
                <Image
                  source={require('../assets/icons/trophy.png')}
                  style={styles.trophy}
                />
                <Text style={styles.ranktxt}>Rank: {userScore?.sno}</Text>
                <View style={styles.verticalLine} />
                <Image
                  source={require('../assets/icons/scorecard.png')}
                  style={styles.trophy}
                />
                <Text style={styles.ranktxt}>Score: {userScore?.points}</Text>
              </View>
            </View>
          </View>

          <View style={styles.container2}>
            <TouchableOpacity
              style={styles.GlobalRankbtn}
              onPress={handleRankPress}>
              <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                Game Ranking
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-start', 
  },
  wrapper: {
    alignItems: 'center',
    backgroundColor: '#6C57C0',
    width: '100%',
    height: '100%',
    paddingBottom: 0,
  },
  container: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#6C57C0',
  },
  tableText: {
    color: '#fff', 
  },

  profileButton:{
    textAlign: 'center', 
    fontWeight: 'bold',
    fontSize:16,
  },
  rankTableContainer: {
    backgroundColor: '#533fa0',
    padding: 10,
    borderRadius: 15,
    marginVertical: 20,
    alignItems: 'center',
    width: '90%',
  },

  tableTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  container2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container3: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  rankContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    justifyContent: 'center',
  },
  profilePhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
    maxHeight: 80, // Optional: limits height
    maxWidth: 80, // Optional: limits width
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  username: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 8,
  },
  infoBox: {
    backgroundColor: '#533fa0',
    padding: 10,
    borderRadius: 15,
    marginVertical: 10,
    alignItems: 'center',
    width: '90%',
    height: '20%',
  },
  infoText: {
    paddingTop: 5,
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  line: {
    height: 1,
    backgroundColor: '#7c69c2',
    marginTop: 5,
    width: '100%',
  },
  trophy: {
    width: 30,
    height: 30,
    paddingTop: 30,
    marginLeft: 15,
    marginTop: 10,
  },
  ranktxt: {
    color: '#fff',
    padding: 10,
    fontSize: 15,
    fontWeight: 'bold',
  },
  verticalLine: {
    width: 1,
    backgroundColor: '#fff',
    height: 30,
    alignSelf: 'center',
    marginTop: 5,
    marginLeft: 15,
  },

  logoutbtn: {
    backgroundColor: '#FFD25F',

    padding: 8,
    width: 80,
    borderRadius: 5,
  },
  GlobalRankbtn: {
    backgroundColor: '#FFD25F',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    shadowColor: '#BA8D38',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.9,
    shadowRadius: 0,
    elevation: 55,
    marginTop: 10,
  },

  statsicon: {
    backgroundColor: '#fed360',
    paddingVertical: 2,
    paddingHorizontal: 2,
    borderRadius: 5,
    shadowColor: '#BA8D38',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.9,
    shadowRadius: 0,
    elevation: 55,
  },
  statsicon2: {
    width: 30,
    height: 30,
  },
  gamerowtext: {
    color: '#fff',
  },
  gameremote: {
    width: 40,
    height: 40,
  },
});

export default Profile;
