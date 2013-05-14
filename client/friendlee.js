// Friends = new Meteor.Collection("friends");
Meteor.subscribe("friends");

if (Meteor.isClient) {
  Meteor.startup(function () {
    Session.set("searchFilter", {});
    Session.set("sortOrder", {sort: {datesmet: -1, name: 1}});
  });

  Template.friendlist.friends = function () {
    return Friends.find(Session.get("searchFilter"), Session.get("sortOrder"));

  };

   Template.friendlist.selected_name = function () {
     var friend = Friends.findOne(Session.get("selected_friend"));
     return friend && friend.name;
   };

    Template.friendlist.selected_timeMet = function () {
     var friend = Friends.findOne(Session.get("selected_friend"));
     if(friend.datesmet.length > 0) {
        if(friend.datesmet.max().isToday()) {
          return 'Today';
        }
       return friend && friend.datesmet.max().short(); //debug
     } else {
      return '';
     }
   };

   Template.friend.selected = function () {
     return Session.equals("selected_friend", this._id) ? "selected animated wiggle" : '';
  };

  Template.friend.timeago = function () {
    if (this.datesmet.length == 0) {
      return '';
    } else if (this.datesmet.max().isToday()) {
      return 'Today';
    } else if (this.datesmet.max().isYesterday()) {
      return 'Yesterday';
    } else {
      return humanized_time_span(this.datesmet.max());
    }
  }

  Template.friendlist.events({
    'click input.metToday': function () {
      // Friends.update(Session.get("selected_friend"), {$set: {timeMet: (new Date())}});
      Meteor.call('meetFriend', Session.get("selected_friend"), Date.create('today'));
      Session.set("searchFilter", {});
    },

    'click input.met' : function () {
      // Friends.update(Session.get("selected_friend"), {$set: {timeMet: new Date($('.dateMetCal').val())}});
      Meteor.call('meetFriend', Session.get("selected_friend"), Date.create($('.dateMetCal').val()));
      Session.set("searchFilter", {});
    },

    'click input.remove' : function () {
      $('.selected').addClass('animated hinge');
      var timeout = window.setTimeout(function () {
          Friends.remove(Session.get("selected_friend"));
          Session.set("searchFilter", {});
        }, 2000);
    }
  });

  Template.friend.events({
    'click': function () {
      Session.set("selected_friend", this._id);
    }
  });

  Template.search.events({
    'click #addfriendbtn': function () {
      if ($('#name').val() !== '') {
         // Session.set("selected_friend", Friends.insert({name: $('#name').val()}));
         Meteor.call('createFriend', {
          name: $('#name').val()
         }, function (error, friend) {
          if (! error) {
            // $('#name').val('');
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



}

jQuery(document).ready(function() {

});



// Humanized time span functions

function humanized_time_span(date, ref_date, date_formats, time_units) {
  //Date Formats must be be ordered smallest -> largest and must end in a format with ceiling of null
  date_formats = date_formats || {
    past: [
      // { ceiling: 60, text: "$seconds seconds ago" },
      // { ceiling: 3600, text: "$minutes minutes ago" },
      // { ceiling: 86400, text: "$hours hours ago" },
      { ceiling: 2629744, text: "$days days ago" },
      { ceiling: 31556926, text: "$months months ago" },
      { ceiling: null, text: "$years years ago" }
    ],
    future: [
      // { ceiling: 60, text: "in $seconds seconds" },
      // { ceiling: 3600, text: "in $minutes minutes" },
      // { ceiling: 86400, text: "in $hours hours" },
      { ceiling: 2629744, text: "in $days days" },
      { ceiling: 31556926, text: "in $months months" },
      { ceiling: null, text: "in $years years" }
    ]
  };
  //Time units must be be ordered largest -> smallest
  time_units = time_units || [
    [31556926, 'years'],
    [2629744, 'months'],
    [86400, 'days'],
    [3600, 'hours'],
    [60, 'minutes'],
    [1, 'seconds']
  ];

  date = new Date(date);
  ref_date = ref_date ? new Date(ref_date) : new Date();
  var seconds_difference = (ref_date - date) / 1000;

  var tense = 'past';
  if (seconds_difference < 0) {
    tense = 'future';
    seconds_difference = 0-seconds_difference;
  }

  function get_format() {
    for (var i=0; i<date_formats[tense].length; i++) {
      if (date_formats[tense][i].ceiling == null || seconds_difference <= date_formats[tense][i].ceiling) {
        return date_formats[tense][i];
      }
    }
    return null;
  }

  function get_time_breakdown() {
    var seconds = seconds_difference;
    var breakdown = {};
    for(var i=0; i<time_units.length; i++) {
      var occurences_of_unit = Math.floor(seconds / time_units[i][0]);
      seconds = seconds - (time_units[i][0] * occurences_of_unit);
      breakdown[time_units[i][1]] = occurences_of_unit;
    }
    return breakdown;
  }

  function render_date(date_format) {
    var breakdown = get_time_breakdown();
    var time_ago_text = date_format.text.replace(/\$(\w+)/g, function() {
      return breakdown[arguments[1]];
    });
    return depluralize_time_ago_text(time_ago_text, breakdown);
  }

  function depluralize_time_ago_text(time_ago_text, breakdown) {
    for(var i in breakdown) {
      if (breakdown[i] == 1) {
        var regexp = new RegExp("\\b"+i+"\\b");
        time_ago_text = time_ago_text.replace(regexp, function() {
          return arguments[0].replace(/s\b/g, '');
        });
      }
    }
    return time_ago_text;
  }

  return render_date(get_format());
}
