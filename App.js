import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./Screens/TabNavigation";
import Score from "./Screens/Score";
import StartActivity from "./Screens/StartActivity";
import Flashcard from "./Screens/Flashcards";
import 'react-native-gesture-handler';
import AddCategory from "./Screens/AddCategory";
import Question from "./Screens/Question";
import AddQuestion from "./Screens/AddQuestion";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TabNavigation">
        <Stack.Screen name="TabNavigation" component={TabNavigation} options={{ headerShown: false }} />
        <Stack.Screen name="Score" component={Score} options={{ headerShown: false }} />
        <Stack.Screen name="StartActivity" component={StartActivity} options={{ headerShown: false }} />
        <Stack.Screen name="Flashcard" component={Flashcard} options={{ headerShown: false }} />
        <Stack.Screen name="AddCategory" component={AddCategory} options={{ headerShown: false }} />
        <Stack.Screen name="Question" component={Question} options={{ headerShown: false }} />
        <Stack.Screen name="AddQuestion" component={AddQuestion} options={{ headerShown: false }} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
