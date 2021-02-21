const router = require('express').Router();
const fs = require('fs');
const db = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');
const util = require("util");

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
    req.body.id = uuidv4().toString();
    db.push(req.body);
    fs.writeFile('./db/db.json', JSON.stringify(db, null, 2), (err, data) => {
        if (err) throw err;
    })
    return res.json(req.body);
});

// delete route
router.delete('/notes/:id', (req, res) => {
    // pull id from param
    // filter to get id
    // results from filter will be used to write new file over
    const findNote = db.find(note => note.id === req.params.id);
    console.log(findNote);
    res.send(findNote);
    if (!findNote) return res.status(404).send('Could not find note');
    const filteredNotes = db.filter(note => note.id !== req.params.id);
    fs.writeFile('./db/db.json', JSON.stringify(filteredNotes, null, 2), (err, data) => {
        if (err) throw err;
    })
    return res.json(db);
});

module.exports = router;