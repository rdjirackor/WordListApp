import React from 'react';
import { View, StyleSheet } from 'react-native';
import WordList from './WordList';

const App = () => {
  return (
    <View style={styles.container}>
      <WordList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
});

export default App;
