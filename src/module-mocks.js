var ngCordovaMocks = angular.module('ngCordovaMocks', []);

ngCordovaMocks.config(['$provide', Config]);

function Config($provide) {
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
}