
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();


app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: '54.162.181.8',
    port: 3306,
    user: 'root',
    password: 'Skadoosh@123',
    database: 'SustainableProducts',
  });

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    res.status(500).send('Failed to connect to the database');
  } else {
    console.log('Connected to MySQL database');
  }
});


// API endpoint to get product data
app.get('/prodDetails/:productName', (req, res) => {
  const { productName } = req.params;
  const query = 'SELECT * FROM Products where Name = ?';

  db.query(query, [productName],
    (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(result);
        }
    }
  );
});

app.get('/user/:userName', (req, res) => {
  const { userName } = req.params;

  const query = 'SELECT * FROM Users WHERE FirstName = ?';

  db.query(query, [userName], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(result);
    }
  });
});


// // API endpoint to get CartDetails data
app.get('/selectedItems', (req, res) => {
  const query = 'SELECT * FROM CartDetails';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(result);
    }
  });
});

app.get('/resetCart', (req, res) => {
  const query = 'Truncate CartDetails';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(result);
    }
  });
});



app.post('/updateAvailability', (req, res) => {
  const {product, qty} = req.body;

  const count = parseInt(qty, 10);

  // Using a parameterized query to update quantity_in_store
  const updateQuery =
    'UPDATE Products SET Quantity = Quantity - ? WHERE Name = ? AND Quantity > 0';

  // Executing the query with equipmentData.name as a parameter
  db.query(updateQuery, [count, product], (updateErr, updateResult) => {
    if (updateErr) {
      // Handling errors during the query execution
      console.error('Error updating availability:', updateErr);
      res.status(500).send('Internal Server Error');
    } else {
      // Checking if the update was successful based on affectedRows
      if (updateResult.affectedRows > 0) {
        res.json({ success: true, message: 'Item availability updated successfully.' });
      } else {
        // Handling the case where the equipment is not available or out of stock
        res.status(400).json({ success: false, message: 'Item not available or out of stock.' });
      }
    }
  });
});


app.post('/updateDB', (req, res) => {
  const {FN, LN, product, qty, cost, tp} = req.body;


  const count = parseInt(qty, 10);
  const price = parseInt(cost, 10);
  const totalPrice = parseInt(tp, 10);

  // Using a parameterized query to update quantity_in_store
  const updateQuery =
  `INSERT INTO Transactions (UserFirstName, UserLastName, ProductName, Price, Quantity,  TotalPrice)
  VALUES (?, ?, ?, ?,?,?)`;

  // Executing the query with equipmentData.name as a parameter
  db.query(updateQuery, [FN, LN, product, price, count, totalPrice], (updateErr, updateResult) => {
    if (updateErr) {
      // Handling errors during the query execution
      console.error('Error updating availability:', updateErr);
      res.status(500).send('Internal Server Error');
    } else {
      // Checking if the update was successful based on affectedRows
      if (updateResult.affectedRows > 0) {
        res.json({ success: true, message: 'Item availability updated successfully.' });
      } else {
        // Handling the case where the equipment is not available or out of stock
        res.status(400).json({ success: false, message: 'Item not available or out of stock.' });
      }
    }
  });
});



app.post('/updateTransaction', (req, res) => {
  const {
    name, quantity, price, totalPrice
  } = req.body;

  const qty  = parseInt(quantity, 10);
  const cost = parseInt(price, 10);
  const tp = parseInt(totalPrice, 10);

  const insertQuery = `
    INSERT INTO CartDetails (Name, Quantity, Price, TotalPrice)
    VALUES (?, ?, ?, ?)`;
  
  db.query(
    insertQuery,
    [name, qty, cost, tp],
    (insertErr, insertResult) => {
      if (insertErr) {
        console.error('Error updating transaction:', insertErr);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
      } else {
        if (insertResult.affectedRows > 0) {
          res.json({ success: true, message: 'Transaction updated successfully.' });
        } else {
          res.status(400).json({
            success: false,
            message: 'Failed to update transaction. Check equipment availability and try again.',
          });
        }
      }
    }
  );
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 