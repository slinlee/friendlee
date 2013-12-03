///////////////////////////////////////////////////////////////////////////////
// Friend Notes
/*
    Each Friend Note is represented by a document in the Friend Notes collection:
      owner: user id
      friend_id: friend id from friends Collection
      notes: array of sub documents, each containing created date, date of the note, and the note itself
*/

FriendNotes = new Meteor.Collection("friend_notes");

FriendNotes.allow({
    remove: function (userId, friendNotes) {
        // You can remove friend notes
        return friendNotes.owner === userId;
    }
});

Meteor.methods({

    addFriendNote: function (friendId, date, note) {

        if (! (FriendNotes.findOne( { friend_id: friendId } ))) {
            FriendNotes.insert({
            owner: this.userId,
            friend_id: friendId,
            notes: []
            });
        }
        FriendNotes.update({ owner: this.userId, friend_id: friendId }, { $addToSet: {notes: {created_at: new Date().getTime(), date: date, note: note}}});
    }
})