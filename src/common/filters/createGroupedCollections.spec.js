/**
 * Created by jonbcampos on 1/2/15.
 */
describe('common.filters.createGroupedCollections', function () {

    beforeEach(module('common.filters.createGroupedCollections'));

    it('should return null for null', inject(function (createGroupedCollectionsFilter) {
        expect(createGroupedCollectionsFilter([
            {}
        ], "")).toBeNull();
    }));

    it('should return null for null', inject(function (createGroupedCollectionsFilter) {
        expect(createGroupedCollectionsFilter([
            {}
        ], null)).toBeNull();
    }));

    it('should return null for null', inject(function (createGroupedCollectionsFilter) {
        expect(createGroupedCollectionsFilter([], null)).toBeNull();
    }));

    it('should return null for null', inject(function (createGroupedCollectionsFilter) {
        expect(createGroupedCollectionsFilter(null, null)).toBeNull();
    }));

    it('should return null for null', inject(function (createGroupedCollectionsFilter) {
        expect(createGroupedCollectionsFilter(null)).toBeNull();
    }));

    it('should return null for undefined', inject(function (createGroupedCollectionsFilter) {
        expect(createGroupedCollectionsFilter()).toBeNull();
    }));

    it('should return value', inject(function (createGroupedCollectionsFilter) {
        var input = [
            {"a": "hi", "startDate": "12/11/2014", "endDate": "12/25/2014"},
            {"a": "hi", "startDate": "12/12/2014", "endDate": "12/25/2014"},
            {"a": "hi", "startDate": "12/26/2014", "endDate": "12/31/2014"},
            {"a": "hi", "startDate": "12/27/2014", "endDate": "12/31/2014"},
            {"a": "bye", "startDate": "12/28/2014", "endDate": "12/31/2014"}
        ];
        expect(createGroupedCollectionsFilter(input, "a")).toEqual({
            "hi": [
                {"a": "hi", "startDate": "12/11/2014", "endDate": "12/25/2014"},
                {"a": "hi", "startDate": "12/12/2014", "endDate": "12/25/2014"},
                {"a": "hi", "startDate": "12/26/2014", "endDate": "12/31/2014"},
                {"a": "hi", "startDate": "12/27/2014", "endDate": "12/31/2014"}
            ],
            "bye": [
                {"a": "bye", "startDate": "12/28/2014", "endDate": "12/31/2014"}
            ]
        });
    }));

    it('should return value', inject(function (createGroupedCollectionsFilter) {
        var input = [
            {"a": "hi", "startDate": "12/11/2014", "endDate": "12/25/2014"},
            {"a": "hi", "startDate": "12/12/2014", "endDate": "12/25/2014"},
            {"a": "hi", "startDate": "12/26/2014", "endDate": "12/31/2014"},
            {"a": "hi", "startDate": "12/27/2014", "endDate": "12/31/2014"},
            {"a": "bye", "startDate": "12/28/2014", "endDate": "12/31/2014"}
        ];
        expect(createGroupedCollectionsFilter(input, "a", false)).toEqual({
            "hi": [
                {"a": "hi", "startDate": "12/11/2014", "endDate": "12/25/2014"},
                {"a": "hi", "startDate": "12/12/2014", "endDate": "12/25/2014"},
                {"a": "hi", "startDate": "12/26/2014", "endDate": "12/31/2014"},
                {"a": "hi", "startDate": "12/27/2014", "endDate": "12/31/2014"}
            ],
            "bye": [
                {"a": "bye", "startDate": "12/28/2014", "endDate": "12/31/2014"}
            ]
        });
    }));

    it('should return value', inject(function (createGroupedCollectionsFilter) {
        var input = [
            {"a": "hi", "startDate": "12/11/2014", "endDate": "12/25/2014"},
            {"a": "hi", "startDate": "12/12/2014", "endDate": "12/25/2014"},
            {"a": "hi", "startDate": "12/26/2014", "endDate": "12/31/2014"},
            {"a": "hi", "startDate": "12/27/2014", "endDate": "12/31/2014"},
            {"a": "bye", "startDate": "12/28/2014", "endDate": "12/31/2014"}
        ];
        expect(createGroupedCollectionsFilter(input, "a", true)).toEqual([
            {
                "a": "hi", "collection": [
                {"a": "hi", "startDate": "12/11/2014", "endDate": "12/25/2014"},
                {"a": "hi", "startDate": "12/12/2014", "endDate": "12/25/2014"},
                {"a": "hi", "startDate": "12/26/2014", "endDate": "12/31/2014"},
                {"a": "hi", "startDate": "12/27/2014", "endDate": "12/31/2014"}
            ]
            },
            {
                "a": "bye", "collection": [
                {"a": "bye", "startDate": "12/28/2014", "endDate": "12/31/2014"}
            ]
            }
        ]);
    }));

    it('should return value', inject(function (createGroupedCollectionsFilter) {
        var input = [
            {"a": "hi", "startDate": "12/11/2014", "endDate": "12/25/2014"},
            {"a": "hi", "startDate": "12/12/2014", "endDate": "12/25/2014"},
            {"a": "hi", "startDate": "12/26/2014", "endDate": "12/31/2014"},
            {"a": "hi", "startDate": "12/27/2014", "endDate": "12/31/2014"},
            {"a": "bye", "startDate": "12/28/2014", "endDate": "12/31/2014"}
        ];
        expect(createGroupedCollectionsFilter(input, "a", "a")).toEqual([
            {
                "a": "hi", "collection": [
                {"a": "hi", "startDate": "12/11/2014", "endDate": "12/25/2014"},
                {"a": "hi", "startDate": "12/12/2014", "endDate": "12/25/2014"},
                {"a": "hi", "startDate": "12/26/2014", "endDate": "12/31/2014"},
                {"a": "hi", "startDate": "12/27/2014", "endDate": "12/31/2014"}
            ]
            },
            {
                "a": "bye", "collection": [
                {"a": "bye", "startDate": "12/28/2014", "endDate": "12/31/2014"}
            ]
            }
        ]);
    }));

    it('should return value', inject(function (createGroupedCollectionsFilter) {
        var input = [
            {"a": "hi", "startDate": "12/11/2014", "endDate": "12/25/2014"},
            {"a": "hi", "startDate": "12/12/2014", "endDate": "12/25/2014"},
            {"startDate": "12/26/2014", "endDate": "12/31/2014"},
            {"a": "hi", "startDate": "12/27/2014", "endDate": "12/31/2014"},
            {"a": "bye", "startDate": "12/28/2014", "endDate": "12/31/2014"}
        ];
        expect(createGroupedCollectionsFilter(input, "a", "a")).toEqual([
            {
                "a": "hi", "collection": [
                {"a": "hi", "startDate": "12/11/2014", "endDate": "12/25/2014"},
                {"a": "hi", "startDate": "12/12/2014", "endDate": "12/25/2014"},
                //{"a": "hi", "startDate": "12/26/2014", "endDate": "12/31/2014"},
                {"a": "hi", "startDate": "12/27/2014", "endDate": "12/31/2014"}
            ]
            },
            {
                "a": "bye", "collection": [
                {"a": "bye", "startDate": "12/28/2014", "endDate": "12/31/2014"}
            ]
            }
        ]);
    }));

});