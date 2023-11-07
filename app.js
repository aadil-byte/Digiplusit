const fs = require('fs');
const express = require('express');
const app = express();
const ejs = require('ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

let students = [];

fs.readFile('students.json', 'utf8', (err, data) => {
    if (!err) {
        students = JSON.parse(data);
    }
});

app.get('/students', (req, res) => {
    res.render("index");
});

app.post('/students', (req, res) => {
    console.log(req.body);
    const newStudent = req.body;
    const jsonstr = JSON.stringify(newStudent);
    fs.writeFile('students.json', jsonstr, (err) => {
        if (err) {
            res.status(500).send('Error while adding the student');
        } else {
            res.status(201).send('Student added successfully');
        }
    });
});


const port = 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});