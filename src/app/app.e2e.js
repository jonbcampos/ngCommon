/**
 * Created by jonbcampos on 9/9/14.
 */
describe('app functionality', function () {

    var prot;
    beforeEach(function () {
        prot = protractor.getInstance();
        browser.get(prot.baseUrl); // go to /#
        browser.waitForAngular();
    });

    it('should by default go to section1', function () {
        expect(browser.getCurrentUrl()).toEqual(prot.baseUrl + '#/section1');
    });

});