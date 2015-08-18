/**
 * Created by jonbcampos on 1/16/15.
 */
(function () {

    'use strict';

    var noFractionCurrencyFilter = angular.module('common.filters.noFractionCurrency', []);

    /**
     * @ngdoc filter
     * @name common.filters.noFractionCurrency
     *
     * @description
     * Enter description here.
     *
     * @param {string} input provided.
     *
     * @returns {string} filtered string.
     * @example
     * <doc:example module="demoApp">
     *     <doc:source>
     *         <script>
     *             function Ctrl($scope) {
     *             }
     *         </script>
     *         <div ng-controller="Ctrl">
     *             <table>
     *                 <tr>
     *                     <td>Input:</td>
     *                     <td><input ng-model="string"></td>
     *                 </tr>
     *             </table>
     *             <hr/>
     *             {{string | noFractionCurrency }}
     *         </div>
     *     </doc:source>
     * </doc:example>
     *
     */
    noFractionCurrencyFilter.filter('noFractionCurrency', ['currencyFilter', '$locale',
        function (currencyFilter, $locale) {
            return function (input, defaultValue) {
                // null check
                var num = Number(input);
                if (input === undefined || input === null || input.length === 0 || isNaN(num)) {
                    // if no default just end,
                    // if default use that and continue
                    if (defaultValue === undefined || defaultValue === null || defaultValue.length === 0 || isNaN(defaultValue)) {
                        return null;
                    } else {
                        num = Number(defaultValue);
                    }
                }
                // do filter
                var value = currencyFilter(num),
                    formats = $locale.NUMBER_FORMATS,
                    sep = value.indexOf(formats.DECIMAL_SEP);
                /* istanbul ignore next */
                if (sep >= 0) {
                    var numString = value.substring(0, sep);
                    if (num < 0) {
                        numString += ")";
                    }
                    return numString;
                }
                /* istanbul ignore next */
                return num;
            };
        }]);

})();