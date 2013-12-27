Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    waitOn: function() { return Meteor.subscribe('friends'); }
});

Router.map(function() {
    this.route('friendlee', {path: '/'});
});
