import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import {GameContext} from '../../context/Context';
import {images} from '../../constants/gameImages';
import {useNavigation} from '@react-navigation/native';

const GameCategories = () => {
  const {state, dispatch} = useContext(GameContext);
  const navigation = useNavigation();

  const groupedGames = state.games.reduce((acc, game) => {
    if (!acc[game.category]) {
      acc[game.category] = [];
    }
    acc[game.category].push(game);
    return acc;
  }, {});

  const handleCardPress = (game) => {
    dispatch({type: 'SET_CURRENT_GAME', payload: game});
    navigation.navigate('Game');
  };

  return (
    <View style={styles.container}>
      {Object.keys(groupedGames).map(category => (
        <View key={category} style={styles.categoryGroup}>
          <View style={styles.categoryTextBox}>
            <Text style={styles.categoryText}>{category}</Text>
          </View>

          <View style={styles.cardContainer}>
            {groupedGames[category].map(game => (
              <TouchableOpacity
                key={game.slug}
                style={styles.card}
                onPress={() => handleCardPress(game)}>
                <Image
                  source={
                    images
                      ? images[game.slug]
                      : require('../../assets/gameIcons/game-img-5.webp')
                  }
                  style={styles.cardImage}
                  resizeMode="cover"
                />

                <View style={styles.cardContent}>
                  <Text style={styles.gameTitle}>{game.slug.replace(/-/g, ' ')}</Text>
                  <View style={styles.cardBottom}>
                    <Text style={styles.usersPlayed}>{game.usersplayed}</Text>

                    <TouchableOpacity 
                    style={styles.playButton}
                    key={game.slug}
                    onPress={() => handleCardPress(game)}
                    >
                      <Text style={styles.playButtonText}>Play</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

export default GameCategories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoryGroup: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  categoryTextBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    color: '#fff',
    textAlign: 'center',
    backgroundColor: '#FFC53F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 13,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
    width: '47%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: 150, // Smaller image height for the card
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 10,
  },
  gameTitle: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  usersPlayed: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
  },
  playButton: {
    backgroundColor: '#42f44b',
    paddingVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
    width: '50%',
  },
  playButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
