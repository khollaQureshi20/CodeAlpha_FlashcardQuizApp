import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import DBCategory from '../DB/DBCategory';
import Icon from 'react-native-vector-icons/Ionicons';

const AddCategory = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const dbCategory = new DBCategory();

  const fetchCategory = () => {
    dbCategory.fetchCategory(categories => {
      setCategories(categories || []);
    });
  };

  const addCategory = () => {
    if (!newCategory.trim()) {
      Alert.alert('Error', 'Category name cannot be empty.');
      return;
    }

    dbCategory.addCategory(newCategory, success => {
      if (success) {
        Alert.alert('Success', 'Category added successfully.');
        setNewCategory('');
        fetchCategory();
      } else {
        Alert.alert('Error', 'Failed to add category.');
      }
    });
  };

  const handleCategory = ({item}) => {
    navigation.navigate('Question', {item:item});
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const renderCategory = ({ item }) => (
    <View style={styles.categoryItem}>
      <TouchableOpacity onPress={() => handleCategory({item})}>
        <View style={styles.categoryRow}>
          <Text style={styles.categoryName}>{item.category}</Text>
          <Icon name="chevron-forward" size={25} color="black" />
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      
        <Text style={styles.title}>Add Category</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter category name"
          value={newCategory}
          onChangeText={setNewCategory}
        />
        <TouchableOpacity style={styles.addButton} onPress={addCategory}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>All Categories</Text>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={item => (item.id ? item.id.toString() : String(Math.random()))}
        contentContainerStyle={styles.categoryList}
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
 
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    flex: 1, 
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryList: {
    paddingBottom: 20,
  },
  categoryItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    elevation: 3,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalQuestions: {
    fontSize: 14,
    color: '#666',
  },
});

export default AddCategory;
