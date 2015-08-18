/**
 * Created by jonbcampos on 10/30/14.
 */
/* istanbul ignore next */
describe('commands.WatchLoadingCommand', function () {

    beforeEach(module('commands.WatchLoadingCommand'));

    describe('WatchLoadingCommand', function () {

        it('should be set up properly', inject(function (WatchLoadingCommand) {
            expect(WatchLoadingCommand).toBeDefined();
            expect(WatchLoadingCommand).not.toBeNull();
        }));

        describe('execute', function () {

            beforeEach(inject(function ($rootScope, $modal) {
                spyOn($rootScope, "$on").andCallThrough();
                spyOn($modal, "open").andCallThrough();
            }));

            it('should listen to all the possible change values', inject(function (WatchLoadingCommand, $rootScope) {
                WatchLoadingCommand.execute();
                expect($rootScope.$on.calls.length).toEqual(0);
            }));

            xit('should not call twice', inject(function (WatchLoadingCommand, $rootScope, $modal, OutstandingSurveysModel) {
                WatchLoadingCommand.execute();
                OutstandingSurveysModel.outstandingSurveysLoading = true;
                $rootScope.$emit('outstandingSurveysLoadingChanged', true);
                expect($modal.open).toHaveBeenCalledWith({
                    templateUrl: 'sections/modals/loading/loading.tpl.html',
                    backdrop: 'static',
                    keyboard: false
                });
                $rootScope.$emit('outstandingSurveysLoadingChanged', true);
                expect($modal.open.calls.length).toBe(1);
            }));

            xit('should hide when done', inject(function (WatchLoadingCommand, $rootScope, $modal, OutstandingSurveysModel) {
                WatchLoadingCommand.execute();
                OutstandingSurveysModel.outstandingSurveysLoading = true;
                $rootScope.$emit('outstandingSurveysLoadingChanged', true);
                expect($modal.open).toHaveBeenCalledWith({
                    templateUrl: 'sections/modals/loading/loading.tpl.html',
                    backdrop: 'static',
                    keyboard: false
                });
                OutstandingSurveysModel.outstandingSurveysLoading = false;
                $rootScope.$emit('outstandingSurveysLoadingChanged', false);
                expect(WatchLoadingCommand.modalInstance).toBeNull();
            }));

        });

    });

});