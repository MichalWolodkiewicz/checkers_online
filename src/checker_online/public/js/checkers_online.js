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

registerUser('john');