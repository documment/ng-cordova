(function () {
    'use strict';

    var dataUrlFormatParams = {
        dataUrlPrefix: 'data:',
        jpegMediaType: 'image/jpeg',
        pngMediaType: 'image/png',
        base64: ';base64,'
    };

    angular.module('ngCordova.plugins.simpleCamera', ['ngCordova.plugins.camera'])
    .factory('$cordovaSimpleCamera', CordovaSimpleCamera)
    .constant('dataUrlFormatParams', dataUrlFormatParams);

    CordovaSimpleCamera.$inject = ['$log', '$cordovaCamera', '$cordovaCameraConstants'];

    function CordovaSimpleCamera($log, $cordovaCamera, $cordovaCameraConstants) {
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
            var format = mediaType + dataUrlFormatParams.base64;

            return format + picture;
        }

        function getMediaType(options) {
            if (options.encodingType === $cordovaCameraConstants.EncodingType.PNG) {
                return dataUrlFormatParams.dataUrlPrefix + dataUrlFormatParams.pngMediaType;
            } else {
                return dataUrlFormatParams.dataUrlPrefix + dataUrlFormatParams.jpegMediaType;
            }
        }
    }
})();