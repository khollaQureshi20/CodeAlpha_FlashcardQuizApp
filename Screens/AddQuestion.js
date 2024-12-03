import React, { useState ,useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import DBFlashcard from '../DB/DBFlashcard';

const AddQuestion = ({ route, navigation }) => {
  const item = route.params;  
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
 
  const dbFlashcard = new DBFlashcard();
  const handleAddQuestion = () => {
    if (!question.trim() || !answer.trim()) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }
  
    // Add the flashcard to the database
    dbFlashcard.addFlashcard(question, answer, item, (result, error) => {
      if (error) {
        Alert.alert('Error', error);  // Show error if there is one
      } else {
        Alert.alert('Success', 'Flashcard added successfully!');
        setQuestion('');  // Reset the question input
        setAnswer('');    // Reset the answer input
        navigation.goBack();  // Go back to the previous screen after success
      }
    });
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Question</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter question"
        value={question}
        onChangeText={setQuestion}
      />
      <Text style={styles.title}>Add Answer</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter answer"
        value={answer}
        onChangeText={setAnswer}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddQuestion}>
        <Text style={styles.buttonText}>Add Question</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddQuestion;
