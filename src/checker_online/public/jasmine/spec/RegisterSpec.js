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

    it('should register user when name is not empty', function () {
        
    });

});
