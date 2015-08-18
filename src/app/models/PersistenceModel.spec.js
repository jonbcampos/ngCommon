/**
 * Created by jonbcampos on 8/20/14.
 */
describe('models.PersistenceModel', function () {

    beforeEach(module('models.PersistenceModel'));
    beforeEach(module('common.filters.paddString'));
    beforeEach(module('common.filters.getTimezoneOffset'));

    afterEach(inject(function (PersistenceModel) {
        PersistenceModel.clear();
    }));

    describe('PersistenceModel', function () {

        it('should be set up properly', inject(function (PersistenceModel) {
            expect(PersistenceModel).toBeDefined();
            expect(PersistenceModel).not.toBeNull();
        }));

        describe('load', function () {

            it('should return true if localStorage exists', inject(function (PersistenceModel) {
                expect(PersistenceModel.load('hello')).toBeTruthy();
                expect(PersistenceModel.properties).not.toBeNull();
                expect(PersistenceModel.properties).toEqual({});
            }));

            //it('should return true if localStorage is undefined', inject(function (PersistenceModel){
            //    localStorage = undefined;
            //    Storage = undefined;
            //    expect(PersistenceModel.load('hello')).toBeFalsy();
            //    expect(PersistenceModel.properties).not.toBeNull();
            //}));

        });

        describe('clear', function () {

            it('should set the properties to an empty object', inject(function (PersistenceModel) {
                expect(PersistenceModel.clear()).toBeTruthy();
                expect(PersistenceModel.properties).toEqual({});
            }));

        });

        describe('save', function () {

            it('should save the current object to localStorage', inject(function (PersistenceModel) {
                expect(PersistenceModel.load('hello')).toBeTruthy();
                expect(PersistenceModel.save()).toBeTruthy();
                expect(PersistenceModel.properties).toEqual({});
                expect(localStorage.getItem('hello')).toBe('{}');
            }));

            it('should save the current object to localStorage', inject(function (PersistenceModel) {
                expect(PersistenceModel.load('hello')).toBeTruthy();
                PersistenceModel.setProperty('one', 'prop', 'test');
                expect(PersistenceModel.save()).toBeTruthy();
                expect(PersistenceModel.properties.one.prop).toBe("test");
                expect(PersistenceModel.properties).toEqual({"one": {"prop": "test"}});
                expect(localStorage.getItem('hello')).toEqual('{"one":{"prop":"test"}}');
            }));

        });

        describe('getPropertyAsObject', function () {

            it('should return correctly', inject(function (PersistenceModel) {
                expect(PersistenceModel.load('hello')).toBeTruthy();
                PersistenceModel.setProperty('one', 'prop', 'test');
                expect(PersistenceModel.getPropertyAsObject('one', 'prop')).toBe('test');
            }));

            it('should return correctly', inject(function (PersistenceModel) {
                PersistenceModel.load('hello');
                PersistenceModel.setProperty('one', 'prop', {});
                expect(PersistenceModel.getPropertyAsObject('one', 'prop')).toEqual({});
                PersistenceModel.save();
                expect(localStorage.getItem('hello')).toEqual('{"one":{"prop":{}}}');
                PersistenceModel.load('hello');
                expect(PersistenceModel.getPropertyAsObject('one', 'prop')).toEqual({});
            }));

            it('should return correctly', inject(function (PersistenceModel) {
                PersistenceModel.load('hello');
                PersistenceModel.setProperty('one', 'prop', {});
                expect(PersistenceModel.getPropertyAsObject('one', 'prop')).toEqual({});
                PersistenceModel.save();
                expect(localStorage.getItem('hello')).toEqual('{"one":{"prop":{}}}');
                PersistenceModel.load('hello');
                expect(PersistenceModel.getPropertyAsObject('one', 'prop')).toEqual({});
            }));

            it('should return correctly', inject(function (PersistenceModel) {
                PersistenceModel.load('hello');
                PersistenceModel.setProperty('one', 'prop', {"a": 1});
                expect(PersistenceModel.getPropertyAsObject('one', 'prop')).toEqual({"a": 1});
                PersistenceModel.save();
                expect(localStorage.getItem('hello')).toEqual('{"one":{"prop":{"a":1}}}');
                PersistenceModel.load('hello');
                expect(PersistenceModel.getPropertyAsObject('one', 'prop')).toEqual({"a": 1});
            }));

            it('should return correctly', inject(function (PersistenceModel) {
                PersistenceModel.load('hello');
                PersistenceModel.setProperty('one', 'prop', []);
                expect(PersistenceModel.getPropertyAsObject('one', 'prop')).toEqual([]);
                PersistenceModel.save();
                expect(localStorage.getItem('hello')).toEqual('{"one":{"prop":[]}}');
                PersistenceModel.load('hello');
                expect(PersistenceModel.getPropertyAsObject('one', 'prop')).toEqual([]);
            }));

            it('should return correctly', inject(function (PersistenceModel) {
                PersistenceModel.load('hello');
                PersistenceModel.setProperty('one', 'prop', [1, 2, 3]);
                expect(PersistenceModel.getPropertyAsObject('one', 'prop')).toEqual([1, 2, 3]);
                PersistenceModel.save();
                expect(localStorage.getItem('hello')).toEqual('{"one":{"prop":[1,2,3]}}');
                PersistenceModel.load('hello');
                expect(PersistenceModel.getPropertyAsObject('one', 'prop')).toEqual([1, 2, 3]);
            }));

            xit('should return correctly', inject(function (PersistenceModel, paddStringFilter) {
                PersistenceModel.load('hello');
                var d = new Date(2015, 0, 10, 1, 0, 0);
                PersistenceModel.setProperty('one', 'prop', {"a": d});
                expect(PersistenceModel.getPropertyAsObject('one', 'prop')).toEqual({"a": d});
                PersistenceModel.save();
                var utcYear = d.getUTCFullYear(),
                    utcMonth = paddStringFilter(d.getUTCMonth()+1, 0, 2, true),
                    utcDay = paddStringFilter(d.getUTCDate(), 0, 2, true),
                    utcHour = paddStringFilter(d.getUTCHours(), 0, 2, true),
                    utcMinutes = paddStringFilter(d.getUTCMinutes(), 0, 2, true),
                    utcSeconds = paddStringFilter(d.getUTCSeconds(), 0, 2, true),
                    utcMilliseconds = paddStringFilter(d.getUTCMilliseconds(), 0, 3, true);
                expect(localStorage.getItem('hello')).toEqual('{"one":{"prop":{"a":"' + utcYear + '-' + utcMonth + '-' + utcDay + 'T' + utcHour + ':' + utcMinutes + ':' + utcSeconds + '.' + utcMilliseconds + 'Z"}}}');
                PersistenceModel.load('hello');
                expect(PersistenceModel.getPropertyAsObject('one', 'prop', ['a'])).toEqual({"a": d});
            }));

            xit('should return correctly', inject(function (PersistenceModel, paddStringFilter, getTimezoneOffsetFilter) {
                PersistenceModel.load('hello');
                var d = new Date(2015, 0, 10), d2 = new Date(2015, 0, 11),
                    offset = d.getTimezoneOffset(),
                    finalHours = 0 + (offset / 60);
                // I really don't know why the different dates
                // produce different timezone offsets
                var jsOffset = 0;
                if (d.getTimezoneOffset() !== getTimezoneOffsetFilter.getTimezone()) {
                    jsOffset = (d.getTimezoneOffset() - getTimezoneOffsetFilter.getTimezone()) / 60;
                }
                var d3 = new Date(2015, 0, 10, 0 + jsOffset, 0, 0);
                var d4 = new Date(2015, 0, 11, 0 + jsOffset, 0, 0);
                finalHours += jsOffset;
                // back to our regularly scheduled test
                PersistenceModel.setProperty('one', 'prop', [
                    {"a": d},
                    {"a": d2}
                ]);
                expect(PersistenceModel.getPropertyAsObject('one', 'prop')).toEqual([
                    {"a": d3},
                    {"a": d4}
                ]);
                PersistenceModel.save();
                expect(localStorage.getItem('hello')).toEqual('{"one":{"prop":[{"a":"2015-01-10T' + paddStringFilter(finalHours, 0, 2, true) + ':00:00.000Z"},{"a":"2015-01-11T' + paddStringFilter(finalHours, 0, 2, true) + ':00:00.000Z"}]}}');
                PersistenceModel.load('hello');
                expect(PersistenceModel.getPropertyAsObject('one', 'prop', ['a'])).toEqual([
                    {"a": d3},
                    {"a": d4}
                ]);
            }));

            xit('should return correctly', inject(function (PersistenceModel, paddStringFilter) {
                PersistenceModel.load('hello');
                var d = new Date(2015, 0, 10), d2 = new Date(2015, 0, 11),
                    offset = d.getTimezoneOffset(),
                    finalHours = 0 + (offset / 60);
                PersistenceModel.setProperty('one', 'prop', [
                    {"a": d},
                    {"b": d2}
                ]);
                expect(PersistenceModel.getPropertyAsObject('one', 'prop')).toEqual([
                    {"a": d},
                    {"b": d2}
                ]);
                PersistenceModel.save();
                expect(localStorage.getItem('hello')).toEqual('{"one":{"prop":[{"a":"2015-01-10T' + paddStringFilter(finalHours, 0, 2, true) + ':00:00.000Z"},{"b":"2015-01-11T' + paddStringFilter(finalHours, 0, 2, true) + ':00:00.000Z"}]}}');
                PersistenceModel.load('hello');
                expect(PersistenceModel.getPropertyAsObject('one', 'prop', ['a', 'b'])).toEqual([
                    {"a": d},
                    {"b": d2}
                ]);
            }));
        });

        describe('getPropertyAsNumber', function () {

            it('should return correctly', inject(function (PersistenceModel) {
                PersistenceModel.load('hello');
                PersistenceModel.setProperty('one', 'prop', 1);
                expect(PersistenceModel.getPropertyAsNumber('one', 'prop')).toEqual(1);
                PersistenceModel.save();
                expect(localStorage.getItem('hello')).toEqual('{"one":{"prop":1}}');
                PersistenceModel.load('hello');
                expect(PersistenceModel.getPropertyAsNumber('one', 'prop')).toEqual(1);
            }));

            it('should return correctly', inject(function (PersistenceModel) {
                PersistenceModel.load('hello');
                PersistenceModel.setProperty('one', 'prop', -1);
                expect(PersistenceModel.getPropertyAsNumber('one', 'prop')).toEqual(-1);
                PersistenceModel.save();
                expect(localStorage.getItem('hello')).toEqual('{"one":{"prop":-1}}');
                PersistenceModel.load('hello');
                expect(PersistenceModel.getPropertyAsNumber('one', 'prop')).toEqual(-1);
            }));

            it('should return correctly', inject(function (PersistenceModel) {
                PersistenceModel.load('hello');
                PersistenceModel.setProperty('one', 'prop', 'hi');
                expect(PersistenceModel.getPropertyAsNumber('one', 'prop')).toBeNaN();
                PersistenceModel.save();
                expect(localStorage.getItem('hello')).toEqual('{"one":{"prop":"hi"}}');
                PersistenceModel.load('hello');
                expect(PersistenceModel.getPropertyAsNumber('one', 'prop')).toBeNaN();
            }));

        });

        describe('getPropertyAsString', function () {

            it('should return correctly', inject(function (PersistenceModel) {
                PersistenceModel.load('hello');
                PersistenceModel.setProperty('one', 'prop', 'hi');
                expect(PersistenceModel.getPropertyAsString('one', 'prop')).toEqual('hi');
                PersistenceModel.save();
                expect(localStorage.getItem('hello')).toEqual('{"one":{"prop":"hi"}}');
                PersistenceModel.load('hello');
                expect(PersistenceModel.getPropertyAsString('one', 'prop')).toEqual('hi');
            }));

            it('should return correctly', inject(function (PersistenceModel) {
                PersistenceModel.load('hello');
                PersistenceModel.setProperty('one', 'prop', -1);
                expect(PersistenceModel.getPropertyAsString('one', 'prop')).toBe("-1");
                PersistenceModel.save();
                expect(localStorage.getItem('hello')).toEqual('{"one":{"prop":-1}}');
                PersistenceModel.load('hello');
                expect(PersistenceModel.getPropertyAsString('one', 'prop')).toBe("-1");
            }));

            it('should return correctly', inject(function (PersistenceModel) {
                PersistenceModel.load('hello');
                PersistenceModel.setProperty('one', 'prop', null);
                expect(PersistenceModel.getPropertyAsString('one', 'prop')).toBeNull();
                PersistenceModel.save();
                expect(localStorage.getItem('hello')).toEqual('{"one":{"prop":null}}');
                PersistenceModel.load('hello');
                expect(PersistenceModel.getPropertyAsString('one', 'prop')).toBeNull();
            }));

        });

        describe('getPropertyAsInt', function () {

            it('should return correctly', inject(function (PersistenceModel) {
                PersistenceModel.load('hello');
                PersistenceModel.setProperty('one', 'prop', 1);
                expect(PersistenceModel.getPropertyAsInt('one', 'prop')).toEqual(1);
                PersistenceModel.save();
                expect(localStorage.getItem('hello')).toEqual('{"one":{"prop":1}}');
                PersistenceModel.load('hello');
                expect(PersistenceModel.getPropertyAsInt('one', 'prop')).toEqual(1);
            }));

            it('should return correctly', inject(function (PersistenceModel) {
                PersistenceModel.load('hello');
                PersistenceModel.setProperty('one', 'prop', -1);
                expect(PersistenceModel.getPropertyAsInt('one', 'prop')).toEqual(-1);
                PersistenceModel.save();
                expect(localStorage.getItem('hello')).toEqual('{"one":{"prop":-1}}');
                PersistenceModel.load('hello');
                expect(PersistenceModel.getPropertyAsInt('one', 'prop')).toEqual(-1);
            }));

            it('should return correctly', inject(function (PersistenceModel) {
                PersistenceModel.load('hello');
                PersistenceModel.setProperty('one', 'prop', 'hi');
                expect(PersistenceModel.getPropertyAsInt('one', 'prop')).toBeNaN();
                PersistenceModel.save();
                expect(localStorage.getItem('hello')).toEqual('{"one":{"prop":"hi"}}');
                PersistenceModel.load('hello');
                expect(PersistenceModel.getPropertyAsInt('one', 'prop')).toBeNaN();
            }));

            it('should return correctly', inject(function (PersistenceModel) {
                PersistenceModel.load('hello');
                PersistenceModel.setProperty('one', 'prop', 1.1);
                expect(PersistenceModel.getPropertyAsInt('one', 'prop')).toBe(1);
                PersistenceModel.save();
                expect(localStorage.getItem('hello')).toEqual('{"one":{"prop":1.1}}');
                PersistenceModel.load('hello');
                expect(PersistenceModel.getPropertyAsInt('one', 'prop')).toBe(1);
            }));

        });

        describe('getPropertyAsBoolean', function () {

            it('should return correctly', inject(function (PersistenceModel) {
                PersistenceModel.load('hello');
                PersistenceModel.setProperty('one', 'prop', 'hi');
                expect(PersistenceModel.getPropertyAsBoolean('one', 'prop')).toBeTruthy();
                PersistenceModel.save();
                expect(localStorage.getItem('hello')).toEqual('{"one":{"prop":"hi"}}');
                PersistenceModel.load('hello');
                expect(PersistenceModel.getPropertyAsBoolean('one', 'prop')).toBeTruthy();
            }));

            it('should return correctly', inject(function (PersistenceModel) {
                PersistenceModel.load('hello');
                PersistenceModel.setProperty('one', 'prop', true);
                expect(PersistenceModel.getPropertyAsBoolean('one', 'prop')).toBeTruthy();
                PersistenceModel.save();
                expect(localStorage.getItem('hello')).toEqual('{"one":{"prop":true}}');
                PersistenceModel.load('hello');
                expect(PersistenceModel.getPropertyAsBoolean('one', 'prop')).toBeTruthy();
            }));

            it('should return correctly', inject(function (PersistenceModel) {
                PersistenceModel.load('hello');
                PersistenceModel.setProperty('one', 'prop', false);
                expect(PersistenceModel.getPropertyAsBoolean('one', 'prop')).toBeFalsy();
                PersistenceModel.save();
                expect(localStorage.getItem('hello')).toEqual('{"one":{"prop":false}}');
                PersistenceModel.load('hello');
                expect(PersistenceModel.getPropertyAsBoolean('one', 'prop')).toBeFalsy();
            }));

            it('should return correctly', inject(function (PersistenceModel) {
                PersistenceModel.load('hello');
                PersistenceModel.setProperty('one', 'prop', 'false');
                expect(PersistenceModel.getPropertyAsBoolean('one', 'prop')).toBeFalsy();
                PersistenceModel.save();
                expect(localStorage.getItem('hello')).toEqual('{"one":{"prop":"false"}}');
                PersistenceModel.load('hello');
                expect(PersistenceModel.getPropertyAsBoolean('one', 'prop')).toBeFalsy();
            }));

        });

        describe('getPropertyAsDate', function () {

            xit('should return correctly', inject(function (PersistenceModel, paddStringFilter) {
                PersistenceModel.load('hello');
                var d = new Date(2014, 9, 18, 2, 3, 4);
                PersistenceModel.setProperty('one', 'prop', d);
                expect(PersistenceModel.getPropertyAsDate('one', 'prop')).toEqual(d);
                PersistenceModel.save();
                var utcYear = d.getUTCFullYear(),
                    utcMonth = paddStringFilter(d.getUTCMonth()+1, 0, 2, true),
                    utcDay = paddStringFilter(d.getUTCDate(), 0, 2, true),
                    utcHour = paddStringFilter(d.getUTCHours(), 0, 2, true),
                    utcMinutes = paddStringFilter(d.getUTCMinutes(), 0, 2, true),
                    utcSeconds = paddStringFilter(d.getUTCSeconds(), 0, 2, true),
                    utcMilliseconds = paddStringFilter(d.getUTCMilliseconds(), 0, 3, true);
                expect(localStorage.getItem('hello')).toEqual('{"one":{"prop":"' + utcYear + '-' + utcMonth + '-' + utcDay + 'T' + utcHour + ':' + utcMinutes + ':' + utcSeconds + '.' + utcMilliseconds + 'Z"}}');
                PersistenceModel.load('hello');
                expect(PersistenceModel.getPropertyAsDate('one', 'prop')).toEqual(d);
            }));

            xit('should return correctly', inject(function (PersistenceModel, paddStringFilter) {
                PersistenceModel.load('hello');
                var d = new Date(2014, 0, 18, 2, 3, 4);
                PersistenceModel.setProperty('one', 'prop', d);
                expect(PersistenceModel.getPropertyAsDate('one', 'prop')).toEqual(d);
                PersistenceModel.save();
                var utcYear = d.getUTCFullYear(),
                    utcMonth = paddStringFilter(d.getUTCMonth()+1, 0, 2, true),
                    utcDay = paddStringFilter(d.getUTCDate(), 0, 2, true),
                    utcHour = paddStringFilter(d.getUTCHours(), 0, 2, true),
                    utcMinutes = paddStringFilter(d.getUTCMinutes(), 0, 2, true),
                    utcSeconds = paddStringFilter(d.getUTCSeconds(), 0, 2, true),
                    utcMilliseconds = paddStringFilter(d.getUTCMilliseconds(), 0, 3, true);
                expect(localStorage.getItem('hello')).toEqual('{"one":{"prop":"' + utcYear + '-' + utcMonth + '-' + utcDay + 'T' + utcHour + ':' + utcMinutes + ':' + utcSeconds + '.' + utcMilliseconds + 'Z"}}');
                PersistenceModel.load('hello');
                expect(PersistenceModel.getPropertyAsDate('one', 'prop')).toEqual(d);
            }));

            it('should return correctly', inject(function (PersistenceModel) {
                PersistenceModel.load('hello');
                PersistenceModel.setProperty('one', 'prop', null);
                expect(PersistenceModel.getPropertyAsDate('one', 'prop')).toBeNull();
                PersistenceModel.save();
                expect(localStorage.getItem('hello')).toEqual('{"one":{"prop":null}}');
                PersistenceModel.load('hello');
                expect(PersistenceModel.getPropertyAsDate('one', 'prop')).toBeNull();
            }));

        });

        describe('setProperty', function () {
            //tested through earlier tests
        });

        describe('nullCheck', function () {

            it('should default properties if missing', inject(function (PersistenceModel) {
                PersistenceModel.properties = undefined;
                PersistenceModel.nullCheck("TestModel", "testProperty", null);
                expect(PersistenceModel.properties).toBeDefined();
            }));

            it('should default properties if missing', inject(function (PersistenceModel) {
                PersistenceModel.properties = null;
                PersistenceModel.nullCheck("TestModel", "testProperty", null);
                expect(PersistenceModel.properties).toBeDefined();
            }));

        });

        describe('transformFieldsIntoDatesForObject', function () {

            it('should return null if missing value', inject(function (PersistenceModel) {
                expect(PersistenceModel.transformFieldsIntoDatesForObject()).toBeNull();
            }));

            it('should return null if missing value', inject(function (PersistenceModel) {
                expect(PersistenceModel.transformFieldsIntoDatesForObject(null)).toBeNull();
            }));

            it('should return null if missing value', inject(function (PersistenceModel) {
                expect(PersistenceModel.transformFieldsIntoDatesForObject({})).toEqual({});
            }));

            it('should return null if missing value', inject(function (PersistenceModel) {
                expect(PersistenceModel.transformFieldsIntoDatesForObject({}, null)).toEqual({});
            }));

            it('should return null if missing value', inject(function (PersistenceModel) {
                expect(PersistenceModel.transformFieldsIntoDatesForObject({}, [])).toEqual({});
            }));

        });
    });
});