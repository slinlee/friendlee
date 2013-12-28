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
        FriendNotes.insert({
            owner: this.userId,
            friend_id: friendId,
            created_at: new Date().getTime(),
            date: date,
            note: note
        });
    },

    // remove all friend notes for a friend when the friend is removed
    removeFriendNotes: function(friendId) {
        FriendNotes.remove({friend_id: friendId});
    }
})