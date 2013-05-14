// FriendLee's Data Model
// Loaded on both the client and the server

///////////////////////////////////////////////////////////////////////////////
// Friends
/*
    Each Friend is represented by a document in the Friends collection:
      owner: user id
      name: String
      datesmet: Array of date strings
*/

Friends = new Meteor.Collection("friends");

Friends.allow({
    insert: function (userId, friend) {
        return false; // no cowboy inserts -- use createFriend instead
    },
    remove: function (userId, friend) {
        // You can remove friends
        return friend.owner === userId;
    }
});

Meteor.methods({
    createFriend: function (options) {
        options = options || {};
        if (! (typeof options.name === "string" && options.name.length))
            throw new Meteor.Error(400, "Required parameter missing");
        if (options.name.length > 100)
            throw new Meteor.Error(413, "Name too long");
        if (! this.userId)
            throw new Meteor.Error(403, "You must be logged in");

        return Friends.insert({
            owner: this.userId,
            name: options.name,
            datesmet: []

        });
    },

    meetFriend: function (friendId, date) {
        var friend = Friends.findOne(friendId);
        if (! friend || friend.owner !== this.userId)
            throw new Meteor.Error(404, "Friend not found");
        // TODO: check to make sure the date is valid and in the past.
        //if (! (typeof date === "date"))
         //   throw new Meteor.Error(400, "Required Parameter Missing");
        Friends.update(friendId, { $addToSet: {datesmet: date}});
    }
})


///////////////////////////////////////////////////////////////////////////////
// Users

displayName = function (user) {
  if (user.profile && user.profile.name)
    return user.profile.name;
  return user.emails[0].address;
};

var contactEmail = function (user) {
  if (user.emails && user.emails.length)
    return user.emails[0].address;
  if (user.services && user.services.facebook && user.services.facebook.email)
    return user.services.facebook.email;
  return null;
};
