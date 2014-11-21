describe('Service: $cordovaScreenOrientation\n', function () {

    beforeEach(module('ngCordova.plugins.screenOrientation'));

    var $window,
    $cordovaScreenOrientation,
    $cordovaScreenOrientationConstant;

    beforeEach(inject(function (_$window_, _$cordovaScreenOrientation_, _$cordovaScreenOrientationConstants_) {
        $window = _$window_;
        $cordovaScreenOrientation = _$cordovaScreenOrientation_;
        $cordovaScreenOrientationConstant = _$cordovaScreenOrientationConstants_;
    }));

    describe('Detecting current screen orientation', function () {

        it('should detect the screen in portrait', function (done) {
            $window.orientation = 0;
            expect($cordovaScreenOrientation.get().isPortrait()).toBe(true);
        });

        it('should detect the screen is upside down', function (done) {
            $window.orientation = 180;
            expect($cordovaScreenOrientation.get().isUpsideDown()).toBe(true);
        });

        it('should detect the screen is landscape right', function (done) {
            $window.orientation = -90;
            expect($cordovaScreenOrientation.get().isLandscapeRight()).toBe(true);
        });

        it('should detect the screen is landscape left', function (done) {
            $window.orientation = 90;
            expect($cordovaScreenOrientation.get().isLandscapeLeft()).toBe(true);
        });

        it('should report if the orientation is unknown', function (done) {
            $window.orientation = null;
            expect($cordovaScreenOrientation.get().isUnknown()).toBe(true);
        });

        it('should allow the orientation name to be queried', function (done) {
            $window.orientation = 0;
            expect($cordovaScreenOrientation.get().getName())
            .toBe($cordovaScreenOrientationConstant.portrait);
        });

        it('should not cache the $window.orientation value', function (done) {
            $window.orientation = 0;
            var orientation = $cordovaScreenOrientation.get();
            expect(orientation.isPortrait()).toBe(true);

            $window.orientation = 180;
            expect(orientation.isUpsideDown()).toBe(true);
        });
    });

    describe('Usages of orientation name', function() {

        it('should build an orientation object from an orientation name', function (done) {
            expect($cordovaScreenOrientation.get(
                $cordovaScreenOrientationConstant.portrait
            ).isPortrait()).toBe(true);
        });

        it('should build an orientation object from an orientation name', function (done) {
            expect($cordovaScreenOrientation.get(
            $cordovaScreenOrientationConstant.portrait
            ).getName()).toBe($cordovaScreenOrientationConstant.portrait);
        });
    })
});