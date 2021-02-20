const router = require('express').Router();
const fs = require('fs');
const db = require('../db/db.json');

// get data from db.json & parse
router.get('/notes', (req, res) => {
    fs.readFile ('./db/db.json', 'UTF-8', (err, data) => {
        if (err) {
            throw err;
        }
        const notes = JSON.parse(data);
        res.json(notes);
    })
});

router.post('/notes', (req, res) => {
    // get data req.body
    // takes everything from json file and puts it into the body
    console.log(req.body);
    db.push(req.body);
    console.log(db);
    fs.writeFile('./db/db.json', JSON.stringify(db), (err, data) => {
        if (err) throw err;
        res.json(data);
    })
    return req.body;
});

module.exports = router;