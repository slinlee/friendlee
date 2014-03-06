Template.isoTest.rendered = function () {
  var friends = $('#iso-container').find(".friend-card");
  if (!$('#iso-container').hasClass("isotope")) {
        // Initialize isotope
        $('#iso-container').isotope({
          layoutMode : 'fitRows',
          itemSelector: '.friend-card',
          getSortData: {
            datesmet : function($elem) {
              return parseInt($elem.find('.datesmet').text());
            },
            lastmet : function($elem) {
              return parseInt($elem.attr('data-lastmet'));
            },
            name : function($elem) {
              return $elem.find('.name').text();
            }
          },
          sortBy: 'lastmet',
          sortAscending: false
        });
  }
  $('#iso-container').isotope('insert', $('#iso-container').find(".friend-card"));
};

Template.isoTest.helpers({
  friends: function () {
    return Friends.find();
  },

  getInitials: function (name) {
    var nameArr = name.split(' ');
    var initials = "";
    for (var i = 0; i < nameArr.length; i++) {
      initials += nameArr[i].charAt(0);
    }
    return initials.toUpperCase().substr(0,3);
  },

  lastmet: function(friend) {
    return new Date(friend.datesmet[friend.datesmet.length - 1]).getTime()
  }

});

Template.isoTest.events({
  'click .sort': function(e) {
    var directionIcon = $(e.target).find('i');
    var directionAsc = directionIcon.hasClass('fa-sort-asc');
    var sortby = $(e.target).attr('data-sortby');
    // set the new active sort button
    $('.sort').removeClass('active');
    $(e.target).addClass('active');
    // replace arrow with the opposite direction
    directionAsc ? 
      directionIcon.removeClass('fa-sort-asc').addClass('fa-sort-desc') :
      directionIcon.removeClass('fa-sort-desc').addClass('fa-sort-asc');
    $(e.target).blur();
    // sort the cards
    $('#iso-container').isotope({
      sortBy: sortby,
      sortAscending: directionAsc,
    }); 
    $('#iso-container').isotope('reLayout');
  },
  'click .friend-card': function(e) {
    var friendId = $(e.target).closest('.friend-card').attr('data-id');
    // mixpanel.track("Selected Friend");
    Session.set("selected_friend", friendId);
    Router.go('friendPage', {_id: friendId});
  }
});