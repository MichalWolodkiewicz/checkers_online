function registerUser(callbacks, userName) {
    $.ajax({
        type: 'POST',
        url: '/game/registerNewUser',
        data: JSON.stringify({name: userName}),
        success: callbacks.success,
        error: callbacks.error,
        contentType: "application/json",
        dataType: 'json'
    });
}

var registerCallbacks = {
    success: function(response) {
        var userData = {
            id: response.id,
            name: $('#playerNameForm').find('[name=name]').val()
        };
        GAME_EVENTS.sendEvent('USER_REGISTERED', userData);
    },
    error: function(e) {
        $('#serverErrorAlert').show();
    }
};

jQuery(function() {
    $('#playerNameForm').submit(function(e){
        e.preventDefault();
        if($('#playerNameForm').find('[name=name]').val().length < 1) {
            $('#playerNameForm').find('#registerErrorBox').show();
        } else {
            registerUser(registerCallbacks, $('#playerNameForm').find('[name=name]').val());
        }
        return false;
    });
});