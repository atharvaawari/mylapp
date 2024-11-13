import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {GameContext} from '../../context/Context';
import { useNavigation } from '@react-navigation/native';

// import { API_SECRET_KEY, API_BASE_URL} from '@env';

const CurrGameLeaderBoard = () => {
  const {state, dispatch} = useContext(GameContext);
  const {currentGame} = state;
  const navigation = useNavigation();

  const [currentGamePage, setCurrentGamePage] = useState(0);
  const [currentGlobalPage, setCurrentGlobalPage] = useState(0);
  const itemsPerPage = 5;

  const fetchGlobalScore = async () => {
    try {
      const response = await fetch(
        `https://www.mindyourlogic.com/api/games/global-games-rank`,
      );

      if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}`);
        const errorText = await response.text();
        console.error('Error response:', errorText); 
        return;
      }

      const data = await response.json();
      // setGlobalData(data);
      dispatch({type: 'SET_GLOBAL_SCORE' , payload: data})
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  // const fetchGame = async ()=>{
  //   const url = `${API_BASE_URL}/games/curr-game-rank?game=${encodeURIComponent('color-mind-match')}&key=${encodeURIComponent(API_SECRET_KEY)}`;
  // }

  const fetchGameScore = async () => {
    try {
      const response = await fetch(
        `https://www.mindyourlogic.com/api/games/curr-game-rank?game=${encodeURIComponent(
          currentGame.slug,
        )}&key=LogicalBaniyaSecretKey`,
      );

      const data = await response.json();
      // setGameData(data);
      dispatch({type:'SET_CURRENT_GAME_SCORE', payload:data})
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGameScore();
    fetchGlobalScore();
  }, [currentGame]);

  // Pagination data for gameData and globalData
  const gameStartIndex = currentGamePage * itemsPerPage;
  const gameEndIndex = gameStartIndex + itemsPerPage;
  const currentGameData = state?.currentGameScore.slice(gameStartIndex, gameEndIndex);

  const globalStartIndex = currentGlobalPage * itemsPerPage;
  const globalEndIndex = globalStartIndex + itemsPerPage;
  const currentGlobalData = state?.globalScore.slice(globalStartIndex, globalEndIndex);

  const handleNextGame = () => {
    if (gameEndIndex < state?.currentGameScore.length) {
      setCurrentGamePage(currentGamePage + 1);
    }
  };

  const handlePrevGame = () => {
    if (gameStartIndex > 0) {
      setCurrentGamePage(currentGamePage - 1);
    }
  };

  const handleShowAll = (title) => {
    navigation.navigate('GameScore', {title});
  }

  const handleNextGlobal = () => {
    if (globalEndIndex < state?.globalScore.length) {
      setCurrentGlobalPage(currentGlobalPage + 1);
    }
  };

  const handlePrevGlobal = () => {
    if (globalStartIndex > 0) {
      setCurrentGlobalPage(currentGlobalPage - 1);
    }
  };

  const renderLeaderboard = (title, data, handlePrev, handleNext) => (
    <View style={styles.leaderboardContainer}>
      <View style={styles.leaderboardTitle}>
        <Text style={styles.leaderboardTitleText}>{title} {title === 'Score Board' ? ` ${currentGame.slug.replace(/-/g, ' ')}` : ` `}</Text>
      </View>
      <View style={styles.rankbox}>
        {data.map((item, index) => (
          <View key={`${item.id}-${index}`} style={styles.leaderboardItem}>
            <Text style={styles.leaderboardName}>
              {index + 1}.{' '}
              {title === 'Score Board' ? ` ${item.Name}` : ` ${item.name}`}
            </Text>
            <Text style={styles.leaderboardScore}>{item.points}</Text>
          </View>
        ))}
        <View style={styles.paginationButtonsContainer}>
          <TouchableOpacity style={styles.seeMoreButton} onPress={handlePrev}>
            <Text style={styles.seeMoreButtonText}>Prev</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.seeMoreButton} onPress={() => handleShowAll(title)}>
            <Text style={styles.seeMoreButtonText}>Show all</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.seeMoreButton} onPress={handleNext}>
            <Text style={styles.seeMoreButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View>
      {renderLeaderboard(
        'Score Board',
        currentGameData,
        handlePrevGame,
        handleNextGame,
      )}
      {renderLeaderboard(
        'Global Leaderboard',
        currentGlobalData,
        handlePrevGlobal,
        handleNextGlobal,
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  leaderboardContainer: {
    backgroundColor: '#e0f7fa',
    borderRadius: 15,
    elevation: 5,
    marginBottom: 20,
  },
  leaderboardTitle: {
    backgroundColor: '#ffd700',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 16,
  },
  leaderboardTitleText:{
    textAlign:'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  leaderboardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  leaderboardName: {
    fontSize: 16,
    color: '#333',
  },
  leaderboardScore: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  paginationButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  seeMoreButton: {
    backgroundColor: '#ffd700',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '20%',
    marginHorizontal: 10,
    shadowColor: '#ccb029',
    shadowOffset: {width: 0, height: 4},
    elevation: 5,
  },
  seeMoreButtonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  rankbox: {
    padding: 16,
  },
});

export default CurrGameLeaderBoard;
