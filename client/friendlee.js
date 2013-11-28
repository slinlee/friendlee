// Friends = new Meteor.Collection("friends");
Meteor.subscribe("friends");

if (Meteor.isClient) {
  Meteor.startup(function () {
    Session.set("searchFilter", {});
    Session.set("sortOrder", {sort: {datesmet: -1, name: 1}});
  });

}