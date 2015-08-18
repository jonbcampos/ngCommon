/**
 * Created by jonbcampos on 1/30/14.
 */
/* istanbul ignore next */
/**
 * @ngdoc object
 * @name
 *
 * @description
 * View module.
 *
 */
var demoModule = angular.module('demoApp', [
    'common.directives.validations.bigdecimal',
    'common.directives.validations.date',
    'common.directives.validations.decimal',
    'common.directives.validations.integer',
    'common.directives.validations.mediumdecimal',
    'common.directives.validations.time',
    //'common.directives.charts.ganttchart',
    //'common.directives.charts.groupedbarchart',
    //'common.directives.charts.barchart',
    //'common.directives.charts.linechart',
    'common.directives.components.dynamicformitem',
    'common.directives.components.slidingdrawer',
    'common.directives.components.treeselect',
    'common.filters.arrayToString',
'common.filters.calculateAverageByDayAndProperty',
'common.filters.calculateTotalsByDayAndProperty'
    'common.filters.capitalize',
    'common.filters.checkTimePeriodOverlap',
    'common.filters.createGroupedCollections',
    'common.filters.concatString',
    'common.filters.createDateFromString',
    'common.filters.getTimezoneOffset',
'common.filters.noFractionCurrency',
    'common.filters.paddString',
    'common.filters.parseDate',
    'common.filters.showWithDefaultIfNull',
'common.filters.sumCollection',
    'common.filters.toFixed',
    'common.filters.toPercentage',
    'common.filters.toUTCDateString',
    'common.filters.transDataToGanttData',
    'common.helpers.createError',
    'templates-common'
]);

/* istanbul ignore next */
angular.module('templates-common', ['directives/components/templates/checkboxes.tpl.html',
    'directives/components/templates/color.tpl.html',
    'directives/components/templates/label.tpl.html', 'directives/components/templates/progressbar.tpl.html',
    'directives/components/templates/radios.tpl.html', 'directives/components/templates/select.multiple.tpl.html',
    'directives/components/templates/select.tpl.html', 'directives/components/templates/selecttree.tpl.html',
    'directives/components/templates/text.tpl.html', 'directives/components/templates/textarea.tpl.html',
    'directives/components/templates/unknown.tpl.html']);

/* istanbul ignore next */
angular.module("directives/components/templates/checkboxes.tpl.html", []).run(["$templateCache",
    function ($templateCache) {
        $templateCache.put("directives/components/templates/checkboxes.tpl.html",
            "<label for=\"{{content.title}}\">{{content.title}}\n" +
            "    <span class=\"required\" ng-show=\"content.validations.required\">*</span>\n" +
            "</label>\n" +
            "<div class=\"form-error\"></div>\n" +
            "<span class=\"help-block\">{{content.description}}</span>");
    }]);

/* istanbul ignore next */
angular.module("directives/components/templates/color.tpl.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("directives/components/templates/color.tpl.html",
        "<label for=\"{{content.title}}\">{{content.title}}\n" +
        "    <span class=\"required\" ng-show=\"content.validations.required\">*</span>\n" +
        "</label>\n" +
        "<div class=\"status-block\" style=\"background: {{currentValue}}; border: {{currentValue}} solid 1px;\">\n" +
        "    <span class=\"sr-only\">{{currentDisplay}}</span>\n" +
        "</div>\n" +
        "<span class=\"help-block\">{{content.description}}</span>");
}]);

/* istanbul ignore next */
angular.module("directives/components/templates/label.tpl.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("directives/components/templates/label.tpl.html",
        "<label for=\"{{content.title}}\">{{content.title}}\n" +
        "    <span class=\"required\" ng-show=\"content.validations.required\">*</span>\n" +
        "</label>\n" +
        "<div class=\"field-value\">\n" +
        "    <p class=\"form-control-static\">{{currentDisplay}}</p>\n" +
        "</div>\n" +
        "<span class=\"help-block\">{{content.description}}</span>");
}]);

/* istanbul ignore next */
angular.module("directives/components/templates/progressbar.tpl.html", []).run(["$templateCache",
    function ($templateCache) {
        $templateCache.put("directives/components/templates/progressbar.tpl.html",
            "<label for=\"{{content.title}}\">{{content.title}}\n" +
            "    <span class=\"required\" ng-show=\"content.validations.required\">*</span>\n" +
            "</label>\n" +
            "<div class=\"field-block\" style=\"vertical-align: top\">\n" +
            "    <div class=\"field-progress progress\"\n" +
            "         ng-class=\"{'active progress-striped':content.extras.animated===true}\"\n" +
            "         style=\"width: {{content.extras.width}}px; display: inline-block\">\n" +
            "        <div class=\"progress-bar progress-bar-info\" role=\"progressbar\" aria-valuenow=\"{{currentValue}}\"\n" +
            "             aria-valuemin=\"{{content.extras.min}}\" aria-valuemax=\"{{content.extras.max}}\"\n" +
            "             style=\"width: {{content.extras.calculatedWidth}}px; background-color: {{content.extras.color}};\">\n" +
            "            <span class=\"sr-only\">{{currentValue}}</span>\n" +
            "        </div>\n" +
            "    </div>\n" +
            "    {{content.answer.value}}\n" +
            "</div>\n" +
            "<span class=\"help-block\">{{content.description}}</span>");
    }]);

