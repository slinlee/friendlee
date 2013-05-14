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
