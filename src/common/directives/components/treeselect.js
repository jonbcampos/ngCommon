/* istanbul ignore next */
/**
 * Created by jonbcampos on 11/11/14.
 */
/**
 * @ngdoc directive
 * @name common.directives.components.treeselect
 * @element div
 * @restrict E
 * @function
 *
 * @description
 * A set of dynamic select boxes that help you make selections from a tree structure.
 *
 * You can customize how the treeselect works both through the tree data that is
 * passed to the directive and through options on the directive itself. The following
 * tables will show you both of these options.
 *
 * ##Scope Options##
 * | name | effect | default
 * | - | - | - |
 * | options | the data set to determine selectable values - explanation of this in the next section. | null |
 * | answers | selected answers | null |
 * | select-class | base class to set to the dynamically created select | null |
 * | disabled | boolean to set enabled/disabled | true |
 * | hint | prompt to show if no option is selected | null |
 * | on-selection-change | callback method whenever the answers change | null |
 * | ts-class | dynamic class for the select inputs, similar to ng-class | null |
 * | ts-id | name and id for the dynamically created selects. the name will be exactly as you set, the id will have the index of the select input appended to the name | 'undefined' |
 * | minimum | minimum quantity of select boxes to create if you know you want x shown from the start | 0 |
 * | label-field | the property in the data structure to use as the option's display | "label" |
 * | value-field | the property in the data structure to use as the option's value | "value" |
 * | title-field | the property in the data structure to use as the default unselected label when no values are selected | "value" |
 * | children-field | the property in the data structure to use to determine the children | "children" |
 * | empty-select-label | the text to show for the select values created to meet the minimum quantity | "" |
 *
 * ## options details ##
 * The options are created as a tree structure with certain data expected. One example is as follows:
 *
 *     [
 *      {"value": "aaa", "display"(optional):"AAA", "title"(optional):"Select AAA Children", "children"(optional):[ ... ]},
 *      {"value": "bbb", "display"(optional):"BBB", "title"(optional):"Select BBB Children", "children"(optional):[ ... ]},
 *      ...
 *     ]
 *
 * The *value* is the dynamically created select's options.
 *
 * Optionally you can add a *display* if you want to show
 * the user something other than the *value*'s value.
 *
 * You can optionally add in *title* which will set the default
 * non-selectable option prompting the user to take some action on the children. If no *title* is set and the
 * scope's *hint* is set, then the *hint* will be shown.
 *
 * Finally you can add in further *children*. If you don't add any *children* (or *children* is null or empty)
 * then when the user gets to this final leaf level they will no longer be able to select and more.
 * A new set of *children* will be shown as a select box below the current select.
 *
 * @example
 * <doc:example module="demoApp">
 *     <doc:source>
 *         <script>
 *             function Ctrl($scope) {
 *             $scope.options = [
 *             {value: 'a', display: 'A', children:[
 *             {value: 'aa', display: 'AA'},
 *             {value: 'ab', display: 'AB'},
 *             {value: 'ac', display: 'AC'}
 *             ]},
 *             {value: 'b', display: 'B', children:[
 *             {value: 'ba', display: 'BA'},
 *             {value: 'bb', display: 'BB'},
 *             {value: 'bc', display: 'BC'}
 *             ]},
 *             {value: 'c', display: 'C', children:[
 *             {value: 'ca', display: 'CA'},
 *             {value: 'cb', display: 'CB'},
 *             {value: 'cc', display: 'CC'}
 *             ]}
 *             ];
 *             }
 *         </script>
 *         <div ng-controller="Ctrl">
 *             <treeselect options="options"
 *                          answers="answers"
 *                          ts-id="whiteboard"
 *                          disabled="false"
 *                          minimum="2"
 *                          hint="select previous"
 *                          label-field="display">
 *                 </treeselect>
 *                 <p>{{answers}}</p>
 *             </div>
 *    </doc:source>
 * </doc:example>
 */
