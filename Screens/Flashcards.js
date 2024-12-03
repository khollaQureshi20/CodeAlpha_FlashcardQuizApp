import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Animated,
  Alert,
} from 'react-native';
import DBFlashcard from '../DB/DBFlashcard';
import DBQuizScore from '../DB/DBQuizScore';
export default function Flashcard({route, navigation}) {
  const item = route.params;
  const [flashcards, setFlashcard] = useState([]);
  const [flashcardsid, setFlashcardId] = useState();
  const [iscorrect, setIsCorrect] = useState(false);
  const dbFlashcard = new DBFlashcard();
  const dbQuizScore = new DBQuizScore();
  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = () => {
    dbFlashcard.fetchFlashcard(item, data => {
      setFlashcard(data || []);
    });
  };
  const addScore = (id, correct) => {
console.log(id,correct)
     if (!userInput.trim()) {
      Alert.alert('Error', 'userInput cannot be empty.');
      return;
    }
    dbQuizScore.addScore(id,correct, success => {
      if (success) {
        setUserInput('');
      } else {
       
      }
    })
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [flipped, setFlipped] = useState(false);
  const flipAnim = useRef(new Animated.Value(0)).current;
  const inputRef = useRef(null);
  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });
  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const flipCard = () => {
    if (flipped) {
      Animated.timing(flipAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }).start(() => setFlipped(false));
    } else {
      Animated.timing(flipAnim, {
        toValue: 180,
        duration: 800,
        useNativeDriver: true,
      }).start(() => setFlipped(true));
    }
  };

  const handleNext = () => {
    const isAnswerCorrect =
      userInput.trim().toLowerCase() ===
      flashcards[currentIndex]?.answer?.trim().toLowerCase();
    setIsCorrect(isAnswerCorrect);
    setFlashcardId(flashcards[currentIndex]?.flashcard_id);
    addScore(flashcards[currentIndex]?.flashcard_id, isAnswerCorrect);

    // Proceed to the next card
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserInput('');
      setFlipped(false);
      flipAnim.setValue(0);
    } else {
      navigation.navigate('Score', item);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setUserInput('');
      setFlipped(false);
      flipAnim.setValue(0);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{item} Quiz</Text>
      <View style={styles.cardContainer}>
        <Animated.View
          style={[
            styles.card,
            styles.cardFront,
            {transform: [{rotateY: frontInterpolate}]},
          ]}>
          <Text style={styles.question}>
            {flashcards[currentIndex]?.question}
          </Text>
          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder="Enter your answer"
            placeholderTextColor={'black'}
            value={userInput}
            onChangeText={text => setUserInput(text)}
            onFocus={() => console.log('Input focused')}
            keyboardType="default"
          />

          <TouchableOpacity style={styles.button} onPress={flipCard}>
            <Text style={styles.buttonText}>Answer</Text>
          </TouchableOpacity>
        </Animated.View>
        <View style={styles.cardContainer2}>
          <Animated.View
            style={[
              styles.card,
              styles.cardBack,
              {transform: [{rotateY: backInterpolate}]},
            ]}>
            <Text style={styles.answerText}>
              Answer: {flashcards[currentIndex]?.answer}
            </Text>
            <TouchableOpacity style={styles.buttonback} onPress={flipCard}>
              <Text style={styles.buttonText}>Go Back</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>

      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={[
            styles.navButton,
            currentIndex === 0 && styles.disabledButton,
          ]}
          onPress={handlePrevious}
          disabled={currentIndex === 0}>
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, currentIndex === flashcards.length - 1]}
          onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e90ff',
    marginBottom: 20,
  },
  cardContainer: {
    width: '100%',
    height: 230,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 20,
  },
  cardContainer2:{
    width:250,
    height: 230,
    
  },
  card: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backfaceVisibility: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 20,
  },
  cardFront: {
    backgroundColor: '#ffffff',
    elevation: 5,
  },
  cardBack: {
    backgroundColor: '#1e90ff',
    elevation: 5,
    transform: [{rotateY: '180deg'}],
  },
  question: {
    fontSize: 18,
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#fff',
    color: 'black',
  },

  answerText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#32cd32',
    alignItems: 'center',
  },
  buttonback: {
    marginTop: 90,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#32cd32',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  navButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#1e90ff',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
});
