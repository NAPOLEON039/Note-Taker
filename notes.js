const fs = require('fs');

let fetchNotes = () => {
    try {
        let rawNotes = fs.readFileSync('notes-data.json');
        return JSON.parse(rawNotes);
    } catch (err) {
        return [];
    }
};

let saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};


var addNote = (title, body) => {
    let notes = fetchNotes();
    let note = {
        title,
        body
    };
    let duplicates = notes.filter((note) => title === note.title);
    
    if (duplicates.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

var getAll = () => {
    return fetchNotes();
};

var readNote = (title) => {
    let allNotes = fetchNotes();
    let actualNote = allNotes.filter((note) => title === note.title);
    return actualNote[0];
};

var removeNote = (title) => {
    //fetching notes
    let notes = fetchNotes();
    
    //removing the note from the note title passed as argument and saving the filtered notes
    let filteredNotes = notes.filter((note) => note.title !== title);
    
    saveNotes(filteredNotes);
    
    return notes.length !== filteredNotes.length;
};

let logNote = (note) => {
    console.log();
    console.log(`Note title: ${note.title}`);
    console.log('------------');
    console.log(`Note body: ${note.body}`);
}

module.exports = {
    addNote,
    getAll,
    readNote,
    removeNote,
    logNote
}