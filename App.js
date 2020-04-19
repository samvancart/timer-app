import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
// import * as Font from 'expo-font';
// import { AppLoading } from 'expo';

import StartTimerScreen from './screens/StartTimerScreen';
import Header from './components/Header'
import { Ionicons } from '@expo/vector-icons';


// const fetchFonts = async ()  => {
//   await Font.loadAsync({
//     'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf')
//   });
// };

export default function App() {
  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Workout Timer" />
      <StartTimerScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
