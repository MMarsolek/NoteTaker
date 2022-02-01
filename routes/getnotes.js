const manageNotes = require('express').Router();
const fs = require('fs');
const uniqid = require('uniqid');
const { addNote, deleteNote } = require('../helpers/manageDatabase');


//Retrieves the current list of notes by reading the file. 
manageNotes.get('/', (req, res) => {
    console.info(`${req.method} request received for feedback`);
  
   fs.readFile('./db/db.json', 'utf8' , (err, data) =>
   {
     if(err){
       console.log(err);
     } else{
      res.json(JSON.parse(data));
     }
   });
  });


  //Calls the addNote method and passes in a newNote object from data taken from the request body
  manageNotes.post('/', (req, res) => {
    console.log(req.body);
  
    const { title, text } = req.body;
    if (req.body) {
      const newNote = {
        title,
        text, 
        id: uniqid().trim()
      };
  
      addNote(newNote, './db/db.json');
      res.json(`Note added successfully 🚀`);
    } else {
      res.error('Error in adding note');
    }
  });


//Calls the delete method and passes in the ID number from the URL
  manageNotes.delete(`/:id`, function (req, res) {  
    if (req.params['id']) {
      deleteNote(req.params['id'].trim(), './db/db.json');
      res.json(`Note deleted successfully`);
    } else {
      res.error('Error in deleting note');
    }
  });
  
  
  
module.exports = manageNotes;