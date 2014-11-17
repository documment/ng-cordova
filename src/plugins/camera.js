// install   :   cordova plugin add org.apache.cordova.camera
// link      :   https://github.com/apache/cordova-plugin-camera/blob/master/doc/index.md#orgapachecordovacamera
(function () {
  'use strict';

  angular.module('ngCordova.plugins.camera', [])
    .factory('$cordovaCameraConstants', CordovaCameraConstants)
    .factory('$cordovaCamera', CordovaCamera);

  CordovaCameraConstants.$inject = ['$window'];
  CordovaCamera.$inject = ['$q'];

  function CordovaCameraConstants($window) {
    return {
      DestinationType: $window.Camera.DestinationType,
      Direction: $window.Camera.Direction,
      EncodingType: $window.Camera.EncodingType,
      MediaType: $window.Camera.MediaType,
      PictureSourceType: $window.Camera.PopoverArrowDirection
    };
  }

  function CordovaCamera($q) {
    return {
      getPicture: getPicture,
      cleanup: cleanup
    };

    function getPicture(_options_) {
      var options = _options_ || {};

      var q = $q.defer();

      if (!navigator.camera) {
        q.resolve(null);
        return q.promise;
      }

      navigator.camera.getPicture(function (imageData) {
        q.resolve(imageData);
      }, function (err) {
        q.reject(err);
      }, options);

      return q.promise;
    }

    function cleanup() {
      var q = $q.defer();

      navigator.camera.cleanup(function () {
        q.resolve();
      }, function (err) {
        q.reject(err);
      });

      return q.promise;
    }
  }

})();
