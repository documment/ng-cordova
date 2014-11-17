describe('ngCordovaMocks', function() {
    beforeEach(module('ngCordovaMocks', function($provide) {
        $provide.factory('$cordovaCamera', injectCordovaCamera);
        $provide.factory('$cordovaCameraConstants', injectCordovaCameraConstants);

        injectCordovaCamera.$inject = ['ngCordovaMocks.$cordovaCamera'];
        injectCordovaCameraConstants.$inject = ['ngCordovaMocks.$cordovaCameraConstants'];

        function injectCordovaCamera($cordovaCamera) {
            return $cordovaCamera;
        }

        function injectCordovaCameraConstants($cordovaCameraConstants) {
            return $cordovaCameraConstants;
        }
    }));

    describe('cordovaCamera', function () {
        var $rootScope = null;
        var $cordovaCamera = null;
        var $cordovaCameraConstants = null;
        var cameraOptions = {};

        beforeEach(inject(function (_$cordovaCamera_, _$cordovaCameraConstants_, _$rootScope_) {
            $cordovaCamera = _$cordovaCamera_;
            $cordovaCameraConstants = _$cordovaCameraConstants_;
            $rootScope = _$rootScope_;
        }));

        it('should get picture', function (done) {
            $cordovaCamera.getPicture(cameraOptions)
                .then(
                    function() { expect(true).toBe(true); },
                    function() { expect(false).toBe(true); }
                )
                .finally(function() { done(); })
            ;

            $rootScope.$digest();
        });

        it('should throw an error while getting the picture.', function(done) {
            $cordovaCamera.throwsError = true;
            $cordovaCamera.getPicture(cameraOptions)
                .then(
                    function() { expect(true).toBe(false); },
                    function() { expect(true).toBe(true); }
                )
                .finally(function() { done(); })
            ;

			$rootScope.$digest();
		});

        it('should get picture as data url', function(done) {
            $cordovaCamera.dataUrl = true;
            cameraOptions.destinationType = $cordovaCameraConstants.DestinationType.DATA_URL;
            $cordovaCamera.getPicture(cameraOptions)
                .then(
                    function(pictureResult) { expect(pictureResult).toBe(true); },
                    function() { expect(false).toBe(true); }
                )
                .finally(function() { done(); })
            ;

            $rootScope.$digest();
        });

        it('should get picture as a file uri', function (done) {
            $cordovaCamera.fileUri = true;
            cameraOptions.destinationType = $cordovaCameraConstants.DestinationType.FILE_URI;
            $cordovaCamera.getPicture(cameraOptions)
                .then(
                    function(pictureResult) { expect(pictureResult).toBe(true); },
                    function() { expect(false).toBe(true); }
                )
                .finally(function() { done(); })
            ;

            $rootScope.$digest();
        });

        it('should get picture as a native uri', function (done) {
            $cordovaCamera.nativeUri = true;
            cameraOptions.destinationType = $cordovaCameraConstants.DestinationType.NATIVE_URI;
            $cordovaCamera.getPicture(cameraOptions)
                .then(
                    function(pictureResult) { expect(pictureResult).toBe(true); },
                    function() { expect(false).toBe(true); }
                )
                .finally(function() { done(); })
            ;

            $rootScope.$digest();
        });
    });
});
