const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const cors=require('cors')

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Endpoint to handle form submission
app.post('/submit-form', (req, res) => {
  const { name, number, from, to } = req.body;

  const sql = `INSERT INTO bookings (name, mobile_number, origin, destination) VALUES (?, ?, ?, ?)`;
  db.query(sql, [name, number, from, to], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ error: 'Failed to submit form' });
    }
    console.log('Form submitted successfully');
    res.status(200).json({ message: 'Form submitted successfully' });
  });
});

app.get('/getall',(req,res)=>{
    const sql = `SELECT * FROM bookings`;
    db.query(sql,(err,result)=>{
        if (err) {
            console.error('Error :', err);
            return res.status(500).json({ error: 'Failed to get' });
          }
          console.log('Form submitted successfully');
          res.status(200).json({ data:result });
    })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
