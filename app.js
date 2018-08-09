const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};
const bodyOptions = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
}

const argv = yargs
    .command('add', 'Add a new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('read', 'Read an existing note', {
        title: titleOptions
    })
    .command('remove', 'Remove an existing note', {
        title: titleOptions
    })
    .command('list', 'List all existing notes')
    .help()
    .argv;
let command = yargs.argv._[0];

if (command === 'add') {
    let note = notes.addNote(argv.title, argv.body);

    if (note === undefined) {
        console.log("There was a problem adding the note. Make sure you entered everything correctly and the note does not have a duplicate title");
    } else {
        console.log("Note successfully added!");
        notes.logNote(note);
    }
} else if (command === 'list') {
    let allNotes = notes.getAll();

    console.log(`Printing ${allNotes.length} note(s)`);

    allNotes.forEach(note => notes.logNote(note));
} else if (command === 'read') {
    let note = notes.readNote(argv.title);

    if (note) {
        console.log('Here is the note');
        notes.logNote(note);
    } else {
        console.log('Note not found');
    }
} else if (command === 'remove') {
    let noteRemoved = notes.removeNote(argv.title);
    console.log(noteRemoved ? 'Note was removed successfully' : 'Note does not exist');
} else {
    console.log('Command not valid');
}