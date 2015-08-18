/* istanbul ignore next */
/**
 * Created by jonbcampos on 11/11/14.
 */
/**
 * @ngdoc directive
 * @name common.directives.components.dynamicformitem
 * @element div
 * @restrict E
 * @function
 *
 * @description
 * Directive that turns itself into an editable formitem based on the provided data.
 *
 * ## Bindable Data and Scope Options ##
 * | name | effect | default |
 * | - | - | - |
 * | state | state of the form item to use from the content. <br/>valid options: "progressbar", "select", "text", "textarea", "color", "label", "selecttree", "radios", "checkboxes", "file" | null |
 * | content | see below for content options | null |
 * | form | form this form item belongs to | null |
 * | formData | name:value pairs with the current form data | null |
 * | validData | name:value pairs with valid form items | null |
 * | invalidData | name:value pairs with invalid form items | null |
 * | pristineData | name:value pairs with form items that haven't changed by the user | null |
 * | dirtyData | name:value pairs with form items have changed by the user | null |
 * | requiredData | name:value pairs with form items that are required | null |
 *
 * If you don't provide values for any of the above options
 * then that particular data set just won't be tracked.
 *
 * ## Content ##
 * The *content* data is shown below and is fairly standard across the various
 * form item types you can select, the variation for each state is in
 * the *content.extras* object. Below is the general example of the *content* data.
 * After this example is a more detailed explanation of each form item's extras.
 *
 *      {
 *      "viewState": ["progressbar" | "select" | "text" | "textarea" | "color" | "label" | "selecttree" | "radios" | "checkboxes" | "file"]
 *      "editState": ["progressbar" | "select" | "text" | "textarea" | "color" | "label" | "selecttree" | "radios" | "checkboxes" | "file"],
 *      "id": "string", // form item id
 *      "size": ["lg" | "sm"], //null or missing for no sizing change
 *      "title": "string", // form item title (large text above form item)
 *      "description": "string", // form item description (small text below form item)
 *      "hint": "string", // form item hint (prompt in form item where available)
 *      "selectedIndexes": [array of ints, ...], // options to have selected (if no answers)
 *      "answers": [array of options, ...], // answers to have prepopulated
 *      "options": [ // for selecttree this can be a tree structure
 *      {"value": "string","display": "string"},
 *      ...
 *      ],
 *      "validations": { //all optional
 *      "required": [true|false],
 *      "minLength": int,
 *      "maxLength": int,
 *      "minDate": "YYYY-MM-DD",
 *      "maxDate": "YYYY-MM-DD",
 *      "pattern": "regexp",
 *      "inRange": [array of valid values]
 *      },
 *      "extras": {
 *      "enabled": [true|false],
 *      // see below for specific type
 *      }
 *      }
 *
 * ### progressbar extras ###
 * | name | type | details | default |
 * | - | - | - | - |
 * | width | int | width of the progressbar in pixels | 200 |
 * | max | Number | maximum value possible (aka 100%) | 100 |
 * | min | Number | minimum value possible (aka 0%) | 0 |
 * | color | string(hex) | color of progressbar | #5bc0de |
 * | animated | boolean | shows with animated zibra lines | false |
 *
 * ### select extras ###
 * | name | type | details | default |
 * | - | - | - | - |
 * | multiple | boolean | allows multiselect option | false |
 *
 * ### text extras ###
 * | name | type | details | default |
 * | - | - | - | - |
 * | type | string ["date","text","number","password","datetime","datetime-local","month","time","week","email","url","search","tel","color"] | sets the type for the input | "text" |
 * | addOnBefore | string | adds text before input | null |
 * | addOnAfter | string | adds text after input | null |
 *
 * ### textarea extras ###
 * | name | type | details | default |
 * | - | - | - | - |
 * | rows | int | number of lines of text to show | 3 |
 *
 * ### color extras ###
 * none
 *
 * ### label extras ###
 * none
 *
 * ### selecttree extras ###
 * | name | type | details | default |
 * | - | - | - | - |
 * | labelField | string | value in the data structure to display to user | "label" |
 * | valueField | string | value in the data structure to use as options value | "value" |
 * | childrenField | string | value in the data structure to use for children | "children" |
 * | titleField | string | the property in the data structure to use as the default unselected label when no values are selected | "title" |
 * | emptySelectLabel | string | value to use on empty select labels | null |
 * | minimum | number | minimum number of selects to show, this effects the required validation minimum | null |
 * | emptySelectLabel | string | default label to show in select inputs that aren't selectable yet | null |
 *
 * ### radios extras ###
 * | name | type | details | default |
 * | - | - | - | - |
 * | direction | string ["vertical", "horizontal"] | direction to layout inputs | vertical |
 *
 * ### checkboxes extras ###
 * | name | type | details | default |
 * | - | - | - | - |
 * | direction | string ["vertical", "horizontal"] | direction to layout inputs | vertical |
 *
 * ### file extras ###
 * none
 *
 * @example
 * <doc:example module="demoApp">
 *     <doc:source>
 *         <script>
 *             function Ctrl($scope) {
 *              $scope.formData = {};
 *              $scope.validData = {};
 *              $scope.invalidData = {};
 *              $scope.pristineData = {};
 *              $scope.dirtyData = {};
 *              $scope.requiredData = {};
 *              $scope.questionsText = '[{"viewState": "label", "editState": "text", "id": "date", "title": "Date Question", "description": "Date Question Example", "hint": "Date Question Hint", "selectedIndexes": [1], "answers": [{"value": "2014-05-21","display": "21MAR14"}], "options": [{"value": "2014-05-20","display": "20MAR14"}, {"value": "2014-05-21","display": "21MAR14"}, {"value": "2014-05-22","display": "22MAR14"}], "validations": {"required": true}, "extras": {"type": "date","enabled": true} },{"viewState": "label", "editState": "text", "id": "color", "title": "Color Question", "description": "color Question Example", "hint": "color Question Hint", "selectedIndexes": [1], "answers": [{"value": "#00ffff","display": "#000000"}], "validations": {"required": true}, "extras": {"color": "#00ff00","enabled": true, "type":"color"} }]';
 *              $scope.questions = JSON.parse($scope.questionsText);
 *
 *              $scope.clearQuestions = function(){
 *                  $scope.questions = null;
 *              };
 *
 *              $scope.setQuestions = function(){
 *                  $scope.questions = JSON.parse($scope.questionsText);
 *             };
 *             }
 *         </script>
 *         <div ng-controller="Ctrl">
 *             <textarea rows="10" style="width:100%;" ng-model="questionsText"></textarea>
 *             <p>
 *                 <button ng-click="clearQuestions()">Clear</button>
 *                 <button ng-click="setQuestions()">Create</button>
 *             </p>
 *             <div class="form-group" ng-repeat="question in questions">
 *                 <dynamicformitem content="question"
 *                      state="question.editState"
 *                      form-data="formData"
 *                      valid-data="validData"
 *                      invalid-data="invalidData"
 *                      pristine-data="pristineData"
 *                      dirty-data="dirtyData"
 *                      required-data="requiredData"/>
 *                 </div>
 *         </div>
 *     </doc:source>
 * </doc:example>
 *
 */