/* istanbul ignore next */
angular.module("directives/components/templates/radios.tpl.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("directives/components/templates/radios.tpl.html",
        "<label for=\"{{content.title}}\">{{content.title}}\n" +
        "    <span class=\"required\" ng-show=\"content.validations.required\">*</span>\n" +
        "</label>\n" +
        "<div class=\"form-error\"></div>\n" +
        "<span class=\"help-block\">{{content.description}}</span>");
}]);

/* istanbul ignore next */
angular.module("directives/components/templates/select.multiple.tpl.html", []).run(["$templateCache",
    function ($templateCache) {
        $templateCache.put("directives/components/templates/select.multiple.tpl.html",
            "<label for=\"{{content.title}}\">{{content.title}}\n" +
            "    <span class=\"required\" ng-show=\"content.validations.required\">*</span>\n" +
            "</label>\n" +
            "<select class=\"form-control\"\n" +
            "        multiple\n" +
            "        ng-class=\"{'input-sm': content.size==='sm', 'input-lg':content.size==='lg'}\">\n" +
            "</select>\n" +
            "<div class=\"form-error\"></div>\n" +
            "<span class=\"help-block\">{{content.description}}</span>");
    }]);

/* istanbul ignore next */
angular.module("directives/components/templates/select.tpl.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("directives/components/templates/select.tpl.html",
        "<label for=\"{{content.title}}\">{{content.title}}\n" +
        "    <span class=\"required\" ng-show=\"content.validations.required\">*</span>\n" +
        "</label>\n" +
        "<select class=\"form-control\"\n" +
        "        ng-class=\"{'input-sm': content.size==='sm', 'input-lg':content.size==='lg'}\">\n" +
        "</select>\n" +
        "<div class=\"form-error\"></div>\n" +
        "<span class=\"help-block\">{{content.description}}</span>");
}]);

/* istanbul ignore next */
angular.module("directives/components/templates/selecttree.tpl.html", []).run(["$templateCache",
    function ($templateCache) {
        $templateCache.put("directives/components/templates/selecttree.tpl.html",
            "<label for=\"{{content.title}}\">{{content.title}}\n" +
            "    <span class=\"required\" ng-show=\"content.validations.required\">*</span>\n" +
            "</label>\n" +
            "<treeselect select-class=\"form-control\"\n" +
            "        ts-class=\"{'input-sm': content.size==='sm', 'input-lg':content.size==='lg'}\"\n" +
            "        options=\"content.options\" answers=\"content.answers\"\n" +
            "        disabled=\"{{!content.extras.enabled}}\"\n" +
            "        hint=\"{{content.hint}}\"\n" +
            "        ts-id=\"content.id\"\n" +
            "        value-property=\"value\"\n" +
            "        minimum=\"{{content.extras.minimum}}\"\n" +
            "        onchange=\"changeHandler();\">\n" +
            "</treeselect>\n" +
            "<div class=\"form-error\"></div>\n" +
            "<span class=\"help-block\">{{content.description}}</span>");
    }]);

/* istanbul ignore next */
angular.module("directives/components/templates/text.tpl.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("directives/components/templates/text.tpl.html",
        "<label for=\"{{content.title}}\">{{content.title}}\n" +
        "    <span class=\"required\" ng-show=\"content.validations.required\">*</span>\n" +
        "</label>\n" +
        "<div class=\"input-group fill-parent\">\n" +
        "    <span class=\"input-group-addon\" ng-show=\"content.extras.addOnBefore\">{{content.extras.addOnBefore}}</span>\n" +
        "    <input class=\"form-control\"\n" +
        "           placeholder=\"{{content.hint}}\"\n" +
        "           type=\"{{content.extras.type}}\"\n" +
        "           ng-class=\"{'input-sm': content.size==='sm', 'input-lg':content.size==='lg'}\"/>\n" +
        "    <span class=\"input-group-addon\" ng-show=\"content.extras.addOnAfter\">{{content.extras.addOnAfter}}</span>\n" +
        "</div>\n" +
        "<div class=\"form-error\"></div>\n" +
        "<span class=\"help-block\">{{content.description}}</span>");
}]);

/* istanbul ignore next */
angular.module("directives/components/templates/textarea.tpl.html", []).run(["$templateCache",
    function ($templateCache) {
        $templateCache.put("directives/components/templates/textarea.tpl.html",
            "<label for=\"{{content.title}}\">{{content.title}}\n" +
            "    <span class=\"required\" ng-show=\"content.validations.required\">*</span>\n" +
            "</label>\n" +
            "<textarea class=\"form-control\"\n" +
            "          placeholder=\"{{content.hint}}\"\n" +
            "          rows=\"{{content.extras.rows}}\"/>\n" +
            "<div class=\"form-error\"></div>\n" +
            "<span class=\"help-block\">{{content.description}}</span>");
    }]);

/* istanbul ignore next */
angular.module("directives/components/templates/unknown.tpl.html", []).run(["$templateCache",
    function ($templateCache) {
        $templateCache.put("directives/components/templates/unknown.tpl.html",
            "<div class=\"field-name\">{{content.title}}<span class=\"required\" ng-show=\"content.validations.required\">*</span></div>\n" +
            "<p class=\"form-control-static\">State: {{state}}</p>\n" +
            "<span class=\"help-block\">{{content.description}}</span>");
    }]);

