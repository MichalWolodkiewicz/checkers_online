describe('register view ', function () {
    
    beforeEach(function() {
        jasmine.getFixtures().fixturesPath = 'fixtures/';
        loadFixtures('RegisterView.html');
    });
    
    it('should show name dialog with empty field at the beginning', function () {
        expect($('#playerNameForm').is(':visible')).toBeTruthy();
        expect($('#playerNameForm').find('[name=name]')).toHaveValue('');
    });

    it('should not allow to send empty name', function () {
        expect($('#playerNameForm').find('#registerErrorBox').is(':visible')).toBe(false);
        $('#playerNameForm').find('[name=name]').val('');
        $('#playerNameForm').submit();
        expect($('#playerNameForm').find('#registerErrorBox').is(':visible')).toBe(true);
    });

    it('verify arguments passed to register request', function () {
        spyOn($, 'ajax');
        $('#playerNameForm').find('[name=name]').val('john');
        $('#playerNameForm').submit();
        expect($.ajax).toHaveBeenCalled();
        var arguments = $.ajax.calls.mostRecent().args[0];
        expect(arguments.url).toEqual('/game/registerNewUser');
        expect(arguments.type).toEqual('POST');
        expect(arguments.data).toEqual(JSON.stringify({name:'john'}));
        expect(arguments.contentType).toEqual('application/json');
        expect(arguments.dataType).toEqual('json');
    });

    it('should call success callback on register success', function () {
        var registerCallbacks = {
            success: function() {},
            error: function() {}
        };
        spyOn($, 'ajax').and.callFake(function(e) {e.success();});
        spyOn(registerCallbacks, 'success');
        spyOn(registerCallbacks, 'error');
        registerUser(registerCallbacks, 'john');
        expect(registerCallbacks.success).toHaveBeenCalled();
        expect(registerCallbacks.error).not.toHaveBeenCalled();
    });

    it('should call error callback on register error', function () {
        var registerCallbacks = {
            success: function() {},
            error: function() {}
        };
        spyOn($, 'ajax').and.callFake(function(e) {e.error();});
        spyOn(registerCallbacks, 'success');
        spyOn(registerCallbacks, 'error');
        registerUser(registerCallbacks, 'john');
        expect(registerCallbacks.error).toHaveBeenCalled();
        expect(registerCallbacks.success).not.toHaveBeenCalled();
    });

    it('should parse user data and send event on register success', function () {
        $('#playerNameForm').find('[name=name]').val('john');
        spyOn(GAME_EVENTS, 'sendEvent');
        spyOn($, 'ajax').and.callFake(function(e) {e.success({id:100});});
        registerUser(registerCallbacks, 'john');
        expect(GAME_EVENTS.sendEvent.calls.mostRecent().args[1].id).toEqual(100);
        expect(GAME_EVENTS.sendEvent.calls.mostRecent().args[1].name).toEqual('john');
        expect(GAME_EVENTS.sendEvent.calls.mostRecent().args[0]).toEqual('USER_REGISTERED');
    });

});
