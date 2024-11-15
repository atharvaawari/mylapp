import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {DataTable} from 'react-native-paper';
import {useUserContext} from '../context/AuthContext';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const profile = ({navigation, route}) => {
  const {userdata} = route.params;
  const {scores} = route.params;

  const {dispatch, state} = useUserContext();
  const {user_name} = userdata;
  // console.log("userdata.user_name", userdata)
  const [user, setUser] = useState(null);
  const [position, setPosition] = useState(null);
  const [userPoints, setUserPoints] = useState(null);
  const [namee, setUserName] = useState(null);

  // Handle logout and navigate to the login screen
  const handleLogout = async () => {
    try {
      await GoogleSignin.signOut();
      setUser(null); // Clear user info
      navigation.navigate('Login'); // Navigate to Login screen
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Fetch user data from API and update context
  useEffect(() => {
    if (user_name) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(
            `https://www.mindyourlogic.com/api/games/global-games-rank`,
          );
          const data = await response.json();
          console.log('Fetched Data:', data);

          // Assigning a number (1, 2, 3, 4...) to each user based on their position in the array
          const dataWithNumbers = data.map((user, index) => ({
            ...user,
            number: index + 1, // Adding the number (1, 2, 3, etc.)
          }));

          // Find the user based on user_name
          const user = dataWithNumbers.find(
            user => user.user_name === user_name,
          );
          if (user) {
            const userNumber = user.number; // Extract the position number
            const userPoints = user.points; // Extract the points
            const namee = user.name;

            console.log('Matched User:', user);

            // Set the state with the fetched position and points
            setPosition(userNumber);
            setUserPoints(userPoints); // Store points here
            setUserName(namee);

            console.log('Fetched user number:', userNumber);
            console.log('Fetched user points:', userPoints);
            console.log('Fetched user Name:', namee);
          } else {
            console.error('User not found:', user_name);
          }

          const secondApiResponse = await fetch(
            `https://www.mindyourlogic.com/get-user-game-data`, // Replace with your second API URL
          );
          const secondApiData = await secondApiResponse.json();
          console.log('Second API Fetched Data:', secondApiData);

          // Store the fetched data from the second API in the state
          setSecondApiData(secondApiData);
          console.log('Fetched secondApiData:', secondApiData);

        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }
  }, [user_name]);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.wrapper}>
          <View style={styles.container}>
            {/* Profile Photo */}
            <Image
              source={require('../Screens/images/photos/profileimageGR.png')}
              style={styles.profilePhoto}
            />

            {/* Details beside the profile photo */}
            <View style={styles.details}>
              <Text style={styles.name}>{namee}</Text>
              <Text style={styles.username}>{userdata.user_name}</Text>
              <TouchableOpacity style={styles.logoutbtn} onPress={handleLogout}>
                <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Third Additional Box */}
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>Game Score</Text>
            <View style={styles.line} />
            <View style={styles.container2}>
              <View style={styles.rankContainer}>
                <Image
                  source={require('../Screens/images/photos/trophy.png')}
                  style={styles.trophy}
                />
                <Text style={styles.ranktxt}>
                  Rank:{position !== null ? position : 'Loading...'}
                </Text>
                <View style={styles.verticalLine} />
                <Image
                  source={require('../Screens/images/photos/scorecard.png')}
                  style={styles.trophy}
                />
                <Text style={styles.ranktxt}>
                  Score: {userPoints !== null ? userPoints : 'Loading...'}
                </Text>
              </View>
            </View>
          </View>

          {/* Button for Global ranking and detective iq ranking */}
          <View style={styles.container2}>
            <TouchableOpacity
              style={styles.GlobalRankbtn}
              onPress={() => navigation.navigate('Score')}>
              <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                Game Ranking
              </Text>
            </TouchableOpacity>
          </View>

          {/* Separate Table Below the Game Ranking Button */}
          <View style={styles.rankTableContainer}>
            <Text style={styles.tableTitle}>Global Game Ranking</Text>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>
                  <Text style={{color: '#fff'}}>User</Text>
                </DataTable.Title>
                <DataTable.Title>
                  <Text style={{color: '#fff'}}>Rank</Text>
                </DataTable.Title>
                <DataTable.Title>
                  <Text style={{color: '#fff'}}>Points</Text>
                </DataTable.Title>
                <DataTable.Title>
                  <Text style={{color: '#fff'}}>Stats</Text>
                </DataTable.Title>
              </DataTable.Header>

              {/* Example rows, you can replace these with dynamic data */}
              <DataTable.Row>
                <DataTable.Cell>
                  <Text style={{color: '#fff'}}>John Doe</Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text style={{color: '#fff'}}>1</Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text style={{color: '#fff'}}>2000</Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text style={{color: '#fff'}}>Stats</Text>
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>
                  <Text style={{color: '#fff'}}>Jane Smith</Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text style={{color: '#fff'}}>2</Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text style={{color: '#fff'}}>1800</Text>{' '}
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text style={{color: '#fff'}}>Stats</Text>
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>
                  <Text style={{color: '#fff'}}>James</Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text style={{color: '#fff'}}>3</Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text style={{color: '#fff'}}>1600</Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text style={{color: '#fff'}}>Stats</Text>
                </DataTable.Cell>
              </DataTable.Row>

              {/* Add more rows dynamically if needed */}
            </DataTable>
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1, // Ensures the ScrollView content grows to fill space
    justifyContent: 'flex-start', // Makes sure content starts at the top
  },
  wrapper: {
    alignItems: 'center',
    backgroundColor: '#6C57C0',
    width: '100%',
    height: '100%',
    paddingBottom: 0,
  },
  container: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#6C57C0',
  },

  tableText: {
    color: '#fff', // Ensure table text is white
  },

  rankTableContainer: {
    backgroundColor: '#533fa0',
    padding: 10,
    borderRadius: 15,
    marginVertical: 20,
    alignItems: 'center',
    width: '90%',
  },

  tableTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  container2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container3: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  rankContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    justifyContent: 'center',
  },
  profilePhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
    maxHeight: 80, // Optional: limits height
    maxWidth: 80, // Optional: limits width
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  username: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  infoBox: {
    backgroundColor: '#533fa0',
    padding: 10,
    borderRadius: 15,
    marginVertical: 10,
    alignItems: 'center',
    width: '90%',
    height: '20%',
  },
  infoText: {
    paddingTop: 5,
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  line: {
    height: 1,
    backgroundColor: '#7c69c2',
    marginTop: 5,
    width: '100%',
  },
  trophy: {
    width: 30,
    height: 30,
    paddingTop: 30,
    marginLeft: 15,
    marginTop: 10,
  },
  ranktxt: {
    color: '#fff',
    padding: 10,
    fontSize: 15,
    fontWeight: 'bold',
  },
  verticalLine: {
    width: 1,
    backgroundColor: '#fff',
    height: 30,
    alignSelf: 'center',
    marginTop: 5,
    marginLeft: 15,
  },

  logoutbtn: {
    backgroundColor: '#FFD25F',

    padding: 8,
    width: 80,
    borderRadius: 5,
  },
  GlobalRankbtn: {
    backgroundColor: '#FFD25F',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    shadowColor: '#BA8D38',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.9,
    shadowRadius: 0,
    elevation: 55,
    marginTop: 10,
  },

  statsicon: {
    backgroundColor: '#fed360',
    paddingVertical: 2,
    paddingHorizontal: 2,
    borderRadius: 5,
    shadowColor: '#BA8D38',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.9,
    shadowRadius: 0,
    elevation: 55,
  },
  statsicon2: {
    width: 30,
    height: 30,
  },
  gamerowtext: {
    color: '#fff',
  },
  gameremote: {
    width: 40,
    height: 40,
  },
});

export default profile;
