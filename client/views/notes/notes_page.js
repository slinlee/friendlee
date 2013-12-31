Template.notesPage.helpers({
    noteMetaTags: function() {
        $("meta[property='og:description']").attr("content", this.note);
        return true;
    }
});
