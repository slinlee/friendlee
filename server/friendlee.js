// Friends = new Meteor.Collection("friends");

if(Meteor.isServer) {
  Meteor.startup(function () {
    // if (Friends.find().count() === 0) {
    //   var names = ["Tom Myspace", "Wayne Brady", "Charlie Brown"];

    //   for (var i = 0; i < names.length; i++) {
    //     Friends.insert({name: names[i]});
    //   }
    // }
  });
}

Meteor.publish("friends", function() {
    return Friends.find({owner: this.userId});
});

Meteor.publish('friend', function(friendId) {
  return Friends.find({_id: friendId});
});

Meteor.publish("friend_notes", function() {
    return FriendNotes.find({owner: this.userId});
});

Meteor.publish('friend_note_public', function(noteId) {
  return FriendNotes.find({_id: noteId});
});

Meteor.methods({
  friendsAggregate: function() {
    var pipe = [];
    pipe.push( { $match: { owner: this.userId } } );
    pipe.push( { $unwind: "$datesmet" } );
    pipe.push( { $group: { _id: "$_id", size: { $sum:1 } } } );
    pipe.push( { $sort: { size: 1 } } );
    return Friends.aggregate(pipe);
  }
});

