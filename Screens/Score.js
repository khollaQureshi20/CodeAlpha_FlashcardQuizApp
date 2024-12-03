import React ,{useEffect,useState} from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DBQuizScore from '../DB/DBQuizScore';
const Score = ({route, navigation}) => {
  const dbQuizScore = new DBQuizScore();
  const item = route.params;
  const [quizStats, setQuizStats] = useState({
    totalQuestions: 0,
    correctAnswers: 0,
    scorePercentage: 0,
  });
  useEffect(() => {
    dbQuizScore.fetchEachQuizScore(item, Flashcard => {
      if (Flashcard && Flashcard.length > 0) {
        const { total_questions, correct_answers, score_percentage } = Flashcard[0];
        setQuizStats({
          totalQuestions: total_questions,
          correctAnswers: correct_answers,
          scorePercentage: score_percentage.toFixed(2),
        });
      }
    });
  }, [item]);

  return (
    <View style={styles.container}>
      <View style={styles.winBox}>
        <Text style={styles.title}>Quiz Completed</Text>
        
        {/* Level and Stars */}
        <Text style={styles.levelText}>Your Final Score:</Text>
        <View style={styles.starsContainer}>
          <Icon name="star" size={30} color="#FFD700" />
          <Icon name="star" size={30} color="#FFD700" />
          <Icon name="star" size={30} color="#FFD700" />
        </View>

        <Text style={styles.scoreText}>Total Question : {quizStats.totalQuestions}</Text>
        <View style={styles.collectibleContainer}>
          <Text style={styles.collectText}>Correct Answer 🎉</Text>
          <View style={styles.collectIcon}>
            
            <Text style={styles.collectAmount}>{quizStats.correctAnswers}</Text>
          </View>
        </View>
        <View style={styles.collectibleContainer}>
          <Text style={styles.collectText}> Score Percentage:</Text>
          <View style={styles.collectIcon}>
          

            <Text style={styles.collectAmount}>{quizStats.scorePercentage}%</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
  <Button title="Retry" onPress={() => navigation.navigate('Flashcard',item)} />
  <Button title="Return back" onPress={() => navigation.navigate('TabNavigation')} />
</View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7e3d91', // Dark purple background
  },
  winBox: {
    backgroundColor: '#f7a1f7', // Light purple box
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    width: 320,
    elevation: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  levelText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  scoreText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  rewardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  rewardText: {
    fontSize: 18,
    color: '#fff',
    marginLeft: 5,
  },
  collectibleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  collectText: {
    fontSize: 18,
    color: '#fff',
    marginRight: 10,
  },
  collectIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  collectAmount: {
    fontSize: 18,
    color: '#fff',
    marginLeft: 5,
  },
  buttonContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    marginTop: 20,
    width: '90%', 
    alignSelf: 'center',
  },
});

export default Score;
