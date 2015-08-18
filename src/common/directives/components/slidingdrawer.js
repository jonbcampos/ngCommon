/* istanbul ignore next */
/**
 * Created by jonbcampos on 4/17/14.
 */
(function () {

    'use strict';

    /**
     * @ngdoc directive
     * @name common.directives.components.slidingdrawer
     * @element div
     * @restrict AE
     * @scope
     *
     * @param {boolean} isOpen bindable value to open/close drawer.
     *
     * @description
     * Sliding drawer for view overflow.
     *
     * You can style the sliding drawer through CSS using the 'drawer-class'
     * attribute or through the following attributes that you can set.
     *
     * | Name | Effect | Options | Default |
     * |------|--------|---------|---------|
     * | direction | Determines the direction that the drawer will slide from | left, right, top, bottom | left |
     * | duration | Length of time the effect will play, in seconds | NA | 0.5 |
     * | drawer-class | CSS class to add to the drawer | NA | '' |
     * | z-index | The z-index to give the drawer | NA | 1000 |
     * | size | width/height of the drawer in px/%/etc | NA | 50% |
     * | opacity | opacity of the darkening layer | NA | 0.65 |
     * | darkening-color | background color of the darkening layer | NA | black |
     * | background | background color to give the drawer | NA | '' |
     * | auto-close | determines if the drawer will automatically close on location change | NA | true |
     * | height | custom height of drawer, ignored depending on direction, then 'size' is used | NA | 100% |
     * | width | custom width of drawer, ignored depending on direction, then 'size' is used | NA | 100% |
     * | top | custom CSS 'top' of drawer | NA | 0px |
     * | bottom | custom CSS 'bottom' of drawer | NA | 0px |
     * | right | custom CSS 'right' of drawer | NA | 0px |
     * | left | custom CSS 'left' of drawer | NA | 0px |
     *
     * @example
     * <doc:example module="demoApp">
     *     <doc:source>
     *     <style>
     *         .white-background-red-text{
     *          background: white;
     *          color: red;
     *         }
     *     </style>
     *     <slidingdrawer is-open="showLeft" top="41px"
     *                    drawer-class="white-background-red-text">
     *         <p>I'm in the drawer!</p>
     *     </slidingdrawer>
     *     <slidingdrawer is-open="showRight" top="41px"
     *                    background="aqua" direction="right"
     *                    darkening-color="blue" opacity="0.2">
     *         <p>I'm in the drawer!</p>
     *     </slidingdrawer>
     *     <slidingdrawer is-open="showBottom"
     *                    background="blue" direction="bottom"
     *                    darkening-color="blue" opacity="0.5"
     *                    duration="1.0">
     *         <p>I'm in the drawer!</p>
     *     </slidingdrawer>
     *     <slidingdrawer is-open="showTop" top="41px"
     *                    background="pink" direction="top"
     *                    darkening-color="red" opacity="0.8"
     *                    duration="2.0">
     *         <p>I'm in the drawer!</p>
     *     </slidingdrawer>
     *     <form>
     *         <input type="checkbox" ng-model="showLeft"></input> Show Left<br/>
     *         <input type="checkbox" ng-model="showRight"></input> Show Right<br/>
     *         <input type="checkbox" ng-model="showTop"></input> Show Top<br/>
     *         <input type="checkbox" ng-model="showBottom"></input> Show Bottom<br/>
     *     </form>
     *    </doc:source>
     * </doc:example>
     */
    var slidingDrawerDirective = angular.module('common.directives.components.slidingdrawer', []);

    slidingDrawerDirective.directive('slidingdrawer', [function () {

        //-----------------------------------------------------------------
        //
        // methods
        //
        //-----------------------------------------------------------------
        var close = function (container, darkeningLayer, params, content) {
            if (container.style.width !== 0 && container.style.width !== 0) {
                content.style.display = 'none';
                switch (params.direction) {
                    case 'right':
                        container.style.width = '0px';
                        break;
                    case 'top':
                        container.style.height = '0px';
                        break;
                    case 'bottom':
                        container.style.height = '0px';
                        break;
                    //case 'left':
                    default:
                        container.style.width = '0px';
                        break;
                }
            }
            setTimeout(function () {
                darkeningLayer.style.display = 'none';
                content.style.display = 'none';
                container.style.display = 'none';
            }, (params.duration * 1000));
            darkeningLayer.style.opacity = '0';
        };

        var open = function (container, darkeningLayer, params, content) {
            container.style.display = 'block';
            darkeningLayer.style.opacity = 0;
            darkeningLayer.style.display = 'block';
            setTimeout(function () {
                if (container.style.width !== 0 && container.style.width !== 0) {
                    switch (params.direction) {
                        case 'right':
                            container.style.width = params.size;
                            break;
                        case 'top':
                            container.style.height = params.size;
                            break;
                        case 'bottom':
                            container.style.height = params.size;
                            break;
                        //case 'left':
                        default:
                            container.style.width = params.size;
                            break;
                    }
                    setTimeout(function () {
                        content.style.display = 'block';
                        container.style.display = 'block';
                    }, (params.duration * 1000));
                }
                darkeningLayer.style.opacity = params.opacity;
            }, 100);
        };

        var setClose = function ($scope) {
            $scope.isOpen = false;
            $scope.$apply();
        };

        var getContent = function (el) {
            var content = null;
            var children = el.children();
            if (children != null) {
                if (children.length === 1) { //only one
                    content = children[0];
                } else { //multiple
                    content = document.createElement('div');
                    for (var i = 0, n = children.length; i < n; i++) {
                        content.appendChild(children[i]);
                    }
                }

            }
            return content;
        };

        var getParams = function (attrs) {
            var params = {};
            params.direction = attrs.direction || 'left';
            params.duration = attrs.duration || '0.5';
            params.className = attrs.drawerClass;
            params.darkeningClassName = attrs.darkeningClass;
            params.zIndex = attrs.zIndex || '1000';
            params.size = attrs.size || '50%';
            params.opacity = attrs.opacity || '0.65';
            params.darkeningColor = attrs.darkeningColor || 'black';
            params.background = attrs.background || '';
            return params;
        };

        var createDarkeningLayer = function (params) {
            var darkeningLayer = document.createElement('div');
            if (params.darkeningClassName === undefined ||
                params.darkeningClassName === null ||
                params.darkeningClassName === "") {
                darkeningLayer.style.background = params.darkeningColor;
                darkeningLayer.style.position = 'fixed';
                darkeningLayer.style.height = '100%';
                darkeningLayer.style.width = '100%';
                darkeningLayer.style.top = '0px';
                darkeningLayer.style.left = '0px';
            } else {
                darkeningLayer.className = params.darkeningClassName;
            }
            darkeningLayer.style.opacity = 0;
            darkeningLayer.style.zIndex = ( Number(params.zIndex) - 1 ).toString();
            darkeningLayer.style.transitionDuration = params.duration + 's';
            darkeningLayer.style.webkitTransitionDuration = params.duration + 's';
            darkeningLayer.style.transitionProperty = 'opacity';
            return darkeningLayer;
        };

        var createContainer = function (params, attrs) {
            var container = document.createElement('div');
            if (params.className != null && params.className !== '') {
                container.className = params.className;
            }

            //stylize container
            container.style.transitionDuration = params.duration + 's';
            container.style.webkitTransitionDuration = params.duration + 's';
            container.style.zIndex = params.zIndex;
            container.style.position = 'fixed';
            container.style.width = 0;
            container.style.height = 0;
            container.style.display = 'block';
            if (params.background !== '') {
                container.style.background = params.background;
            }

            //handle direction
            switch (params.direction) {
                case 'right':
                    container.style.transitionProperty = 'width';
                    container.style.height = attrs.height || '100%';
                    container.style.top = attrs.top || '0px';
                    container.style.bottom = attrs.bottom || '0px';
                    container.style.right = attrs.right || '0px';
                    break;
                case 'bottom':
                    container.style.transitionProperty = 'height';
                    container.style.width = attrs.width || '100%';
                    container.style.left = attrs.left || '0px';
                    container.style.bottom = attrs.bottom || '0px';
                    container.style.right = attrs.right || '0px';
                    break;
                case 'top':
                    container.style.transitionProperty = 'height';
                    container.style.width = attrs.width || '100%';
                    container.style.left = attrs.left || '0px';
                    container.style.top = attrs.top || '0px';
                    container.style.right = attrs.right || '0px';
                    break;
                //case 'left':
                default:
                    container.style.transitionProperty = 'width';
                    container.style.height = attrs.height || '100%';
                    container.style.top = attrs.top || '0px';
                    container.style.bottom = attrs.bottom || '0px';
                    container.style.left = attrs.left || '0px';
                    break;
            } // end switch
            return container;
        };

        var linker = function ($scope, el, attrs) {

            //get parameters
            var params = getParams(attrs);
            //get content
            var content = getContent(el);
            // content null check
            if (!content) {
                throw new Error('You must have content inside the <slidingdrawer/> element');
            }
            // create darkening layer
            var darkeningLayer = createDarkeningLayer(params);
            document.body.appendChild(darkeningLayer);
            // create container
            var container = createContainer(params, attrs);
            // add to view
            document.body.appendChild(container);
            container.appendChild(content);

            //-------------------------
            // watchers
            //-------------------------
            $scope.$watch('isOpen', function (value) {
                if (!!value) {
                    open(container, darkeningLayer, params, content);
                } else {
                    close(container, darkeningLayer, params, content);
                }
            });

            // when the element is destroyed
            // we remove the generated containers
            // from the DOM
            el.on('$destroy', function (event) {
                document.body.removeChild(container);
                document.body.removeChild(darkeningLayer);
            });

            if (attrs.autoClose) {
                $scope.$on('$locationChangeStart', function () {
                    close(container, darkeningLayer, params, content);
                });
                $scope.$on('$stateChangeStart', function () {
                    close(container, darkeningLayer, params, content);
                });
            }

            // events
            if (darkeningLayer.addEventListener) {
                darkeningLayer.addEventListener('click', function (e) {
                    e.preventDefault();
                    setClose($scope);
                });
            } else {
                darkeningLayer.attachEvent('onclick', function (e) {
                    e.returnValue = false;
                    setClose($scope);
                });
            }
        };

        //-----------------------------------------------------------------
        //
        // directive object
        //
        //-----------------------------------------------------------------
        var directive = {
            restrict: "AE",
            replace: false,
            transclude: false,
            scope: {
                isOpen: '='
            },
            link: linker
        };

        //-----------------------------------------------------------------
        //
        // return
        //
        //-----------------------------------------------------------------
        return directive;
    }]);
})();