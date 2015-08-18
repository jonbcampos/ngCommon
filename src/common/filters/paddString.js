/**
 * Created by jonbcampos on 2/18/14.
 */
(function () {

    'use strict';

    var common = angular.module('common.filters.paddString', []);

    /**
     * @ngdoc filter
     * @name common.filters.paddString
     *
     * @description
     * Enter filter's description here.
     *
     * @param {string} input provided.
     * @param {string} value to padd with.
     * @param {int} quantity to padd.
     * @param {boolean} front padding.
     *
     * @returns {string} filtered string.
     *
     * @example
     <doc:example module="demoApp">
     <doc:source>
     <script>
     function Ctrl($scope) {
        $scope.startString = "hell";
        $scope.paddValue = "O";
        $scope.paddQuantity = 10;
        $scope.paddFront = false;
     }
     </script>
     <div ng-controller="Ctrl">
     <table>
     <tr>
     <td>Starting String:</td>
     <td><input ng-model="startString"></td>
     </tr>
     <tr>
     <td>Padd Value String:</td>
     <td><input ng-model="paddValue"></td>
     </tr>
     <tr>
     <td>Padd Quantity String:</td>
     <td><input ng-model="paddQuantity" type="number"></td>
     </tr>
     <tr>
     <td>Padd Front:</td>
     <td><input type="checkbox" ng-model="paddFront"></td>
     </tr>
     </table>
     <hr/>
     {{startString | paddString:paddValue:paddQuantity:paddFront }}
     </div>
     </doc:source>
     </doc:example>
     *
     */
    common.filter('paddString', function () {
        return function (input, value, quantity, front) {
            if (input == null) {
                input = '';
            }
            var s = input.toString(), paddValue;
            if (value != null) {
                paddValue = value.toString();
            } else {
                paddValue = ' ';
            }
            if (!s) {
                s = '';
            }
            while (s.length < quantity) {
                if (front) {
                    s = paddValue + s;
                } else {
                    s = s + paddValue;
                }
            }
            return s;
        };
    });

})();