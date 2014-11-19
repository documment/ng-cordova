(function () {
    'use strict';

    // As described in Supported Interface Orientations: https://developer.apple.com/library/ios/technotes/tn2244/_index.html
    var ScreenOrientationConstants = {
        portrait: 'portrait',
        upsideDown: 'upsideDown', // upside down portrait
        landscapeRight: 'landscapeRight', // hold iPhone in right hand and turn counter clockwise
        landscapeLeft: 'landscapeLeft' // hold iPhone in left hand and turn clockwise
    };

    angular
    .module('ngCordova.plugins.screenOrientation', [])
    .constant('$cordovaScreenOrientationConstants', ScreenOrientationConstants)
    .factory('$cordovaScreenOrientation', ScreenOrientation);

    ScreenOrientation.$inject = ['$window', '$log'];

    function ScreenOrientation($window, $log) {
        return {
            isPortrait: isPortrait,
            isUpsideDown: isUpsideDown,
            isLandscapeRight: isLandscapeRight,
            isLandscapeLeft: isLandscapeLeft,
            isUnknown: isUnknown
        };

        function isPortrait() {
            return readOrientation() === ScreenOrientationConstants.portrait;
        }

        function isUpsideDown() {
            return readOrientation() === ScreenOrientationConstants.upsideDown;
        }

        function isLandscapeRight() {
            return readOrientation() === ScreenOrientationConstants.landscapeRight;
        }

        function isLandscapeLeft() {
            return readOrientation() === ScreenOrientationConstants.landscapeLeft;
        }

        function isUnknown() {
            return readOrientation() === undefined;
        }

        function readOrientation() {
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

})();