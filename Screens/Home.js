import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Icon
import DBCategory from '../DB/DBCategory';
import { useIsFocused } from '@react-navigation/native';
const Home = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const dbCategory = new DBCategory();
  const isFocused = useIsFocused();
  const fetchCategory = () => {
    dbCategory.fetchTotalQuestionCategory((fetchedCategories) => {
      
      setCategories(fetchedCategories || []);
    });
  };

  useEffect(() => {
    if (isFocused) {
    fetchCategory();
    }
  }, []);

  const colors = ['#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff', '#a0c4ff', '#bdb2ff', '#ffc6ff','#ffadad', '#ffd6a5'];

  const renderCategory = ({ item, index }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors[index % colors.length] }]}
      onPress={() => {
        navigation.navigate('StartActivity', { item });
      }}
    >
      <Text style={styles.cardTitle}>{item.category_name}</Text>
      <Text style={styles.qTitle}>Question: {item.total_questions}</Text>
      
    </TouchableOpacity>
  );


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Categories</Text>
      
      </View>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => (item.id ? item.id.toString() : String(Math.random()))}
        numColumns={2}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    backgroundColor: '#7e3d91',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  grid: {
    padding: 10,
  },
  card: {
    flex: 1,
    margin: 10,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  qTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7e3d91',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 20,
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});

export default Home;
