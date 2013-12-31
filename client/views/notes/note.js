Template.note.formattedDate = function() {
  var date = new Date(this.date);
  return date.format('{Month} {d}, {yyyy}');
};

Template.note.helpers({
    ownNote: function() {
        return this.owner == Meteor.userId();
    }
});
