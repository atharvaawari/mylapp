import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {GameContext} from '../context/Context';

export default GameScore = ({ route }) => {

  const { title } = route.params;
  const {state} = useContext(GameContext);

  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [searchQuery, setSearchQuery] = useState(''); 
  const [filteredScores, setFilteredScores] = useState([]); 


  const currentGameScore = title =="Score Board" ? state.currentGameScore : state.globalScore; 
  const gameName =   title =="Score Board" ? state.currentGame?.slug : "Global Score"; 
  
  useEffect(() => {
    if (currentGameScore) {
      
      const rankedScores = currentGameScore.map((item, index) => ({
        ...item,
        rank: index + 1, 
      }));
      setFilteredScores(rankedScores); 
      setLoading(false); 
    }
  }, [currentGameScore]);
  

  const handleSearch = text => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setFilteredScores(currentGameScore.map((item, index) => ({
        ...item,
        rank: index + 1, 
      })));
    } else {
      const filtered = currentGameScore
        .map((item, index) => ({ ...item, rank: index + 1 }))
        .filter(item => 
          (title === 'Score Board' ? item.Name : item.name).toLowerCase().includes(text.toLowerCase()) || 
          item.rank.toString().includes(text)
        );
      setFilteredScores(filtered);
    }
  };


   if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  const renderItem = ({item, index}) => (
    <View style={styles.itemContainer}>
      <Image
        source={require('../assets/icons/profile.jpeg')}
        style={styles.profileIcon}
      />
      <Text style={styles.itemName}>{title === 'Score Board' ? ` ${item.Name}` : ` ${item.name}`}</Text>
      <Text style={styles.rank}>{item.rank}</Text> 
      <Text style={styles.itemPoints}>{item.points}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{gameName}</Text>

      <TextInput
        style={styles.searchBar}
        placeholder="Search by name or rank"
        placeholderTextColor="#fff"
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <View style={styles.headerContainer}>
        <Text style={styles.headerName}>Name</Text> 
        <Text style={styles.headerSerialNumber}>Rank</Text>
        <Text style={styles.headerPoints}>Score</Text>
      </View>

      <FlatList
        data={filteredScores}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#3a4d5b',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  searchInput: {
    height: 40,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingLeft: 10,
    fontSize: 16,
    color: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#feb628',
    marginBottom: 10,
  },
  headerName: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#fff',
  },
  headerSerialNumber: {
    width: 60,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  headerPoints: {
    width: 100,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#3a4d5b',
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
    color: '#fff',
  },
  rank: {
    width: 60,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  itemName: {
    flex: 1,
    fontSize: 16,
    marginRight: 6,
    textAlign: 'left',
    color: '#fff',
  },
  itemPoints: {
    width: 100,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
