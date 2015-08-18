/* istanbul ignore next */
/**
 * Created by jonbcampos on 2/23/15.
 */
(function () {

    /* global d3 */
    'use strict';
    /**
     * @ngdoc directive
     * @name common.directives.charts.barchart
     * @restrict EA
     * @scope
     *
     * @description
     * creates a bar chart using the d3 charting library.
     *
     * Below is a list of attributes and what they do for this directive.
     * Please note that changing the attribute for any reason calls a redraw -
     * even if you are just setting the same value.
     *
     * | Name | Effect | Options | Default |
     * |------|--------|---------|---------|
     * | top ||||
     * | bottom ||||
     * | left ||||
     * | right ||||
     * | chartClass ||||
     * | tickCountX ||||
     * | tickXLabel ||||
     * | tickCountY ||||
     * | tickYLabel ||||
     * | percentWidth ||||
     * | percentHeight ||||
     * | legendSquareSize ||||
     * | bottomLegendPosition ||||
     *
     * Below is a list of scope properties and what they do for this directive.
     * Please note that changing the property will cause a refresh only if the
     * value is actually difference.
     *
     * | Name | Effect | Options | Default | Required |
     * |------|--------|---------|---------|---------|
     * | chartData |||||
     * | axisFieldX |||||
     * | axisFieldsY |||||
     * | axisFieldLabelY |||||
     * | axisFieldTypeX |||||
     * | axisFieldTypeY |||||
     * | axisFieldPositionX |||||
     * | axisFieldPositionY |||||
     * | dateFormat |||||
     * | colors |||||
     * | colorList |||||
     * | showXAxis |||||
     * | showYAxis |||||
     * | showLabels |||||
     * | chartLegendGap |||||
     * | showBottomLegend |||||
     * | showChartLegend |||||
     * | chartLegendXPosition |||||
     * | chartLegendXOffset |||||
     * | chartLegendYPosition |||||
     * | chartLegendYOffset |||||
     * | defaultYValue |||||
     * | useProvidedPoints |||||
     * | axisFormatterX |||||
     * | skipMissingDataElements |||||
     * | hideToolTipOnMouseOut |||||
     * | chartDataPivoted |||||
     * | sortValues |||||
     *
     * Below is a list of callback/external functions that are
     * called by the directive for formatting or calculation purposes.
     *
     * | Name | Effect | Options | Default |
     * |------|--------|---------|---------|
     * | tooltipLabelFunc(value) ||||
     * | axisXFunc(value) ||||
     * | axisYFunc(value, field) ||||
     * | axisXFieldLabelFunc(value) ||||
     * | axisYFieldLabelFunc(value, field) ||||
     * | pointClickHandlerFunc(value) ||||
     * | legendLabelFunc(value, elem) ||||
     * | createXTicks(value) ||||
     * | customNestSortFunc(a,b) ||||
     *
     * @example
     * <doc:example module="demoApp">
     *    <doc:source>
     *        <style>
     *            .axis path,
     *            .axis line {
     *              fill: none;
     *              stroke: #000;
     *              shape-rendering: crispEdges;
     *            }
     *
     *            .bar {
     *              fill: steelblue;
     *            }
     *
     *            .bar.red {
     *              fill: red;
     *            }
     *
     *            .bar.green {
     *              fill: green;
     *            }
     *
     *            .x.axis path {
     *              display: none;
     *            }
     *
     *            .focus{
     *              fill: none;
     *              stroke: #000;
     *            }
     *
     *            div.tooltip{
     *              position: absolute;
     *              padding: 10px;
     *              background: #000;
     *              border: 0px;
     *              border-radius: 2px;
     *              color: #fff;
     *            }
     *        </style>
     *        <script>
     *          function Ctrl($scope) {
     *              $scope.chartData = [
     *                  {date: '4-Apr-12', close: 34, open: 10, high: 50, low:8},
     *                  {date: '5-Apr-12', close: 45, open: 8, high: 65, low:8},
     *                  {date: '6-Apr-12', close: 37, open: 12, high: 45, low:5},
     *                  {date: '7-Apr-12', close: 56, open: 14, high: 64, low:5},
     *                  {date: '8-Apr-12', close: 50, open: 18, high: 51, low:12},
     *                  {date: '9-Apr-12', close: 77, open: 22, high: 83, low:21},
     *                  {date: '10-Apr-12', close: 67, open: 24, high: 75, low:12},
     *                  {date: '11-Apr-12', close: 59, open: 20, high: 67, low:13},
     *                  {date: '12-Apr-12', close: 83, open: 17, high: 96, low:10}
     *              ];
     *              $scope.xAxisField = "date";
     *              $scope.yAxisFields = {
     *                  "all": ["close","open","high","low"],
     *                  "selected": "open"
     *              };
     *              $scope.yAxisFieldLabel = "Price ($)";
     *              $scope.colors = ["category10", "category20", "category20b", "category20c"];
     *              $scope.color = "category20";
     *              $scope.showXAxis = true;
     *              $scope.showYAxis = true;
     *              $scope.showLabels = true;
     *              $scope.showBottomLegend = true;
     *              $scope.showChartLegend = true;
     *
     *              $scope.tooltipFormatter = function (d) {
     *                  var t = "", key;
     *                  for (key in d) {
     *                      t += '<strong>' + key + '</strong> ' + d[key] + '<br/>';
     *                  }
     *                  return t;
     *              };
     *
     *              $scope.barClassFunc = function(d){
     *                  if(d.yValue>18){
     *                      return "green";
     *                  } else if(d.yValue<18){
     *                      return "red";
     *                  } else {
     *                      return "";
     *                  }
     *              };
     *          }
     *        </script>
     *        <div ng-controller="Ctrl">
     *          <div>
     *              <h1>Bar Chart Options</h1>
     *              <p>
     *                  <strong>yAxisFields</strong>
     *                  <select ng-options="value for value in yAxisFields.all"
     *                          ng-change="onChange();"
     *                          ng-model="yAxisFields.selected"></select>
     *              </p>
     *              <p>
     *                  <strong>yAxisField label</strong>
     *                 <input ng-model="yAxisFieldLabel" type="text">
     *              </p>
     *              <p>
     *                  <strong>Colors</strong>
     *                  <select ng-options="value for value in colors" ng-model="color"></select>
     *              </p>
     *              <p>
     *                  <strong>Show X Axis</strong>
     *                  <input type="checkbox" ng-model="showXAxis"></input>
     *              </p>
     *              <p>
     *                  <strong>Show Y Axis</strong>
     *                  <input type="checkbox" ng-model="showYAxis"></input>
     *              </p>
     *              <p>
     *                  <strong>Show Labels</strong>
     *                  <input type="checkbox" ng-model="showLabels"></input>
     *              </p>
     *              <p>
     *                  <strong>Show Bottom Legend</strong>
     *                  <input type="checkbox" ng-model="showBottomLegend"></input>
     *              </p>
     *              <p>
     *                  <strong>Show Chart Legend</strong>
     *                  <input type="checkbox" ng-model="showChartLegend"></input>
     *              </p>
     *          </div>
     *          <barchart
     *              axis-field-x="xAxisField"
     *              axis-field-y="yAxisFields.selected"
     *              axis-field-label-y="{{yAxisFieldLabel}}"
     *              chart-data="chartData"
     *              colors="{{color}}"
     *              show-bottom-legend="{{showBottomLegend}}"
     *              show-chart-legend="{{showChartLegend}}"
     *              show-x-axis="{{showXAxis}}"
     *              show-y-axis="{{showYAxis}}"
     *              show-labels="{{showLabels}}"
     *              tooltip-label-func="tooltipFormatter(value)"
     *              bar-class-func="barClassFunc(value)">
     *          </barchart>
     *        </div>
     *    </doc:source>
     * </doc:example>
     */
    var barchartDirective = angular.module('common.directives.charts.barchart', []);

    barchartDirective.directive('barchart', ['$timeout', 'currencyFilter', function ($timeout, currencyFilter) {

        //-------------------------------------------------------------------------
        //
        //  Methods
        //
        //-------------------------------------------------------------------------
        var init = function (scope, element, attributes, controller) {
            // null check
            if ((scope.axisFieldX === undefined || scope.axisFieldX === null || scope.axisFieldX.length === 0) && !scope.hasAxisXFunc) {
                return;
            }
            if ((scope.axisFieldY === undefined || scope.axisFieldY === null || scope.axisFieldY.length === 0) && !scope.hasAxisYFunc) {
                return;
            }
            if (scope.chartData === undefined || scope.chartData === null || scope.chartData.length === 0) {
                return;
            }
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
                parseDate = d3.time.format(scope.dateFormat).parse,
                color = d3.scale[scope.colors](),
                chartData = pivotData(scope),
                svg = d3.select(scope.chart)
                    .append('svg')
                    .attr('width', calcWidth)
                    .attr('height', calcHeight)
                    .append('g')
                    .attr('transform', 'translate(' + attributes.left + ',' + attributes.top + ')'),
                overlay = d3.select(scope.chart)
                    .select('svg')
                    .attr('width', calcWidth)
                    .attr('height', calcHeight)
                    .append('g'),
                x = createXScale(scope, width, chartData),
                y = createYScale(scope, height, chartData);
            // use custom colors?
            if (scope.colorList !== undefined &&
                scope.colorList !== null &&
                scope.colorList.length > 0) {
                color = d3.scale.ordinal().range(scope.colorList);
            }
            // tooltip div
            scope.div = d3.select("body")
                .append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            // formats the values by type
            if (!scope.chartDataPivoted) {
                formatValues(scope, parseDate, chartData);
            }

            // loop through each symbol / key
            var xValues = createValuesByProperty(chartData, "xValue"),
                min = calcMinValue(scope, chartData),
                max = calcMaxValue(scope, chartData);
            // set up domains (max/mins)
            x.domain(xValues);
            y.domain([min, max]);

            // start up the chart by adding axii
            var xAxis = createXAxis(scope, x, attributes, chartData);
            var yAxis = createYAxis(scope, y, attributes);

            // add to chart
            addXAxis(scope, svg, height, xAxis);
            addYAxis(scope, svg, yAxis);

            var bar = addBars(scope, svg, chartData, x, y, height);
            addDataLabelForBars(scope, svg, chartData, x, y, min, max);

            // enable rollover data points
            addTooltips(scope, bar);
            addDataPointClickHandler(scope, bar);

            // add the legend element
            addBottomLegend(scope, overlay, color, attributes, width, height);
            addChartLegend(scope, overlay, color, attributes, width, height);

            /// remove tooltip on mouseout
            if (scope.hideToolTipOnMouseOut) {
                svg.on("mouseout", function (d) {
                    scope.div.transition()
                        .duration(500)
                        .style("opacity", 0);
                });
            }
        };

        var createValuesByProperty = function (chartData, property) {
            var obj = {};
            // go through data
            for (var i = 0, n = chartData.length; i < n; i++) {
                var value = chartData[i][property];
                obj[value] = value;
            }
            // create array
            var values = [];
            for (var key in obj) {
                values.push(obj[key]);
            }
            // done
            return values;
        };

        var calcMinValue = function (scope, chartData) {
            // if defined, used definition
            if (!isNaN(scope.axisYMin)) {
                return scope.axisYMin;
            }
            // otherwise we calculate based on data
            var values = [];
            if (!isNaN(scope.axisYMinHint)) {
                values.push(scope.axisYMinHint);
            }
            for (var i = 0, n = chartData.length; i < n; i++) {
                if (chartData[i].yValue !== null) {
                    values.push(chartData[i].yValue);
                }
            }
            return Math.min.apply(null, values);
        };

        var calcMaxValue = function (scope, chartData) {
            // if defined, used definition
            if (!isNaN(scope.axisYMax)) {
                return scope.axisYMax;
            }
            // otherwise we calculate based on data
            var values = [];
            if (!isNaN(scope.axisYMaxHint)) {
                values.push(scope.axisYMaxHint);
            }
            for (var i = 0, n = chartData.length; i < n; i++) {
                if (chartData[i].yValue !== null) {
                    values.push(chartData[i].yValue);
                }
            }
            return Math.max.apply(null, values);
        };

        var createXAxis = function (scope, x, attributes, chartData) {
            var xAxis = d3.svg.axis().scale(x).orient(scope.axisFieldPositionX);
            // format x axis
            if (scope.hasAxisXFieldLabelFunc) {
                xAxis.tickFormat(function (d) {
                    return scope.axisXFieldLabelFunc({'value': d});
                });
            }
            return xAxis;
        };

        var createYAxis = function (scope, y, attributes) {
            var yAxis = d3.svg.axis()
                .scale(y).orient(scope.axisFieldPositionY);
            // format y axis
            if (!(isNaN(attributes.tickCountY))) {
                yAxis.ticks(attributes.tickCountY, attributes.tickYLabel);
            }
            if (scope.hasAxisYFieldLabelFunc) {
                yAxis.tickFormat(function (d) {
                    return scope.axisYFieldLabelFunc({'value': d});
                });
            } else {
                // if no formatting function but is currency
                if (scope.axisFieldTypeY === "currency") {
                    var commasFormatter = d3.format(",.0f");
                    yAxis.tickFormat(function (d) {
                        return "$" + commasFormatter(d);
                    });
                }
            }
            return yAxis;
        };

        var createXScale = function (scope, width, chartData) {
            var xScale = d3.scale.ordinal()
                .rangeRoundBands([0, width], 0.1);
            return xScale;
        };

        var createYScale = function (scope, height, chartData) {
            var yScale = d3.scale.linear()
                .range([height, 0]); // number or currency
            return yScale;
        };

        var addTooltips = function (scope, point) {
            if (!scope.hasTooltipLabelFunc) {
                return;
            }
            point.on("mouseover", function (d) {
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
            if (!scope.hasPointClickHandlerFunc) {
                return;
            }
            point.on("click", function (d) {
                scope.pointClickHandlerFunc({value: d});
            });
        };

        var addBars = function (scope, svg, chartData, x, y, height) {
            return svg.selectAll(".bar")
                .data(chartData)
                .enter().append("rect")
                .attr("class", function (d) {
                    var addOnClass = "";
                    if (scope.hasBarClassFunc) {
                        addOnClass = scope.barClassFunc({value: d});
                    }
                    if (addOnClass !== undefined && addOnClass !== null && addOnClass !== "") {
                        return "bar " + addOnClass;
                    } else {
                        return "bar";
                    }
                })
                .attr("width", function (d) {
                    return x.rangeBand();
                })
                .attr("x", function (d) {
                    return x(d.xValue);
                })
                .attr("y", function (d) {
                    return y(d.yValue);
                })
                .attr("height", function (d) {
                    return height - y(d.yValue);
                });
        };

        var addDataLabelForBars = function (scope, svg, chartData, x, y, min, max) {
            if (!scope.showLabels) {
                return null;
            }

            return svg.selectAll(".text")
                .data(chartData)
                .enter().append("text")
                .attr("class", "bar-label")
                .attr("width", function (d) {
                    return x.rangeBand();
                })
                .attr("x", function (d) {
                    return x(d.xValue) + x.rangeBand() / 2;
                })
                .attr("y", function (d) {
                    return y(d.yValue) + 5;
                })
                .attr("dy", function (d) {
                    return ((d.yValue < min + (max - min) * 0.05) ? '-' : '') + "1em";
                })
                .text(function (d) {
                    if (scope.hasLabelFunc) {
                        return scope.labelFunc({value: d});
                    } else if (scope.axisFieldTypeY === "currency") {
                        return currencyFilter(d.yValue);
                    } else {
                        return d.yValue;
                    }
                });
        };

        var addXAxis = function (scope, svg, height, xAxis) {
            if (!scope.showXAxis) {
                return;
            }
            svg.append('g')
                .attr('class', 'x axis')
                .attr('transform', 'translate(0,' + height + ')')
                .call(xAxis);
        };

        var addYAxis = function (scope, svg, yAxis) {
            if (!scope.showYAxis) {
                return;
            }
            svg.append('g')
                .attr('class', 'y axis')
                .call(yAxis)
                .append('text')
                .attr("class", "y axis label")
                .attr('transform', 'rotate(-90)')
                .attr('y', 6)
                .attr('dy', '.71em')
                .style('text-anchor', 'end')
                .text(scope.axisFieldLabelY);
        };

        var addChartLegend = function (scope, svg, color, attributes, width, height) {
            if (!scope.showChartLegend) {
                return;
            }

            var legendElementX = scope.chartLegendXOffset, // default left
                legendElementY = scope.chartLegendYOffset + attributes.legendSquareSize, // default top
                key = scope.axisFieldY,
                fieldLabel = key;

            if (scope.hasLegendLabelFunc) {
                fieldLabel = scope.legendLabelFunc({'value': key});
            }

            if (scope.chartLegendXPosition === "right") {
                legendElementX = width + attributes.left + attributes.right + scope.chartLegendXOffset;
            }
            if (scope.chartLegendYPosition === "bottom") {
                legendElementY = height + scope.chartLegendYOffset - (attributes.legendSquareSize + scope.chartLegendGap) * i;
            }

            if (scope.chartLegendXPosition === "right") {
                svg.append("text")
                    .attr("x", legendElementX - attributes.legendSquareSize - scope.chartLegendGap)
                    .attr("y", legendElementY)
                    .attr("class", "legend text")
                    .style("text-anchor", "end")
                    .text(fieldLabel);

                svg.append("rect")
                    .attr("x", legendElementX - attributes.legendSquareSize)
                    .attr("y", legendElementY - attributes.legendSquareSize)
                    .attr("width", attributes.legendSquareSize)
                    .attr("height", attributes.legendSquareSize)
                    .attr("class", "legend icon")
                    .style("fill", function () {
                        return color(key);
                    });
            } else {
                svg.append("rect")
                    .attr("x", legendElementX)
                    .attr("y", legendElementY)
                    .attr("width", attributes.legendSquareSize)
                    .attr("height", attributes.legendSquareSize)
                    .attr("class", "legend icon")
                    .style("fill", function () {
                        return color(key);
                    });

                svg.append("text")
                    .attr("x", legendElementX + scope.chartLegendGap + attributes.legendSquareSize)
                    .attr("y", legendElementY + attributes.legendSquareSize)
                    .attr("class", "legend text")
                    .style("text-anchor", "start")
                    .text(fieldLabel);
            }
        };

        var addBottomLegend = function (scope, svg, color, attributes, width, height) {
            if (!scope.showBottomLegend) {
                return;
            }

            var legendElementWidth = width,
                legendElementY = height + attributes.top + attributes.bottom,
                key = scope.axisFieldY,
                fieldLabel = key;

            if (scope.hasLegendLabelFunc) {
                fieldLabel = scope.legendLabelFunc({'value': fieldLabel});
            }

            svg.append("rect")
                .attr("x", attributes.left)
                .attr("y", legendElementY - attributes.legendSquareSize)
                .attr("width", attributes.legendSquareSize)
                .attr("height", attributes.legendSquareSize)
                .attr("class", "legend icon")
                .style("fill", function () {
                    return color(key);
                });

            svg.append("text")
                .attr("x", attributes.left + attributes.legendSquareSize + 5)
                .attr("y", legendElementY)
                .attr("class", "legend text")
                .style("fill", function () {
                    return color(key);
                })
                .text(fieldLabel);
        };

        var pivotData = function (scope) {
            // if already pivoted, stop
            if (scope.chartDataPivoted) {
                return scope.chartData;
            }
            // null check
            var values = [];
            if (scope.chartData === undefined ||
                scope.chartData === null ||
                scope.chartData.length === 0) {
                return values;
            }
            // flip the data for the charting
            for (var j = 0, m = scope.chartData.length; j < m; j++) {
                var item = {}, yField = scope.axisFieldY;
                item.column = yField;
                // pull x value from data structure
                if (scope.hasAxisXFunc) {
                    item.xValue = scope.axisXFunc({'value': scope.chartData[j]});
                } else {
                    item.xValue = scope.chartData[j][scope.axisFieldX];
                }
                // pull y value from data structure
                if (scope.hasAxisYFunc) {
                    item.yValue = scope.axisYFunc({'value': scope.chartData[j], 'field': yField});
                } else {
                    item.yValue = scope.chartData[j][yField];
                }
                // original value
                item.item = scope.chartData[j];
                values.push(item);
            }

            return values;
        };

        var formatValues = function (scope, parseDate, chartData) {
            for (var i = 0, n = chartData.length; i < n; i++) {
                var d = chartData[i];
                if (d === undefined || d === null) {
                    continue;
                }
                // format X values
                if (scope.axisFieldTypeX === "date" && !(d.xValue instanceof Date)) {
                    d.xValue = parseDate(d.xValue);
                } else if (scope.axisFieldTypeX === "number" || scope.axisFieldTypeX === "currency") {
                    d.xValue = +d.xValue;
                } // else just text
                // format Y values
                if (scope.axisFieldTypeY === "date" && !(d.yValue instanceof Date)) {
                    d.yValue = parseDate(d.yValue);
                } else if (scope.axisFieldTypeY === "number" || scope.axisFieldTypeY === "currency") {
                    d.yValue = +d.yValue;
                } // else just text
            }
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
            attributes.top = Number(attributes.top) || 20;
            attributes.bottom = Number(attributes.bottom) || 40;
            attributes.left = Number(attributes.left) || 50;
            attributes.right = Number(attributes.right) || 20;
            attributes.width = Number(attributes.width) || 600;
            attributes.height = Number(attributes.height) || 200;
            attributes.legendSquareSize = Number(attributes.legendSquareSize) || 10;
            attributes.bottomLegendPosition = attributes.bottomLegendPosition || "center";
            attributes.tickCountX = Number(attributes.tickCountX) || NaN;
            attributes.tickXLabel = attributes.tickXLabel || "";
            attributes.tickCountY = Number(attributes.tickCountY) || NaN;
            attributes.tickYLabel = attributes.tickYLabel || "";
            attributes.percentWidth = Number(attributes.percentWidth) || NaN;
            attributes.percentHeight = Number(attributes.percentHeight) || NaN;
            // scope defaults
            scope.dateFormat = scope.dateFormat || "%d-%b-%y";
            scope.axisFormatterX = scope.axisFormatterX || "%d-%b";
            scope.axisFieldTypeY = scope.axisFieldTypeY || "number";
            scope.axisFieldPositionX = scope.axisFieldPositionX || "bottom";
            scope.axisFieldPositionY = scope.axisFieldPositionY || "left";
            scope.colors = scope.colors || "category10";
            scope.colorList = scope.colorList || null;
            scope.showXAxis = handleBooleanParameters(scope.showXAxis, true);
            scope.showYAxis = handleBooleanParameters(scope.showYAxis, true);
            scope.showLabels = handleBooleanParameters(scope.showLabels, true);
            scope.showBottomLegend = handleBooleanParameters(scope.showBottomLegend, false);
            scope.showChartLegend = handleBooleanParameters(scope.showChartLegend, false);
            scope.chartLegendXPosition = scope.chartLegendXPosition || "right";
            scope.chartLegendXOffset = Number(scope.chartLegendXOffset) || 0;
            scope.chartLegendYPosition = scope.chartLegendYPosition || "top";
            scope.chartLegendYOffset = Number(scope.chartLegendYOffset) || 0;
            scope.chartLegendGap = Number(scope.chartLegendGap) || 5;
            scope.defaultYValue = Number(scope.defaultYValue);
            scope.axisYMin = Number(scope.axisYMin) || Number.NaN;
            scope.axisYMax = Number(scope.axisYMax) || Number.NaN;
            scope.axisYMinHint = Number(scope.axisYMinHint) || Number.NaN;
            scope.axisYMaxHint = Number(scope.axisYMaxHint) || Number.NaN;
            scope.useProvidedPoints = handleBooleanParameters(scope.useProvidedPoints, false);
            scope.skipMissingDataElements = handleBooleanParameters(scope.skipMissingDataElements, false);
            scope.hideToolTipOnMouseOut = handleBooleanParameters(scope.hideToolTipOnMouseOut, true);
            scope.chartDataPivoted = handleBooleanParameters(scope.chartDataPivoted, false);
            scope.sortValues = handleBooleanParameters(scope.sortValues, false);
            // check for callbacks
            scope.hasTooltipLabelFunc = angular.isDefined(attributes.tooltipLabelFunc);
            scope.hasAxisXFunc = angular.isDefined(attributes.axisXFunc);
            scope.hasAxisYFunc = angular.isDefined(attributes.axisYFunc);
            scope.hasLegendLabelFunc = angular.isDefined(attributes.legendLabelFunc);
            scope.hasAxisXFieldLabelFunc = angular.isDefined(attributes.axisXFieldLabelFunc);
            scope.hasAxisYFieldLabelFunc = angular.isDefined(attributes.axisYFieldLabelFunc);
            scope.hasPointClickHandlerFunc = angular.isDefined(attributes.pointClickHandlerFunc);
            scope.hasCreateXTicksFunc = angular.isDefined(attributes.createXTicksFunc);
            scope.hasCustomNestSortFunc = angular.isDefined(attributes.customNestSortFunc);
            scope.hasBarClassFunc = angular.isDefined(attributes.barClassFunc);
            scope.hasLabelFunc = angular.isDefined(attributes.labelFunc);
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
            restrict: "EA",
            scope: {
                chartData: "=",
                axisFieldX: "=",
                axisFieldY: "=",
                axisFieldLabelY: "@",
                axisFormatterX: "@",
                axisFieldTypeY: "@", // number, currency
                axisFieldPositionX: "@", // top/bottom
                axisFieldPositionY: "@", // left/right
                dateFormat: "@",
                showXAxis: "@",
                showYAxis: "@",
                showLabels: "@",
                tickCountX: "@",
                tickXLabel: "@",
                tickCountY: "@",
                tickYLabel: "@",
                colors: "@", // category10, category20, category20b, category20c
                colorList: "@",
                showBottomLegend: "@",
                showChartLegend: "@",
                chartLegendXPosition: "@", // left, right
                chartLegendXOffset: "@",
                chartLegendYPosition: "@", // top, bottom
                chartLegendYOffset: "@",
                chartLegendGap: "@",
                defaultYValue: "@",
                skipMissingDataElements: "@",
                useProvidedPoints: "@",
                hideToolTipOnMouseOut: "@",
                chartDataPivoted: "@",
                sortValues: "@",
                axisYMin: "@",
                axisYMax: "@",
                axisYMinHint: "@",
                axisYMaxHint: "@",
                // callback functions
                tooltipLabelFunc: "&",
                axisXFieldLabelFunc: "&",
                axisYFieldLabelFunc: "&",
                labelFunc: "&",
                legendLabelFunc: "&",
                pointClickHandlerFunc: "&",
                axisXFunc: "&",
                axisYFunc: "&",
                barClassFunc: "&",
                createXTicksFunc: "&",
                customNestSortFunc: "&"
            }
        };

        directive.controller = ['$scope', '$element', function ($scope, $element) {
            var barchart = this;
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
                'chartData', 'axisFieldX', 'axisFieldY',
                'axisFieldLabelY', 'axisFieldTypeY',
                'axisYMin', 'axisYMax',
                'axisYMinHint', 'axisYMaxHint',
                'axisFieldPositionX', 'axisFieldPositionY',
                'dateFormat', 'colors', 'colorList',
                'showXAxis', 'showYAxis', 'showLabels',
                'showBottomLegend', 'showChartLegend',
                'chartLegendXPosition', 'chartLegendXOffset',
                'chartLegendYPosition', 'chartLegendYOffset',
                'chartLegendGap', 'defaultYValue', 'useProvidedPoints',
                'hideToolTipOnMouseOut', 'chartDataPivoted', 'sortValues'
            ]);
            // observe attributes
            addObservers(scope, [
                'top', 'bottom', 'left', 'right',
                'legendSquareSize',
                'tickCountX', 'tickXLabel', 'tickCountY', 'tickYLabel',
                'percentWidth', 'percentHeight'
            ]);
            // on remove cleanup
            element.on('$destroy', function (event) {
                onRemove(event, scope);
            });
        };

        return directive;
    }]);
})();