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

    this.route('friendCards', {
        path: '/friendcards',
        waitOn: function() {
            return Meteor.subscribe('friends')
        },
        before: function() {
            Meteor.call('friendsAggregate', function(err,result) {
              if (err === undefined) {
                var min = result.first()['size'];
                var max = result.last()['size'];
                var spread = (max - min)  / 3;
                Session.set("friendCardSpread", spread);
              } else {
                console.log(err);
              }
            });
        }
    });

    this.route('friendPage', {
        path: '/friend/:_id',
        waitOn: function() {
            return [Meteor.subscribe('friend', this.params._id),  Meteor.subscribe("friend_notes")];
        },
        data: function() {
            var friend = Friends.findOne(this.params._id);
            if (!friend) {
                return null;
            }
            return friend;
        }
    });
});
