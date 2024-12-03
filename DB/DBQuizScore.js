import DBHandler from './DBHandler';

class DBQuizScore {
  constructor() {
    this.dbHandler = new DBHandler();
    this.dbHandler.initializeDatabase();
  }

  addScore(flashcardid, iscorrect, callback) {
    const checkQuery = 'SELECT * FROM QuizFlashcards WHERE flashcard_id = ?';
    const insertQuery =
      'INSERT INTO QuizFlashcards (flashcard_id, is_correct) VALUES (?, ?)';
    const updateQuery =
      'UPDATE QuizFlashcards SET is_correct = ? WHERE flashcard_id = ?';
  
    this.dbHandler.db.transaction(tx => {
     
      tx.executeSql(
        checkQuery,
        [flashcardid],
        (_, result) => {
          if (result.rows.length > 0) {
           
            tx.executeSql(
              updateQuery,
              [iscorrect, flashcardid],
              (_, updateResult) => {
                console.log('QuizScore updated successfully');
                callback(updateResult);
              },
              error => {
                console.log('Error updating QuizScore: ', error);
                callback(null, 'Error updating QuizScore');
              },
            );
          } else {
           
            tx.executeSql(
              insertQuery,
              [flashcardid, iscorrect],
              (_, insertResult) => {
                console.log('QuizScore added successfully');
                callback(insertResult);
              },
              error => {
                console.log('Error inserting QuizScore: ', error);
                callback(null, 'Error inserting QuizScore');
              },
            );
          }
        },
        error => {
          console.log('Error checking QuizFlashcards: ', error);
          callback(null, 'Error checking QuizFlashcards');
        },
      );
    });
  }
  
  fetchEachQuizScore(category, callback) {
    const query = `SELECT 
    COUNT(qf.flashcard_id) AS total_questions,
    SUM(CASE WHEN qf.is_correct THEN 1 ELSE 0 END) AS correct_answers,
    (SUM(CASE WHEN qf.is_correct THEN 1 ELSE 0 END) * 100.0 / COUNT(qf.flashcard_id)) AS score_percentage
FROM QuizFlashcards qf JOIN Flashcards f ON qf.flashcard_id = f.flashcard_id 
JOIN Category c ON f.category_id = c.category_id WHERE c.category = '${category}'`;

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
  fetchTotalQuizScore(callback) {
    const query = `SELECT 
    COUNT(qf.flashcard_id) AS total_questions,
    SUM(CASE WHEN qf.is_correct THEN 1 ELSE 0 END) AS correct_answers,
	   (SUM(CASE WHEN qf.is_correct THEN 1 ELSE 0 END) * 100.0 / COUNT(qf.flashcard_id)) AS score_percentage
FROM QuizFlashcards qf`;

    this.dbHandler.db.transaction(tx => {
      tx.executeSql(
        query,
        [],
        (_, {rows}) => {
          const Flashcard = rows.raw();

          callback(Flashcard);
        },
        error => console.log('Error fetching Flashcard: ', error),
      );
    });
  }
}

export default DBQuizScore;
