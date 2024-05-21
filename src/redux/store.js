import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import {applyMiddleware, createStore} from 'redux';

const persistConfig = {
  key: 'root',
  whitelist: ['authReducer'],
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [thunk];

export const store = createStore(
  persistedReducer,
  applyMiddleware(...middleWares),
);
export const persistor = persistStore(store);
