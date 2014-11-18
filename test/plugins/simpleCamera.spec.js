describe('Service: $cordovaSimpleCamera\n', function () {

    var $rootScope,
        $cordovaSimpleCamera,
        $cordovaCameraConstants,
        $cordovaScreenOrientation,
        $cordovaScreenOrientationConstants,
        dataUrlFormatParams,
        cameraOptions = {};

    beforeEach(module('ngCordova.plugins.simpleCamera', 'ngCordovaMocks', function ($provide) {
        $provide.factory('$cordovaCamera', injectCordovaCamera);
        $provide.factory('$cordovaCameraConstants', injectCordovaCameraConstants);
        $provide.value('$log', console);

        injectCordovaCamera.$inject = ['ngCordovaMocks.$cordovaCamera'];
        injectCordovaCameraConstants.$inject = ['ngCordovaMocks.$cordovaCameraConstants'];

        function injectCordovaCamera($cordovaCamera) {
            return $cordovaCamera;
        }

        function injectCordovaCameraConstants($cordovaCameraConstants) {
            return $cordovaCameraConstants;
        }
    }));

    beforeEach(inject(function (
        $cordovaCamera,
        _$cordovaCameraConstants_,
        _$rootScope_,
        _$cordovaSimpleCamera_,
        _dataUrlFormatParams_,
        _$cordovaScreenOrientation_,
        _$cordovaScreenOrientationConstants_)
    {
        dataUrlFormatParams = _dataUrlFormatParams_;
        $cordovaSimpleCamera = _$cordovaSimpleCamera_;
        $cordovaCameraConstants = _$cordovaCameraConstants_;
        $cordovaScreenOrientation = _$cordovaScreenOrientation_;
        $cordovaScreenOrientationConstants = _$cordovaScreenOrientationConstants_;
        $cordovaCamera.dataUrl = '--';
        cameraOptions.destinationType = $cordovaCameraConstants.DestinationType.DATA_URL;
        $rootScope = _$rootScope_;
    }));

    describe('Output formatting when DestinationType = DATA_URL', function () {

        it('should contain the proper media type when encodingType = PNG', function (done) {
            cameraOptions.encodingType = $cordovaCameraConstants.EncodingType.PNG;
            $cordovaSimpleCamera.getPicture(cameraOptions).then(function (pictureResult) {

                var isCorrectMediaType = pictureResult.indexOf(dataUrlFormatParams.pngMediaType) > 0;
                expect(isCorrectMediaType).toBe(true);

            }).catch(function (err) {
                expect(false).toBe(true);
            }).finally(function () {
                done();
            });
            $rootScope.$digest();
        });

        it('should contain the proper media type when encodingType = JPEG', function (done) {
            cameraOptions.encodingType = $cordovaCameraConstants.EncodingType.JPEG;
            $cordovaSimpleCamera.getPicture(cameraOptions).then(function (pictureResult) {

                var isCorrectMediaType = pictureResult.indexOf(dataUrlFormatParams.jpegMediaType) > 0;
                expect(isCorrectMediaType).toBe(true);

            }).catch(function (err) {
                expect(false).toBe(true);
            }).finally(function () {
                done();
            });
            $rootScope.$digest();
        });

        it('should have a structure like: "data:[<MIME-type>][;base64],<data>"', function (done) {
            cameraOptions.encodingType = $cordovaCameraConstants.EncodingType.JPEG;
            $cordovaSimpleCamera.getPicture(cameraOptions).then(function (pictureResult) {

                var prefix = pictureResult.indexOf(dataUrlFormatParams.dataUrlPrefix);
                var mediaType = pictureResult.indexOf(dataUrlFormatParams.jpegMediaType);
                var base64 = pictureResult.indexOf(dataUrlFormatParams.base64);

                expect(prefix < mediaType < base64).toBe(true);

            }).catch(function (err) {
                expect(false).toBe(true);
            }).finally(function () {
                done();
            });
            $rootScope.$digest();
        });
    });

});