import React, {useContext} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {GameContext} from '../../context/Context';
import {images} from '../../constants/gameImages';

const GameList = () => {
  const {dispatch, filteredCurrentGame} = useContext(GameContext);


  const handleCardPress =(game)=>{
    dispatch({type: 'SET_CURRENT_GAME', payload: game});
  }

  return (
    <View style={styles.gamelistcontainer}>
      {filteredCurrentGame &&
        filteredCurrentGame.map(game => (
          <TouchableOpacity
            key={game.slug}
            style={styles.card}
            onPress={() => handleCardPress(game)}>
            <View style={styles.gameIconContainer}>
              <Image
                source={
                  images
                    ? images[game.slug]
                    : require('../../assets/gameIcons/game-img-5.webp')
                }
                style={styles.gameIcon}
              />
            </View>
          </TouchableOpacity>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  gameIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameIcon: {
    width: 100,
    height: 100,
    borderRadius: 10,
    elevation:2.5,
  },
  gameName: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },
  gamelistcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
});

export default GameList;
