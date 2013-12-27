
Template.friendlist.friends = function () {
  return Friends.find(Session.get("searchFilter"), Session.get("sortOrder"));

};

Template.friendlist.selected_name = function () {
  var friend = Friends.findOne(Session.get("selected_friend"));
  return friend && friend.name;
};

Template.friendlist.selected_timeMet = function () {
  var friend = Friends.findOne(Session.get("selected_friend"));
  if (friend.datesmet.length > 0) {
    if(friend.datesmet.max().isToday()) {
      return 'Today';
    }
    return friend && friend.datesmet.max().short(); //debug
  //} else {
  //  return '';
  }
};

Template.friendlist.selected_timeMetTotal = function () {
  var friend = Friends.findOne(Session.get("selected_friend"));
  if (friend.datesmet.length > 0) {
    return friend.datesmet.length;
  }
};

Template.friendlist.selected_datesMet = function () {
  var friend = Friends.findOne(Session.get("selected_friend"));
  if (friend.datesmet.length > 0) {
        // return friend.datesmet.each(function () { this.short() });
        // friend.datesmet.each( function (key, value) { console.log("key: " + key.format('{Weekday} {Month} {dd}, {yyyy}')); return key.short(); })
        return friend.datesmet.sort(function(a,b){return b-a}).map(function(n) { return n.format('{Month} {dd}, {yyyy}, {Weekday}')});//map('short');
  } else {
    return '';
  }
};

Template.friendlist.selected_avgBtwnMeeting = function () {
    var friend = Friends.findOne(Session.get("selected_friend"));
    var datesmetSorted;
    var interval = 0;
    if (friend.datesmet.length > 1) {
        datesmetSorted = friend.datesmet.sort(function(a,b){return b-a});
        for (var j = 0; j < datesmetSorted.length - 1; j++) {
            interval += datesmetSorted[j] - datesmetSorted[j+1];
        }
        interval = (interval/(datesmetSorted.length-1)/(24 * 60 * 60 * 1000)).ceil();
        if (interval > 1) {
            interval += " days";
        } else {
            interval = "day";
        }
        return interval;
    } else {
        return false;
    }
}

Template.friendlist.selected_friendNotes = function() {
  var friendId = Friends.findOne(Session.get("selected_friend"))._id;
  var friendNotes = FriendNotes.findOne({ friend_id: friendId });
  if (friendNotes) {
    return friendNotes.notes.sort(function(a,b){return b.date-a.date}); // TODO: apply date formatting here
  } else {
    return '';
  }
};

Template.friendlist.selected_friendNotesTotal = function() {
  var friendId = Friends.findOne(Session.get("selected_friend"))._id;
  var friendNotes = FriendNotes.findOne({ friend_id: friendId });
  if (friendNotes) {
    return friendNotes.notes.length;
  } else {
    return '';
  }
};

Template.friendlist.rendered = function () {
  $('.datePickerBtn').on('changeDate', function (event) {
    Meteor.call('meetFriend', Session.get("selected_friend"), Date.create(event.date.valueOf()));
    $.ajax({url: 'http://morecowbell.meteor.com/ding?user=gqaou7G5E526zCzqk'});
    mixpanel.track("Tracked met friend");
    Session.set("searchFilter", {});
    //$('.datePickerBtn').datepicker('hide');
  });
};


Template.friendlist.events({
    'click button.metToday': function () {
      // Friends.update(Session.get("selected_friend"), {$set: {timeMet: (new Date())}});
      Meteor.call('meetFriend', Session.get("selected_friend"), Date.create('today'));
      // mixpanel.track("Tracked met friend today");
      mixpanel.track("Tracked met friend");
      $.ajax({url: 'http://morecowbell.meteor.com/ding?user=gqaou7G5E526zCzqk'});
      Session.set("searchFilter", {});
    },

    'click input.met' : function () {
      // Friends.update(Session.get("selected_friend"), {$set: {timeMet: new Date($('.dateMetCal').val())}});
      Meteor.call('meetFriend', Session.get("selected_friend"), Date.create($('.dateMetCal').val()));
      mixpanel.track("Tracked met friend");
      // $.ajax({url: 'http://morecowbell.meteor.com/ding?user=gqaou7G5E526zCzqk'});
      Session.set("searchFilter", {});
    },

    'click a.remove' : function () {
      $('.selected').addClass('animated hinge');
      var timeout = window.setTimeout(function () {
        FriendNotes.remove(FriendNotes.findOne({ friend_id: Session.get("selected_friend") })._id);
        Friends.remove(Session.get("selected_friend"));
        mixpanel.track("Removed Friend");
        Session.set("searchFilter", {});
      }, 2000);
    },

    'click i.backToTop' : function () {
        $.scrollTo('.title', 50);
    },

    'click button.datePickerBtn' : function() {
      $('.datePickerBtn').datepicker('show');
    }
  });
