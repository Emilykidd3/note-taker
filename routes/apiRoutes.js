const router = require('express').Router();
const fs = require('fs');

// get data from db.json & parse
router.get('/notes', (req, res) => {
    fs.readFile ('db/db.json', 'UTF-8', (err, data) => {
        if (err) {
            throw err;
        }
        const notes = JSON.parse(data);
        res.json(notes);
    })
});

router.post('/notes', (req, res) => {
    
})

module.exports = router;