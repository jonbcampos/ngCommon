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

            it('should hold an old profile if one exists', inject(function (StartupCommand, PersistenceModel) {
                PersistenceModel.properties = {"SessionModel": {"profile": {"userId": "abc"}, "lastUpdated": 2}};
                StartupCommand.execute();
                expect(StartupCommand.oldProfileId).toBe("abc");
            }));

            describe('SessionModel.loadProfile', function () {

                describe('general', function () {

                    describe('success', function () {

                        describe('same userId', function () {

                            beforeEach(inject(function (_$q_, SessionModel, PersistenceModel) {
                                PersistenceModel.properties = {
                                    "SessionModel": {
                                        "profile": {"userId": "abc"},
                                        "lastUpdated": 2
                                    }
                                };
                                var profileResult = {"result": {"userId": "abc"}};
                                var loadDeferred = _$q_.defer();
                                loadDeferred.resolve(profileResult);
                                spyOn(SessionModel, 'loadProfile').andReturn(loadDeferred.promise);
                            }));

                            it('should move to provided state', inject(function (StartupCommand, $location, $rootScope) {
                                $location.path('/bye');
                                $location.search({"b": 2});
                                StartupCommand.execute();
                                $rootScope.$apply();
                                expect($location.path()).toBe('/bye');
                                expect($location.search()).toEqual({"b": 2});
                            }));

                            it('should move to default if initializing', inject(function (StartupCommand, $location, $rootScope) {
                                $location.path('/initializing');
                                StartupCommand.execute();
                                $rootScope.$apply();
                                expect($location.path()).toBe('/');
                            }));

                        });

                        describe('different userId', function () {

                            beforeEach(inject(function (_$q_, SessionModel, PersistenceModel) {
                                PersistenceModel.properties = {
                                    "SessionModel": {
                                        "profile": {"userId": "abc"},
                                        "lastUpdated": 2
                                    }
                                };
                                var profileResult = {"result": {"userId": "def"}};
                                var loadDeferred = _$q_.defer();
                                loadDeferred.resolve(profileResult);
                                spyOn(SessionModel, 'loadProfile').andReturn(loadDeferred.promise);
                            }));

                            it('should move to provided state', inject(function (StartupCommand, $location, $rootScope) {
                                $location.path('/bye');
                                $location.search({"b": 2});
                                StartupCommand.execute();
                                $rootScope.$apply();
                                expect($location.path()).toBe('/bye');
                                expect($location.search()).toEqual({"b": 2});
                            }));

                            it('should move to default if initializing', inject(function (StartupCommand, $location, $rootScope) {
                                $location.path('/initializing');
                                StartupCommand.execute();
                                $rootScope.$apply();
                                expect($location.path()).toBe('/');
                            }));

                        });

                    });

                    describe('failure', function () {

                        describe('no profile no result', function () {

                            beforeEach(inject(function (_$q_, SessionModel) {
                                var profileResult = {"data": null, "status": 500};
                                var loadDeferred = _$q_.defer();
                                loadDeferred.resolve(profileResult);
                                spyOn(SessionModel, 'loadProfile').andReturn(loadDeferred.promise);
                            }));

                            it('should redirect due to no profile', inject(function (StartupCommand, $rootScope, $location, SessionModel) {
                                StartupCommand.execute();
                                $rootScope.$apply();
                                expect($location.path()).toBe('/noprofile');
                                expect(SessionModel.profile.userMsg).toBe('Profile Failed To Load');
                            }));

                        });

                        describe('no profile with message', function () {

                            beforeEach(inject(function (_$q_, SessionModel) {
                                var profileResult = {"data": "bad job", "status": 500};
                                var loadDeferred = _$q_.defer();
                                loadDeferred.resolve(profileResult);
                                spyOn(SessionModel, 'loadProfile').andReturn(loadDeferred.promise);
                            }));

                            it('should redirect due to no profile', inject(function (StartupCommand, $rootScope, $location, SessionModel) {
                                StartupCommand.execute();
                                $rootScope.$apply();
                                expect($location.path()).toBe('/noprofile');
                                expect(SessionModel.profile.userMsg).toBe('bad job');
                            }));

                        });

                        describe('511', function () {

                            beforeEach(inject(function (_$q_, SessionModel, WindowService) {
                                var profileResult = {"data": "some error", "status": 511};
                                var loadDeferred = _$q_.defer();
                                loadDeferred.resolve(profileResult);
                                spyOn(SessionModel, 'loadProfile').andReturn(loadDeferred.promise);
                                spyOn(WindowService, 'goToRelativeUrl');
                            }));

                            it('should redirect due to no profile', inject(function (StartupCommand, $rootScope, WindowService) {
                                StartupCommand.execute();
                                $rootScope.$apply();
                                expect(WindowService.goToRelativeUrl).toHaveBeenCalledWith('/wps/myportal/ph/tph/appslug/');
                            }));

                        });

                        describe('503', function () {

                            beforeEach(inject(function (_$q_, SessionModel, WindowService) {
                                var profileResult = {"data": "some error", "status": 503};
                                var loadDeferred = _$q_.defer();
                                loadDeferred.resolve(profileResult);
                                spyOn(SessionModel, 'loadProfile').andReturn(loadDeferred.promise);
                                spyOn(WindowService, 'goToRelativeUrl');
                            }));

                            it('should redirect due to no profile', inject(function (StartupCommand, $rootScope, WindowService) {
                                StartupCommand.execute();
                                $rootScope.$apply();
                                expect(WindowService.goToRelativeUrl).toHaveBeenCalledWith('/wps/myportal/ph/tph/appslug/');
                            }));

                        });

                    });

                });

                // TODO add loads based on various profile types

            });

        });

    });

});