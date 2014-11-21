(function () {
    'use strict';

    // As described in Supported Interface Orientations: https://developer.apple.com/library/ios/technotes/tn2244/_index.html
    var ScreenOrientationConstants = {
        portrait: 'portrait',
        upsideDown: 'upsideDown', // upside down portrait
        landscapeRight: 'landscapeRight', // hold iPhone in right hand and turn counter clockwise
        landscapeLeft: 'landscapeLeft', // hold iPhone in left hand and turn clockwise
        unknown: 'unknown'
    };

    angular
    .module('ngCordova.plugins.screenOrientation', [])
    .constant('$cordovaScreenOrientationConstants', ScreenOrientationConstants)
    .factory('$cordovaScreenOrientation', ScreenOrientation);

    ScreenOrientation.$inject = ['$window', '$log'];

    function ScreenOrientation($window, $log) {
        return {
            get: readOrientation
        };

        function readOrientation(orientation) {
            return Object.create(OrientationBox.prototype, {
                orientation: {
                    get: function() {
                        return getOrientationFn();
                    }
                }
            });

            function getOrientationFn() {
                if(orientation)
                    return getOrientationFromArg;
                else
                    return getOrientationFromWindow;
            }

            function getOrientationFromArg() {
                return orientation;
            }

            function getOrientationFromWindow() {
                var orientationName;
                switch ($window.orientation) {
                    case 0:
                        orientationName = ScreenOrientationConstants.portrait;
                        break;
                    case 180:
                        orientationName = ScreenOrientationConstants.upsideDown;
                        break;
                    case -90:
                        orientationName = ScreenOrientationConstants.landscapeRight;
                        break;
                    case 90:
                        orientationName = ScreenOrientationConstants.landscapeLeft;
                        break;
                }

                $log.debug('Orientation is: ' + orientationName);
                return orientationName;
            }
        }
    }

    function OrientationBox() {}

    OrientationBox.prototype = {
        getName: function () {
            var orientation = this.orientation();
            if(!orientation)
                orientation = ScreenOrientationConstants.unknown;
            return orientation;
        },

        isPortrait: function () {
            return this.getName() === ScreenOrientationConstants.portrait;
        },

        isUpsideDown: function () {
            return this.getName() === ScreenOrientationConstants.upsideDown;
        },

        isLandscapeRight: function() {
            return this.getName() === ScreenOrientationConstants.landscapeRight;
        },

        isLandscapeLeft: function() {
            return this.getName() === ScreenOrientationConstants.landscapeLeft;
        },

        isUnknown: function () {
            return this.getName() === ScreenOrientationConstants.unknown;
        },

        toString: function () {
            return this.getName();
        }
    }

})();