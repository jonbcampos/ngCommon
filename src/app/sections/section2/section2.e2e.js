/**
 * Created by jonbcampos on 9/10/14.
 */
describe('section 2 functionality', function () {

    var prot, textValue;
    beforeEach(function () {
        //setup
        prot = protractor.getInstance();
        browser.get(prot.baseUrl + '#/section2');
        browser.waitForAngular();
        //get elements
        textValue = element(by.binding('textValue'));
    });

    it('should show the textValue', function () {
        expect(textValue.isPresent()).toBeTruthy();
        expect(textValue.getText()).toBe('hi');
    });

});