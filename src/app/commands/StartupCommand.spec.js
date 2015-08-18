/**
 * Created by jonbcampos on 2/25/14.
 */
describe('commands.StartupCommand', function () {

    beforeEach(module('commands.StartupCommand'));

    afterEach(inject(function (PersistenceModel) {
        PersistenceModel.clear();
    }));

    describe('StartupCommand', function () {

        it('should be set up properly', inject(function (StartupCommand) {
            expect(StartupCommand).toBeDefined();
            expect(StartupCommand).not.toBeNull();
        }));

        describe('getUrlState', function () {

            it('should get the url state and move to initializing', inject(function (StartupCommand, $location) {
                $location.path('/hello');
                $location.search({"a": 1});
                StartupCommand.execute();
                expect($location.path()).toBe('/initializing');
                expect(StartupCommand.originalPath).toBe('/hello');
                expect(StartupCommand.search).toEqual({"a": 1});
            }));

            it('should get the url state and move to initializing', inject(function (StartupCommand, $location) {
                $location.path('/bye');
                $location.search({"b": 2});
                StartupCommand.execute();
                expect($location.path()).toBe('/initializing');
                expect(StartupCommand.originalPath).toBe('/bye');
                expect(StartupCommand.search).toEqual({"b": 2});
            }));

        });

        describe('execute', function () {

            // we don't really want to load the PersistenceModel
            // just use whatever is in the properties we set
            beforeEach(inject(function (PersistenceModel) {
                spyOn(PersistenceModel, 'load').andCallFake(function () {
                });
            }));

        });

    });

});