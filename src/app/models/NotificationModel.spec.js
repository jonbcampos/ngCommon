/**
 * Created by jonbcampos on 8/4/14.
 */
describe('models.NotificationModel', function () {

    beforeEach(module('models.NotificationModel'));

    describe('NotificationModel', function () {

        it('should be set up properly', inject(function (NotificationModel) {
            expect(NotificationModel).toBeDefined();
            expect(NotificationModel).not.toBeNull();
            expect(NotificationModel.list).toBeNull();
        }));

        describe('addItem', function () {

            it('should have one item when added', inject(function (NotificationModel) {
                var result = NotificationModel.addItem('title', 'danger', 'message', 2000);
                expect(NotificationModel.list.length).toBe(1);
                expect(NotificationModel.list[0]).toEqual(result);
            }));

            it('should have two items when added', inject(function (NotificationModel) {
                NotificationModel.addItem('title', 'danger', 'message', 2000);
                NotificationModel.addItem('title 1', 'danger', 'message', 2000);
                expect(NotificationModel.list.length).toBe(2);
            }));

            it('should have one items when two added that are the same', inject(function (NotificationModel) {
                NotificationModel.addItem('title', 'danger', 'message', 2000);
                NotificationModel.addItem('title', 'danger', 'message', 2000);
                expect(NotificationModel.list.length).toBe(1);
            }));

            it('should have zero items when null title added', inject(function (NotificationModel) {
                NotificationModel.addItem();
                expect(NotificationModel.list.length).toBe(0);
            }));

            it('should have zero items when null type added', inject(function (NotificationModel) {
                NotificationModel.addItem('title');
                expect(NotificationModel.list.length).toBe(0);
            }));

            it('should have one item when added when null message', inject(function (NotificationModel) {
                var result = NotificationModel.addItem('title', 'danger');
                expect(NotificationModel.list.length).toBe(1);
                expect(NotificationModel.list[0]).toEqual(result);
                expect(NotificationModel.list[0].title).toBe('title');
                expect(NotificationModel.list[0].message).toBe('');
                expect(NotificationModel.list[0].type).toBe('danger');
                expect(NotificationModel.list[0].timeout).toBe(0);
            }));

            it('should have one item when added when null timeout', inject(function (NotificationModel) {
                var result = NotificationModel.addItem('title', 'danger', 'message');
                expect(NotificationModel.list.length).toBe(1);
                expect(NotificationModel.list[0]).toEqual(result);
                expect(NotificationModel.list[0].title).toBe('title');
                expect(NotificationModel.list[0].message).toBe('message');
                expect(NotificationModel.list[0].type).toBe('danger');
                expect(NotificationModel.list[0].timeout).toBe(0);
            }));

        });

        describe('removeItem', function () {

            it('should have one item when 2 added, 1 removed', inject(function (NotificationModel) {
                var result = NotificationModel.addItem('title', 'danger', 'message', 0);
                var result2 = NotificationModel.addItem('title 1', 'danger', 'message', 0);
                expect(NotificationModel.list.length).toBe(2);
                expect(NotificationModel.removeItem(result)).toBeTruthy();
                expect(NotificationModel.list.length).toBe(1);
                expect(NotificationModel.list[0]).toEqual(result2);
            }));

            it('should have two items when 2 added, and null removed', inject(function (NotificationModel) {
                var result = NotificationModel.addItem('title', 'danger', 'message', 0);
                var result2 = NotificationModel.addItem('title 1', 'danger', 'message', 0);
                expect(NotificationModel.list.length).toBe(2);
                expect(NotificationModel.removeItem(null)).toBeFalsy();
                expect(NotificationModel.list.length).toBe(2);
            }));

            it('should have zero items when 2 added, 2 removed', inject(function (NotificationModel) {
                var result = NotificationModel.addItem('title', 'danger', 'message', 0);
                var result2 = NotificationModel.addItem('title 1', 'danger', 'message', 0);
                expect(NotificationModel.list.length).toBe(2);
                expect(NotificationModel.removeItem(result)).toBeTruthy();
                expect(NotificationModel.removeItem(result2)).toBeTruthy();
                expect(NotificationModel.list.length).toBe(0);
            }));

            it('should not remove unknown item', inject(function (NotificationModel) {
                var result = NotificationModel.addItem('title', 'danger', 'message', 0);
                var result2 = NotificationModel.addItem('title 1', 'danger', 'message', 0);
                expect(NotificationModel.list.length).toBe(2);
                expect(NotificationModel.removeItem({})).toBeFalsy();
                expect(NotificationModel.list.length).toBe(2);
            }));

        });

        describe('timeoutItem', function () {

            it('should have one item when 2 added, 1 timed out', inject(function (NotificationModel, $timeout) {
                NotificationModel.addItem('title', 'danger', 'message', 100);
                NotificationModel.addItem('title 1', 'danger', 'message', 200);
                $timeout.flush(101);
                expect(NotificationModel.list.length).toBe(1);
            }));

            it('should have two items when 2 added, and none timed out', inject(function (NotificationModel, $timeout) {
                NotificationModel.addItem('title', 'danger', 'message', 100);
                NotificationModel.addItem('title 1', 'danger', 'message', 200);
                $timeout.flush(99);
                expect(NotificationModel.list.length).toBe(2);
            }));

            it('should have zero items when 2 added, 2 timed out', inject(function (NotificationModel, $timeout) {
                NotificationModel.addItem('title', 'danger', 'message', 100);
                NotificationModel.addItem('title 1', 'danger', 'message', 200);
                $timeout.flush(201);
                expect(NotificationModel.list.length).toBe(0);
            }));

        });

        describe('removeAll', function () {

            it('should remove all if any exist', inject(function (NotificationModel) {
                NotificationModel.addItem('title', 'danger', 'message', 100);
                NotificationModel.addItem('title 1', 'danger', 'message', 200);
                expect(NotificationModel.removeAll()).not.toBeNull();
                expect(NotificationModel.list.length).toBe(0);
            }));

            it('should remove all if any exist', inject(function (NotificationModel) {
                NotificationModel.list = undefined;
                expect(NotificationModel.removeAll()).toBeNull();
                expect(NotificationModel.list).toBeNull();
            }));

            it('should remove all if any exist', inject(function (NotificationModel) {
                expect(NotificationModel.removeAll()).toBeNull();
                expect(NotificationModel.list).toBeNull();
            }));

            it('should remove all if any exist', inject(function (NotificationModel) {
                var result = NotificationModel.addItem('title', 'danger', 'message', 0);
                expect(NotificationModel.list.length).toBe(1);
                expect(NotificationModel.removeItem(result)).toBeTruthy();
                expect(NotificationModel.removeAll()).toEqual([]);
                expect(NotificationModel.list.length).toBe(0);
            }));

        });

    });

});