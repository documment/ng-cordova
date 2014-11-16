(function () {
    'use strict';

    angular.module('ngCordovaMocks')
    .factory('ngCordovaMocks.$cordovaCamera', CordovaCamera);

    CordovaCamera.$inject = ['$q'];

    /**
     * @ngdoc service
     * @name ngCordovaMocks.cordovaCamera
     *
     * @description
     * A service for testing camera features
     * in an app build with ngCordova.
     **/
    function CordovaCamera($q) {
        var throwsError = false;

        return {
            /**
             * @ngdoc property
             * @name throwsError
             * @propertyOf ngCordovaMocks.cordovaCamera
             *
             * @description
             * A flag that signals whether a promise should be rejected or not.
             * This property should only be used in automated tests.
             */
            throwsError: throwsError,
            getPicture: getPicture
        };

        function getPicture(options) {
            var defer = $q.defer();
            if (this.throwsError) {
                defer.reject('There was an error getting the picture.');
            } else {
                defer.resolve();
            }
            return defer.promise;
        }
    }
})();
