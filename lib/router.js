Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading'
});

Router.map(function() {
    this.route('friendlee', {
        path: '/',
        waitOn: function() {
            return [Meteor.subscribe('friends'),  Meteor.subscribe("friend_notes")]
        }
    });

    this.route('notesPage', {
        path: '/notes/:_id',
        waitOn: function() {
            return Meteor.subscribe('friend_note_public', this.params._id);
        },
        data: function() { return FriendNotes.findOne(this.params._id); }
    });
});
