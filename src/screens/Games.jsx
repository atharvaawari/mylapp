import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GameContext} from '../context/Context';
import GamePageHeader from '../components/Games/GamePageHeader';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import GameList from '../components/Games/GameList';
import CurrGameLeaderBoard from '../components/Games/CurrGameLeaderBoard';

const Game = () => {
  const {state} = useContext(GameContext);
  const {currentGame} = state;

  if (!currentGame) {
    return (
      <View>
        <Text>No game selected</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView>
        <ScrollView>
          
          <View style={styles.mainScreen}>
            {/* Game Header */}
            <View style={styles.sectionContainer}>
              <GamePageHeader />
            </View>

            {/* Games list */}
            <View style={styles.sectionContainer}>
              <GameList />
            </View>

            {/* Leader board list */}
            <View style={styles.sectionContainer}>
              <CurrGameLeaderBoard />
            </View>

          </View>

        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Game;

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  mainScreen: {
    marginVertical: 10,
  },
  sectionContainer: {
    marginBottom: 10,
    padding: 10,
    flexDirection: 'column',
    gap: 5,
  },
});
