jQuery(document).ready(function() {
  if(Meteor.userId()) {
    mixpanel.identify(Meteor.userId());
    console.log("sending mixpanel identify");
    mixpanel.name_tag(Meteor.user().profile.name);
    mixpanel.people.set({
      "Name" : Meteor.user().profile.name,
      "$last_login": new Date()
    });
  }
});