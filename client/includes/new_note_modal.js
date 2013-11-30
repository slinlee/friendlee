(function(){
Template.newNoteModal.selected_name = function () {
    var friend = Friends.findOne(Session.get("selected_friend"));
    return friend && friend.name;
};

Template.newNoteModal.rendered = function () {
    //Put input in to the dialog
    $('#newNoteModal').on('shown.bs.modal', function () {
        var input = $('#newNote');
        var len = input.val().length;
        input[0].focus();
        input[0].setSelectionRange(len, len);
    })
};

}).call(this);
