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
    .constant('dataUrlFormatParams', dataUrlFormatParams);

    CordovaSimpleCamera.$inject = ['$log', '$cordovaCamera', '$cordovaCameraConstants', '$cordovaScreenOrientation'];
    //CorrectImageOrientation.$inject = ['$scope'];

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
            return dataUrlFormatParams.orientation + $cordovaScreenOrientation.get();
        }
    }
})();