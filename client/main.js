// Friends = new Meteor.Collection("friends");
// Meteor.subscribe("friends"); // Moved to router.js
// Meteor.subscribe("friend_notes"); // Moved to router.js

if (Meteor.isClient) {
  Meteor.startup(function () {
    Session.set("searchFilter", {});
    Session.set("sortOrder", {sort: {datesmet: -1, name: 1}});
  });

}

Meteor.AppCache.config({onlineOnly: ['/fonts/']});
