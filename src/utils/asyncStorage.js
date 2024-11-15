import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async(key, value) =>{
  try{
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch(error){
    console.log('Error storing data in AsyncStorage:', error);
  }
};

export const getData = async(key) =>{
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  } catch (error) {
    console.log('Error retrieving data from AsyncStorage:', error)
  }
}

export const removeData = async(key) =>{
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log("Error removing data from AsyncStorage:", error);
  }
}