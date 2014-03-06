Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
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
        data: function() {
            var note = FriendNotes.findOne(this.params._id);
            if (!note) {
                return null;
            }
            var urlHash = this.params.k;
            if (note.note && note.note.hashCode() == urlHash){
                return FriendNotes.findOne(this.params._id);
            } else {
                //TODO: show a nice 'not found' message to the user here.
                return null;
            }
        }
    });

    this.route('isoTest', {
        path: '/isoTest',
        waitOn: function() {
            return [Meteor.subscribe('friends'),  Meteor.subscribe("friend_notes")]
        }
    });
});
