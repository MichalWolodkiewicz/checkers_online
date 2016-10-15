describe('checkers online ', function () {

    it('should hide register view and show game view after register success', function () {
        spyOn(VIEW_MANAGER, 'downloadAndShowView');
        spyOn(VIEW_MANAGER, 'removeView');
        GAME_EVENTS.sendEvent('USER_REGISTERED', {id: 100, name: 'john'});
        expect(VIEW_MANAGER.downloadAndShowView).toHaveBeenCalled();
        expect(VIEW_MANAGER.downloadAndShowView.calls.mostRecent().args[0]).toEqual('gameView');
        expect(VIEW_MANAGER.removeView).toHaveBeenCalled();
        expect(VIEW_MANAGER.removeView.calls.mostRecent().args[0]).toEqual('registerContainer');
    });

    it('should save user id and name after register success', function () {
        spyOn(VIEW_MANAGER, 'downloadAndShowView');
        spyOn(VIEW_MANAGER, 'removeView');
        spyOn(USER_DATA, 'setId');
        spyOn(USER_DATA, 'setName');
        GAME_EVENTS.sendEvent('USER_REGISTERED', {id: 100, name: 'john'});
        expect(USER_DATA.setId).toHaveBeenCalled();
        expect(USER_DATA.setId.calls.mostRecent().args[0]).toEqual(100);
        expect(USER_DATA.setName).toHaveBeenCalled();
        expect(USER_DATA.setName.calls.mostRecent().args[0]).toEqual('john');
    });

    it('should download and show view in main container', function () {
        setFixtures('<div id="mainContainer"></div>');
        spyOn($, 'get').and.returnValue({success: function(callback){
            callback('html');
        }});
        VIEW_MANAGER.downloadAndShowView('anyViewName');
        expect($.get).toHaveBeenCalled();
        expect($.get.calls.mostRecent().args[0]).toEqual('/anyViewName');
        expect($('#mainContainer').html()).toEqual('html');
    });

    it('should remove view from main container', function () {
        setFixtures('<div id="mainContainer"><div id="childContainer"></div></div>');
        VIEW_MANAGER.removeView('childContainer');
        expect($('#mainContainer').html()).toEqual('');
    });

    it('show spinner while load view if toggle is on', function () {
        spyOn($, 'get').and.returnValue({success: function(callback){
            callback('html');
        }});
        spyOn(VIEW_MANAGER, 'showSpinner');
        spyOn(VIEW_MANAGER, 'hideSpinner');
        VIEW_MANAGER.showSpinnerOnLoad(true);
        VIEW_MANAGER.downloadAndShowView('anyViewName');
        expect(VIEW_MANAGER.showSpinner).toHaveBeenCalled();
        expect(VIEW_MANAGER.hideSpinner).toHaveBeenCalled();
    });

    it('do not show spinner while load view if toggle is off', function () {
        spyOn($, 'get').and.returnValue({success: function(callback){
            callback('html');
        }});
        spyOn(VIEW_MANAGER, 'showSpinner');
        VIEW_MANAGER.showSpinnerOnLoad(false);
        VIEW_MANAGER.downloadAndShowView('anyViewName');
        expect(VIEW_MANAGER.showSpinner).not.toHaveBeenCalled();
    });

});
