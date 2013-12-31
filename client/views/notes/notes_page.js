Template.notesPage.helpers({
    noteMetaTags: function() {
        var note = '&quot;' + this.note + '&quot -' + displayName(Meteor.user());
        $("meta[property='og:description']").attr("content", note);
        return true;
    }
});
