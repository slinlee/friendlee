/* 
* Script to migrate notes from array structure to individual items 
* usage:
*   run meteor mongo --url friendlee.meteor.com to get connection details, then
*   mongo host:port/databasename -u username -p password .scripts/notes_migration.js
*/

// rename the existing collection
db.friend_notes.renameCollection('friend_notes_old');

// find and insert each note into the new collection
cursor = db.friend_notes_old.find();
while ( cursor.hasNext() ) {
   friend_note = cursor.next();
   friend_id = friend_note.friend_id;
   owner = friend_note.owner;
   notes = friend_note.notes;
   for (var i = 0; i < notes.length; i++) {
     note = notes[i];
     db.friend_notes.insert({friend_id: friend_id, owner: owner, note: note.note, created_at: note.created_at, date: note.date});
   };
}
