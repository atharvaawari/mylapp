import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, Button} from 'react-native';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import ScoreBoard from '../components/Home/ScoreBoard';

import GameCategories from '../components/Home/GameCategories';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {

  // const clearAsyncStorage = async () => {
  //   AsyncStorage.clear();
  // };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.mainScreen}>
            {/* Section: Score Board */}
            <View style={styles.sectionContainer}>
              <ScoreBoard />
            </View>

            {/* Section: Game Categories */}
            <View style={styles.sectionContainer}>
              <GameCategories />
            </View>
            {/* <Button title="Clear data" onPress={clearAsyncStorage}>
            <Text>Clear Async Storage</Text>
          </Button> */}
          </View>

          
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Home;

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  mainScreen: {
    marginVertical: 10,
  },
  sectionContainer: {
    marginTop: 5,
    padding: 10,
    flexDirection: 'column',
    gap: 5,
  },
});
