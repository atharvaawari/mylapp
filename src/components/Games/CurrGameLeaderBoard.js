import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const leaderboardData = [
  {id: 1, name: 'Irha Usman', score: 418400},
  {id: 2, name: 'Trushna Mate', score: 413600},
  {id: 3, name: 'Anshu Maske', score: 283400},
  {id: 4, name: 'Gauri Zanwar', score: 219200},
  {id: 5, name: 'Muhammad Irfan', score: 217400},
  {id: 6, name: 'Irha Usman', score: 418400},
  {id: 7, name: 'Trushna Mate', score: 413600},
  {id: 8, name: 'Anshu Maske', score: 283400},
  {id: 9, name: 'Gauri Zanwar', score: 219200},
  {id: 10, name: 'Muhammad Irfan', score: 217400},
];

const CurrGameLeaderBoard = () => {
  // State to track the current page
  const [currentPage, setCurrentPage] = useState(0);

  // Items per page (display 5 items per page)
  const itemsPerPage = 5;

  // Calculate the start and end index based on the current page
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the leaderboardData to get only the current page's data
  const currentLeaderboardData = leaderboardData.slice(startIndex, endIndex);

  // Handle "Next" button press
  const handleNext = () => {
    if (endIndex < leaderboardData.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle "Prev" button press
  const handlePrev = () => {
    if (startIndex > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <View style={styles.leaderboardContainer}>
      <Text style={styles.leaderboardTitle}>Leaderboard COLOR MIND-MATCH</Text>

      <View style={styles.rankbox}>
  
        {currentLeaderboardData.map(item => (
          <View key={item.id} style={styles.leaderboardItem}>
            <Text style={styles.leaderboardName}>
              {item.id}. {item.name}
            </Text>
            <Text style={styles.leaderboardScore}>{item.score}</Text>
          </View>
        ))}

        
        <View style={styles.paginationButtonsContainer}>
          <TouchableOpacity style={styles.seeMoreButton} onPress={handlePrev}>
            <Text style={styles.seeMoreButtonText}>Prev</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.seeMoreButton} onPress={handleNext}>
            <Text style={styles.seeMoreButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  leaderboardContainer: {
    backgroundColor: '#e0f7fa',
    borderRadius:15,
    elevation: 5, 
  },
  leaderboardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    backgroundColor: '#ffd700',
    padding:16,
    borderTopLeftRadius: 15, 
    borderTopRightRadius: 15,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0, 
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
    paddingVertical:2,
    paddingHorizontal:4
  },
  paginationButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    gap: 5,
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

  seeMoreButtonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  rankbox:{
    padding:16
  }

});

export default CurrGameLeaderBoard;