var treeselectDirective = angular.module('common.directives.components.treeselect', []);
/* istanbul ignore next */
treeselectDirective.directive("treeselect", ['$compile', function ($compile) {

    var createChildren = function (scope, element, controller) {
        // get div element
        var div = element[0].children[0];
        // remove all old elements
        while (div.firstChild) {
            div.removeChild(div.firstChild);
        }
        //create
        createSelects(scope, div, 0, scope.options, controller);
        // get inputs to add listeners
        scope.inputs = findInputs(scope, div.children);
        addListenersToInputs(scope, controller);
    };

    var createSelects = function (scope, div, index, options, controller, selectLabel) {
        if (options === undefined ||
            options === null ||
            options.length === 0 ||
            index === undefined ||
            index === null ||
            isNaN(index) ||
            index < 0) {
            return div;
        }
        // set defaults
        scope.labelField = scope.labelField || "label";
        scope.valueField = scope.valueField || "value";
        scope.childrenField = scope.childrenField || "children";
        scope.titleField = scope.titleField || "title";
        //create select
        var selectElement = document.createElement('select'), label;
        if (scope.selectClass) {
            selectElement.className = scope.selectClass;
        }
        if (scope.tsClass != null) {
            for (label in scope.tsClass) {
                if (scope.tsClass[label] === true) {
                    selectElement.className += " " + label;
                }
            }
        }
        selectElement.disabled = (scope.disabled !== "false");
        selectElement.setAttribute('index', index);
        selectElement.name = scope.tsId;
        selectElement.id = scope.tsId + index.toString();
        //clear options
        selectElement.options.length = 0;
        //create the default select value
        //if necessary
        var offset = 0, answer = null, selectedOption = null, selectLabelValue = selectLabel || scope.hint, breakElement = null;
        if (scope.answers !== undefined &&
            scope.answers !== null &&
            scope.answers.length > index) {
            answer = scope.answers[index];
            if (answer !== undefined && answer !== null && typeof answer !== 'string' && answer[scope.valueField] !== null) {
                answer = answer[scope.valueField];
            } else if (answer !== undefined && answer !== null && typeof answer !== 'string' && answer[scope.labelField] !== null) {
                answer = answer[scope.labelField];
            }
        }
        if (selectLabelValue !== undefined &&
            selectLabelValue !== null &&
            selectLabelValue !== '' &&
            answer === null) {
            var defaultOption = new Option(selectLabelValue, '', true);
            defaultOption.disabled = true;
            selectElement.options[0] = defaultOption;
            offset = 1;
        }
        //create the options based on answers
        for (var i = 0, n = options.length; i < n; i++) {
            var option = options[i];
            //find if selected
            option[scope.valueField] = option[scope.valueField] || option[scope.labelField];
            var isSelected = (answer !== undefined && answer !== null &&
            option[scope.valueField] !== undefined && option[scope.valueField] !== null &&
            option[scope.valueField].toString() === answer.toString());
            if (isSelected) {
                selectedOption = option;
            }
            //create new option
            var o = new Option(option[scope.labelField], option[scope.valueField]);
            o.selected = isSelected;
            selectElement.options[i + offset] = o;
        }
        //add to div
        div.appendChild(selectElement);

        if (selectedOption !== null &&
            selectedOption[scope.childrenField] !== undefined &&
            selectedOption[scope.childrenField] !== null &&
            selectedOption[scope.childrenField].length > 0) {
            breakElement = document.createElement('br');
            div.appendChild(breakElement);
            createSelects(scope, div, index + 1, selectedOption[scope.childrenField], controller, selectedOption[scope.titleField]);
        } else if (index + 1 < scope.minimum) {
            breakElement = document.createElement('br');
            div.appendChild(breakElement);
            createEmptySelect(scope, div, index + 1, controller);
        }

        return div;
    };

    var createEmptySelect = function (scope, div, index, controller) {
        //create select
        var selectElement = document.createElement('select'), label;
        if (scope.selectClass) {
            selectElement.className = scope.selectClass;
        }
        if (scope.tsClass !== undefined && scope.tsClass !== null) {
            for (label in scope.tsClass) {
                if (scope.tsClass[label] === true) {
                    selectElement.className += " " + label;
                }
            }
        }
        selectElement.disabled = true;
        selectElement.setAttribute('index', index);
        selectElement.name = scope.tsId;
        selectElement.id = scope.tsId + index.toString();
        //clear options
        selectElement.options.length = 0;
        if (scope.emptySelectLabel !== undefined &&
            scope.emptySelectLabel !== null &&
            scope.emptySelectLabel !== "") {
            var emptySelectOption = new Option(scope.emptySelectLabel, '', true);
            emptySelectOption.disabled = true;
            selectElement.options[0] = emptySelectOption;
        }
        //add to div
        div.appendChild(selectElement);
        if (index + 1 < scope.minimum) {
            var breakElement = document.createElement('br');
            div.appendChild(breakElement);
            createEmptySelect(scope, div, index + 1, controller);
        }
        return div;
    };

    var addListenersToInputs = function (scope, controller) {
        if (scope.inputs === undefined ||
            scope.inputs === null ||
            scope.inputs.length === 0) {
            return;
        }
        for (var i = 0, n = scope.inputs.length; i < n; i++) {
            var input = scope.inputs[i];
            input.onchange = controller.changeHandler;
        }
    };

    var findInputs = function (scope, elements) {
        if (elements === undefined ||
            elements === null ||
            elements.length === 0) {
            return null;
        }
        var items = [];
        for (var i = 0, n = elements.length; i < n; i++) {
            var element = elements[i];
            if (element.nodeName === 'SELECT') {
                items.push(element);
            }
        }
        return items;
    };

    //-------------------------------------------------------------------------
    //
    //  Handlers
    //
    //-------------------------------------------------------------------------
    var handleInputChange = function (event, input, controller, scope, element) {
        var index = Number(input.getAttribute("index"));
        scope.answers[index] = input.value;
        scope.answers = scope.answers.slice(0, index + 1);
        if (scope.answers == null) {
            return;
        }
        createChildren(scope, element, controller);
        scope.$apply(function () {
            scope.answers = scope.answers;
        });
    };

    var onOptionsChange = function (newValue, oldValue, scope) {
        if (newValue !== oldValue) {
            createChildren(scope, scope.element, scope.controller);
        }
    };

    var onAnswersChange = function (newValue, oldValue, scope) {
        if ((newValue === undefined && oldValue === undefined) ||
            (newValue === null && oldValue === null) ||
            newValue.length === 0 && oldValue.length === 0) {
            return;
        }
        if (newValue.toString() !== oldValue.toString()) {
            createChildren(scope, scope.element, scope.controller);
        }
    };

    var onFieldChange = function (newValue, oldValue, scope) {
        if (this.last === newValue) {
            return;
        }
        if (newValue !== oldValue) {
            createChildren(scope, scope.element, scope.controller);
        }
    };
    //-------------------------------------------------------------------------
    //
    //  Directive Stuff
    //
    //-------------------------------------------------------------------------

    var directive = {
        restrict: "E",
        scope: {
            options: "=",
            answers: "=",
            selectClass: "@",
            disabled: "@",
            hint: "@",
            onSelectionChange: "&",
            tsClass: "=",
            tsId: "@",
            minimum: "@",
            labelField: "@",
            valueField: "@",
            childrenField: "@",
            titleField: "@",
            emptySelectLabel: "@"
        },
        template: '<div></div>'
    };

    directive.controller = ['$scope', '$element', function ($scope, $element) {
        var treeSelect = this;
        // change handler
        treeSelect.changeHandler = function (event) {
            handleInputChange(event, this, treeSelect, $scope, $element);
            if ($scope.onSelectionChange !== undefined && $scope.onSelectionChange !== null) {
                $scope.onSelectionChange.call(event, this, treeSelect);
            }

        };
    }];

    directive.link = function (scope, element, attrs, controller) {
        // hold vars
        scope.element = element;
        scope.controller = controller;
        // set default
        scope.answers = scope.answers || [];
        // watch for any changes
        scope.$watch('options', onOptionsChange);
        scope.$watch('answers', onAnswersChange);
        scope.$watch('labelField', onFieldChange);
        scope.$watch('valueField', onFieldChange);
        scope.$watch('childrenField', onFieldChange);
        // create based on provided options
        createChildren(scope, element, controller);
    };

    return directive;
}]);