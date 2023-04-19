import React from 'react';
import RootStack from './src/navigators/stack/RootStack';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Toast from 'react-native-toast-message';

const App = () => {
  Ionicons.loadFont()
  return (
    <Provider store={store}>
      <RootStack />
      <Toast />
    </Provider>
  );
};

export default App;
