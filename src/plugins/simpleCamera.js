(function () {
    'use strict';

    var dataUrlFormatParams = {
        dataUrlPrefix: 'data:',
        jpegMediaType: 'image/jpeg',
        pngMediaType: 'image/png',
        base64: ';base64,',
        orientation: ';orientation='
    };

    angular.module('ngCordova.plugins.simpleCamera', ['ngCordova.plugins.camera', 'ngCordova.plugins.screenOrientation'])
    .factory('$cordovaSimpleCamera', CordovaSimpleCamera)
    .directive('correctImageOrientation', CorrectImageOrientation)
    .constant('dataUrlFormatParams', dataUrlFormatParams);

    CordovaSimpleCamera.$inject = ['$log', '$cordovaCamera', '$cordovaCameraConstants', '$cordovaScreenOrientation'];
    CorrectImageOrientation.$inject = ['$log', '$cordovaScreenOrientation', '$cordovaScreenOrientationConstants'];

    function CordovaSimpleCamera($log, $cordovaCamera, $cordovaCameraConstants, $cordovaScreenOrientation) {
        return {
            getPicture: getPicture,
            cleanup: $cordovaCamera.cleanup
        };

        function getPicture(options) {
            return $cordovaCamera.getPicture(options).then(function(data) {
                $log.debug('$cordovaCamera getPicture Successful');
                if (options.destinationType === $cordovaCameraConstants.DestinationType.DATA_URL) {
                    data = prependDataUrlFormat(data, options);
                }
                return data;
            });
        }

        function prependDataUrlFormat(picture, options) {
            var mediaType = getMediaType(options);
            var orientation = getScreenOrientation();
            var format = mediaType + orientation + dataUrlFormatParams.base64;

            return format + picture;
        }

        function getMediaType(options) {
            if (options.encodingType === $cordovaCameraConstants.EncodingType.PNG) {
                return dataUrlFormatParams.dataUrlPrefix + dataUrlFormatParams.pngMediaType;
            } else {
                return dataUrlFormatParams.dataUrlPrefix + dataUrlFormatParams.jpegMediaType;
            }
        }

        function getScreenOrientation() {
            return dataUrlFormatParams.orientation + $cordovaScreenOrientation.get().getName();
        }
    }

    function CorrectImageOrientation ($log, $cordovaScreenOrientation, $cordovaScreenOrientationConstants) {
        return {
            restrict: 'A',
            link: link
        };

        function link ($scope, $element, $attrs) {
            var orientationName = parseOrientationName($attrs['src']);
            var orientation = $cordovaScreenOrientation.get(orientationName);

            if(orientation.isPortrait()) {
                $element.addClass('correctCameraImageOrientationWhenImagePortrait');
            } else
            if(orientation.isUpsideDown()) {
                $element.addClass('correctCameraImageOrientationWhenImageUpsideDown');
            } else
            if(orientation.isLandscapeLeft()) {
                $element.addClass('correctCameraImageOrientationWhenImageLandscapeLeft');
            } else
                $log.debug('No orientation correction applied');
        }

        function parseOrientationName(dataUrl) {
            var splitDataUrl = dataUrl.split(dataUrlFormatParams.base64);
            if(splitDataUrl.length === 0) {
                $log.warn('Directive used on DataURL that is not formatted properly, no base64');
                return $cordovaScreenOrientationConstants.unknown
            }

            var orientationMatch = splitDataUrl[0].match(/orientation=[a-zA-Z]+/);
            if(orientationMatch.length === 0) {
                $log.warn('No orientation encoded in DataURL');
                return $cordovaScreenOrientationConstants.unknown
            }

            return orientationMatch[0].split('=')[1];
        }
    }

})();