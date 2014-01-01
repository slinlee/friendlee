Template.note.formattedDate = function() {
  var date = new Date(this.date);
  return date.format('{Month} {d}, {yyyy}');
};

Template.note.helpers({
    ownNote: function() {
        return this.owner == Meteor.userId();
    },

    noteHashUrl: function() {
        var url = '?k=';
        url += this.note.hashCode();
        return url;
    }
});
