Template.notesPage.helpers({
    noteMetaTags: function() {
        var note = '&quot;' + this.note + '&quot;';
        if (this.owner_name !== null) {
            note += ' - ' + this.owner_name + ', ' + this.date.format('{Month} {d}, {yyyy}');
        }
        $("meta[property='og:description']").attr("content", note);
        return true;
    },

    ownNote: function() {
        return this.owner == Meteor.userId();
    }
});
