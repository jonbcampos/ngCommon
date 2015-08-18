/* istanbul ignore next */
describe('app', function () {

    beforeEach(module('app'));

    beforeEach(function () {
        // take StartupCommand out of the picture
        var mockService = jasmine.createSpyObj('mockService', ['execute']);
        mockService.execute.andCallFake(function (resolve, reject) {
            return new Promise(function (resolve, reject) {

            });
        });
        module(function ($provide) {
            $provide.value('StartupCommand', mockService);
        });
    });

    describe('appCtrl', function () {

        var $scope, ctrl, $rs, $templateCache, $location, WindowService, SessionModel;

        beforeEach(inject(function ($rootScope, _$templateCache_, $controller, _$location_, _WindowService_, _SessionModel_) {
            $scope = $rootScope.$new();
            $rs = $rootScope;
            $templateCache = _$templateCache_;
            $location = _$location_;
            WindowService = _WindowService_;
            SessionModel = _SessionModel_;
            // spies!
            spyOn($rs, '$emit');
            spyOn(WindowService, 'setScrollPosition');
            // controller
            ctrl = $controller('appCtrl', {
                $scope: $scope,
                $location: $location,
                $templateCache: $templateCache,
                WindowService: WindowService,
                SessionModel: SessionModel
            });
        }));

        it('should register properly', inject(function () {
            expect(ctrl).not.toBeNull();
            expect($scope.isReady).toBeFalsy();
            expect($scope.$$listenerCount.$stateChangeStart).toEqual(1);
            expect($scope.$$listenerCount.$stateChangeSuccess).toEqual(1);
            expect($rs.$$listenerCount.applicationReadyChange).toEqual(1);
        }));

        describe('toggleNav', function () {

            it('should set true if false', function () {
                $scope.isNavOpen = false;
                $scope.toggleNav();
                expect($scope.isNavOpen).toBeTruthy();
            });

            it('should set false if true', function () {
                $scope.isNavOpen = true;
                $scope.toggleNav();
                expect($scope.isNavOpen).toBeFalsy();
            });

        });

        describe('openNav', function () {

            it('should set true if false', function () {
                $scope.isNavOpen = false;
                $scope.openNav();
                expect($scope.isNavOpen).toBeTruthy();
            });

            it('should set true if true', function () {
                $scope.isNavOpen = true;
                $scope.openNav();
                expect($scope.isNavOpen).toBeTruthy();
            });

        });

        describe('closeNav', function () {

            it('should set false if false', function () {
                $scope.isNavOpen = false;
                $scope.closeNav();
                expect($scope.isNavOpen).toBeFalsy();
            });

            it('should set false if true', function () {
                $scope.isNavOpen = true;
                $scope.closeNav();
                expect($scope.isNavOpen).toBeFalsy();
            });

        });

        describe('onStateChangeStart', function () {

            it('should always allow us to go to a fault page', function () {
                var toState = {"data": {"pageTitle": "hi"}, "url": "/noprofile", "name": "noprofile"};
                var toParams = {};
                var fromState = {"data": {"pageTitle": "bye"}, "url": "/"};
                var fromParams = {};
                // run
                $scope.onStateChangeStartHandler({
                    "name": '$stateChangeStart', "preventDefault": function () {
                    }
                }, toState, toParams, fromState, fromParams);
                // assert
                // "" means that we didn't move and let the default happen, good
                expect($location.path()).toBe("");
            });

            it('should always allow us to go to a fault page', function () {
                var toState = {"data": {"pageTitle": "hi"}, "url": "/notfound", "name": "notfound"};
                var toParams = {};
                var fromState = {"data": {"pageTitle": "bye"}, "url": "/"};
                var fromParams = {};
                // run
                $scope.onStateChangeStartHandler({
                    "name": '$stateChangeStart', "preventDefault": function () {
                    }
                }, toState, toParams, fromState, fromParams);
                // assert
                // "" means that we didn't move and let the default happen, good
                expect($location.path()).toBe("");
            });

            it('should go to no profile if profile is missing', function () {
                // setup profile
                SessionModel.profile = undefined;
                // setup state
                var toState = {"data": {"pageTitle": "hi"}, "url": "/calendar", "name": "calendar"};
                var toParams = {};
                var fromState = {"data": {"pageTitle": "bye"}, "url": "/"};
                var fromParams = {};
                // run
                $scope.onStateChangeStartHandler({
                    "name": '$stateChangeStart', "preventDefault": function () {
                    }
                }, toState, toParams, fromState, fromParams);
                // assert
                expect($location.path()).toBe("/noprofile");
                expect($rs.$emit).toHaveBeenCalledWith('systemAlert', {
                    title: 'Security Error',
                    message: "You don't have an active profile.",
                    type: 'danger', timeout: 5000,
                    showDetails: false
                });
            });

            it('should go to no profile if profile is missing', function () {
                // setup profile
                SessionModel.profile = null;
                // setup state
                var toState = {"data": {"pageTitle": "hi"}, "url": "/calendar", "name": "calendar"};
                var toParams = {};
                var fromState = {"data": {"pageTitle": "bye"}, "url": "/"};
                var fromParams = {};
                // run
                $scope.onStateChangeStartHandler({
                    "name": '$stateChangeStart', "preventDefault": function () {
                    }
                }, toState, toParams, fromState, fromParams);
                // assert
                expect($location.path()).toBe("/noprofile");
                expect($rs.$emit).toHaveBeenCalledWith('systemAlert', {
                    title: 'Security Error',
                    message: "You don't have an active profile.",
                    type: 'danger', timeout: 5000,
                    showDetails: false
                });
            });

            it('should go to no profile if profile is missing', function () {
                // setup profile
                SessionModel.profile = {"userMsg": "Profile Failed To Load"};
                // setup state
                var toState = {"data": {"pageTitle": "hi"}, "url": "/calendar", "name": "calendar"};
                var toParams = {};
                var fromState = {"data": {"pageTitle": "bye"}, "url": "/"};
                var fromParams = {};
                // run
                $scope.onStateChangeStartHandler({
                    "name": '$stateChangeStart', "preventDefault": function () {
                    }
                }, toState, toParams, fromState, fromParams);
                // assert
                expect($location.path()).toBe("/noprofile");
                expect($rs.$emit).toHaveBeenCalledWith('systemAlert', {
                    title: 'Security Error',
                    message: "You don't have an active profile.",
                    type: 'danger', timeout: 5000,
                    showDetails: false
                });
            });

            it('should not let a non admin go to an admin location', function () {
                // setup profile
                SessionModel.profile = {"admin": false};
                // setup state
                var toState = {"data": {"pageTitle": "hi"}, "url": "/admin/calendar", "name": "admin.calendar"};
                var toParams = {};
                var fromState = {"data": {"pageTitle": "bye"}, "url": "/"};
                var fromParams = {};
                // run
                $scope.onStateChangeStartHandler({
                    "name": '$stateChangeStart', "preventDefault": function () {
                    }
                }, toState, toParams, fromState, fromParams);
                // assert
                expect($location.path()).toBe("/notfound");
                expect($rs.$emit).toHaveBeenCalledWith('systemAlert', {
                    title: 'Security Error',
                    message: "You don't have the permissions to view the requested resource.",
                    type: 'danger', timeout: 5000,
                    showDetails: false
                });
            });

            it('should not let a non admin go to an admin location', function () {
                // setup profile
                SessionModel.profile = {};
                // setup state
                var toState = {"data": {"pageTitle": "hi"}, "url": "/admin/calendar", "name": "admin.calendar"};
                var toParams = {};
                var fromState = {"data": {"pageTitle": "bye"}, "url": "/"};
                var fromParams = {};
                // run
                $scope.onStateChangeStartHandler({
                    "name": '$stateChangeStart', "preventDefault": function () {
                    }
                }, toState, toParams, fromState, fromParams);
                // assert
                expect($location.path()).toBe("/notfound");
                expect($rs.$emit).toHaveBeenCalledWith('systemAlert', {
                    title: 'Security Error',
                    message: "You don't have the permissions to view the requested resource.",
                    type: 'danger', timeout: 5000,
                    showDetails: false
                });
            });

            it('should let a admin go to an admin location', function () {
                // setup profile
                SessionModel.profile = {"admin": true};
                // setup state
                var toState = {"data": {"pageTitle": "hi"}, "url": "/admin/calendar", "name": "admin.calendar"};
                var toParams = {};
                var fromState = {"data": {"pageTitle": "bye"}, "url": "/"};
                var fromParams = {};
                // run
                $scope.onStateChangeStartHandler({
                    "name": '$stateChangeStart', "preventDefault": function () {
                    }
                }, toState, toParams, fromState, fromParams);
                // assert
                // "" means that we didn't move and let the default happen, good
                expect($location.path()).toBe("");
            });

            it('should let a admin go to an non admin location', function () {
                // setup profile
                SessionModel.profile = {"admin": true};
                // setup state
                var toState = {"data": {"pageTitle": "hi"}, "url": "/calendar", "name": "calendar"};
                var toParams = {};
                var fromState = {"data": {"pageTitle": "bye"}, "url": "/"};
                var fromParams = {};
                // run
                $scope.onStateChangeStartHandler({
                    "name": '$stateChangeStart', "preventDefault": function () {
                    }
                }, toState, toParams, fromState, fromParams);
                // assert
                // "" means that we didn't move and let the default happen, good
                expect($location.path()).toBe("");
            });

            it('should let a non admin go to an non admin location', function () {
                // setup profile
                SessionModel.profile = {"admin": false};
                // setup state
                var toState = {"data": {"pageTitle": "hi"}, "url": "/calendar", "name": "calendar"};
                var toParams = {};
                var fromState = {"data": {"pageTitle": "bye"}, "url": "/"};
                var fromParams = {};
                // run
                $scope.onStateChangeStartHandler({
                    "name": '$stateChangeStart', "preventDefault": function () {
                    }
                }, toState, toParams, fromState, fromParams);
                // assert
                // "" means that we didn't move and let the default happen, good
                expect($location.path()).toBe("");
            });

        });

        describe('onStateChangeSuccessHandler', function () {

            it('should set the page title', function () {
                var toState = {"data": {"pageTitle": "hi"}};
                var toParams = {};
                var fromState = {"data": {"pageTitle": "bye"}};
                var fromParams = {};
                expect($scope.pageTitle).not.toBeDefined();
                $scope.onStateChangeSuccessHandler(null, toState, toParams, fromState, fromParams);
                expect($scope.pageTitle).toBe("hi");
            });

            it('should set the page title to blank if undefined', function () {
                var toState = {"data": {"pageTitle": ""}};
                var toParams = {};
                var fromState = {"data": {"pageTitle": "bye"}};
                var fromParams = {};
                expect($scope.pageTitle).not.toBeDefined();
                $scope.onStateChangeSuccessHandler(null, toState, toParams, fromState, fromParams);
                expect($scope.pageTitle).toBe("");
            });

            it('should set the page title to blank if undefined', function () {
                var toState = {"data": {"pageTitle": null}};
                var toParams = {};
                var fromState = {"data": {"pageTitle": "bye"}};
                var fromParams = {};
                expect($scope.pageTitle).not.toBeDefined();
                $scope.onStateChangeSuccessHandler(null, toState, toParams, fromState, fromParams);
                expect($scope.pageTitle).toBe("");
            });

            it('should set the page title to blank if undefined', function () {
                var toState = {"data": {}};
                var toParams = {};
                var fromState = {"data": {"pageTitle": "bye"}};
                var fromParams = {};
                expect($scope.pageTitle).not.toBeDefined();
                $scope.onStateChangeSuccessHandler(null, toState, toParams, fromState, fromParams);
                expect($scope.pageTitle).toBe("");
            });

        });

        describe('onApplicationReadyChangeHandler', function () {

            it('should set application ready if false', function () {
                $scope.isReady = false;
                $scope.onApplicationReadyChangeHandler();
                expect($scope.isReady).toBeTruthy();
            });

            it('should set application ready if true', function () {
                $scope.isReady = true;
                $scope.onApplicationReadyChangeHandler();
                expect($scope.isReady).toBeTruthy();
            });

        });

    });

    describe('alertBoxCtrl', function () {

        var $scope, $compile, ctrl, $rs, NotificationModel, $modal, WindowService;

        beforeEach(inject(function ($rootScope, _$compile_, $controller, _NotificationModel_, _$modal_, _WindowService_) {
            $scope = $rootScope.$new();
            $rs = $rootScope;
            $compile = _$compile_;
            NotificationModel = _NotificationModel_;
            $modal = _$modal_;
            WindowService = _WindowService_;
            // controller
            ctrl = $controller('alertBoxCtrl', {
                $scope: $scope,
                $rootScope: $rootScope,
                NotificationModel: NotificationModel,
                $modal: $modal,
                WindowService: WindowService
            });
        }));

        it('should register properly', inject(function () {
            expect(ctrl).not.toBeNull();
            expect($rs.$$listenerCount.systemAlert).toEqual(1);
        }));

        describe('onSystemAlert', function () {

            describe('success', function () {

                beforeEach(inject(function (_$q_) {
                    var deferred = _$q_.defer();
                    deferred.resolve(true);
                    //modal
                    var $modalInstance = { // Create a mock object using spies
                        close: jasmine.createSpy('$modalInstance.close'),
                        dismiss: jasmine.createSpy('$modalInstance.dismiss'),
                        result: {
                            then: jasmine.createSpy('$modalInstance.result.then').andCallFake(function () {
                                return deferred.promise;
                            })
                        }
                    };
                    // show modal
                    var deferred2 = _$q_.defer();
                    deferred2.resolve(true);
                    spyOn($scope, 'showModal').andReturn(deferred2.promise);
                    spyOn($scope, 'hideModal');
                    //spies
                    spyOn($modal, 'open').andReturn($modalInstance);
                    spyOn(WindowService, 'goToRelativeUrl');
                    spyOn(NotificationModel, 'addItem');
                    spyOn(NotificationModel, 'removeItem');
                }));

                it('should do nothing if no data', function () {
                    $scope.onSystemAlert(null);
                    expect($modal.open).not.toHaveBeenCalled();
                });

                it('should do nothing if no data', function () {
                    var data = null;
                    $scope.onSystemAlert(null, data);
                    expect($modal.open).not.toHaveBeenCalled();
                });

                it('should try to refresh if error is 511', function () {
                    var data = {
                        title: 'Some Error',
                        message: "?",
                        type: 'danger', timeout: 5000,
                        status: 511,
                        showDetails: false
                    };
                    $scope.onSystemAlert(null, data);
                    var message = {
                        "title": "Session Timeout",
                        "message": "Your session has expired. You will be prompted to login in order to return to the application. Your progress to this point has been saved."
                    };
                    expect($scope.showModal).toHaveBeenCalledWith('sections/modals/logout/logout.tpl.html', 'logoutCtrl', message);
                    $rs.$apply();
                    expect($scope.hideModal).toHaveBeenCalled();
                    expect(WindowService.goToRelativeUrl).toHaveBeenCalledWith('/wps/myportal/ph/tph/appslug/');
                    /*
                     expect($modal.open).toHaveBeenCalled();
                     expect($modal.open.mostRecentCall.args[0].templateUrl).toBe('sections/modals/logout/logout.tpl.html');
                     expect($modal.open.mostRecentCall.args[0].controller).toBe('logoutCtrl');
                     expect($modal.open.mostRecentCall.args[0].backdrop).toBe('static');
                     expect($modal.open.mostRecentCall.args[0].keyboard).toBeFalsy();
                     var resolve = $modal.open.mostRecentCall.args[0].resolve;
                     expect(resolve.data()).toEqual(message);
                     */
                });

                it('should try to refresh if error is 511', function () {
                    var data = {
                        title: 'Some Error',
                        message: "?",
                        type: 'danger', timeout: 5000,
                        status: '511',
                        showDetails: false
                    };
                    $scope.onSystemAlert(null, data);
                    var message = {
                        "title": "Session Timeout",
                        "message": "Your session has expired. You will be prompted to login in order to return to the application. Your progress to this point has been saved."
                    };
                    expect($scope.showModal).toHaveBeenCalledWith('sections/modals/logout/logout.tpl.html', 'logoutCtrl', message);
                    $rs.$apply();
                    expect($scope.hideModal).toHaveBeenCalled();
                    expect(WindowService.goToRelativeUrl).toHaveBeenCalledWith('/wps/myportal/ph/tph/appslug/');
                    /*
                     expect($modal.open).toHaveBeenCalled();
                     expect($modal.open.mostRecentCall.args[0].templateUrl).toBe('sections/modals/logout/logout.tpl.html');
                     expect($modal.open.mostRecentCall.args[0].controller).toBe('logoutCtrl');
                     expect($modal.open.mostRecentCall.args[0].backdrop).toBe('static');
                     expect($modal.open.mostRecentCall.args[0].keyboard).toBeFalsy();
                     var resolve = $modal.open.mostRecentCall.args[0].resolve;
                     expect(resolve.data()).toEqual(message);
                     */
                });

                it('should show error (as modal) if not error 511', function () {
                    var data = {
                        title: 'Some Error',
                        message: "?",
                        type: 'danger', timeout: 5000,
                        status: 400,
                        showAsModal: true,
                        showDetails: false
                    };
                    $scope.onSystemAlert(null, data);
                    expect(WindowService.goToRelativeUrl).not.toHaveBeenCalled();
                    expect($scope.showModal).toHaveBeenCalledWith('sections/modals/retry/retry.tpl.html', 'retryCtrl', data);
                    /*
                     expect($modal.open).toHaveBeenCalled();
                     expect($modal.open.mostRecentCall.args[0].templateUrl).toBe('sections/modals/retry/retry.tpl.html');
                     expect($modal.open.mostRecentCall.args[0].controller).toBe('retryCtrl');
                     expect($modal.open.mostRecentCall.args[0].backdrop).toBe('static');
                     expect($modal.open.mostRecentCall.args[0].keyboard).toBeFalsy();
                     var resolve = $modal.open.mostRecentCall.args[0].resolve;
                     expect(resolve.data()).toEqual(data);
                     */
                });

                it('should set status to 0 if missing', function () {
                    var data = {
                        title: 'Some Error',
                        message: "?",
                        type: 'danger', timeout: 5000,
                        showAsModal: false,
                        showDetails: false
                    };
                    $scope.onSystemAlert(null, data);
                    expect(WindowService.goToRelativeUrl).not.toHaveBeenCalled();
                    expect($modal.open).not.toHaveBeenCalled();
                    expect(NotificationModel.addItem).toHaveBeenCalledWith('Some Error', 'danger', '?', 5000, false);
                });

                it('should show error (as notification) if not error 511', function () {
                    var data = {
                        title: 'Some Error',
                        message: "?",
                        type: 'danger', timeout: 5000,
                        status: 400,
                        showAsModal: false,
                        showDetails: false
                    };
                    $scope.onSystemAlert(null, data);
                    expect(WindowService.goToRelativeUrl).not.toHaveBeenCalled();
                    expect($modal.open).not.toHaveBeenCalled();
                    expect(NotificationModel.addItem).toHaveBeenCalledWith('Some Error', 'danger', '?', 5000, false);
                });

                it('should show error (as notification) if not error 511', function () {
                    var data = {
                        title: 'Some Error',
                        message: "?",
                        type: 'danger',
                        status: 400,
                        showAsModal: false,
                        showDetails: false
                    };
                    $scope.onSystemAlert(null, data);
                    expect(WindowService.goToRelativeUrl).not.toHaveBeenCalled();
                    expect($modal.open).not.toHaveBeenCalled();
                    expect(NotificationModel.addItem).toHaveBeenCalledWith('Some Error', 'danger', '?', 0, false);
                });

                it('should show error (as notification) if not error 511', function () {
                    var data = {
                        title: 'Some Error',
                        message: "?",
                        type: 'danger',
                        status: 400,
                        showAsModal: true,
                        showDetails: false
                    };
                    $scope.onSystemAlert(null, data);
                    expect($scope.showModal).toHaveBeenCalledWith('sections/modals/retry/retry.tpl.html', 'retryCtrl', data);
                    $rs.$apply();
                    expect(NotificationModel.removeItem).toHaveBeenCalled();
                    expect($scope.hideModal).toHaveBeenCalled();
                });

            });

            describe('fault', function () {

                beforeEach(inject(function (_$q_) {
                    var deferred = _$q_.defer();
                    deferred.resolve(true);
                    //modal
                    var $modalInstance = { // Create a mock object using spies
                        close: jasmine.createSpy('$modalInstance.close'),
                        dismiss: jasmine.createSpy('$modalInstance.dismiss'),
                        result: {
                            then: jasmine.createSpy('$modalInstance.result.then').andCallFake(function () {
                                return deferred.promise;
                            })
                        }
                    };
                    // show modal
                    var deferred2 = _$q_.defer();
                    deferred2.reject(true);
                    spyOn($scope, 'showModal').andReturn(deferred2.promise);
                    spyOn($scope, 'hideModal');
                    //spies
                    spyOn($modal, 'open').andReturn($modalInstance);
                    spyOn(WindowService, 'goToRelativeUrl');
                    spyOn(NotificationModel, 'addItem');
                    spyOn(NotificationModel, 'removeItem');
                }));

                it('should show error (as notification) if not error 511', function () {
                    var data = {
                        title: 'Some Error',
                        message: "?",
                        type: 'danger',
                        status: 400,
                        showAsModal: true,
                        showDetails: false
                    };
                    $scope.onSystemAlert(null, data);
                    expect(NotificationModel.addItem).not.toHaveBeenCalled();
                    $rs.$apply();
                    expect($scope.showModal).toHaveBeenCalled();
                    expect(NotificationModel.removeItem).toHaveBeenCalled();
                    expect($scope.hideModal).toHaveBeenCalled();
                });

            });
        });

        describe('removeNotification', function () {

            beforeEach(function () {
                spyOn(NotificationModel, 'removeItem');
            });

            it('should call to remove the requested item', function () {
                $scope.removeNotification({"a": 1});
                expect(NotificationModel.removeItem).toHaveBeenCalledWith({"a": 1});
            });

        });

        describe('onHelpLinkClick', function () {

            beforeEach(function () {
                spyOn(WindowService, 'goToRelativeUrl');
            });

            it('should go back to the root', function () {
                $scope.onHelpLinkClick();
                expect(WindowService.goToRelativeUrl).toHaveBeenCalledWith("/wps/myportal/ph/appslug");
            });

        });

        describe('showModal', function () {

            beforeEach(inject(function (_$q_) {
                var deferred = _$q_.defer();
                deferred.resolve(true);
                var $modalInstance = { // Create a mock object using spies
                    close: jasmine.createSpy('$modalInstance.close'),
                    dismiss: jasmine.createSpy('$modalInstance.dismiss'),
                    result: {
                        then: jasmine.createSpy('$modalInstance.result.then').andCallFake(function () {
                            return deferred.promise;
                        })
                    }
                };
                spyOn($modal, "open").andReturn($modalInstance);
            }));

            it('should call open with proper params', function () {
                $scope.showModal("a", "b", "c");
                expect($modal.open).toHaveBeenCalled();
                var arg = $modal.open.mostRecentCall.args[0];
                expect(arg.templateUrl).toBe("a");
                expect(arg.backdrop).toBe("static");
                expect(arg.keyboard).toBeFalsy();
                expect(arg.controller).toBe("b");
                expect(arg.resolve.data()).toBe("c");
            });

            it('should call open with proper params', function () {
                $scope.showModal("a", null, "c");
                expect($modal.open).toHaveBeenCalled();
                var arg = $modal.open.mostRecentCall.args[0];
                expect(arg.templateUrl).toBe("a");
                expect(arg.backdrop).toBe("static");
                expect(arg.keyboard).toBeFalsy();
                expect(arg.controller).toBeUndefined();
                expect(arg.resolve.data()).toBe("c");
            });

            it('should call open with proper params', function () {
                $scope.showModal("a");
                expect($modal.open).toHaveBeenCalled();
                var arg = $modal.open.mostRecentCall.args[0];
                expect(arg.templateUrl).toBe("a");
                expect(arg.backdrop).toBe("static");
                expect(arg.keyboard).toBeFalsy();
                expect(arg.controller).toBeUndefined();
                expect(arg.resolve).toBeUndefined();
            });

            it('should not open twice', function () {
                $scope.showModal("a", "b", "c");
                expect($modal.open).toHaveBeenCalled();
                expect($scope.showModal("a", "b", "c")).toBeNull();
            });

        });

        describe('hideModal', function () {

            beforeEach(inject(function (_$q_) {
                var deferred = _$q_.defer();
                deferred.resolve(true);
                var $modalInstance = { // Create a mock object using spies
                    close: jasmine.createSpy('$modalInstance.close'),
                    dismiss: jasmine.createSpy('$modalInstance.dismiss'),
                    result: {
                        then: jasmine.createSpy('$modalInstance.result.then').andCallFake(function () {
                            return deferred.promise;
                        })
                    }
                };
                spyOn($modal, "open").andReturn($modalInstance);
            }));

            it('should call open with proper params', function () {
                $scope.showModal("a", "b", "c");
                expect($modal.open).toHaveBeenCalled();
                expect($scope.modalInstance).not.toBeNull();
                $scope.hideModal();
                expect($scope.modalInstance).toBeNull();
            });

        });

    });

});