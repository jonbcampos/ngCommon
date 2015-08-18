/* istanbul ignore next */
/**
 * Created by jonbcampos on 12/17/14.
 */
(function () {

    /* global d3 */
    'use strict';
    /**
     * @ngdoc directive
     * @name common.directives.charts.linechart
     * @restrict EA
     * @scope
     *
     * @description
     * creates a line chart using the d3 charting library.
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
     * | pointRadius ||||
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
     * | interpolation |||||
     * | colors |||||
     * | colorList |||||
     * | showXAxis |||||
     * | showYAxis |||||
     * | showLabels |||||
     * | showLines |||||
     * | showDataPoints |||||
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
     * | showToday |||||
     * | todayText |||||
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
     * | axisYFieldLabelFunc(value) ||||
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
     *            .x.axis path {
     *              display: none;
     *            }
     *
     *            .line {
     *              fill: none;
     *              stroke: steelblue;
     *              stroke-width: 1.5px;
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
     *                  "selected": ["low", "open"]
     *              };
     *              $scope.yAxisFieldLabel = "Price ($)";
     *              $scope.interpolate = "basis";
     *              $scope.interpolations = ["linear", "linear-closed", "step", "step-before", "step-after",
     *                                          "basis", "basis-open", "basis-closed", "bundle",
     *                                          "cardinal", "cardinal-open", "cardinal-closed", "monotone"];
     *              $scope.colors = ["category10", "category20", "category20b", "category20c"];
     *              $scope.color = "category20";
     *              $scope.showXAxis = true;
     *              $scope.showYAxis = true;
     *              $scope.showLines = true;
     *              $scope.showDataPoints = true;
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
     *          }
     *        </script>
     *        <div ng-controller="Ctrl">
     *          <div>
     *              <h1>Line Chart Options</h1>
     *              <p>
     *                  <strong>yAxisFields</strong>
     *                  <select ng-options="value for value in yAxisFields.all"
     *                          ng-change="onChange();"
     *                          ng-multiple="true" multiple
     *                          ng-model="yAxisFields.selected"></select>
     *              </p>
     *              <p>
     *                  <strong>yAxisField label</strong>
     *                 <input ng-model="yAxisFieldLabel" type="text">
     *              </p>
     *              <p>
     *                  <strong>Interpolation</strong>
     *                  <select ng-options="value for value in interpolations" ng-model="interpolate"></select>
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
     *                  <strong>Show Lines</strong>
     *                  <input type="checkbox" ng-model="showLines"></input>
     *              </p>
     *              <p>
     *                  <strong>Show Data Points</strong>
     *                  <input type="checkbox" ng-model="showDataPoints"></input>
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
     *          <linechart
     *              axis-field-x="xAxisField"
     *              axis-fields-y="yAxisFields.selected"
     *              axis-field-label-y="{{yAxisFieldLabel}}"
     *              chart-data="chartData"
     *              interpolation="{{interpolate}}"
     *              colors="{{color}}"
     *              show-lines="{{showLines}}"
     *              show-bottom-legend="{{showBottomLegend}}"
     *              show-chart-legend="{{showChartLegend}}"
     *              show-data-points="{{showDataPoints}}"
     *              show-x-axis="{{showXAxis}}"
     *              show-y-axis="{{showYAxis}}"
     *              show-labels="{{showLabels}}"
     *              tooltip-label-func="tooltipFormatter(value)">
     *          </linechart>
     *        </div>
     *    </doc:source>
     * </doc:example>
     */
    var linechartDirective = angular.module('common.directives.charts.linechart', []);

    linechartDirective.directive('linechart', ['$timeout', 'currencyFilter', function ($timeout, currencyFilter) {

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
            if ((scope.axisFieldsY === undefined || scope.axisFieldsY === null || scope.axisFieldsY.length === 0) && !scope.hasAxisYFunc) {
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
                xAxis, yAxis,
                line = d3.svg.line()
                    .interpolate(scope.interpolation)
                    .x(function (d) {
                        return x(d.xValue);
                    })
                    .y(function (d) {
                        return y(d.yValue);
                    }),
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
                    .append('g');
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

            // needs to be after the formatted data
            var x = createXScale(scope, width, chartData),
                y = createYScale(scope, height, chartData);

            // background drawing
            addHorizontalValueLines(scope, svg, width, x, y, attributes);

            // start up the chart by adding axii
            xAxis = createXAxis(scope, x, attributes, chartData);
            yAxis = createYAxis(scope, y, attributes, chartData);
            addXAxis(scope, svg, height, xAxis);
            addYAxis(scope, svg, yAxis);

            // background decor
            addTodayIndicator(scope, svg, height, x);

            // loop through each symbol / key
            var dataNest = createDataNest(scope, chartData);
            dataNest.forEach(function (dataElem, i) {
                // create paths
                addPathsForDataElement(scope, svg, dataElem, line, color);
                // show data points
                addDataPointForDataElement(scope, svg, dataElem, attributes, color, x, y);
                // show text
                addDataLabelForDataElement(scope, svg, dataElem, x, y);
                // add the legend element
                addBottomLegend(scope, overlay, color, attributes, width, height, dataNest, dataElem, i);
                addChartLegend(scope, overlay, color, attributes, width, height, dataNest, dataElem, i);
            });

            /// remove tooltip on mouseout
            if (scope.hideToolTipOnMouseOut) {
                svg.on("mouseout", function (d) {
                    scope.div.transition()
                        .duration(500)
                        .style("opacity", 0);
                });
            }
        };

        var createDataNest = function (scope, chartData) {
            var dataNest = null;
            if (scope.sortValues && scope.hasCustomNestSortFunc) {
                dataNest = d3.nest()
                    .key(function (d) {
                        return d.column;
                    })
                    .sortValues(function (a, b) {
                        return scope.customNestSortFunc({"a": a, "b": b});
                    })
                    .entries(chartData);
            } else if (scope.sortValues) {
                dataNest = d3.nest()
                    .key(function (d) {
                        return d.column;
                    })
                    .sortValues(function (a, b) {
                        return a.xValue - b.xValue;
                    })
                    .entries(chartData);
            } else {
                dataNest = d3.nest()
                    .key(function (d) {
                        return d.column;
                    })
                    .entries(chartData);
            }
            // keep in original order from yValues
            var actualNest = [];
            for (var i = 0, n = scope.axisFieldsY.length; i < n; i++) {
                var key = scope.axisFieldsY[i];
                for (var j = 0, m = dataNest.length; j < m; j++) {
                    if (dataNest[j].key === key) {
                        actualNest.push(dataNest[j]);
                    }
                }
            }
            // return
            return actualNest;
        };

        var createXAxis = function (scope, x, attributes, chartData) {
            var xAxis = d3.svg.axis().scale(x).orient(scope.axisFieldPositionX);
            if (scope.useProvidedPoints && scope.hasCreateXTicksFunc) {
                xAxis.tickValues(scope.createXTicksFunc({'value': chartData}));
            } else if (scope.useProvidedPoints) {
                xAxis.tickValues(createXTicks(scope, chartData));
            }
            var xFormatted = false;
            if (scope.axisFieldTypeX === "date" && scope.axisFormatterX !== null) {
                xAxis.tickFormat(d3.time.format(scope.axisFormatterX));
                xFormatted = true;
            }
            if (!(isNaN(attributes.tickCountX))) {
                xAxis.ticks(attributes.tickCountX, attributes.tickXLabel);
            }
            // format x axis
            if (scope.hasAxisXFieldLabelFunc && !xFormatted) {
                xAxis.tickFormat(function (d) {
                    return scope.axisXFieldLabelFunc({'value': d});
                });
            }
            return xAxis;
        };

        var createYAxis = function (scope, y, attributes, chartData) {
            var yAxis = d3.svg.axis().scale(y).orient(scope.axisFieldPositionY);
            if (!(isNaN(attributes.tickCountY))) {
                yAxis.ticks(attributes.tickCountY, attributes.tickYLabel);
            }
            if (scope.hasCreateYTicksFunc) {
                yAxis.tickValues(scope.createYTicksFunc({'value': chartData}));
            }
            // format y axis
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
            var xScale = null;
            if (scope.axisFieldTypeX === "date") {
                xScale = d3.time.scale().range([0, width]);
            } else if (scope.axisFieldTypeX === "number" || scope.axisFieldTypeX === "currency") {
                xScale = d3.scale.linear().range([0, width]);
            } else { // text with no domain
                xScale = d3.scale.ordinal().rangeRoundPoints([0, width], 0.1);
            }
            if (xScale !== null && scope.useProvidedPoints && scope.hasCreateXTicksFunc) { // domain provided
                xScale.domain(scope.createXTicksFunc({'value': chartData}));
            } else {
                var domain = d3.extent(chartData, function (d) {
                    return d.xValue;
                });
                xScale.domain(domain);
            }
            return xScale;
        };

        var createYScale = function (scope, height, chartData) {
            var yScale = null;
            if (scope.axisFieldTypeY === "date") {
                yScale = d3.time.scale().range([height, 0]);
            } else if (scope.axisFieldTypeY === "number" || scope.axisFieldTypeY === "currency") {
                yScale = d3.scale.linear().range([height, 0]);
            } else {
                yScale = d3.scale.ordinal().rangeRoundPoints([height, 0]);
            }
            // determine min/max
            var min = calcMinValue(scope, chartData),
                max = calcMaxValue(scope, chartData);
            yScale.domain([min, max]);
            return yScale;
        };

        var calcMinValue = function (scope, chartData) {
            // if defined, used definition
            if (!isNaN(scope.axisYMin)) {
                return scope.axisYMin;
            }
            // otherwise we calculate based on data
            var values = [];
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
            for (var i = 0, n = chartData.length; i < n; i++) {
                if (chartData[i].yValue !== null) {
                    values.push(chartData[i].yValue);
                }
            }
            return Math.max.apply(null, values);
        };

        var createXTicks = function (scope, chartData) {
            // null check
            if (chartData === undefined || chartData === null || chartData.length === 0) {
                return null;
            }
            // make unique tick values
            var xValues = {}, values = [];
            for (var i = 0, n = chartData.length; i < n; i++) {
                xValues[chartData[i].xValue.toString()] = chartData[i].xValue;
            }
            // turn back into array
            for (var key in xValues) {
                values.push(xValues[key]);
            }
            // sort!
            if (scope.axisFieldTypeX === "date") {
                // sort by date
                values.sort(function (a, b) {
                    return a - b;
                });
            } else {
                // just sort and call it a day
                values.sort();
            }
            // done
            return values;
        };

        var addHorizontalValueLines = function (scope, svg, width, x, y, attributes) {
            // null check
            if (scope.horizontalValueLines === null || scope.horizontalValueLines.length === 0) {
                return;
            }
            // draw the lines
            for (var i = 0, n = scope.horizontalValueLines.length; i < n; i++) {
                svg.append("line")
                    .attr("class", "value-line")
                    .attr("x1", attributes.chartXOffset)
                    .attr("y1", y(Number(scope.horizontalValueLines)))
                    .attr("x2", width + attributes.chartXOffset)
                    .attr("y2", y(Number(scope.horizontalValueLines)));
            }
        };

        var addPathsForDataElement = function (scope, svg, dataElem, line, color) {
            if (!scope.showLines) {
                return;
            }
            svg.append("path")
                .attr("class", "line")
                .style("stroke", function () {
                    return color(dataElem.key);
                })
                .attr("d", line(dataElem.values));
        };

        var addDataPointForDataElement = function (scope, svg, dataElem, attributes, color, x, y) {
            if (!scope.showDataPoints) {
                return;
            }
            var point = svg.selectAll("dot")
                .data(dataElem.values)
                .enter()
                .append("circle")
                .attr("class", "dot")
                .attr("stroke", function () {
                    return color(dataElem.key);
                })
                .attr("fill", function () {
                    return color(dataElem.key);
                })
                .attr("cx", function (d, i) {
                    return x(d.xValue);
                })
                .attr("cy", function (d, i) {
                    return y(d.yValue);
                })
                .attr("r", function (d, i) {
                    return attributes.pointRadius;
                });

            // enable rollover data points
            addTooltips(scope, point);
            addDataPointClickHandler(scope, point);
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

        var addDataLabelForDataElement = function (scope, svg, dataElem, x, y) {
            if (!scope.showLabels) {
                return;
            }
            svg.selectAll("labels")
                .data(dataElem.values)
                .enter()
                .append("text")
                .attr("class", "labels")
                .attr("transform", function (d) {
                    return "translate(" + x(d.xValue) + "," + y(d.yValue) + ")";
                })
                .attr("text-anchor", "start")
                .text(function (d) {
                    if (scope.axisFieldTypeY === "currency") {
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

        var addChartLegend = function (scope, svg, color, attributes, width, height, dataNest, dataElem, i) {
            if (!scope.showChartLegend) {
                return;
            }

            var legendElementX = scope.chartLegendXOffset, // default left
                legendElementY = scope.chartLegendYOffset + (attributes.legendSquareSize + scope.chartLegendGap) * i, // default top
                fieldLabel = dataElem.key;

            if (scope.hasLegendLabelFunc) {
                fieldLabel = scope.legendLabelFunc({'value': dataElem.key, 'elem': dataElem});
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
                        return dataElem.color = color(dataElem.key);
                    });
            } else {
                svg.append("rect")
                    .attr("x", legendElementX)
                    .attr("y", legendElementY)
                    .attr("width", attributes.legendSquareSize)
                    .attr("height", attributes.legendSquareSize)
                    .attr("class", "legend icon")
                    .style("fill", function () {
                        return dataElem.color = color(dataElem.key);
                    });

                svg.append("text")
                    .attr("x", legendElementX + scope.chartLegendGap + attributes.legendSquareSize)
                    .attr("y", legendElementY + attributes.legendSquareSize)
                    .attr("class", "legend text")
                    .style("text-anchor", "start")
                    .text(fieldLabel);
            }
        };

        var addBottomLegend = function (scope, svg, color, attributes, width, height, dataNest, dataElem, i) {
            if (!scope.showBottomLegend) {
                return;
            }

            var legendElementWidth = width / dataNest.length,
                legendElementY = height + attributes.top + attributes.bottom,
                fieldLabel = dataElem.key;

            if (scope.hasLegendLabelFunc) {
                fieldLabel = scope.legendLabelFunc({'value': dataElem.key, 'elem': dataElem});
            }

            svg.append("text")
                .attr("x", attributes.left + (legendElementWidth / 2) + i * legendElementWidth)
                .attr("y", legendElementY)
                .attr("class", "legend text")
                .style("fill", function () {
                    return dataElem.color = color(dataElem.key);
                })
                .text(fieldLabel);

            svg.append("rect")
                .attr("x", attributes.left + (legendElementWidth / 2) + i * legendElementWidth - attributes.legendSquareSize - 5)
                .attr("y", legendElementY - attributes.legendSquareSize)
                .attr("width", attributes.legendSquareSize)
                .attr("height", attributes.legendSquareSize)
                .attr("class", "legend icon")
                .style("fill", function () {
                    return dataElem.color = color(dataElem.key);
                });
        };

        var addTodayIndicator = function (scope, svg, height, x) {
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
                var i = 0, n = 0, missingFound = false;
                // if any of the requested pivot points are missing, skip
                for (i = 0, n = scope.axisFieldsY.length; i < n; i++) {
                    if (scope.chartData[j][scope.axisFieldsY[i]] === undefined ||
                        scope.chartData[j][scope.axisFieldsY[i]] === null) {
                        if (!isNaN(scope.defaultYValue)) {
                            scope.chartData[j][scope.axisFieldsY[i]] = scope.defaultYValue;
                        } else {
                            missingFound = true;
                            break;
                        }
                    }
                }
                if (missingFound && scope.skipMissingDataElements) {
                    continue; // skip this one if missing found
                }
                // if the values exist, then we need to do the pivot
                for (i = 0, n = scope.axisFieldsY.length; i < n; i++) {
                    var yField = scope.axisFieldsY[i], item = {};
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
                    // only add to list if real value exists
                    if (item.yValue !== undefined && item.yValue !== null) {
                        values.push(item);
                    }
                }
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
            attributes.chartClass = attributes.chartClass || "";
            attributes.pointRadius = Number(attributes.pointRadius) || 5;
            attributes.legendSquareSize = Number(attributes.legendSquareSize) || 10;
            attributes.bottomLegendPosition = attributes.bottomLegendPosition || "center";
            attributes.tickCountX = Number(attributes.tickCountX);
            attributes.tickXLabel = attributes.tickXLabel || "";
            attributes.tickCountY = Number(attributes.tickCountY);
            attributes.tickYLabel = attributes.tickYLabel || "";
            attributes.percentWidth = Number(attributes.percentWidth);
            attributes.percentHeight = Number(attributes.percentHeight);
            attributes.chartXOffset = Number(attributes.chartXOffset) || 0;
            // scope defaults
            scope.dateFormat = scope.dateFormat || "%d-%b-%y";
            scope.axisFormatterX = scope.axisFormatterX || "%d-%b";
            scope.axisFieldTypeX = scope.axisFieldTypeX || "date";
            scope.axisFieldTypeY = scope.axisFieldTypeY || "number";
            scope.axisFieldPositionX = scope.axisFieldPositionX || "bottom";
            scope.axisFieldPositionY = scope.axisFieldPositionY || "left";
            scope.interpolation = scope.interpolation || "basis";
            scope.colors = scope.colors || "category10";
            scope.colorList = scope.colorList || null;
            scope.showXAxis = handleBooleanParameters(scope.showXAxis, true);
            scope.showYAxis = handleBooleanParameters(scope.showYAxis, true);
            scope.showLabels = handleBooleanParameters(scope.showLabels, true);
            scope.showDataPoints = handleBooleanParameters(scope.showDataPoints, true);
            scope.showLines = handleBooleanParameters(scope.showLines, true);
            scope.showBottomLegend = handleBooleanParameters(scope.showBottomLegend, false);
            scope.showChartLegend = handleBooleanParameters(scope.showChartLegend, false);
            scope.chartLegendXPosition = scope.chartLegendXPosition || "right";
            scope.chartLegendXOffset = Number(scope.chartLegendXOffset) || 0;
            scope.chartLegendYPosition = scope.chartLegendYPosition || "top";
            scope.chartLegendYOffset = Number(scope.chartLegendYOffset) || 0;
            scope.chartLegendGap = Number(scope.chartLegendGap) || 5;
            scope.defaultYValue = Number(scope.defaultYValue);
            scope.axisYMin = Number(scope.axisYMin);
            scope.axisYMax = Number(scope.axisYMax);
            scope.useProvidedPoints = handleBooleanParameters(scope.useProvidedPoints, false);
            scope.skipMissingDataElements = handleBooleanParameters(scope.skipMissingDataElements, false);
            scope.hideToolTipOnMouseOut = handleBooleanParameters(scope.hideToolTipOnMouseOut, true);
            scope.chartDataPivoted = handleBooleanParameters(scope.chartDataPivoted, false);
            scope.sortValues = handleBooleanParameters(scope.sortValues, false);
            scope.showToday = handleBooleanParameters(scope.showToday, false);
            scope.todayText = scope.todayText || "today";
            scope.horizontalValueLines = handleArrayParameters(scope.horizontalValueLines, null);
            // check for callbacks
            scope.hasTooltipLabelFunc = angular.isDefined(attributes.tooltipLabelFunc);
            scope.hasAxisXFunc = angular.isDefined(attributes.axisXFunc);
            scope.hasAxisYFunc = angular.isDefined(attributes.axisYFunc);
            scope.hasLegendLabelFunc = angular.isDefined(attributes.legendLabelFunc);
            scope.hasAxisXFieldLabelFunc = angular.isDefined(attributes.axisXFieldLabelFunc);
            scope.hasAxisYFieldLabelFunc = angular.isDefined(attributes.axisYFieldLabelFunc);
            scope.hasPointClickHandlerFunc = angular.isDefined(attributes.pointClickHandlerFunc);
            scope.hasCreateXTicksFunc = angular.isDefined(attributes.createXTicksFunc);
            scope.hasCreateYTicksFunc = angular.isDefined(attributes.createYTicksFunc);
            scope.hasCustomNestSortFunc = angular.isDefined(attributes.customNestSortFunc);
        };

        var handleArrayParameters = function (value, defaultValue) {
            if (defaultValue === undefined || defaultValue === null) {
                defaultValue = null;
            }
            if (value === undefined || value === null) {
                return defaultValue;
            }
            return value.toString().split(',');
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
                axisFieldsY: "=",
                axisFieldLabelY: "@",
                axisFieldTypeX: "@", // date, number, text, currency
                axisFormatterX: "@",
                axisFieldTypeY: "@", // date, number, text, currency
                axisFieldPositionX: "@", // top/bottom
                axisFieldPositionY: "@", // left/right
                dateFormat: "@",
                interpolation: "@",
                // linear, linear-closed, step, step-before, step-after,
                // basis, basis-open, basis-closed, bundle,
                // cardinal, cardinal-open, cardinal-closed, monotone
                showXAxis: "@",
                showYAxis: "@",
                showDataPoints: "@",
                showLines: "@",
                showLabels: "@",
                axisYMin: "@",
                axisYMax: "@",
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
                showToday: "@",
                todayText: "@",
                horizontalValueLines: "@",
                // callback functions
                tooltipLabelFunc: "&",
                axisXFieldLabelFunc: "&",
                axisYFieldLabelFunc: "&",
                legendLabelFunc: "&",
                pointClickHandlerFunc: "&",
                axisXFunc: "&",
                axisYFunc: "&",
                createXTicksFunc: "&",
                createYTicksFunc: "&",
                customNestSortFunc: "&"
            }
        };

        directive.controller = ['$scope', '$element', function ($scope, $element) {
            var linechart = this;
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
                'chartData', 'axisFieldX', 'axisFieldsY',
                'axisFieldLabelY', 'axisFieldTypeX', 'axisFieldTypeY',
                'axisFieldPositionX', 'axisFieldPositionY',
                'dateFormat', 'interpolation', 'colors', 'colorList',
                'showXAxis', 'showYAxis', 'showLabels', 'showLines',
                'showDataPoints',
                'showBottomLegend', 'showChartLegend',
                'chartLegendXPosition', 'chartLegendXOffset',
                'chartLegendYPosition', 'chartLegendYOffset',
                'chartLegendGap', 'defaultYValue', 'useProvidedPoints',
                'hideToolTipOnMouseOut', 'chartDataPivoted', 'sortValues',
                'showToday', 'todayText', 'axisYMin', 'axisYMax',
                'horizontalValueLines'
            ]);
            // observe attributes
            addObservers(scope, [
                'top', 'bottom', 'left', 'right',
                'pointRadius', 'legendSquareSize', 'chartClass',
                'tickCountX', 'tickXLabel', 'tickCountY', 'tickYLabel',
                'percentWidth', 'percentHeight', 'chartXOffset'
            ]);
            // on remove cleanup
            element.on('$destroy', function (event) {
                onRemove(event, scope);
            });
        };

        return directive;
    }]);
})();