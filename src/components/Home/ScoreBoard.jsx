import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {GameContext} from '../../context/Context';
import {AuthContext} from '../../context/AuthContext';

const ScoreBox = ({icon, title, score}) => {
  return (
    <View style={styles.box}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.boxTitle}>{title}</Text>
      <Text style={styles.boxScore}>{score? score : "-"}</Text>
    </View>
  );
};

const ScoreBoard = () => {
  const navigation = useNavigation();

  //states fetching for score
  const {state} = useContext(GameContext);
  const {userState} = useContext(AuthContext);
  const {user} = userState;
  const [userScore, setUserScore] = useState({ score: null, topScore: null });
  

  //fetching user globalScore
  const fetchUserGlobalScore = (userName) => {
    const topScore = state.globalScore[0]?.points;
    const score = state.globalScore?.find(userScore => {
      return userScore.user_name === userName;
    });
    setUserScore({score, topScore}); 
  };

  //for fetchig every time the state update
  useEffect(() => {
    const userName = user?.user_name;
    if (userName) {
      fetchUserGlobalScore(userName);
    }
  }, [state.globalScore, user]);

  return (
    <View>
      <View style={styles.board}>
        <ScoreBox
          icon={require('../../assets/icons/game-score.webp')}
          title="Game Score"
          score={userScore?.topScore}
        />
        <ScoreBox
          icon={require('../../assets/icons/your-score.webp')}
          title="Your Score"
          score={userScore.score?.points}
        />
        <ScoreBox
          icon={require('../../assets/icons/your-score-dc.webp')}
          title="Your Rank"
          score={userScore.score?.sno}
        />
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.rankBtn}
          onPress={() =>
            navigation.navigate('GameScore', {title: 'Global Score'})
          }>
          <Image
            source={require('../../assets/icons/your-score-dc.webp')}
            style={{width: 35, height: 35}}
          />
          <Text style={styles.rankBtnText}>Game Ranking</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ScoreBoard;

const styles = StyleSheet.create({
  board: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
  },
  box: {
    flexDirection: 'col',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
  },
  boxTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingTop: 7,
  },
  boxScore: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  icon: {
    width: 50,
    height: 50,
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  rankBtn: {
    backgroundColor: '#fdc102',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderWidth: 0.5,
    borderRadius: 5,
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#755900',
    shadowOffset: {width: 0, height: 2.79},
    shadowOpacity: 0.48,
    shadowRadius: 4,
  },
  rankBtnText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
