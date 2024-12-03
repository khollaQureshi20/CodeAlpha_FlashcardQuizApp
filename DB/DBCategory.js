import DBHandler from './DBHandler';

class DBCategory {
  constructor() {
    this.dbHandler = new DBHandler();
    this.dbHandler.initializeDatabase();
  }

  fetchCategory(callback) {
    this.dbHandler.db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Category ORDER BY category DESC', 
        [],
        (_, { rows }) => {
          const categories = rows.raw();
          callback(categories);
        },
        error => {
          console.error('Error fetching categories:', error);
        }
      );
    });
  }
  fetchTotalQuestionCategory(callback) {
    this.dbHandler.db.transaction(tx => {
      tx.executeSql(
        'SELECT c.category AS category_name,COUNT(f.category_id) AS total_questions FROM Flashcards f JOIN Category c ON f.category_id = c.category_id GROUP BY c.category;', 
        [],
        (_, { rows }) => {
          const categories = rows.raw();
          callback(categories);
        },
        error => {
          console.error('Error fetching categories:', error);
        }
      );
    });
  }
  addCategory(categoryName, callback) {
    const query = `INSERT INTO Category (category) VALUES (?)`;
  
    this.dbHandler. db.transaction(tx => {
      tx.executeSql(
        query,
        [categoryName], 
        (_, result) => {
          console.log('Category added successfully:', result);
          if (callback) callback(true);
        },
        (_, error) => {
          console.error('Error adding category:', error);
          if (callback) callback(false);
          return false;
        }
      );
    });
  }
  deleteCategory(categoryId, callback) {
    this.dbHandler.db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM categories WHERE id = ?', 
        [categoryId],
        (err, result) => {
          if (err) {
            console.error('Error deleting category:', err);
            callback(false); // Failure
            return;
          }
          
          if (result.affectedRows > 0) {
            console.log('Category deleted successfully');
            callback(true); // Success
          } else {
            console.log('No category found with that ID');
            callback(false); // Failure
          }
        }
      );
    });
  }
  updateCategory(categoryId,categoryName, callback) {
    const query = `UPDATE categories SET category = ? WHERE id = ?`;
  
    this.dbHandler. db.transaction(tx => {
      tx.executeSql(
        query,
        [categoryName,categoryId], 
        (_, result) => {
          console.log('Category edit successfully:', result);
          if (callback) callback(true);
        },
        (_, error) => {
          console.error('Error adding category:', error);
          if (callback) callback(false);
          return false;
        }
      );
    });
  }
  
}

export default DBCategory;
