/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import { View, StatusBar, LogBox, StyleSheet } from 'react-native';
import Routes from './src/routes';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import sagas from './src/segas';
import reducer from './src/reducers';
import { createStore, applyMiddleware } from 'redux';
import 'react-native-gesture-handler'
LogBox.ignoreAllLogs();
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
const persistor = persistStore(store);
sagaMiddleware.run(sagas);
interface AppProps { }

const App = (props: AppProps) => {
  return (
    <NavigationContainer>
      <StatusBar
        // backgroundColor={''}
        barStyle="light-content"
      />
      <SafeAreaProvider>
        <View style={styles.container}>
          <Provider store={store}>
            <PersistGate
              // loading={<Spinner visible={true} />}
              persistor={persistor}>
              <Routes />
            </PersistGate>
          </Provider>
        </View>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
