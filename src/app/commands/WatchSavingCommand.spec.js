/**
 * Created by jonbcampos on 10/30/14.
 */
/* istanbul ignore next */
describe('commands.WatchSavingCommand', function () {

    beforeEach(module('commands.WatchSavingCommand'));

    describe('WatchSavingCommand', function () {

        it('should be set up properly', inject(function (WatchSavingCommand) {
            expect(WatchSavingCommand).toBeDefined();
            expect(WatchSavingCommand).not.toBeNull();
        }));

        describe('execute', function () {

            beforeEach(inject(function ($rootScope, $modal) {
                spyOn($rootScope, "$on").andCallThrough();
                spyOn($modal, "open").andCallThrough();
            }));

            it('should listen to all the possible change values', inject(function (WatchSavingCommand, $rootScope) {
                WatchSavingCommand.execute();
                expect($rootScope.$on.calls.length).toEqual(0);
            }));

            xit('should not call twice', inject(function (WatchSavingCommand, $rootScope, $modal, SelectedSurveyModel) {
                WatchSavingCommand.execute();
                SelectedSurveyModel.selectedSurveySaving = true;
                $rootScope.$emit('selectedSurveySavingChanged', true);
                expect($modal.open).toHaveBeenCalledWith({
                    templateUrl: 'sections/modals/saving/saving.tpl.html',
                    backdrop: 'static',
                    keyboard: false
                });
                $rootScope.$emit('selectedSurveySavingChanged', true);
                expect($modal.open.calls.length).toBe(1);
            }));

            xit('should hide when done', inject(function (WatchSavingCommand, $rootScope, $modal, SelectedSurveyModel) {
                WatchSavingCommand.execute();
                SelectedSurveyModel.selectedSurveySaving = true;
                $rootScope.$emit('selectedSurveySavingChanged', true);
                expect($modal.open).toHaveBeenCalledWith({
                    templateUrl: 'sections/modals/saving/saving.tpl.html',
                    backdrop: 'static',
                    keyboard: false
                });
                SelectedSurveyModel.selectedSurveySaving = false;
                $rootScope.$emit('selectedSurveySavingChanged', false);
                expect(WatchSavingCommand.modalInstance).toBeNull();
            }));

        });

    });

});