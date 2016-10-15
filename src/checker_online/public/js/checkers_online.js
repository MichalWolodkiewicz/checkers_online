const GAME_EVENTS = {
    sendEvent: function (eventName, data) {
        if (eventName === 'USER_REGISTERED') {
            USER_DATA.setId(data.id);
            USER_DATA.setName(data.name);
            VIEW_MANAGER.removeView('registerContainer');
            VIEW_MANAGER.downloadAndShowView('gameView');
        }
    }
};

const VIEW_MANAGER = {
    showSpinnerWhileLoadingView: true,
    downloadAndShowView: function (viewName) {
        if(this.showSpinnerWhileLoadingView) {
            this.showSpinner();
        }
        $.get('/'+viewName).success(function (html) {
            $('#mainContainer').append(html);
            VIEW_MANAGER.hideSpinner();
        });
    },
    removeView: function (viewId) {
        $('#mainContainer').find('#'+viewId).remove();
    },
    showSpinnerOnLoad: function(show) {
        this.showSpinnerWhileLoadingView = show;
    },
    showSpinner: function() {
        $('.spinnerContainer').show();
    },
    hideSpinner: function() {
        $('.spinnerContainer').fadeOut(1500);
    }
};

const USER_DATA = {
    userId: -1,
    userName: '',
    setId: function (id) {
        this.userId = id;
    },
    setName: function (name) {
        this.userName = name;
    }
};