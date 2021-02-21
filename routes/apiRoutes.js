const router = require('express').Router();
const fs = require('fs');
const db = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');
const util = require("util");
const path = require('path');
const dbPath = path.join(__dirname, '../db/db.json');

function writeDb(res, req) {
    fs.writeFile(dbPath, JSON.stringify(db, null, 2), (err, data) => {
        if (err) {
            return res.status(500).send('failed to set note');
        } 
        return res.json(req.body);
    })

}

// get data from db.json & parse
router.get('/notes', (req, res) => {
    return res.json(db);
});

router.post('/notes', (req, res) => {
    // get data req.body
    // takes everything from json file and puts it into the body
    req.body.id = uuidv4().toString();
    db.push(req.body);
    writeDb(res, req);
});

// delete route
router.delete('/notes/:id', (req, res) => {
    
    // pull id from param
    // filter to get id
    // results from filter will be used to write new file over
    const findNoteIndex = db.findIndex(note => note.id === req.params.id);
    if (findNoteIndex === -1) return res.status(404).send('Could not find note');
    db.splice(findNoteIndex, 1);
    writeDb(res, req);
});

module.exports = router;