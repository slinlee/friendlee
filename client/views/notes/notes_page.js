Template.notesPage.helpers({
    noteMetaTags: function() {
        var note = '&quot;' + this.note + '&quot;';
        $("meta[property='og:description']").attr("content", note);
        return true;
    }
});
