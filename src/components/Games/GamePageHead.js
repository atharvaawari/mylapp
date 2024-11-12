import React, {useContext} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {GameContext} from '../../context/Context';
import {images} from '../../constants/gameImages';
import {useNavigation} from '@react-navigation/native';

const GamePageHead = () => {
  const {state} = useContext(GameContext);
  const {currentGame} = state;
  const navigation = useNavigation();

  const handlePressIn = () => {
    navigation.navigate('PlayGame');
  };

  return (
    <>
      <View style={styles.topSection}>
        <Text style={styles.beansText}>Logic Beans: 10</Text>
        <View style={styles.box}>
          <Text style={styles.title}>
            {currentGame.slug.replace(/-/g, ' ')}
          </Text>
          <View style={styles.divider} />

          <View style={styles.statsContainer}>
            <Text style={styles.stat}>Score: 7000</Text>
            <Text style={styles.stat}>Rank: 1</Text>
            <Text style={styles.stat}>Level: 1</Text>
          </View>
        </View>
      </View>

      <View style={styles.shadowContainer}>
      <View style={styles.imageView}>
        <Image
          style={styles.gameImage}
          source={images[currentGame.slug]}
          resizeMode={'repeat'}
        />

        <View style={styles.fadeOverlay}></View>

        <TouchableOpacity
          style={styles.startButton}
          onPressIn={handlePressIn}
          activeOpacity={0.8}>
          <View style={styles.buttonContent}>
            <Text style={styles.startButtonText}>START GAME</Text>
          </View>
        </TouchableOpacity>
      </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  topSection: {
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 0,
  },
  beansText: {
    backgroundColor: '#ffd700',
    padding: 8,
    fontWeight: 'bold',
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 10,
  },
  stat: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  shadowContainer: {
    width: '100%',
    height: 250,
    elevation: 5,           
    backgroundColor: '#fff', 
    borderRadius: 10,
    marginBottom: 16,        
  },
  imageView: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    alignItems: 'center',
  },
  gameImage: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
  },
  fadeOverlay: {
    position: 'absolute',  // Position it over the image
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', 
    borderRadius: 10,
  },
  startButton: {
    position: 'absolute',
    top: '50%',
    transform: [{translateX: 0}, {translateY: -25}],
    width: '50%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: '#ccb029',
    backgroundColor: '#ffd700',
    borderRadius: 18,
    overflow: 'hidden',
    boxShadow: '0 6px 0 #ccb029',
  },
  buttonContent: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  box: {
    alignItems: 'center',
    backgroundColor: '#ffd700',
    borderRadius: 10,
    paddingHorizontal: 8,
    width: '100%',
    marginTop: 8,
  },
  divider: {
    width: '95%',
    height: 1,
    backgroundColor: 'black',
    marginVertical: 7,
  },
});

export default GamePageHead;
