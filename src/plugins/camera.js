// install   :   cordova plugin add cordova-plugin-camera
// link      :   https://github.com/apache/cordova-plugin-camera

angular.module('ngCordova.plugins.camera', [])

  .factory('$cordovaCameraConstants', ['$log', function ($log) {
        try {
            return {
                DestinationType: window.Camera.DestinationType,
                Direction: window.Camera.Direction,
                EncodingType: window.Camera.EncodingType,
                MediaType: window.Camera.MediaType,
                PictureSourceType: window.Camera.PopoverArrowDirection
            };
        } catch(err) {
            $log.error("Unable to read Cordova camera constants. Is the camera plugin installed? " + err);
            return {};
        }
  }])
  .factory('$cordovaCamera', ['$q', function ($q) {

    return {
      getPicture: function (options) {
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
      },

      cleanup: function () {
        var q = $q.defer();

        navigator.camera.cleanup(function () {
          q.resolve();
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      }
    };
  }]);
