import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet ,ActivityIndicator,TouchableOpacity} from 'react-native';
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
        const response = await axios.get('https://api.datamuse.com/words?ml=excellent');
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
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Fetching Words...</Text>
        <Text style={styles.loadingDescription}>Please wait a moment while we find some amazing words for you.</Text>
      </View>
    );
  }
  

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Oops! Something went wrong.</Text>
        <Text style={styles.errorDescription}>{error}</Text>
        <TouchableOpacity onPress={fetchWords} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Words</Text>
      <FlatList
        data={wordList}
        keyExtractor={(item) => item.word}
        renderItem={renderWordItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 20,
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      alignSelf:'center',
    },
    
    wordItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      loadingText: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#007AFF',
      },
      loadingDescription: {
        marginTop: 10,
        fontSize: 16,
        textAlign: 'center',
        color: '#555',
      },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorText: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      color: 'red',
    },
    errorDescription: {
      textAlign: 'center',
      fontSize: 16,
      marginBottom: 20,
      color: '#555',
    },
    retryButton: {
      backgroundColor: '#007AFF',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    retryButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default WordList;
