function registerUser(userName) {
    $.ajax({
        type: 'POST',
        url: '/game/registerNewUser',
        data: JSON.stringify({name: userName}),
        success: function (data) {
            console.log('ok');
        },
        error: function (response, reason) {
            console.error('not good ' + reason);
        },
        contentType: "application/json",
        dataType: 'json'
    });
}

jQuery(function() {
    $('#playerNameForm').submit(function(e){
        e.preventDefault();
        if($('#playerNameForm').find('[name=name]').val().length < 1) {
            console.log('validation failed');
            $('#playerNameForm').find('#registerErrorBox').show();
        }
        return false;
    });
});