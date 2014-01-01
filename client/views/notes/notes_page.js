Template.notesPage.helpers({
    noteMetaTags: function() {
        var note = '&quot;' + this.note + '&quot;';
        if (this.owner_name) {
            note += ' - ' + this.owner_name + ', ' + this.date.format('{Month} {d}, {yyyy}');
        }
        $("meta[property='og:description']").attr("content", note);
        $("meta[property='robots']").attr("content", "noindex"); // Prevent Search engines from indexing notes <meta name="robots" content="noindex">
        return true;
    },

    ownNote: function() {
        return this.owner == Meteor.userId();
    }
});
