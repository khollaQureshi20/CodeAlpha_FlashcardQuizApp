import { openDatabase } from 'react-native-sqlite-storage';

class DBHandler {
  constructor() {
    this.db = null;
  }

  initializeDatabase() {
    this.db = openDatabase(
      { name: 'FlashcardQuiz.db', location: 'default'},
      () => {
      
      },
      error => {
        console.error("Failed to load database: ", error);
      }
    );
  }
}

export default DBHandler;
