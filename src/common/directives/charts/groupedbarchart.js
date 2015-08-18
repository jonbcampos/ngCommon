/* istanbul ignore next */
/**
 * Created by jonbcampos on 2/23/15.
 */
(function () {

    /* global d3 */
    'use strict';
    /**
     * @ngdoc directive
     * @name common.directives.charts.groupedbarchart
     * @restrict EA
     * @scope
     *
     * @description
     * creates a grouped bar chart using the d3 charting library.
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
     *            .bar-label{
     *              text-anchor: middle;
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
     *                  "selected": ["open", "high"]
     *              };
     *              $scope.yAxisFieldLabel = "Price ($)";
     *              $scope.colors = ["category10", "category20", "category20b", "category20c"];
     *              $scope.color = "category20";
     *              $scope.showXAxis = true;
     *              $scope.showYAxis = true;
     *              $scope.showLabels = true;
     *              $scope.showBottomLegend = true;
     *              $scope.showChartLegend = true;
     *              $scope.yAxisOffset = 100;
     *              $scope.yAxisMin = 50;
     *              $scope.yAxisMax = 150;
     *              $scope.absoluteZero = true;
     *
     *              $scope.tooltipFormatter = function (d) {
     *                  var t = "", key;
     *                  for (key in d) {
     *                      t += '<strong>' + key + '</strong> ' + d[key] + '<br/>';
     *                  }
     *                  return t;
     *              };
     *
     *              $scope.pointClickHandlerFunc = function(d){
     *                  var t = "", key;
     *                  for (key in d) {
     *                      t += key + ': ' + d[key] + '\n';
     *                  }
     *                  alert(t);
     *              };
     *          }
     *        </script>
     *        <div ng-controller="Ctrl">
     *          <div>
     *              <h1>Grouped Bar Chart Options</h1>
     *              <p>
     *                  <strong>yAxisFields</strong>
     *                  <select ng-options="value for value in yAxisFields.all"
     *                          multiple ng-multiple="true"
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
     *              <p>
     *                  <strong>Absolute Zero</strong>
     *                  <input type="checkbox" ng-model="absoluteZero"></input>
     *              </p>
     *              <p>
     *                  <strong>yAxis Offset</strong>
     *                 <input ng-model="yAxisOffset" min="-100" max="100" type="number">
     *              </p>
     *              <p>
     *                  <strong>yAxis Min</strong>
     *                 <input ng-model="yAxisMin" min="-100" max="100" type="number">
     *              </p>
     *              <p>
     *                  <strong>yAxis Max</strong>
     *                 <input ng-model="yAxisMax" min="0" max="200" type="number">
     *              </p>
     *          </div>
     *          <groupedbarchart
     *              axis-field-x="xAxisField"
     *              axis-fields-y="yAxisFields.selected"
     *              axis-field-label-y="{{yAxisFieldLabel}}"
     *              y-axis-offset="{{yAxisOffset}}"
     *              chart-data="chartData"
     *              colors="{{color}}"
     *              absolute-zero="{{absoluteZero}}"
     *              axis-y-min="{{yAxisMin}}"
     *              axis-y-max="{{yAxisMax}}"
     *              show-bottom-legend="{{showBottomLegend}}"
     *              show-chart-legend="{{showChartLegend}}"
     *              show-x-axis="{{showXAxis}}"
     *              show-y-axis="{{showYAxis}}"
     *              show-labels="{{showLabels}}"
     *              point-click-handler-func="pointClickHandlerFunc(value)"
     *              tooltip-label-func="tooltipFormatter(value)">
     *          </groupedbarchart>
     *        </div>
     *    </doc:source>
     * </doc:example>
     */
    var barchartDirective = angular.module('common.directives.charts.groupedbarchart', []);

    barchartDirective.directive('groupedbarchart', ['$timeout', 'currencyFilter', function ($timeout, currencyFilter) {

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
                x1 = d3.scale.ordinal(),
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
            var dataNest = createDataNest(scope, chartData, "xValue"),
                columns = createValuesByProperty(chartData, "column"),
                min = calcMinValue(scope, chartData),
                max = calcMaxValue(scope, chartData);

            // set up domains (max/mins)
            x.domain(chartData.map(function (d) {
                return d.xValue;
            }));
            x1.domain(columns).rangeRoundBands([0, x.rangeBand()]);
            y.domain([min, max]);

            // start up the chart by adding axii
            var xAxis = createXAxis(scope, x, attributes);
            var yAxis = createYAxis(scope, y, attributes, chartData);

            // background drawing
            addHorizontalValueLines(scope, svg, width, x, y, attributes);

            // add to chart
            addXAxis(scope, svg, height, xAxis, attributes);
            addYAxis(scope, svg, yAxis);

            var group = createGroups(scope, svg, x, dataNest, attributes);
            var bars = createBars(scope, x, x1, y, height, dataNest, color, group, min, max);
            addDataLabelForBars(scope, group, dataNest, x, x1, y, min, max, height);


            // enable rollover data points
            addTooltips(scope, bars);
            addDataPointClickHandler(scope, bars);

            // add the legend element
            var dataNestColumn = createDataNest(scope, chartData, "column");
            dataNestColumn.forEach(function (dataElem, i) {
                // add the legend element
                addBottomLegend(scope, overlay, color, attributes, width, height, dataNestColumn, dataElem, i);
                addChartLegend(scope, overlay, color, attributes, width, height, dataNestColumn, dataElem, i);
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

        var createDataNest = function (scope, chartData, property) {
            var dataNest = null;
            if (scope.sortValues && scope.hasCustomNestSortFunc) {
                dataNest = d3.nest()
                    .key(function (d) {
                        return d[property];
                    })
                    .sortValues(function (a, b) {
                        return scope.customNestSortFunc({"a": a, "b": b});
                    })
                    .entries(chartData);
            } else if (scope.sortValues) {
                dataNest = d3.nest()
                    .key(function (d) {
                        return d[property];
                    })
                    .sortValues(function (a, b) {
                        return a.xValue - b.xValue;
                    })
                    .entries(chartData);
            } else {
                dataNest = d3.nest()
                    .key(function (d) {
                        return d[property];
                    })
                    .entries(chartData);
            }
            return dataNest;
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

        var createXAxis = function (scope, x, attributes) {
            var xAxis = d3.svg.axis().scale(x).orient(scope.axisFieldPositionX);
            // format x axis
            if (scope.hasAxisXFieldLabelFunc) {
                xAxis.tickFormat(function (d) {
                    return scope.axisXFieldLabelFunc({'value': d});
                });
            } else if (scope.axisFormatterX !== null) {
                xAxis.tickFormat(d3.time.format(scope.axisFormatterX));
            }
            return xAxis;
        };

        var createYAxis = function (scope, y, attributes, chartData) {
            var yAxis = d3.svg.axis()
                .scale(y).orient(scope.axisFieldPositionY);
            // create ticks?
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
                } else {
                    // make sure to offset for the offset
                    yAxis.tickFormat(function (d) {
                        return d;
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

        var createGroups = function (scope, svg, x, dataNest, attributes) {
            return svg.selectAll(".key")
                .data(dataNest)
                .enter().append("g")
                .attr("class", "bar-group")
                .attr("transform", function (d) {
                    return "translate(" + (x(d.key) + attributes.chartXOffset) + ",0)";
                });
        };

        var createBars = function (scope, x, x1, y, height, dataNest, color, group, min, max) {
            var bars = group.selectAll("rect")
                .data(function (d) {
                    return d.values;
                })
                .enter().append("rect")
                .attr("class", "bar")
                .attr("width", function (d) {
                    return x1.rangeBand();
                })
                .attr("x", function (d) {
                    return x1(d.column);
                })
                .attr("y", function (d) {
                    return determineYPositionByData(d, scope, y, min, max);
                })
                .attr("height", function (d) {
                    var yValue = d.yValue;
                    if (isNaN(yValue)) {
                        return 0;
                    }
                    var yAxisOffset = 0;
                    if (!isNaN(scope.yAxisOffset)) {
                        yAxisOffset = scope.yAxisOffset;
                    }
                    if (scope.absoluteZero) {
                        // zeroed
                        if (yValue > max) { // above the limit
                            return Math.abs(y(max) - y(yAxisOffset));
                        } else if (yValue < min) { // below the limit
                            return y(yAxisOffset);
                        } else {
                            return Math.abs(y(yValue) - y(yAxisOffset));
                        }
                    } else {
                        // regular
                        return Math.min(height, height - y(yValue - yAxisOffset));
                    }
                })
                .style("fill", function (d) {
                    return color(d.column);
                });
            return bars;
        };

        var addTooltips = function (scope, bars) {
            if (!scope.hasTooltipLabelFunc) {
                return;
            }
            bars.on("mouseover", function (d) {
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

        var addDataPointClickHandler = function (scope, bars) {
            if (!scope.hasPointClickHandlerFunc) {
                return;
            }
            bars.on("click", function (d) {
                scope.pointClickHandlerFunc({value: d});
            });
        };

        var addDataLabelForBars = function (scope, group, dataNest, x, x1, y, min, max, height) {
            if (!scope.showLabels) {
                return null;
            }
            var text = group.selectAll("text")
                .data(function (d) {
                    return d.values;
                })
                .enter().append("text")
                .attr("class", "bar-label")
                .attr("width", function (d) {
                    return x1.rangeBand();
                })
                .attr("x", function (d) {
                    return x1(d.column) + x1.rangeBand() / 2;
                })
                .attr("y", function (d) {
                    return determineYPositionByData(d, scope, y, min, max);
                })
                .attr("dy", function (d) {
                    var yValue = d.yValue;
                    var yAxisOffset = 0;
                    if (!isNaN(scope.yAxisOffset)) {
                        yAxisOffset = scope.yAxisOffset;
                    }
                    if (scope.absoluteZero) {
                        // zeroed
                        return (yAxisOffset > yValue) ? "0em" : "1em";
                    } else {
                        // regular
                        return "0em";
                    }
                })
                .attr("height", function (d) {
                    var yValue = d.yValue;
                    var yAxisOffset = 0;
                    if (!isNaN(scope.yAxisOffset)) {
                        yAxisOffset = scope.yAxisOffset;
                    }
                    if (scope.absoluteZero) {
                        // zeroed
                        return Math.abs(y(yValue) - y(yAxisOffset));
                    } else {
                        // regular
                        return height - y(yValue - yAxisOffset);
                    }

                })
                .text(function (d) {
                    if (scope.hasAxisYvalueLabelFunc) {
                        return scope.axisYvalueLabelFunc({'value': d});
                    } else if (scope.axisFieldTypeY === "currency") {
                        return currencyFilter(d.yValue);
                    } else {
                        return d.yValue;
                    }
                });
            return text;
        };

        var determineYPositionByData = function (d, scope, y, min, max) {
            var yValue = d.yValue;
            if (isNaN(yValue)) {
                return 0;
            }
            var yAxisOffset = 0;
            if (!isNaN(scope.yAxisOffset)) {
                yAxisOffset = scope.yAxisOffset;
            }
            if (scope.absoluteZero) {
                // zeroed
                if (yValue > max) { // above
                    return y(max);
                } else if (yValue < min) { // below
                    return y(yAxisOffset);
                } else {
                    return y(Math.max(yValue, yAxisOffset));
                }
            } else {
                // regular
                return y(yValue - yAxisOffset);
            }
        };

        var addXAxis = function (scope, svg, height, xAxis, attributes) {
            if (!scope.showXAxis) {
                return;
            }
            svg.append('g')
                .attr('class', 'x axis')
                .attr('transform', 'translate(' + attributes.chartXOffset + ',' + height + ')')
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
                .attr('dy', '1em')
                .style('text-anchor', 'end')
                .text(scope.axisFieldLabelY);
        };

        var addChartLegend = function (scope, svg, color, attributes, width, height, dataNest, dataElem, i) {
            if (!scope.showChartLegend) {
                return;
            }

            var legendElementX = scope.chartLegendXOffset, // default left
                legendElementY = scope.chartLegendYOffset +
                    attributes.legendSquareSize +
                    (attributes.legendSquareSize + scope.chartLegendGap) * i, // default top
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
                legendElementY = height + attributes.top + attributes.bottom + scope.bottomLegendYOffset,
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
            scope.bottomLegendYOffset = Number(scope.bottomLegendYOffset) || 0;
            scope.chartLegendGap = Number(scope.chartLegendGap) || 5;
            scope.defaultYValue = Number(scope.defaultYValue);
            scope.axisYMin = Number(scope.axisYMin);
            scope.axisYMax = Number(scope.axisYMax);
            scope.axisYMinHint = Number(scope.axisYMinHint);
            scope.axisYMaxHint = Number(scope.axisYMaxHint);
            scope.yAxisOffset = Number(scope.yAxisOffset);
            scope.useProvidedPoints = handleBooleanParameters(scope.useProvidedPoints, false);
            scope.skipMissingDataElements = handleBooleanParameters(scope.skipMissingDataElements, false);
            scope.hideToolTipOnMouseOut = handleBooleanParameters(scope.hideToolTipOnMouseOut, true);
            scope.chartDataPivoted = handleBooleanParameters(scope.chartDataPivoted, false);
            scope.sortValues = handleBooleanParameters(scope.sortValues, false);
            scope.absoluteZero = handleBooleanParameters(scope.absoluteZero, false);
            scope.horizontalValueLines = handleArrayParameters(scope.horizontalValueLines, null);
            // check for callbacks
            scope.hasTooltipLabelFunc = angular.isDefined(attributes.tooltipLabelFunc);
            scope.hasAxisXFunc = angular.isDefined(attributes.axisXFunc);
            scope.hasAxisYFunc = angular.isDefined(attributes.axisYFunc);
            scope.hasLegendLabelFunc = angular.isDefined(attributes.legendLabelFunc);
            scope.hasAxisXFieldLabelFunc = angular.isDefined(attributes.axisXFieldLabelFunc);
            scope.hasAxisYFieldLabelFunc = angular.isDefined(attributes.axisYFieldLabelFunc);
            scope.hasAxisYvalueLabelFunc = angular.isDefined(attributes.axisYvalueLabelFunc);
            scope.hasPointClickHandlerFunc = angular.isDefined(attributes.pointClickHandlerFunc);
            scope.hasCreateXTicksFunc = angular.isDefined(attributes.createXTicksFunc);
            scope.hasCreateYTicksFunc = angular.isDefined(attributes.createYTicksFunc);
            scope.hasCustomNestSortFunc = angular.isDefined(attributes.customNestSortFunc);
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

        var handleArrayParameters = function (value, defaultValue) {
            if (defaultValue === undefined || defaultValue === null) {
                defaultValue = null;
            }
            if (value === undefined || value === null) {
                return defaultValue;
            }
            return value.toString().split(',');
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
                bottomLegendYOffset: "@",
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
                yAxisOffset: "@",
                absoluteZero: "@",
                horizontalValueLines: "@",
                // callback functions
                tooltipLabelFunc: "&",
                axisXFieldLabelFunc: "&",
                axisYFieldLabelFunc: "&",
                axisYvalueLabelFunc: "&",
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
                'chartData', 'axisFieldX', 'axisFieldsY',
                'axisFieldLabelY', 'axisFieldTypeY',
                'axisYMin', 'axisYMax',
                'axisYMinHint', 'axisYMaxHint',
                'axisFieldPositionX', 'axisFieldPositionY',
                'dateFormat', 'colors', 'colorList',
                'yAxisOffset', 'absoluteZero',
                'showXAxis', 'showYAxis', 'showLabels',
                'showBottomLegend', 'showChartLegend',
                'chartLegendXPosition', 'chartLegendXOffset',
                'chartLegendYPosition', 'chartLegendYOffset',
                'chartLegendGap', 'defaultYValue', 'useProvidedPoints',
                'hideToolTipOnMouseOut', 'chartDataPivoted', 'sortValues',
                'horizontalValueLines', 'bottomLegendYOffset'
            ]);
            // observe attributes
            addObservers(scope, [
                'top', 'bottom', 'left', 'right',
                'legendSquareSize',
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