(function () {
    'use strict';

    angular.module('ngCordovaMocks')
    .factory('ngCordovaMocks.$cordovaCameraConstants', CordovaCameraConstants)
    .factory('ngCordovaMocks.$cordovaCamera', CordovaCamera);

    CordovaCameraConstants.$inject = [];
    CordovaCamera.$inject = ['$q', 'ngCordovaMocks.$cordovaCameraConstants'];

    /**
     * @ngdoc factory
     * @name ngCordovaMocks.cordovaCameraConstants
     *
     * @description
     * Constants that are used in camera options
     * Copied directly from cordova's CameraConstants.js
     **/
    function CordovaCameraConstants() {
        return {
            DestinationType: {
                DATA_URL: 0,         // Return base64 encoded string
                FILE_URI: 1,         // Return file uri (content://media/external/images/media/2 for Android)
                NATIVE_URI: 2        // Return native uri (eg. asset-library://... for iOS)
            },
            EncodingType: {
                JPEG: 0,             // Return JPEG encoded image
                PNG: 1               // Return PNG encoded image
            },
            MediaType: {
                PICTURE: 0,          // allow selection of still pictures only. DEFAULT. Will return format specified via DestinationType
                VIDEO: 1,            // allow selection of video only, ONLY RETURNS URL
                ALLMEDIA: 2         // allow selection from all media types
            },
            PictureSourceType: {
                PHOTOLIBRARY: 0,    // Choose image from picture library (same as SAVEDPHOTOALBUM for Android)
                CAMERA: 1,          // Take picture from camera
                SAVEDPHOTOALBUM: 2  // Choose image from picture library (same as PHOTOLIBRARY for Android)
            },
            PopoverArrowDirection: {
                ARROW_UP: 1,        // matches iOS UIPopoverArrowDirection constants to specify arrow location on popover
                ARROW_DOWN: 2,
                ARROW_LEFT: 4,
                ARROW_RIGHT: 8,
                ARROW_ANY: 15
            },
            Direction: {
                BACK: 0,
                FRONT: 1
            }
        }
    }

    /**
     * @ngdoc service
     * @name ngCordovaMocks.cordovaCamera
     *
     * @description
     * A service for testing camera features
     * in an app build with ngCordova.
     **/
    function CordovaCamera($q, $cordovaCameraConstants) {
        var throwsError = false;
        var dataUrl = null;
        var fileUri = null;
        var nativeUri = null;

        return {
            /**
             * @ngdoc property
             * @name throwsError
             * @propertyOf ngCordovaMocks.cordovaCamera
             *
             * @description
             * A flag that signals whether a promise should be rejected or not.
             * This property should only be used in automated tests.
             **/
            throwsError: throwsError,
            /**
             * @ngdoc property
             * @name dataUrl
             * @propertyOf ngCordovaMocks.cordovaCamera
             *
             * @description
             * A value for the dataUrl to resolve the resulting promise with. The
             * DestinationType option must be set to DATA_URL
             **/
            dataUrl: dataUrl,
            /**
             * @ngdoc property
             * @name fileUri
             * @propertyOf ngCordovaMocks.cordovaCamera
             *
             * @description
             * A value for the fileUri to resolve the resulting promise with. The
             * DestinationType option must be set to FILE_URI
             **/
            fileUri: fileUri,
            /**
             * @ngdoc property
             * @name nativeUri
             * @propertyOf ngCordovaMocks.cordovaCamera
             *
             * @description
             * A value for the nativeUri to resolve the resulting promise with. The
             * DestinationType option must be set to NATIVE_URI
             **/
            nativeUri: nativeUri,
            getPicture: getPicture
        };

        function getPicture(options) {
            var defer = $q.defer();
            if (this.throwsError) {
                defer.reject('There was an error getting the picture.');
            } else {
                if (options.destinationType == $cordovaCameraConstants.DestinationType.DATA_URL) {
                    defer.resolve(this.dataUrl);
                }
                else if (options.destinationType == $cordovaCameraConstants.DestinationType.FILE_URI) {
                    defer.resolve(this.fileUri);
                }
                else if (options.destinationType == $cordovaCameraConstants.DestinationType.NATIVE_URI) {
                    defer.resolve(this.nativeUri);
                }
                else {
                    defer.resolve();
                }
            }
            return defer.promise;
        }
    }
})();
