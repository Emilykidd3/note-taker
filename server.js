const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require('fs');
const path = require('path');
const apiRoutes = require('./routes/apiRoutes.js');
const htmlRoutes = require('./routes/htmlRoutes.js');

// makes it so you dont have to put public in the route??  
app.use(express.static('public'));

// parse incoming string or array data
// can put information into the body of the request (req.body)
app.use(express.urlencoded({ extended: true }));

// parse incoming JSON data
// send data as json
app.use(express.json());

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});