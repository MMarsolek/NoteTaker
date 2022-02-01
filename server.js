const express = require('express');
const path = require('path');
const api = require('./routes/index.js');
const { clog } = require('./middleware/clog.js');


const PORT = process.env.PORT || 8080;

const app = express();

app.use(clog);
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use('/api', api);

//Tells express where to look for route information.
app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//Tells the app which port to listen on
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);