Template.search.events({
  'click #addfriendbtn': function () {
    if ($('#name').val() !== '') {
         // Session.set("selected_friend", Friends.insert({name: $('#name').val()}));
         Meteor.call('createFriend', {
          name: $('#name').val()
        }, function (error, friend) {
          if (! error) {
            // $('#name').val('');
            mixpanel.track("Added Friend");
            Session.set("selected_friend", friend);

          }
        });
       }
     },
     'submit #addfriend': function () {
      event.preventDefault();
      if ($('#name').val() !== '') {
        // Session.set("selected_friend", Friends.insert({name: $('#name').val()}));
        // $('#name').val('');
        Meteor.call('createFriend', {
          name: $('#name').val()
        }, function (error, friend) {
          if (! error) {
            // $('#name').val('');
            mixpanel.track("Added Friend");
            Session.set("selected_friend", friend);

          }
        });
      }
    },
    'keyup #addfriend': function () {
      Session.set("searchFilter", {name:{'$regex':$('#name').val(), $options: 'i'}});
      Session.set("selected_friend", Friends.findOne(Session.get("searchFilter"), Session.get("sortOrder") ));
    }
  })