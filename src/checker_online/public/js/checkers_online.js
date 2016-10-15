var GAME_EVENTS = {
    sendEvent: function (eventName, data) {
        if (eventName === 'USER_REGISTERED') {
            USER_DATA.setId(data.id);
            USER_DATA.setName(data.name);
            VIEW_MANAGER.removeView('registerContainer');
            VIEW_MANAGER.downloadAndShowView('gameView');
        }
    }
};

var VIEW_MANAGER = {
    downloadAndShowView: function (viewName) {
        $.get('/gameView').success(function (html) {
            $('#mainContainer').append(html);
        });
    },
    removeView: function (viewId) {
        $('#mainContainer').find('#'+viewId).remove();
    }
};

var USER_DATA = {
    userId: -1,
    userName: '',
    setId: function (id) {
        this.userId = id;
    },
    setName: function (name) {
        this.userName = name;
    }
};


