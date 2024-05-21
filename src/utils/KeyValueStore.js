import AsyncStorage from '@react-native-async-storage/async-storage';

export const Keys = {
  LANGUAGE: 'LANGUAGE',
};

export class KeyValueStore {
  static setItem = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {}
  };

  static multiSetItems = async items => {
    try {
      await AsyncStorage.multiSet(items);
    } catch (error) {}
  };

  static getItem = async key => {
    let value = null;
    try {
      value = await AsyncStorage.getItem(key);
    } catch (error) {}
    return value;
  };

  static multiGetItems = async keys => {
    let items = null;
    try {
      items = await AsyncStorage.multiGet(keys);
    } catch (error) {}
    return items;
  };

  static deleteItem = async key => {
    let value = null;
    try {
      value = await AsyncStorage.removeItem(key, value);
    } catch (error) {}
    return value;
  };

  static clear = async () => {
    // Remove All Local Storage Value
    AsyncStorage.clear();
  };
}
