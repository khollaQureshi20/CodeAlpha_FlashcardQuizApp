import DBHandler from './DBHandler';

class DBFlashcard {
  constructor() {
    this.dbHandler = new DBHandler();
    this.dbHandler.initializeDatabase();
  }

  fetchFlashcard(category, callback) {
    const query = `SELECT 
    f.flashcard_id AS flashcard_id,
    f.question,
    f.answer,
    c.category AS category_name
FROM Flashcards f
JOIN Category c ON f.category_id = c.category_id
WHERE c.category = '${category}';
`;

    this.dbHandler.db.transaction(tx => {
      tx.executeSql(
        query,
        [],
        (_, {rows}) => {
          const Flashcard = rows.raw();

          callback(Flashcard);
        },
        error => console.log('Error fetching metadata: ', error),
      );
    });
  }
  addFlashcard(question, answer, category, callback) {
    const insertQuery = 'INSERT INTO Flashcards (question, answer, category_id) VALUES (?, ?, ?)';
    this.dbHandler.db.transaction(tx => {
      tx.executeSql(
        insertQuery,
        [question, answer, category],
        (_, result) => {
          console.log('Flashcard added successfully');
          callback(result);
        },
        error => {
          console.log('Error inserting flashcard: ', error);
          callback(null, 'Error inserting flashcard');
        },
      );
    });
  
    
}
}

export default DBFlashcard;
