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

});
