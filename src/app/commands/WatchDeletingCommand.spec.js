/**
 * Created by jonbcampos on 10/30/14.
 */
/* istanbul ignore next */
describe('commands.WatchDeletingCommand', function () {

    beforeEach(module('commands.WatchDeletingCommand'));

    describe('WatchDeletingCommand', function () {

        it('should be set up properly', inject(function (WatchDeletingCommand) {
            expect(WatchDeletingCommand).toBeDefined();
            expect(WatchDeletingCommand).not.toBeNull();
        }));

        describe('execute', function () {

            beforeEach(inject(function ($rootScope, $modal) {
                spyOn($rootScope, "$on").andCallThrough();
                spyOn($modal, "open").andCallThrough();
            }));

            it('should listen to all the possible change values', inject(function (WatchDeletingCommand, $rootScope) {
                WatchDeletingCommand.execute();
                expect($rootScope.$on.calls.length).toEqual(0);
            }));

            xit('should show deleting loader', inject(function (WatchDeletingCommand, $rootScope, $modal, SelectedCardRequestModel) {
                WatchDeletingCommand.execute();
                SelectedCardRequestModel.selectedCardRequestDeleting = true;
                $rootScope.$emit('selectedCardRequestDeletingChanged', true);
                expect($modal.open).toHaveBeenCalledWith({
                    templateUrl: 'sections/modals/deleting/deleting.tpl.html',
                    backdrop: 'static',
                    keyboard: false
                });
            }));

            xit('should not call twice', inject(function (WatchDeletingCommand, $rootScope, $modal, SelectedCardRequestModel) {
                WatchDeletingCommand.execute();
                SelectedCardRequestModel.selectedCardRequestDeleting = true;
                $rootScope.$emit('selectedCardRequestDeletingChanged', true);
                expect($modal.open).toHaveBeenCalledWith({
                    templateUrl: 'sections/modals/deleting/deleting.tpl.html',
                    backdrop: 'static',
                    keyboard: false
                });
                $rootScope.$emit('selectedCardRequestDeletingChanged', true);
                expect($modal.open.calls.length).toBe(1);
            }));

            xit('should hide when done', inject(function (WatchDeletingCommand, $rootScope, $modal, SelectedCardRequestModel) {
                WatchDeletingCommand.execute();
                SelectedCardRequestModel.selectedCardRequestDeleting = true;
                $rootScope.$emit('selectedCardRequestDeletingChanged', true);
                expect($modal.open).toHaveBeenCalledWith({
                    templateUrl: 'sections/modals/deleting/deleting.tpl.html',
                    backdrop: 'static',
                    keyboard: false
                });
                SelectedCardRequestModel.selectedCardRequestDeleting = false;
                $rootScope.$emit('selectedCardRequestDeletingChanged', false);
                expect(WatchDeletingCommand.modalInstance).toBeNull();
            }));

        });

    });

});