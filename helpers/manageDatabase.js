const fs = require('fs');


//Reads the file
const readFromFile = fs.readFile;

//Updates the database file using fs
const writeToFile = (destination, noteContent) =>
  fs.writeFile(destination, JSON.stringify(noteContent, null, '\t'), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );


//Updates the database file with a new note by calling the writeToFile function
const addNote = (noteContent, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedNotes = JSON.parse(data) ;
      parsedNotes.push(noteContent);
      writeToFile(file, parsedNotes);
    }
  });
};


//Deletes the selected note by searching for the passed in ID and removing it from the array before calling writeToFile to update the file
const deleteNote = (id, fileLocation) => {
  console.log(id);
  fs.readFile(fileLocation, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      let parsedNotes = JSON.parse(data);
      parsedNotes.forEach(note => {
        console.log(note['id']);
        if(note['id'] === id) {
          const index = parsedNotes.indexOf(note);
          parsedNotes.splice(index, 1);
          writeToFile(fileLocation, parsedNotes);
        }
      });
    }
  });
};

module.exports = { readFromFile, addNote, deleteNote };
