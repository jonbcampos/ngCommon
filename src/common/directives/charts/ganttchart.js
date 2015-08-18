/* istanbul ignore next */
/**
 * Created by jonbcampos on 12/30/14.
 */
(function () {

    'use strict';
    /**
     * @ngdoc directive
     * @name common.directives.charts.ganttchart
     * @restrict AE
     * @scope
     *
     * @description
     * the d3 based gantt chart.
     *
     * @example
     * <doc:example module="demoApp">
     *     <doc:source>
     *          <style>
     *            div.tooltip{
     *              position: absolute;
     *              padding: 10px;
     *              background: #000;
     *              border: 0px;
     *              border-radius: 2px;
     *              color: #fff;
     *            }
     *
     *            .chart {
     *              font-size: 12px;
     *            }
     *
     *            .axis path,.axis line {
     *              fill: none;
     *              stroke: #000;
     *              shape-rendering: crispEdges;
     *            }
     *
     *            .open {
     *              fill: #33b5e5;
     *            }
     *
     *            .open:hover {
     *              cursor: pointer;
     *              fill: #33b5e5;
     *            }
     *
     *            .open.label {
     *              fill: #000;
     *              color: #fff;
     *              pointer-events: none;
     *            }
     *
     *            .closed {
     *              fill: #b62222;
     *            }
     *
     *            .closed.label {
     *              fill: #fff;
     *              color: #fff;
     *            }
     *
     *            .high {
     *              fill: #22b527;
     *            }
     *
     *            .high.label {
     *              fill: #fff;
     *              color: #fff;
     *            }
     *
     *            .low {
     *              fill: #b522a9;
     *            }
     *
     *            .low.label {
     *              fill: #fff;
     *              color: #fff;
     *            }
     *
     *            .today{
     *              fill: #111;
     *            }
     *
     *            .overlay.line{
     *              fill: #000;
     *              stroke: #000;
     *              stroke-width: 1;
     *              shape-rendering: crispEdges;
     *            }
     *
     *        </style>
     *        <script>
     *          function Ctrl($scope) {
     *              $scope.chartData = [
     *                  {startDate: "12/11/2014", endDate: "12/14/2014", title:"hi really really really long text", type:"open"},
     *                  {startDate: "12/12/2014", endDate: "12/21/2014", title:"mom", type:"closed"},
     *                  {startDate: "12/07/2014", endDate: "12/31/2014", title:"we", type:"high"},
     *                  {startDate: "12/01/2014", endDate: "12/22/2014", title:"will", type:"low"},
     *                  {startDate: "12/15/2014", endDate: "12/20/2014", title:"see", type:"open"},
     *                  {startDate: "12/04/2014", endDate: "12/21/2014", title:"if", type:"closed"},
     *                  {startDate: "12/09/2014", endDate: "12/26/2014", title:"I", type:"high"},
     *                  {startDate: "12/10/2014", endDate: "12/27/2014", title:"can", type:"low"},
     *                  {startDate: "12/15/2014", endDate: "12/30/2014", title:"make me see if this will fit into some crazy big box that has plenty of room to go into two lines", type:"open"},
     *                  {startDate: "12/11/2014", endDate: "12/31/2014", title:"this", type:"closed"},
     *                  {startDate: "12/03/2014", endDate: "12/14/2014", title:"chart", type:"high"},
     *                  {startDate: "12/23/2014", endDate: "12/31/2014", title:"work", type:"low"}
     *              ];
     *
     *              $scope.timeOverlay = [
     *                  {startDate: "12/02/2014", endDate: "12/08/2014", title:"P1W1"},
     *                  {startDate: "12/08/2014", endDate: "12/15/2014", title:"P1W2"},
     *                  {startDate: "12/15/2014", endDate: "12/22/2014", title:"P1W3"},
     *                  {startDate: "12/22/2014", endDate: "12/29/2014", title:"P1W4"},
     *                  {startDate: "12/29/2014", endDate: "01/05/2015", title:"P1W5"},
     *                  {startDate: "01/05/2015", endDate: "01/12/2015", title:"P1W6"}
     *              ];
     *
     *              $scope.showXAxis = true;
     *              $scope.showYAxis = true;
     *              $scope.showToday = true;
     *              $scope.dateFormat = "%x";
     *              $scope.colorField = "type";
     *
     *              $scope.minDate = "2014-12-01";
     *              $scope.maxDate = "2014-12-31";
     *
     *              $scope.tooltipFormatter = function (d) {
     *                  var t = "", key;
     *                  for (key in d) {
     *                      t += '<strong>' + key + '</strong> ' + d[key] + '<br/>';
     *                  }
     *                  return t;
     *              };
     *
     *              $scope.itemClickHandler = function (d) {
     *                  alert(d.title);
     *              };
     *          }
     *        </script>
     *        <div ng-controller="Ctrl">
     *          <div>
     *              <h1>Gantt Chart Options</h1>
     *              <p>
     *                  <strong>Show X Axis</strong>
     *                  <input type="checkbox" ng-model="showXAxis"></input>
     *              </p>
     *              <p>
     *                  <strong>Show Y Axis</strong>
     *                  <input type="checkbox" ng-model="showYAxis"></input>
     *              </p>
     *              <p>
     *                  <strong>Show Today</strong>
     *                  <input type="checkbox" ng-model="showToday"></input>
     *              </p>
     *              <tr>
     *                  <td>Start Date:</td>
     *                  <td><input ng-model="minDate" type="date"></td>
     *              </tr>
     *              <tr>
     *                  <td>End Date:</td>
     *                  <td><input ng-model="maxDate" type="date"></td>
     *              </tr>
     *          </div>
     *          <ganttchart
     *              chart-data="chartData"
     *              time-overlay="timeOverlay"
     *              min-date="{{minDate}}"
     *              max-date="{{maxDate}}"
     *              date-format="{{dateFormat}}"
     *              color-field="{{colorField}}"
     *              show-today="{{showToday}}"
     *              show-x-axis="{{showXAxis}}"
     *              show-y-axis="{{showYAxis}}"
     *              row-height="40"
     *              max-lines-of-text="2"
     *              time-overlay-label-field="title"
     *              label-field="title"
     *              item-click-handler-func="itemClickHandler(value)"
     *              tooltip-label-func="tooltipFormatter(value)">
     *          </ganttchart>
     *        </div>
     *    </doc:source>
     * </doc:example>
     */
    var ganttchartDirective = angular.module('common.directives.charts.ganttchart', [
        'common.filters.transDataToGanttData',
        'common.filters.createGroupedCollections'
    ]);

    ganttchartDirective.directive('ganttchart', ['$timeout', 'transDataToGanttDataFilter',
        'createGroupedCollectionsFilter',
        function ($timeout, transDataToGanttDataFilter, createGroupedCollectionsFilter) {

            //-------------------------------------------------------------------------
            //
            //  Methods
            //
            //-------------------------------------------------------------------------
            var init = function (scope, element, attributes, controller) {
                // calculate widths and heights
                var calcWidth = attributes.width, calcHeight = attributes.height;
                if (scope.parent !== undefined &&
                    scope.parent !== null && !(isNaN(attributes.percentWidth))) {
                    calcWidth = Math.round(scope.parent.width() * (attributes.percentWidth / 100));
                }
                if (scope.parent !== undefined &&
                    scope.parent !== null && !(isNaN(attributes.percentHeight))) {
                    calcHeight = Math.round(scope.parent.height() * (attributes.percentHeight / 100));
                }
                // setup
                var width = calcWidth - attributes.left - attributes.right,
                    height = calcHeight - attributes.top - attributes.bottom,
                    uniqueColorField = scope.colorField + "x",// x added to make a unique field, // todo parameterize
                    parseDate = d3.time.format(scope.dateFormat).parse,
                    ganttData = prepareData(scope, uniqueColorField, parseDate),
                    uniqueTypes = determineUniqueTypes(ganttData, uniqueColorField),
                    minDate = calcMinDate(scope),
                    maxDate = calcMaxDate(scope),
                    calcRowHeight = Math.ceil(height / uniqueTypes.length),
                    timeOverlayData = cleanTimeOverlayData(scope, minDate, maxDate, parseDate);
                // do we need to adjust the height based on visual requests?
                if (!isNaN(attributes.rowHeight)) {
                    calcHeight = (uniqueTypes.length * (attributes.rowHeight + attributes.rowVPadding)) + attributes.top + attributes.bottom;
                    height = calcHeight - attributes.top - attributes.bottom;
                    calcRowHeight = attributes.rowHeight;
                }
                // make the chart elements
                var x = d3.time.scale().domain([minDate, maxDate]).range([0, width]).clamp(true),
                    y = d3.scale.ordinal().domain(uniqueTypes).rangeRoundBands([0, height], 0.1),
                    xAxis = d3.svg.axis().scale(x)
                        .orient(attributes.axisFieldPositionX)
                        .tickFormat(d3.time.format(scope.dateFormatXAxis))
                        .tickSubdivide(true),
                    yAxis = d3.svg.axis().scale(y)
                        .orient(attributes.axisFieldPositionY)
                        .tickSize(0),
                    svg = createCanvas(scope, calcWidth, calcHeight, attributes);
                scope.div = createToolTip(scope);
                // formatting
                if (scope.hasAxisYFieldLabelFunc) {
                    yAxis.tickFormat(function (d) {
                        return scope.axisYFieldLabelFunc({'value': d});
                    });
                }
                // vader... do what must be done!
                addTodayIndicator(scope, svg, minDate, maxDate, height, x);
                addTimeOverlay(scope, svg, timeOverlayData, width, height, minDate, maxDate, x, y, attributes);
                addChartData(scope, svg, ganttData, x, y, uniqueColorField, attributes);
                addLabels(scope, svg, ganttData, x, y, uniqueColorField, calcRowHeight, attributes);
                addXAxis(scope, svg, height, attributes, xAxis, x);
                addYAxis(scope, svg, width, attributes, yAxis, y);
            };

            var createCanvas = function (scope, width, height, attributes) {
                var svg = d3.select(scope.chart)
                    .append("svg")
                    .attr("class", "chart")
                    .attr("width", width)
                    .attr("height", height)
                    .append("g")
                    .attr("class", "gantt-chart")
                    .attr("width", width)
                    .attr("height", height)
                    .attr("transform", "translate(" + attributes.left + ", " + attributes.top + ")");
                return svg;
            };

            var createToolTip = function (scope) {
                var div = d3.select("body")
                    .append("div")
                    .attr("class", "tooltip")
                    .style("opacity", 0);
                return div;
            };

            var addChartData = function (scope, svg, ganttData, x, y, uniqueField, attributes) {
                // null check
                if (ganttData === null) {
                    return;
                }
                // draw!
                var element = svg.selectAll(".chart")
                    .data(ganttData)
                    .enter()
                    .append("rect")
                    .attr("class", function (d) {
                        // determine what color class we need to show
                        if (scope.colorsMap !== null && scope.colorsMap.hasOwnProperty(d[scope.colorField])) {
                            return scope.colorsMap[d[scope.colorField]];
                        }
                        return d[scope.colorField]; // otherwise return name for colorField
                    })
                    .attr("y", 0)
                    .attr("transform", function (d) { // location tranform based on data
                        var x1 = x(d[scope.startDateField]),
                            y1 = y(d[uniqueField]);
                        return "translate(" + Math.round(x1) + ", " + Math.round(y1) + ")";
                    })
                    .attr("rx", attributes.cornerRadiusX)
                    .attr("ry", attributes.cornerRadiusY)
                    .attr("height", function (d) {
                        return y.rangeBand();
                    })
                    .attr("width", function (d) {
                        var x2 = x(d[scope.endDateField]),
                            x1 = x(d[scope.startDateField]);
                        if (x1 >= x2) {
                            return 0;
                        }
                        return Math.round(x2 - x1);
                    });
                // do we need to add anything to the elements?
                addTooltips(scope, element);
                addDataPointClickHandler(scope, element);
                /// remove tooltip on mouseout
                if (scope.hideToolTipOnMouseOut) {
                    svg.on("mouseout", function (d) {
                        scope.div.transition()
                            .duration(500)
                            .style("opacity", 0);
                    });
                }
            };

            var addXAxis = function (scope, svg, height, attributes, xAxis, x) {
                if (!scope.showXAxis) {
                    return;
                }
                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0, " + height + ")")
                    .transition()
                    .call(xAxis)
                    .selectAll(".tick text")
                    .attr('x', 0)
                    .attr('y', 5)
                    .attr('dy', '0.71em')
                    .style('text-anchor', 'end')
                    .attr('transform', 'rotate(-45)');
            };

            var addYAxis = function (scope, svg, width, attributes, yAxis, y) {
                if (!scope.showYAxis) {
                    return;
                }
                svg.append("g")
                    .attr("class", "y axis")
                    .transition()
                    .call(yAxis);
            };

            var addLabels = function (scope, svg, ganttData, x, y, uniqueField, calcRowHeight, attributes) {
                // null check
                if (ganttData === null || scope.labelField === null) {
                    return;
                }
                // draw!
                svg.selectAll(".chart")
                    .data(ganttData)
                    .enter()
                    .append("text")
                    .attr("class", function (d) {
                        // determine what color class we need to show
                        if (scope.colorsMap !== null && scope.colorsMap.hasOwnProperty(d[scope.colorField])) {
                            return scope.colorsMap[d[scope.colorField]] + " gantt-label";
                        }
                        return d[scope.colorField] + " gantt-label"; // otherwise return name for colorField
                    })
                    .attr("transform", function (d) {
                        var x1 = x(d[scope.startDateField]) + 3, // todo parameterize
                            y1 = y(d[uniqueField]) + 15; // todo parameterize
                        return "translate(" + Math.round(x1) + ", " + Math.round(y1) + ")";
                    })
                    .attr("dx", 0)
                    .attr("dy", 0)
                    .attr("text-anchor", "start") // todo move to css
                    .text(function (d) {
                        return d[scope.labelField];
                    })
                    .attr("width", function (d) {
                        var x2 = x(d[scope.endDateField]),
                            x1 = x(d[scope.startDateField]);
                        if (x1 >= x2) {
                            return 0;
                        }
                        return Math.round(x2 - x1);
                    })
                    .call(wordWrap, scope);
            };

            var addTooltips = function (scope, element) {
                if (!scope.hasTooltipLabelFunc) {
                    return;
                }
                element.on("mouseover", function (d) {
                    var displayText = scope.tooltipLabelFunc({'value': d});
                    scope.div.transition()
                        .duration(500)
                        .style("opacity", 0);
                    scope.div.transition()
                        .duration(200)
                        .style("opacity", 1);
                    scope.div.html(displayText)
                        .style("left", ((d3.event.pageX + 15) + "px")) // todo parameterize
                        .style("top", (d3.event.pageY - 30) + "px"); // todo parameterize
                });
            };

            var addDataPointClickHandler = function (scope, point) {
                if (!scope.hasItemClickHandlerFunc) {
                    return;
                }
                point.on("click", function (d) {
                    scope.itemClickHandlerFunc({'value': d});
                });
            };

            var addTodayIndicator = function (scope, svg, minDate, maxDate, height, x) {
                if (!scope.showToday) {
                    return;
                }
                // create time values
                var now = new Date(), today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0),
                    tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0),
                    todayX = x(today), tomorrowX = x(tomorrow),
                    width = Math.round(tomorrowX - todayX);
                if (todayX >= tomorrowX) {
                    width = 0;
                }

                // check if today is in range
                if (minDate.getTime() > today.getTime() || today.getTime() > maxDate.getTime()) {
                    return; // if today is not in range, skip
                }

                // draw!
                svg.append("rect")
                    .attr("rx", 0) // todo parameterize, controls corner radius
                    .attr("ry", 0) // todo parameterize, controls corner radius
                    .attr("class", "today")
                    .attr("y", 0)
                    .attr("transform", "translate(" + Math.round(todayX) + ", 0)")
                    .attr("height", height)
                    .attr("width", width);

                svg.append("text")
                    .attr("class", "today-label")
                    .attr("transform", "translate(" + Math.round(todayX + width / 2) + ", 0)")
                    .attr("text-anchor", "middle")
                    .text(scope.todayText);
            };

            var addTimeOverlay = function (scope, svg, timeOverlayData, width, height, minDate, maxDate, x, y, attributes) {
                // null check
                if (timeOverlayData === undefined || timeOverlayData === null || timeOverlayData.length === 0) {
                    return;
                }
                // draw
                var timeOverlayText = svg.selectAll(".chart")
                    .data(timeOverlayData)
                    .enter()
                    // add text
                    .append("text")
                    .attr("class", "overlay-title")
                    .attr("transform", function (d) {
                        var x2 = x(d[scope.timeOverlayEndDateField]),
                            x1 = x(d[scope.timeOverlayStartDateField]),
                            width = (x2 - x1) / 2;
                        width = (width < 0) ? 0 : width;
                        return "translate(" + Math.round(x1 + width) + ", " + (-0.5 * attributes.top) + ")";
                    })
                    .attr("dx", 6) // todo parameterize
                    .attr("dy", 0)
                    .text(function (d) {
                        if (scope.hasTimeOverlayLabelFunc) {
                            return scope.timeOverlayLabelFunc({'value': d});
                        }
                        return d[scope.timeOverlayLabelField];
                    })
                    .attr("width", function (d) {
                        var x2 = x(d[scope.timeOverlayEndDateField]),
                            x1 = x(d[scope.timeOverlayStartDateField]);
                        if (x1 >= x2) {
                            return 0;
                        }
                        return Math.round(x2 - x1);
                    })
                    .call(wordWrap, scope);
                // add tool tips?
                addTimeOverlayTooltips(scope, timeOverlayText);
                // start line
                svg.selectAll(".chart")
                    .data(timeOverlayData)
                    .enter()
                    .append("rect")
                    .attr("class", "overlay-line")
                    .attr("y", 0)
                    .attr("transform", function (d) {
                        return "translate(" + Math.round(x(d[scope.timeOverlayStartDateField])) + ", 0)";
                    })
                    .attr("height", height)
                    .attr("width", 1); // todo parameterize
                // end line
                svg.selectAll(".chart")
                    .data(timeOverlayData)
                    .enter()
                    .append("rect")
                    .attr("class", "overlay-line")
                    .attr("y", 0)
                    .attr("transform", function (d) {
                        return "translate(" + Math.round(x(d[scope.timeOverlayEndDateField])) + ", 0)";
                    })
                    .attr("height", height)
                    .attr("width", 1); // todo parameterize
            };

            var addTimeOverlayTooltips = function (scope, element) {
                if (!scope.hasTimeOverlayToolTipLabelFunc) {
                    return;
                }
                element.on("mouseover", function (d) {
                    var displayText = scope.timeOverlayToolTipLabelFunc({'value': d});
                    scope.div.transition()
                        .duration(500)
                        .style("opacity", 0);
                    scope.div.transition()
                        .duration(200)
                        .style("opacity", 1);
                    scope.div.html(displayText)
                        .style("left", ((d3.event.pageX + 15) + "px")) // todo parameterize
                        .style("top", (d3.event.pageY - 30) + "px"); // todo parameterize
                });
            };

            var calcMinDate = function (scope) {
                // if defined, used definition
                if (scope.minDate !== null) {
                    return scope.minDate;
                }
                // otherwise we calculate based on data
                var dates = [];
                if (scope.chartData !== null && scope.chartData.length > 0) {
                    for (var i = 0, n = scope.chartData.length; i < n; i++) {
                        if (scope.chartData[i][scope.startDateField] !== null) {
                            dates.push(scope.chartData[i][scope.startDateField].getTime());
                        }
                    }
                } else {
                    dates = [new Date()];
                }
                var date = Math.min.apply(null, dates);
                if (scope.suggestedMinDate !== null) {
                    date = Math.max.apply(null, [date, scope.suggestedMinDate.getTime()]);
                }
                return new Date(date);
            };

            var calcMaxDate = function (scope) {
                // if defined, used definition
                if (scope.maxDate !== null) {
                    return scope.maxDate;
                }
                // otherwise we calculate based on data
                var dates = [];
                if (scope.chartData !== null && scope.chartData.length > 0) {
                    for (var i = 0, n = scope.chartData.length; i < n; i++) {
                        if (scope.chartData[i][scope.endDateField] !== null) {
                            dates.push(scope.chartData[i][scope.endDateField].getTime());
                        }
                    }
                } else {
                    dates = [new Date()];
                }

                var date = Math.max.apply(null, dates);
                if (scope.suggestedMaxDate !== null) {
                    date = Math.min.apply(null, [date, scope.suggestedMaxDate.getTime()]);
                }
                return new Date(date);
            };

            var prepareData = function (scope, uniqueField, parseDate) {
                // null check
                if (scope.chartData === undefined || scope.chartData === null || scope.chartData.length === 0 ||
                    uniqueField === undefined || uniqueField === null || uniqueField.length === 0) {
                    return null;
                }
                // go through data and make sure that the data is properly formatted
                for (var i = 0, n = scope.chartData.length; i < n; i++) {
                    var item = scope.chartData[i];
                    if (!(item[scope.startDateField] instanceof Date)) { // if not a date
                        // make it a date
                        item[scope.startDateField] = parseDate(item[scope.startDateField]);
                    }
                    if (!(item[scope.endDateField] instanceof Date)) { // if not a date
                        // make it a date
                        item[scope.endDateField] = parseDate(item[scope.endDateField]);
                    }
                }
                // create gantt data
                var groupedCollection = createGroupedCollectionsFilter(scope.chartData, scope.colorField);
                return transDataToGanttDataFilter(scope.chartData, scope.colorField,
                    scope.startDateField, scope.endDateField, uniqueField, groupedCollection);
            };

            var cleanTimeOverlayData = function (scope, minDate, maxDate, parseDate) {
                // null check
                if (scope.timeOverlay === undefined ||
                    scope.timeOverlay === null ||
                    scope.timeOverlay.length === 0 ||
                    scope.timeOverlayStartDateField === undefined ||
                    scope.timeOverlayStartDateField === null ||
                    scope.timeOverlayStartDateField.length === 0 ||
                    scope.timeOverlayEndDateField === undefined ||
                    scope.timeOverlayEndDateField === null ||
                    scope.timeOverlayEndDateField.length === 0) {
                    return null;
                }
                // go through data and make sure that the data is properly formatted
                var item = null, values = [];
                for (var i = 0, n = scope.timeOverlay.length; i < n; i++) {
                    item = scope.timeOverlay[i];
                    if (item[scope.timeOverlayStartDateField] !== null && !(item[scope.timeOverlayStartDateField] instanceof Date)) { // if not a date
                        // make it a date
                        item[scope.timeOverlayStartDateField] = parseDate(item[scope.timeOverlayStartDateField]);
                    }
                    if (item[scope.timeOverlayEndDateField] !== null && !(item[scope.timeOverlayEndDateField] instanceof Date)) { // if not a date
                        // make it a date
                        item[scope.timeOverlayEndDateField] = parseDate(item[scope.timeOverlayEndDateField]);
                    }
                    // determine if the period is in the view
                    if (item[scope.timeOverlayStartDateField] !== null &&
                        item[scope.timeOverlayEndDateField] !== null &&
                        item[scope.timeOverlayEndDateField] > minDate && item[scope.timeOverlayStartDateField] < maxDate) {
                        values.push(item);
                    }
                }
                return values;
            };

            var determineUniqueTypes = function (data, uniqueField) {
                if (data === undefined || data === null || data.length === 0 ||
                    uniqueField === undefined || uniqueField === null || uniqueField.length === 0) {
                    return [];
                }
                // create object with unique fields
                var fields = {}, fieldsArray = [];
                for (var i = 0, n = data.length; i < n; i++) {
                    fields[data[i][uniqueField]] = true;
                }
                // turn object into array
                for (var key in fields) {
                    fieldsArray.push(key);
                }
                return fieldsArray;
            };

            var wordWrap = function (text, scope) {
                text.each(function () {
                    var text = d3.select(this),
                        width = parseFloat(text.attr("width")), // todo add text padding removal
                        words = text.text().split(/\s+/).reverse(),
                        word,
                        line = [],
                        lineNumber = 0,
                        maxLines = scope.attributes.maxLinesOfText - 1,
                        lineHeight = 1.1, //em
                        y = text.attr("y"),
                        dy = parseFloat(text.attr("dy")),
                        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
                    // check if width is zero and just stop
                    if (width === 0) {
                        return;
                    }
                    // next go through the words and make wrapping
                    while (word = words.pop()) {
                        line.push(word);
                        tspan.text(line.join(" "));
                        if (tspan.node().getComputedTextLength() > width) {
                            // first see if the word is just too big
                            if (line.length === 1) {
                                line.pop();
                                line.push("...");
                                tspan.text(line.join(" "));
                                if (tspan.node().getComputedTextLength() > width) {
                                    line.pop();
                                    tspan.text(line.join(" "));
                                }
                                break;
                            }
                            // second see if we can add a new line
                            if (lineNumber >= maxLines) {
                                line.pop();
                                line.push("...");
                                tspan.text(line.join(" "));
                                if (tspan.node().getComputedTextLength() > width) {
                                    line.pop();
                                    tspan.text(line.join(" "));
                                }
                                break;
                            }

                            // if we can add it
                            line.pop();
                            tspan.text(line.join(" "));
                            line = [word];
                            tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
                        }
                    }
                });
            };

            var clear = function (scope) {
                var svg = d3.select(scope.chart);
                if (!svg.empty()) {
                    svg.selectAll("*").remove();
                }
                if (scope.div !== undefined && scope.div !== null) {
                    scope.div.remove();
                }
            };

            var setDefaults = function (scope, attributes) {
                // attributes defaults
                attributes.top = Number(attributes.top) || 40;
                attributes.bottom = Number(attributes.bottom) || 50;
                attributes.left = Number(attributes.left) || 50;
                attributes.right = Number(attributes.right) || 20;
                attributes.width = Number(attributes.width) || 600;
                attributes.height = Number(attributes.height) || 300;
                attributes.percentWidth = Number(attributes.percentWidth) || NaN;
                attributes.percentHeight = Number(attributes.percentHeight) || NaN;
                attributes.rowHeight = Number(attributes.rowHeight) || NaN;
                attributes.rowVPadding = Number(attributes.rowVPadding) || 1;
                attributes.axisFieldPositionX = attributes.axisFieldPositionX || "bottom";
                attributes.axisFieldPositionY = attributes.axisFieldPositionY || "left";
                attributes.maxLinesOfText = Number(attributes.maxLinesOfText) || 1;
                attributes.cornerRadiusX = Number(attributes.cornerRadiusX) || 0;
                attributes.cornerRadiusY = Number(attributes.cornerRadiusY) || 0;
                // scope defaults
                scope.chartData = scope.chartData || null;
                scope.timeOverlay = scope.timeOverlay || null;
                scope.dateFormat = scope.dateFormat || "%d-%b-%y";
                scope.dateFormatXAxis = scope.dateFormatXAxis || "%m-%d %a";
                scope.startDateField = scope.startDateField || "startDate";
                scope.endDateField = scope.endDateField || "endDate";
                scope.timeOverlayLabelField = scope.timeOverlayLabelField || "label";
                scope.timeOverlayStartDateField = scope.timeOverlayStartDateField || "startDate";
                scope.timeOverlayEndDateField = scope.timeOverlayEndDateField || "endDate";
                scope.colorField = scope.colorField || "color";
                scope.colorsMap = scope.colorsMap || null;
                scope.maxDate = handleDateParameters(scope.maxDate, null, 86400000); // one day
                scope.minDate = handleDateParameters(scope.minDate, null, 0);
                scope.suggestedMaxDate = handleDateParameters(scope.maxDate, null, 86400000); // one day
                scope.suggestedMinDate = handleDateParameters(scope.minDate, null, 0);
                scope.showToday = handleBooleanParameters(scope.showToday, true);
                scope.showXAxis = handleBooleanParameters(scope.showXAxis, true);
                scope.showYAxis = handleBooleanParameters(scope.showYAxis, true);
                scope.hideToolTipOnMouseOut = handleBooleanParameters(scope.hideToolTipOnMouseOut, true);
                scope.labelField = scope.labelField || "label";
                scope.todayText = scope.todayText || "today";
                // check for callbacks
                scope.hasTooltipLabelFunc = angular.isDefined(attributes.tooltipLabelFunc);
                scope.hasTimeOverlayLabelFunc = angular.isDefined(attributes.timeOverlayLabelFunc);
                scope.hasTimeOverlayToolTipLabelFunc = angular.isDefined(attributes.timeOverlayToolTipLabelFunc);
                scope.hasAxisXFunc = angular.isDefined(attributes.axisXFunc);
                scope.hasAxisYFunc = angular.isDefined(attributes.axisYFunc);
                scope.hasAxisYFieldLabelFunc = angular.isDefined(attributes.axisYFieldLabelFunc);
                scope.hasItemClickHandlerFunc = angular.isDefined(attributes.itemClickHandlerFunc);
            };

            var handleDateParameters = function (value, defaultValue, offset) {
                if (defaultValue === undefined) {
                    defaultValue = null;
                }
                if (value === undefined || value === null || value.length === 0) {
                    return defaultValue;
                }
                if (value instanceof Date) {
                    return value;
                } else {
                    var d = new Date(value);
                    if (d !== null) {
                        return new Date(d.getTime() + offset);
                    }
                }
                return null;
            };

            var handleBooleanParameters = function (value, defaultValue) {
                if (defaultValue === undefined || defaultValue === null) {
                    defaultValue = false;
                }
                if (value === undefined || value === null) {
                    return defaultValue;
                }
                return (value === true || value === "true") ? true : false;
            };

            var addWatches = function (scope, values) {
                for (var i = 0, n = values.length; i < n; i++) {
                    scope.$watch(values[i], onChangeFunction);
                }
            };

            var addObservers = function (scope, values) {
                var func = function (value) {
                    onChangeFunction(value, undefined, scope);
                };
                for (var i = 0, n = values.length; i < n; i++) {
                    scope.attributes.$observe(values[i], func);
                }
            };
            //-------------------------------------------------------------------------
            //
            //  Handlers
            //
            //-------------------------------------------------------------------------
            var onChangeFunction = function (newValue, oldValue, scope) {
                if (angular.equals(newValue, oldValue)) {
                    return;
                }
                if (scope.timeoutDeregister !== undefined &&
                    scope.timeoutDeregister !== null) {
                    return;
                }
                // call for update
                scope.timeoutDeregister = $timeout(function () {
                    clear(scope);
                    setDefaults(scope, scope.attributes);
                    init(scope, scope.element, scope.attributes, scope.controller);
                    $timeout.cancel(scope.timeoutDeregister);
                    scope.timeoutDeregister = null;
                });
            };

            var onParentResize = function (parent, scope) {
                if (scope.timeoutDeregister !== undefined &&
                    scope.timeoutDeregister !== null) {
                    return;
                }
                // call for update
                scope.timeoutDeregister = $timeout(function () {
                    clear(scope);
                    setDefaults(scope, scope.attributes);
                    init(scope, scope.element, scope.attributes, scope.controller);
                    $timeout.cancel(scope.timeoutDeregister);
                    scope.timeoutDeregister = null;
                });
            };

            var onRemove = function (event, scope) {
                clear(scope);
            };
            //-------------------------------------------------------------------------
            //
            //  Directive Stuff
            //
            //-------------------------------------------------------------------------
            var directive = {
                restrict: "AE",
                scope: {
                    chartData: "=",
                    timeOverlay: "=",
                    timeOverlayLabelField: "@",
                    timeOverlayStartDateField: "@",
                    timeOverlayEndDateField: "@",
                    dateFormat: "@",
                    dateFormatXAxis: "@",
                    showXAxis: "@",
                    showYAxis: "@",
                    showToday: "@",
                    labelField: "@",
                    startDateField: "@",
                    endDateField: "@",
                    colorsMap: "=",
                    colorField: "@",
                    maxDate: "@",
                    minDate: "@",
                    suggestedMaxDate: "@",
                    suggestedMinDate: "@",
                    todayText: "@",
                    hideToolTipOnMouseOut: "@",
                    // callback functions
                    tooltipLabelFunc: "&",
                    rowLabelFunc: "&",
                    columnLabelFunc: "&",
                    axisYFieldLabelFunc: "&",
                    itemClickHandlerFunc: "&",
                    timeOverlayLabelFunc: "&",
                    timeOverlayToolTipLabelFunc: "&",
                    axisXFunc: "&",
                    axisYFunc: "&"
                }
            };

            directive.controller = ['$scope', '$element', function ($scope, $element) {
                var chart = this;
            }];

            directive.link = function (scope, element, attributes, controller) {
                // hold vars
                scope.element = element;
                scope.controller = controller;
                scope.attributes = attributes;
                scope.chart = element[0];
                // set default, if necessary
                setDefaults(scope, attributes);
                // listen to parent resize changes
                scope.parent = element.parent();
                $(window).on("resize", function (event) {
                    onParentResize(parent, scope);
                });
                // create based on provided options
                init(scope, element, attributes, controller);
                // watch for any scope changes
                addWatches(scope, [
                    'chartData', 'dateFormat', 'dateFormatXAxis',
                    'showXAxis', 'showYAxis', 'showToday',
                    'startDateField', 'endDateField',
                    'colorsMap', 'colorField',
                    'maxDate', 'minDate', 'labelField',
                    'suggestedMaxDate', 'suggestedMinDate',
                    'todayText', 'hideToolTipOnMouseOut'
                ]);
                // observe attributes
                addObservers(scope, [
                    'top', 'bottom', 'left', 'right',
                    'percentWidth', 'percentHeight',
                    'rowHeight', 'columnWidth',
                    'rowVPadding', 'maxLinesOfText',
                    'axisFieldPositionX', 'axisFieldPositionY',
                    'cornerRadiusX', 'cornerRadiusY'
                ]);
                // on remove cleanup
                element.on('$destroy', function (event) {
                    onRemove(event, scope);
                });
            };

            return directive;
        }]);
})();