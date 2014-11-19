describe('Service: $cordovaScreenOrientation\n', function () {

    beforeEach(module('ngCordova.plugins.screenOrientation'));

    describe('Detecting current screen orientation', function () {
        var $window,
            $cordovaScreenOrientation,
            $cordovaScreenOrientationConstant;

        beforeEach(inject(function (_$window_, _$cordovaScreenOrientation_, _$cordovaScreenOrientationConstants_) {
            $window = _$window_;
            $cordovaScreenOrientation = _$cordovaScreenOrientation_;
            $cordovaScreenOrientationConstant = _$cordovaScreenOrientationConstants_;
        }));

        it('should detect the screen in portrait', function (done) {
            $window.orientation = 0;
            expect($cordovaScreenOrientation.isPortrait()).toBe(true);
        });

        it('should detect the screen is upside down', function (done) {
            $window.orientation = 180;
            expect($cordovaScreenOrientation.isUpsideDown()).toBe(true);
        });

        it('should detect the screen is landscape right', function (done) {
            $window.orientation = -90;
            expect($cordovaScreenOrientation.isLandscapeRight()).toBe(true);
        });

        it('should detect the screen is landscape left', function (done) {
            $window.orientation = 90;
            expect($cordovaScreenOrientation.isLandscapeLeft()).toBe(true);
        });

        it('should report if the orientation is unknown', function (done) {
            $window.orientation = null;
            expect($cordovaScreenOrientation.isUnknown()).toBe(true);
        });

    });

});