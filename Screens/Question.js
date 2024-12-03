import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 
import DBFlashcard from '../DB/DBFlashcard';
import { useIsFocused } from '@react-navigation/native';
const Question = ({ route, navigation }) => {
  const {item} = route.params;
  const [flashcards, setFlashcards] = useState([]);
  const isFocused = useIsFocused();
  const dbFlashcard = new DBFlashcard();

  
  const fetchFlashcards = () => {
    dbFlashcard.fetchFlashcard(item.category, (data) => {
      
      setFlashcards(data || []);
    });
  };

  useEffect(() => {
    if (isFocused) {
    fetchFlashcards();
    }
  }, [isFocused]);

  
  const renderFlashcard = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.questionText}>{item.question}</Text>
      <Text style={styles.answerText}>Answer: {item.answer}</Text>
    </View>
  );
  
  const handleAddPress = () => {
    navigation.navigate('AddQuestion', item.category_id);
  };
  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>{item.category}</Text>
        <TouchableOpacity style={styles.button} onPress={handleAddPress}>
          <Icon name="add" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Flashcard List */}
      <FlatList
        data={flashcards}
        renderItem={renderFlashcard}
        keyExtractor={(item) => item.id?.toString() || String(Math.random())}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7e3d91',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
    padding: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  listContainer: {
    paddingBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 20,
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginLeft:60
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  answerText: {
    fontSize: 16,
    color: '#555',
  },
});

export default Question;
