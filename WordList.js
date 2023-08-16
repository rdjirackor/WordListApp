import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const WordList = () => {
  const [wordList, setWordList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWords();
  }, []);

  const fetchWords = async () => {
    try {
      const response = await axios.get('https://api.datamuse.com/words?sl=happy');
      setWordList(response.data);
      setLoading(false);
    } catch (error) {
      setError('An error occurred while fetching data.');
      setLoading(false);
    }
  };

  const renderWordItem = ({ item }) => (
    <View style={styles.wordItem}>
      <Text>{item.word}</Text>
    </View>
  );

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <FlatList
      data={wordList}
      keyExtractor={(item) => item.word}
      renderItem={renderWordItem}
    />
  );
};

const styles = StyleSheet.create({
  wordItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default WordList;
