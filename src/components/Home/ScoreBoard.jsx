import {Button, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const ScoreBox = ({icon, title}) => {
  return (
    <View style={styles.box}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.boxTitle}>{title}</Text>
      <Text style={styles.boxScore}>1209775</Text>
    </View>
  );
};

const ScoreBoard = () => {
  return (
    <View>
      <View style={styles.board}>
        <ScoreBox
          icon={{
            uri: 'https://www.mindyourlogic.com/static/Home_page_Assets/top-score-dc.webp',
          }}
          title="Game Score"
        />
        <ScoreBox
          icon={{
            uri: 'https://www.mindyourlogic.com/static/Home_page_Assets/your-rank.webp',
          }}
          title="Your Score"
        />
        <ScoreBox
          icon={{
            uri: 'https://www.mindyourlogic.com/static/Home_page_Assets/your-score-dc.webp',
          }}
          title="Your Rank"
        />
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.rankBtn} >
          <Image source={{uri: 'https://www.mindyourlogic.com/static/Home_page_Assets/your-score-dc.webp'}} style={{width: 35, height: 35,}}/>
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
    borderWidth:.5, 
    borderRadius: 5, 
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center', 
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#755900', 
    shadowOffset: { width: 0, height: 2.79 }, 
    shadowOpacity: 0.48, 
    shadowRadius: 4,
  },
  rankBtnText: {
    color: '#000', 
    fontSize: 16, 
    fontWeight: 'bold',
  },
});
