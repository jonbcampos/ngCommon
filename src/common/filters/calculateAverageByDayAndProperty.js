/**
 * Created by jonbcampos on 8/13/14.
 */
(function () {

    'use strict';

    var common = angular.module('common.filters.calculateAverageByDayAndProperty', []);

    /**
     * @ngdoc filter
     * @name common.filters.calculateAverageByDayAndProperty
     *
     * @description
     * Calculates the average through a dual array.
     *
     * @param {object} input provided.
     * @param {array} days provided.
     * @param {array} properties provided.
     *
     * @returns {number} total calculated.
     *
     * @example
     * <doc:example module="demoApp">
     *     <doc:source>
     *         <script>
     *             function Ctrl($scope) {
     *                 $scope.dayOptions = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
     *                 $scope.data = {
     *                     "SUNDAY":{"a":1,"b":2,"c":3,"d":"a","e":null},
     *                     "MONDAY":{"a":4,"b":5,"c":6,"d":"a","e":null},
     *                     "TUESDAY":{"a":7,"b":8,"c":9,"d":"a","e":null},
     *                     "WEDNESDAY":{"a":1,"b":2,"c":3,"d":"a","e":null},
     *                     "THURSDAY":{"a":4,"b":5,"c":6,"d":"a","e":null},
     *                     "FRIDAY":{"a":7,"b":8,"c":9,"d":"a","e":null},
     *                     "SATURDAY":{"a":1,"b":2,"c":3,"d":"a","e":null}
     *                 };
     *                 $scope.propertiesOptions = ["a","b","c", "d", "e"];
     *             }
     *         </script>
     *         <div ng-controller="Ctrl">
     *             <select multiple size="7" ng-options="day for day in dayOptions" ng-model="days"></select>
     *             <select multiple size="7" ng-options="property for property in propertiesOptions" ng-model="properties"></select>
     *             <hr/>
     *             {{data | calculateAverageByDayAndProperty:days:properties }}
     *         </div>
     *     </doc:source>
     * </doc:example>
     *
     */
    common.filter('calculateAverageByDayAndProperty', function () {
        return function (input, days, properties) {
            if (input === undefined || input === null ||
                days === null || days.length === 0 ||
                properties === null || properties.length === 0) {
                return null;
            }
            var total = 0, count = 0;
            for (var i = 0, n = days.length; i < n; i++) { //days loop
                if (days[i] === null || days[i] === undefined ||
                    input[days[i]] === null || input[days[i]] === undefined) {
                    continue;
                }
                for (var j = 0, m = properties.length; j < m; j++) {
                    if (properties[j] === null || properties[j] === undefined) {
                        continue;
                    }
                    if (input[days[i]][properties[j]] === undefined || input[days[i]][properties[j]] === null || isNaN(input[days[i]][properties[j]])) {
                        continue;
                    }
                    total += Number(input[days[i]][properties[j]]);
                    count += 1;
                }
            }
            return total / count;
        };
    });

})();