var dynamicformitemDirective = angular.module('common.directives.components.dynamicformitem', ['common.filters.arrayToString']);
/* istanbul ignore next */
dynamicformitemDirective.directive("dynamicformitem", ['$compile', '$templateCache', 'arrayToStringFilter',
    function ($compile, $templateCache, arrayToStringFilter) {

        var getTemplate = function (scope) {
            var template = 'directives/components/templates/';
            var content = scope.content;
            //set defaults
            //check by type
            switch (scope.state) {
                case 'progressbar':
                    content.extras.width = content.extras.width || 200;
                    content.extras.max = content.extras.max || 100;
                    content.extras.min = content.extras.min || 0;
                    content.extras.color = content.extras.color || "#5bc0de";
                    content.extras.calculatedWidth = content.extras.width * (scope.currentValue / (content.extras.max - content.extras.min));
                    template += 'progressbar';
                    break;
                case 'select':
                    content.extras.multiple = content.extras.multiple || false;
                    if (content.extras.multiple === true) {
                        template += 'select.multiple';
                    } else {
                        template += 'select';
                    }
                    break;
                case 'selecttree':
                    if (content.answers === undefined || content.answers === null) {
                        content.answers = [];
                    }
                    template += scope.state;
                    break;
                // text
                // textarea
                // color
                // label
                // radios
                // checkboxes
                // file
                default:
                    template += scope.state;
                    //template += 'unknown';
                    break;
            }
            template += '.tpl.html';
            return $templateCache.get(template);
        };

        var findIfValueExistsInValues = function (currentValue, values) {
            if (currentValue === undefined ||
                currentValue === null ||
                values === undefined ||
                values === null ||
                values.length === 0) {
                return false;
            }
            for (var i = 0, n = values.length; i < n; i++) {
                if (currentValue === values[i]) {
                    return true;
                }
            }
            return false;
        };

        var handleTranscludeSelect = function (scope, element) {
            //null check
            if (scope.content === undefined ||
                scope.content === null ||
                scope.content.options === undefined ||
                scope.content.options === null ||
                scope.content.options.length === 0) {
                return element;
            }
            //find where we are putting things
            var transcludedBlock = element.find('select')[0];
            transcludedBlock.options.length = 0;
            //create the default select value
            //if necessary
            var offset = 0;
            if ((scope.currentValue === undefined ||
                scope.currentValue === null ||
                scope.currentValue.length === 0) &&
                scope.content.extras.multiple === false) {
                var defaultOption = new Option(scope.content.hint, '', true);
                defaultOption.disabled = true;
                transcludedBlock.options[0] = defaultOption;
                offset = 1;
            }
            //create the options based on answers
            for (var i = 0, n = scope.content.options.length; i < n; i++) {
                var option = scope.content.options[i];
                option.value = option.value || option.display;
                //find if selected
                var selected = findIfValueExistsInValues(option.value, scope.currentValue);
                //create new option
                transcludedBlock.options[i + offset] = new Option(option.display, option.value, selected);
            }
            return element;
        };

        var handleTranscludeRadios = function (scope, element) {
            var content = scope.content;
            //null check
            if (content.options === undefined ||
                content.options === null ||
                content.options.length === 0) {
                return element;
            }
            //create values
            var className = 'radio';
            if (content.extras.direction === 'horizontal') {
                className += '-inline';
            }
            var disabledText = '';
            if (content.extras.enabled === false) {
                disabledText = ' disabled';
            }
            //find where we are putting things
            var transcludedBlock = element[0].children[1];
            //create the radios based on answers
            for (var i = 0, n = content.options.length; i < n; i++) {
                var option = content.options[i];
                var div = document.createElement('div');
                div.className = className;
                var label = document.createElement('label');
                var id = content.id + String(i + 1);
                var name = content.id;
                var checkedText = '';
                if (findIfValueExistsInValues(option.value, scope.currentValue) === true) {
                    checkedText = ' checked';
                }
                label.innerHTML = '<input type="radio" id="' + id + '" name="' + name + '" value="' + option.value + '"' + disabledText + checkedText + '/>' + option.display;
                div.appendChild(label);
                element[0].insertBefore(div, transcludedBlock);
            }
            return element;
        };

        var handleTranscludeCheckboxes = function (scope, element) {
            var content = scope.content;
            //null check
            if (content.options === undefined ||
                content.options === null ||
                content.options.length === 0) {
                return element;
            }
            var className = 'checkbox';
            if (content.extras.direction === 'horizontal') {
                className += '-inline';
            }
            var disabledText = '';
            if (content.extras.enabled === false) {
                disabledText = ' disabled';
            }
            //find where we are putting things
            var transcludedBlock = element[0].children[1];
            //create the checkboxes based on answers
            for (var i = 0, n = content.options.length; i < n; i++) {
                var option = content.options[i];
                var div = document.createElement('div');
                div.className = className;
                var label = document.createElement('label');
                var nameAndId = content.id + String(i + 1);
                var checkedText = '';
                if (findIfValueExistsInValues(option.value, scope.currentValue) === true) {
                    checkedText = ' checked';
                }
                label.innerHTML = '<input type="checkbox" id="' + nameAndId + '" name="' + nameAndId + '" value="' + option.value + '"' + disabledText + checkedText + '/>' + option.display;
                div.appendChild(label);
                element[0].insertBefore(div, transcludedBlock);
            }
            return element;
        };

        var handleTranscludeElements = function (scope, element) {
            switch (scope.state) {
                case 'select':
                    element = handleTranscludeSelect(scope, element);
                    break;
                case 'radios':
                    element = handleTranscludeRadios(scope, element);
                    break;
                case 'checkboxes':
                    element = handleTranscludeCheckboxes(scope, element);
                    break;
            }
            return element;
        };

        var shouldUseValueNotDisplay = function (scope) {
            var content = scope.content;
            if (content === undefined || content === null) {
                return false;
            }
            if (scope.state === 'text' &&
                (scope.content.extras.type === 'date') ||
                (scope.content.extras.type === 'datetime') ||
                (scope.content.extras.type === 'datetime-local') ||
                (scope.content.extras.type === 'month') ||
                (scope.content.extras.type === 'time') ||
                (scope.content.extras.type === 'week') ||
                (scope.content.extras.type === 'color')) {
                return true;
            } else {
                return false;
            }
        };

        var determineCurrentValue = function (scope, label) {
            var content = scope.content, answers, i, n, index = -1;
            if (content === undefined || content === null) {
                return null;
            }
            if (content.answers != null && content.answers.length > 0) {
                //has answer and checkbox or select
                answers = [];
                for (i = 0, n = content.answers.length; i < n; i++) {
                    answers.push(content.answers[i][label]);
                }
                return answers;
            } else if (content.options != null &&
                content.options.length > 0 &&
                content.selectedIndexes != null &&
                content.selectedIndexes.length > 0 &&
                (scope.state === 'checkboxes' ||
                scope.state === 'select' ||
                scope.state === 'selecttree')) {
                //no answer, selected indexes, checkbox or select
                answers = [];
                for (i = 0, n = content.selectedIndexes.length; i < n; i++) {
                    index = Number(content.selectedIndexes[i]);
                    if (isNaN(index) || index === -1 || content.options[index] == null) {
                        continue;
                    }
                    answers.push(content.options[index][label]);
                }
                return answers;
            } else if (content.options != null &&
                content.options.length > 0 &&
                content.selectedIndexes != null &&
                content.selectedIndexes.length > 0) {
                //no answer, selected indexes, just use first
                for (i = 0, n = content.selectedIndexes.length; i < n; i++) {
                    index = Number(content.selectedIndexes[i]);
                    if (isNaN(index) || index === -1 || content.options[index] == null) {
                        continue;
                    }
                    //needs to be an array of answers, even though one
                    return [content.options[index][label]];
                }
            }
            // added fix so text:color defaults to black
            // AND has the black value in case the user
            // thinks the default is appropriate
            if (scope.state === "text" &&
                content.extras !== null &&
                content.extras.type !== undefined &&
                content.extras.type !== null &&
                content.extras.type === "color") {
                return ["#00000"];
            }
            return null;
        };

        var findInputs = function (scope, elements) {
            var items = null, i = 0, n = 0, element = null;
            switch (scope.state) {
                case "select":
                    items = [];
                    for (i = 0, n = elements.length; i < n; i++) {
                        element = elements[i];
                        if (element.nodeName === 'SELECT') {
                            items.push(element);
                        }
                    }
                    break;
                case "textarea":
                    items = [];
                    for (i = 0, n = elements.length; i < n; i++) {
                        element = elements[i];
                        if (element.nodeName === 'TEXTAREA') {
                            items.push(element);
                        }
                    }
                    break;
                case "selecttree":
                    items = [];
                    elements = elements[2].children[0].children;
                    for (i = 0, n = elements.length; i < n; i++) {
                        element = elements[i];
                        if (element.nodeName === 'SELECT') {
                            items.push(element);
                        }
                    }
                    break;
                default:
                    items = elements.find(':input');
                    break;
            }
            return items;
        };

        var findErrorDiv = function (elements) {
            if (elements === undefined ||
                elements === null ||
                elements.length === 0) {
                return null;
            }
            for (var i = 0, n = elements.length; i < n; i++) {
                var element = elements[i];
                if (element.nodeName === 'DIV' && element.className.indexOf('form-error') > -1) {
                    element.display = 'none';
                    return element;
                }
            }
            return null;
        };

        var addListenersToInputs = function (scope, value, handler) {
            if (value === undefined ||
                value === null ||
                value.length === 0) {
                return;
            }
            for (var i = 0, n = value.length; i < n; i++) {
                var element = value[i];
                element.id = element.id || scope.content.id;
                element.name = element.name || scope.content.id;
                if (scope.content.extras.enabled === false) {
                    element.disabled = true;
                }
                if ((scope.state === "text" || scope.state === "textarea") && scope.currentValue !== null) {
                    element.value = scope.currentValue;
                }
                if (element.onchange === undefined || element.onchange === null) {
                    element.onchange = handler;
                }
                if (scope.state !== "selecttree") {
                    element.oninput = handler;
                    element.onpaste = handler;
                }
                // if we need more events we
                // can add a few more
                //element.onkeypress = handler;
                //element.onkeyup = handler;
                //element.onblur = handler;
            }
        };

        var getCurrentValuesFromInputs = function (scope, input, inputs) {
            var returnValue = [], i, n, currentInput;
            switch (scope.state) {
                case "selecttree":
                    if (inputs === undefined ||
                        inputs === null ||
                        inputs.length === 0) {
                        break;
                    }
                    for (i = 0, n = inputs.length; i < n; i++) {
                        returnValue.push(inputs[i].value);
                    }
                    break;
                case "checkboxes":
                case "radios":
                    if (inputs === undefined ||
                        inputs === null ||
                        inputs.length === 0) {
                        break;
                    }
                    for (i = 0, n = inputs.length; i < n; i++) {
                        currentInput = inputs[i];
                        if (currentInput.checked) {
                            returnValue.push(currentInput.value);
                        }
                    }
                    break;
                default:
                    if (input.value !== undefined &&
                        input.value !== null &&
                        input.value !== '') {
                        returnValue.push(input.value);
                    }
                    break;
            }
            return returnValue;
        };

        var handleInputChange = function (input, formItem, scope) {
            var errorDiv = formItem.errorDiv, inputs = formItem.inputs;
            if (scope.state === 'selecttree') {
                scope.currentValue = scope.content.answers;
            } else {
                scope.currentValue = getCurrentValuesFromInputs(scope, input, inputs);
            }
            if (scope.content != null && scope.content.validations != null) {
                var validations = scope.content.validations;
                if (checkRequired(validations.required, input, errorDiv, scope, inputs)) {
                    return false;
                }
                if (checkMinLength(validations.minLength, input, errorDiv, scope, inputs)) {
                    return false;
                }
                if (checkMaxLength(validations.maxLength, input, errorDiv, scope, inputs)) {
                    return false;
                }
                if (checkMinValue(validations.minValue, input, errorDiv, scope, inputs)) {
                    return false;
                }
                if (checkMaxValue(validations.maxValue, input, errorDiv, scope, inputs)) {
                    return false;
                }
                if (checkMinDate(validations.minDate, input, errorDiv, scope, inputs)) {
                    return false;
                }
                if (checkMaxDate(validations.maxDate, input, errorDiv, scope, inputs)) {
                    return false;
                }
                if (checkPattern(validations.pattern, input, errorDiv, scope, inputs)) {
                    return false;
                }
                if (checkInRange(validations.inRange, input, errorDiv, scope, inputs)) {
                    return false;
                }
                //if we made it here there are no errors to show
                displayError(null, errorDiv);
            }
            return true;
        };

        var displayError = function (errorString, errorDiv) {
            if (errorDiv === undefined ||
                errorDiv === null) {
                return;
            }
            if (errorString != null) {
                errorDiv.display = 'block';
                errorDiv.innerHTML = '<span>' + errorString + '</span>';
            } else {
                errorDiv.display = 'none';
                errorDiv.innerHTML = '';
            }
        };

        var checkRequired = function (validation, input, errorDiv, scope, inputs) {
            if (validation === undefined || validation === null || validation === false) {
                return false;
            }
            var i, n;
            switch (scope.state) {
                case "selecttree":
                    if (scope.content.answers === undefined ||
                        scope.content.answers === null ||
                        scope.content.answers.length === 0) {
                        displayError('This is required', errorDiv);
                        return true;
                    }
                    break;
                case "checkboxes":
                case "radios":
                    //null check
                    if (inputs === undefined ||
                        inputs === null ||
                        inputs.length === 0) {
                        return false;
                    }
                    //ensure one is checked
                    var checked = false;
                    for (i = 0, n = inputs.length; i < n; i++) {
                        if (inputs[i].checked === true) {
                            checked = true;
                        }
                    }
                    //if none are checked show error
                    if (checked === false) {
                        displayError('One selection is required', errorDiv);
                        return true;
                    }
                    break;
                default:
                    if (input.value === undefined ||
                        input.value === null ||
                        input.value === '') {
                        displayError('This is required', errorDiv);
                        return true;
                    }
                    break;
            }
            return false;
        };

        var checkMinLength = function (validation, input, errorDiv, scope, inputs) {
            if (validation === undefined) {
                return false;
            }
            var minLength = Number(validation);
            if (isNaN(minLength)) {
                return false;
            }
            if (input.value.length < minLength) {
                displayError('This is too short. Minimum: ' + minLength, errorDiv);
                return true;
            }
            return false;
        };

        var checkMaxLength = function (validation, input, errorDiv, scope, inputs) {
            if (validation === undefined) {
                return false;
            }
            var maxLength = Number(validation);
            if (isNaN(maxLength)) {
                return false;
            }
            if (input.value.length > maxLength) {
                displayError('This is too long. Maximum: ' + maxLength, errorDiv);
                return true;
            }
            return false;
        };

        var checkMinValue = function (validation, input, errorDiv, scope, inputs) {
            if (validation === undefined) {
                return false;
            }
            var minValue = Number(validation);
            var value = Number(input.value);
            if (isNaN(minValue) || isNaN(value)) {
                return false;
            }
            if (value < minValue) {
                displayError('This is too small. Minimum: ' + minValue, errorDiv);
                return true;
            }
            return false;
        };

        var checkMaxValue = function (validation, input, errorDiv, scope, inputs) {
            if (validation === undefined) {
                return false;
            }
            var maxValue = Number(validation);
            var value = Number(input.value);
            if (isNaN(maxValue) || isNaN(value)) {
                return false;
            }
            if (value > maxValue) {
                displayError('This is too large. Maximum: ' + minValue, errorDiv);
                return true;
            }
            return false;
        };

        var checkMinDate = function (validation, input, errorDiv, scope, inputs) {
            if (validation === undefined) {
                return false;
            }
            var minDate = new Date(validation);
            var inputDate = new Date(input.value);
            if (minDate == null || inputDate == null) {
                return false;
            }
            if (inputDate.getTime() < minDate.getTime()) {
                displayError('This is date is too far back. Minimum: ' + validation, errorDiv);
                return true;
            }
            return false;
        };

        var checkMaxDate = function (validation, input, errorDiv, scope, inputs) {
            if (validation === undefined) {
                return false;
            }
            var maxDate = new Date(validation);
            var inputDate = new Date(input.value);
            if (maxDate == null || inputDate == null) {
                return false;
            }
            if (inputDate.getTime() > maxDate.getTime()) {
                displayError('This is date is too far in the future. Maximum: ' + validation, errorDiv);
                return true;
            }
            return false;
        };

        var checkInRange = function (validation, input, errorDiv, scope, inputs) {
            if (validation === undefined ||
                validation === null ||
                validation.length === 0) {
                return false;
            }
            for (var i = 0, n = validation.length; i < n; i++) {
                if (validation[i] === input.value) {
                    return false;
                }
            }
            var appropriateValuesHint = '';
            if (n > 4) {
                n = 4;
            }
            for (i = 0, n; i < n; i++) {
                appropriateValuesHint += validation[i];
                if (i < n - 1) {
                    appropriateValuesHint += ', ';
                }
            }
            if (validation.length > 4) {
                appropriateValuesHint += ', ...';
                appropriateValuesHint = 'Some appropriate values: ' + appropriateValuesHint;
            } else {
                appropriateValuesHint = 'Appropriate values: ' + appropriateValuesHint;
            }
            displayError('This does not match any of the allowed values. ' + appropriateValuesHint, errorDiv);
            return true;
        };

        var checkPattern = function (validation, input, errorDiv, scope, inputs) {
            if (validation === undefined ||
                validation === null ||
                validation === '') {
                return false;
            }
            var n = validation.lastIndexOf('/');
            var reg = validation.substr(1, n - 1);
            var exp = validation.substr(n + 1);
            var regExp = new RegExp(reg, exp);
            if (regExp.test(input.value) === true) {
                return false;
            }
            displayError('This does not match the required pattern.', errorDiv);
            return true;
        };

        var setExternalWatchersData = function (scope) {
            var controller = scope.controller;
            if (scope.formData !== undefined &&
                scope.formData !== null) {
                scope.formData[scope.content.id] = scope.currentValue;
            }
            if (scope.validData !== undefined &&
                scope.validData !== null) {
                scope.validData[scope.content.id] = controller.$valid;
            }
            if (scope.invalidData !== undefined &&
                scope.invalidData !== null) {
                scope.invalidData[scope.content.id] = controller.$invalid;
            }
            if (scope.pristineData !== undefined &&
                scope.pristineData !== null) {
                scope.pristineData[scope.content.id] = controller.$pristine;
            }
            if (scope.dirtyData !== undefined &&
                scope.dirtyData !== null) {
                scope.dirtyData[scope.content.id] = controller.$dirty;
            }
            if (scope.requiredData !== undefined &&
                scope.requiredData !== null &&
                scope.content !== undefined &&
                scope.content !== null &&
                scope.content.validations !== undefined &&
                scope.content.validations !== null) {
                scope.requiredData[scope.content.id] = scope.content.validations.required;
            } else if (scope.requiredData !== undefined || scope.requiredData !== null) {
                scope.requiredData[scope.content.id] = false;
            }
        };

        var onStateChange = function (newValue, oldValue, scope) {
            if (newValue === oldValue) {
                return; // don't build for same value
            }
            buildView(scope);
        };

        var onContentChange = function (newValue, oldValue, scope) {
            if (newValue === oldValue) {
                return; // don't build for same value
            }
            buildView(scope);
        };

        var buildView = function (scope) {
            // set vars
            var element = scope.element, controller = scope.controller;
            //first we create our necessary values
            scope.currentValue = determineCurrentValue(scope, 'value');
            scope.currentDisplay = arrayToStringFilter(determineCurrentValue(scope, 'display'), ', ');
            if (shouldUseValueNotDisplay(scope)) {
                scope.currentDisplay = scope.currentValue;
            }
            setExternalWatchersData(scope);
            //then we setup the template
            var template = getTemplate(scope);
            element.html(template);
            element = handleTranscludeElements(scope, element);
            var compiled = $compile(element.html())(scope);
            element.replaceWith(compiled);
            //finally we set up the validation
            controller.compiled = compiled;
            controller.inputs = findInputs(scope, compiled);
            controller.errorDiv = findErrorDiv(compiled);
            addListenersToInputs(scope, controller.inputs, scope.changeHandler);
        };

        var directive = {
            restrict: "E",
            scope: {
                state: "=",
                content: "=",
                form: "=",
                formData: "=",
                validData: "=",
                invalidData: "=",
                pristineData: "=",
                dirtyData: "=",
                requiredData: "="
            }
        };

        directive.controller = ['$scope', function ($scope) {
            var formItem = this;
            formItem.errorDiv = null;
            formItem.inputs = null;
            formItem.$name = null;
            formItem.$dirty = false;
            formItem.$pristine = true;
            formItem.$valid = true;
            formItem.$invalid = false;
            //respond to changes in the inputs
            $scope.changeHandler = function () {
                formItem.$pristine = false;
                formItem.$dirty = true;
                formItem.$valid = handleInputChange(this, formItem, $scope);
                formItem.$invalid = !formItem.$valid;
                setExternalWatchersData(formItem);
            };
        }];

        directive.link = function (scope, element, attrs, controller) {
            // setup
            scope.controller = controller;
            scope.element = element;
            // watch data
            scope.$watch("content", onContentChange);
            scope.$watch("state", onStateChange);
            // default try to build
            buildView(scope);
        };

        return directive;
    }
]);