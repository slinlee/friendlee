
Template.friendPage.selected_name = function () {
  var friend = Friends.findOne(Session.get("selected_friend"));
  return friend && friend.name;
};

Template.friendPage.selected_timeMet = function () {
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

Template.friendPage.selected_timeMetTotal = function () {
  var friend = Friends.findOne(Session.get("selected_friend"));
  if (friend.datesmet.length > 0) {
    return friend.datesmet.length;
  }
};

Template.friendPage.selected_datesMet = function () {
  var friend = Friends.findOne(Session.get("selected_friend"));
  if (friend.datesmet.length > 0) {
        // return friend.datesmet.each(function () { this.short() });
        // friend.datesmet.each( function (key, value) { console.log("key: " + key.format('{Weekday} {Month} {dd}, {yyyy}')); return key.short(); })
        return friend.datesmet.sort(function(a,b){return b-a}).map(function(n) { return {"date": n, "formattedDate": n.format('{Month} {dd}, {yyyy}, {Weekday}')}});//map('short');
  } else {
    return '';
  }
};

Template.friendPage.selected_avgBtwnMeeting = function () {
    var friend = Friends.findOne(Session.get("selected_friend"));
    var datesmetSorted;
    var interval = 0;
    if (friend.datesmet.length > 1) {
        datesmetSorted = friend.datesmet.sort(function(a,b){return b-a});
        interval = (datesmetSorted.first() - datesmetSorted.last())/(datesmetSorted.length-1)/(24 * 60 * 60 * 1000);
        interval = (interval * 10).round()/10;
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

Template.friendPage.selected_friendNotes = function() {
  var friendId = Friends.findOne(Session.get("selected_friend"))._id;
  var friendNotes = FriendNotes.find({ friend_id: friendId }).fetch();
  if (friendNotes) {
    return friendNotes.sort(function(a,b){return b.date-a.date}); // TODO: apply date formatting here
  } else {
    return '';
  }
};

Template.friendPage.selected_friendNotesTotal = function() {
  var friendId = Friends.findOne(Session.get("selected_friend"))._id;
  var friendNotes = FriendNotes.find({ friend_id: friendId }).fetch();
  if (friendNotes) {
    return friendNotes.length;
  } else {
    return '';
  }
};

Template.friendPage.rendered = function () {
  $('.datePickerBtn').on('changeDate', function (event) {
    Meteor.call('meetFriend', Session.get("selected_friend"), Date.create(event.date.valueOf()));
    $.ajax({url: 'http://morecowbell.meteor.com/ding?user=gqaou7G5E526zCzqk'});
    mixpanel.track("Tracked met friend");
    Session.set("searchFilter", {});
    //$('.datePickerBtn').datepicker('hide');
  });
};


Template.friendPage.events({
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
        Meteor.call('removeFriendNotes', Session.get("selected_friend"), function(error) {
          if (error)
            return alert(error.reason);
        });
        Friends.remove(Session.get("selected_friend"));
        mixpanel.track("Removed Friend");
        Session.set("searchFilter", {});
      }, 2000);
    },

    'click, tap i.backToTop' : function () {
        $('html, body').animate({
          scrollTop: $(document).find('.title').offset().top
        }, 200);
    },

    'click button.datePickerBtn' : function() {
      $('.datePickerBtn').datepicker('show');
    },

    'click .removeDateMet': function(e) {
      e.preventDefault();
      var date = new Date($(e.target).text());
      Meteor.call('removeDateMet', Session.get('selected_friend'), date, function(error) {
        if (error)
          return alert(error.reason);
      });
    }
  });
