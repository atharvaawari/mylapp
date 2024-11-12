import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
// import {API_SECRET_KEY} from '@env';
import ScoreTable from '../components/ScoreTable';
import {useFocusEffect} from '@react-navigation/native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const HomeScreen = ({navigation, route}) => {
  const {user} = route.params || {};
  // console.log("userDatass in home",user)

  const [globalData, setGlobalData] = useState([]);
  const [visibleGlobalData, setVisibleGlobalData] = useState([]);
  const [showAllGlobalData, setShowAllGlobalData] = useState(false);

  const [gameData, setGameData] = useState([]);
  const [visibleGameData, setVisibleGameData] = useState([]);
  const [showAllGameData, setShowAllGameData] = useState(false);

  const [userScore, setUserScore] = useState(null);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '151952246619-kiqfnubg5jkib81uenuoo9qugs5bk6hj.apps.googleusercontent.com', // replace with your web client ID
      offlineAccess: true,
    });
  }, []);

  const fetchGlobalScore = async () => {
    try {
      const response = await fetch(
        `https://www.mindyourlogic.com/api/games/global-games-rank`,
      );

      if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}`);
        const errorText = await response.text();
        console.error('Error response:', errorText); // Log raw error response
        return;
      }

      const data = await response.json();
      setGlobalData(data);
      setVisibleGlobalData(data.slice(0, 5));
    } catch (error) {
      console.error('Fetch error:', error);
    }
    ``;
  };

  const fetchGameScore = async () => {
    try {
      const response = await fetch(
        `https://www.mindyourlogic.com/api/games/curr-game-rank?game=color-mind-match&key=LogicalBaniyaSecretKey`,
      );

      const data = await response.json();
      setGameData(data);
      // console.log("gameData",gameData);
      setVisibleGameData(data.slice(0, 5));

      const currentUserData = data.find(
        item => item.user_name === user.user_name,
      );
      if (currentUserData) {
        setUserScore(currentUserData.points);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   fetchGlobalScore();
  //   fetchGameScore();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      fetchGlobalScore();
      fetchGameScore();
    }, []),
  );

  const handleShowMoreGlobal = () => {
    setShowAllGlobalData(!showAllGlobalData);
    setVisibleGlobalData(
      showAllGlobalData ? globalData.slice(0, 5) : globalData,
    );
  };

  const handleShowMoreGame = () => {
    setShowAllGameData(!showAllGameData);
    setVisibleGameData(showAllGameData ? gameData.slice(0, 5) : gameData);
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      navigation.replace('Login'); // Redirect to LoginScreen on logout
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // const renderGlobalScoreTable = ({ item, index }) => {
  //   return (
  //     <View style={styles.row}>
  //       <Text >{index + 1}.</Text>
  //       <Text style={styles.cell}>{item.Name}</Text>
  //       <Text style={styles.cell}>{item.points}</Text>
  //     </View>
  //   )
  // }

  return (
    <View style={styles.container}>
      {user && (
        <View style={styles.userInfo}>
          <Image source={{uri: user.photo}} style={styles.profileImage} />
          <TouchableOpacity onPress={signOut}>
            <Text style={styles.logoutButton}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      <Text style={styles.title}>Games</Text>
      {/* <Button
        style={styles.btn}
        title="Math Matrix"
        onPress={() => navigation.navigate('Game', {gameId: 'game1'})}
      />

      <Button
        style={styles.btn}
        title="Color Match"
        onPress={() => navigation.navigate('Game', {gameId: 'game2'})}
      /> */}

      <View style={styles.boxContainer}>
        <TouchableOpacity
          style={styles.curvyButton}
          onPress={() =>
            navigation.navigate('Game', {
              gameId: 'game1',
              userName: user.user_name,
            })
          }>
          <Image
            source={require('../assets/math-matrix.webp')}
            style={styles.backgroundImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.boxContainer}>
        <TouchableOpacity
          style={styles.curvyButton}
          onPress={() =>
            navigation.navigate('Game', {
              gameId: 'game2',
              userName: user.user_name,
            })
          }>
          <Image
            source={require('../assets/color-mind-match.webp')}
            style={styles.backgroundImage}
          />
        </TouchableOpacity>
        {userScore && (
          <Text style={styles.scoreText}>Your Score: {userScore}</Text>
        )}
      </View>

      <View>
        <ScoreTable
          title="Score Board"
          data={gameData}
          visibleData={visibleGameData}
          showAll={showAllGameData}
          toggleShowMore={handleShowMoreGame}
        />

        {/* <ScoreTable
          title="Global Scores"
          data={globalData}
          visibleData={visibleGlobalData}
          showAll={showAllGlobalData}
          toggleShowMore={handleShowMoreGlobal}
        /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  boxContainer: {
    alignItems: 'center',
    marginBottom: 30, // Adds spacing between boxes
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  btn: {
    marginTop: 10,
    marginBottom: 10,
  },
  userInfo: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  logoutButton: {
    fontSize: 16,
    color: 'blue',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  curvyButton: {
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover', 
  },
  scoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000', 
    textAlign: 'center',
  },
});

export default HomeScreen;
