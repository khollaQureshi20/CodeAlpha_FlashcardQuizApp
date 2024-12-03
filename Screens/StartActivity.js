import React ,{useEffect}from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Example icon set

export default function StartActivity({ route, navigation }) {
  const { item} = route.params;
 
  const handleStartPress = () => {
    navigation.navigate('Flashcard',item.category_name);
  };

 

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{item.category_name} Quiz</Text>
      
      
      <View style={styles.infoContainer}>
        <View style={styles.infoCard}>
          <Icon name="help-outline" size={35} color="white" />
          <Text style={styles.infoText}>Total Questions</Text>
          <Text style={styles.infoValue}>{item.total_questions}</Text>
        </View>
        <View style={styles.infoCard}>
          <Icon name="analytics" size={35} color="white" />
          <Text style={styles.infoText}>Best Score</Text>
          <Text style={styles.infoValue}>100</Text>
        </View>
        
      </View>

      <TouchableOpacity style={styles.button} onPress={handleStartPress}>
        <Text style={styles.buttonText}>
          <Icon name="play" size={20} color="#fff" /> START
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e90ff',
    marginBottom: 20,
  },
 
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  infoCard: {
    alignItems: 'center',
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: '#bdb2ff',
    borderRadius: 8,
    elevation: 5,
    width: 185,
  },
  infoText: {
    fontSize: 20,
    color: 'black',
    marginTop: 5,
    fontWeight:'bold'
  },
  infoValue: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 5,
  },
  button: {
    width: '80%',
    backgroundColor: '#1e90ff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
    flexDirection: 'row',
    alignItems: 'center',
  },
  addQuestionButton: {
    backgroundColor: '#32cd32',
  },
});
