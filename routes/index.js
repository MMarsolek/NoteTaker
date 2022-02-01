const express = require('express');

//Different files that you can navigate to
const manageNotes = require('./getnotes');

const app = express();

//Tells app which file to navigate to based on the url
app.use('/notes', manageNotes);


module.exports = app;