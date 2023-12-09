
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();


app.use(cors());
app.use(bodyParser.json());

// Replace with your MySQL connection details
const db = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'Learn@2023',
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


// API endpoint to get medical equipment data
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

// app.get('/client/:name', (req, res) => {
//   const { name } = req.params;

//   const query = 'SELECT * FROM clients WHERE name = ?';

//   db.query(query, [name], (err, result) => {
//     if (err) {
//       console.error('Error executing query:', err);
//       res.status(500).send('Internal Server Error');
//     } else {
//       res.json(result);
//     }
//   });
// });


// // API endpoint to get supplier data
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

// app.put('/equipment/:id', (req, res) => {
//   const equipmentId = req.params.id;
//   const updatedData = req.body;

//   const updateQuery = 'UPDATE medicalEquipment SET ? WHERE id = ?';

//   db.query(updateQuery, [updatedData, equipmentId], (updateErr, updateResult) => {
//     if (updateErr) {
//       console.error('Error updating equipment details:', updateErr);
//       res.status(500).json({ success: false, message: 'Internal Server Error' });
//     } else {
//       if (updateResult.affectedRows > 0) {
//         res.json({ success: true, message: 'Equipment details updated successfully.' });
//       } else {
//         res.status(400).json({ success: false, message: 'Failed to update equipment details.' });
//       }
//     }
//   });
// });


app.post('/updateAvailability', (req, res) => {
  const {productName, quantity} = req.body;

  const count = parseInt(quantity, 10);

  // Using a parameterized query to update quantity_in_store
  const updateQuery =
    'UPDATE CartDetails SET Quantity = Quantity - ? WHERE Name = ? AND Quantity > 0';

  // Executing the query with equipmentData.name as a parameter
  db.query(updateQuery, [count, productName], (updateErr, updateResult) => {
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

// app.put('/supplier/:id', (req, res) => {
//   const supplierId = req.params.id;
//   const updatedData = req.body;

//   const updateQuery = 'UPDATE Suppliers SET ? WHERE id = ?';

//   db.query(updateQuery, [updatedData, supplierId], (updateErr, updateResult) => {
//     if (updateErr) {
//       console.error('Error updating supplier details:', updateErr);
//       res.status(500).json({ success: false, message: 'Internal Server Error' });
//     } else {
//       if (updateResult.affectedRows > 0) {
//         res.json({ success: true, message: 'Supplier details updated successfully.' });
//       } else {
//         res.status(400).json({ success: false, message: 'Failed to update supplier details.' });
//       }
//     }
//   });
// });




// app.get('/customerReport', (req, res) => {

//   const query = 'SELECT clients.name, clients.address, clients.telephone_number, transaction.is_paid, transaction.id FROM clients INNER JOIN transaction ON clients.name = transaction.client_name';

//   db.query(query,  (err, result) => {
//     if (err) {
//       console.error('Error executing query:', err);
//       res.status(500).send('Internal Server Error');
//     } else {
//       res.json(result);
//     }
//   });
// });

// app.get('/rentingReport', (req, res) => {

//   const query = 'SELECT transaction.client_name, transaction.equipment_id, MedicalEquipment.name FROM transaction INNER JOIN MedicalEquipment ON transaction.equipment_id = MedicalEquipment.equipment_id';

//   db.query(query,  (err, result) => {
//     if (err) {
//       console.error('Error executing query:', err);
//       res.status(500).send('Internal Server Error');
//     } else {
//       res.json(result);
//     }
//   });
// });

// app.get('/pendingReport', (req, res) => {

//   const query = 'SELECT client_name, is_paid FROM transaction where is_paid = "pending"';

//   db.query(query,  (err, result) => {
//     if (err) {
//       console.error('Error executing query:', err);
//       res.status(500).send('Internal Server Error');
//     } else {
//       res.json(result);
//     }
//   });
// });

// app.get('/paidReport', (req, res) => {

//   const query = 'SELECT client_name, is_paid FROM transaction where is_paid = "paid"';

//   db.query(query,  (err, result) => {
//     if (err) {
//       console.error('Error executing query:', err);
//       res.status(500).send('Internal Server Error');
//     } else {
//       res.json(result);
//     }
//   });
// });

// app.post('/medicalEquipmentUpdate', (req, res) => {
//   const {
//     name, manufacturer,description,rentPricePerDay, quantityInStore
//   } = req.body;

  
//   const rent = parseInt(rentPricePerDay, 10);
//   const qtyStore = parseInt(quantityInStore, 10);
 
//   const insertQuery = `
//     INSERT INTO MedicalEquipment (name, manufacturer, description, rent_price_per_day, quantity_in_store)
//     VALUES (?, ?, ?, ?, ?, ?, ?)`;
  
//   db.query(
//     insertQuery,
//     [name, manufacturer, description, rent, qtyStore],
//     (insertErr, insertResult) => {
//       if (insertErr) {
//         console.log(name, manufacturer, description, rent, qtyStore);
//         console.error('Error updating table:', insertErr);
//         res.status(500).json({ success: false, message: 'Internal Server Error' });
//       } else {
//         if (insertResult.affectedRows > 0) {
//           res.json({ success: true, message: 'Table updated successfully.' });
//         } else {
//           res.status(400).json({
//             success: false,
//             message: 'Failed to update table.',
//           });
//         }
//       }
//     }
//   );
// });


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