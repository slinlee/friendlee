Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    waitOn: function() { return [Meteor.subscribe('friends'),  Meteor.subscribe("friend_notes")]}
});

Router.map(function() {
    this.route('friendlee', {path: '/'});

    this.route('notesPage', {
        path: '/notes/:_id',
        data: function() { return FriendNotes.findOne(this.params._id); }
    });
});
