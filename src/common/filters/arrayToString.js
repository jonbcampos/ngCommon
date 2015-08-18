/**
 * Created by jonbcampos on 11/12/14.
 */
(function () {

    'use strict';

    var common = angular.module('common.filters.arrayToString', []);

    /**
     * @ngdoc filter
     * @name common.filters.arrayToString
     *
     * @description
     * Enter filter's description here.
     *
     * @param {string} input provided.
     *
     * @returns {string} filtered string.
     *
     * @example
     <doc:example module="demoApp">
     <doc:source>
     <script>
     function Ctrl($scope) {
        $scope.values = [1,2,3,4,5,6,7,8,9,0];
     }
     </script>
     <div ng-controller="Ctrl">
     <table>
     <tr>
     <td>Combine String:</td>
     <td><input ng-model="combineString"></td>
     </tr>
     </table>
     <hr/>
     {{values | arrayToString:combineString }}
     </div>
     </doc:source>
     <doc:scenario>
     it('should combine the array into a string', inject(function(arrayToString) {
                    expect(arrayToString(values, ' ')).toBe('1 2 3 4 5 6 7 8 9 0');
                }));
     </doc:scenario>
     </doc:example>
     *
     */
    common.filter('arrayToString', function () {
        return function (input, combineString) {
            if (input === undefined || input === null || input.length === 0) {
                return '';
            }
            var s = '';
            for (var i = 0, n = input.length; i < n; i++) {
                if (input[i] === undefined || input[i] === null) {
                    continue;
                }
                s += input[i];
                if (combineString != null) {
                    if (i < n - 1) {
                        s += combineString;
                    }
                }
            }
            return s;
        };
    });

})();