// Friends = new Meteor.Collection("friends");
Meteor.subscribe("friends");
Meteor.subscribe("friend_notes");

if (Meteor.isClient) {
  Meteor.startup(function () {
    Session.set("searchFilter", {});
    Session.set("sortOrder", {sort: {datesmet: -1, name: 1}});
  });

}