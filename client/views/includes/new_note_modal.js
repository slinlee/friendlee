
Template.newNoteModal.selected_name = function () {
    var friend = Friends.findOne(Session.get("selected_friend"));
    return friend && friend.name;
};

Template.newNoteModal.rendered = function () {
    //Put input in to the dialog
    $('#newNoteModal').on('shown.bs.modal', function () {
        var input = $('#newNote');
        input.val(Template.newNoteModal.random_prompt);
        var len = input.val().length;
        input[0].focus();
        input[0].setSelectionRange(len, len);
    })
};

Template.newNoteModal.random_prompt = function () {
    var name = Template.newNoteModal.selected_name();
    var promptArray = [
        'One thing I appreciate about ' + name + ' is ',
        'Three words I would use to describe ' + name + ' are ',
        name + ' makes me smile when ',
        'If ' + name + ' were a cereal, they would be ',
        'If ' + name + ' was a fabric, they would be ',
        name + ' is really good at ',
        'I wish I could be more like ' + name + ' in this way '
    ]

    return promptArray[Math.floor(Math.random()*promptArray.length)];
};

Template.newNoteModal.events({
    'submit #newNoteModal form': function (e) {
        e.preventDefault();

        Meteor.call(
            'addFriendNote',
            Session.get("selected_friend"),
            Date.create('now'),
            $('#newNote').val()
            );

      mixpanel.track("Added Note");
      $('#newNoteModal').modal('hide');
    }
});
