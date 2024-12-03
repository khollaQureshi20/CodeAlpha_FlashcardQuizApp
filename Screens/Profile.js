import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DBQuizScore from '../DB/DBQuizScore';
import DBCategory from '../DB/DBCategory';

export default function Profile() {
  const [flashcard, setFlashcard] = useState(null);
  const [eachflashcardScores, setEachFlashcardScores] = useState([]);
  const dbQuizScore = new DBQuizScore();

  const [categories, setCategories] = useState([]);
  const dbCategory = new DBCategory();

  const fetchCategory = () => {
    dbCategory.fetchCategory((categories) => {
      setCategories(categories || []);
    });
  };

  const fetchScoresForCategories = () => {
    const scores = [];
    categories.forEach((category) => {
      dbQuizScore.fetchEachQuizScore(category.category, (result) => {
        scores.push({
          ...category,
          ...result[0],
        });
        setEachFlashcardScores([...scores]);
      });
    });
  };

  const fetchtotal = () => {
    dbQuizScore.fetchTotalQuizScore((Flashcard) => {
      setFlashcard(Flashcard);
    });
  };

  useEffect(() => {
    fetchtotal();
    fetchCategory();
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      fetchScoresForCategories();
    }
  }, [categories]);

  const colors = ['#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff', '#a0c4ff', '#bdb2ff', '#ffc6ff'];

  const renderCategory = ({ item, index }) => {
    if (!item) return null;
    return (
      <TouchableOpacity style={[styles.card, { backgroundColor: colors[index % colors.length] }]}>
        <Text style={styles.cardTitle}>{item.category}</Text>
        <Text style={styles.qTitle}>Questions: {item.total_questions || 0}</Text>
        <Text style={styles.qTitle}>Correct Answers: {item.correct_answers || 0}</Text>
        <Text style={styles.qTitle}>
          Score: {item.score_percentage ? item.score_percentage.toFixed(2) : '0.00'}%
        </Text>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>Flashcard Quiz</Text>
      {flashcard && flashcard[0] ? (
        <>
          <View style={styles.rankContainer}>
            <View style={styles.rankBox}>
              <Icon name="trophy" size={30} color="#1e90ff" />
              <Text style={styles.rankTitle}>Total Questions</Text>
              <Text style={styles.rankValue}>{flashcard[0].total_questions}</Text>
            </View>
            <View style={styles.rankBox}>
              <Icon name="checkmark-circle" size={30} color="#1e90ff" />
              <Text style={styles.rankTitle}>Correct Answers</Text>
              <Text style={styles.rankValue}>{flashcard[0].correct_answers}</Text>
            </View>
          </View>
          <View style={styles.rankContainer}>
            <View style={styles.rankBox}>
              <Icon name="bar-chart" size={30} color="#1e90ff" />
              <Text style={styles.rankTitle}>Total Score</Text>
              <Text style={styles.rankValue}>
                {flashcard[0].score_percentage ? flashcard[0].score_percentage.toFixed(2) : '0.00'}%
              </Text>
            </View>
          </View>
        </>
      ) : (
        <Text style={styles.loadingText}>Loading...</Text>
      )}
    </View>
  );

  return (
    <FlatList
      ListHeaderComponent={renderHeader}
      data={eachflashcardScores}
      renderItem={renderCategory}
      keyExtractor={(item, index) => item.category || index.toString()}
      numColumns={2}
      contentContainerStyle={styles.grid}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    padding: 10,
  },
  header: {
    width: '100%',
    backgroundColor: '#7e3d91',
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  rankContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  rankBox: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  rankTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 5,
  },
  rankValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e90ff',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7e3d91',
    marginTop: 50,
    textAlign: 'center',
  },
  card: {
    flex: 1,
    margin: 8,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  qTitle: {
    fontSize: 14,
    color: '#7e3d91',
  },
  grid: {
    paddingHorizontal: 10,
  },
});
