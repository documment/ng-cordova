// install  :    cordova plugin add https://github.com/PDF417/pdf417-phonegap/tree/master/Pdf417
// link     :    https://github.com/PDF417/pdf417-phonegap

angular.module('ngCordova.plugins.pdf417Scanner', [])

    .factory('$cordovaPdf417Scanner', ['$q', '$log', function ($q, $log) {

        var defaultConfig = {
            /**
             * Scan these barcode types
             * Available: "PDF417", "QR Code", "Code 128", "Code 39", "EAN 13", "EAN 8", "ITF", "UPCA", "UPCE"
             **/
            types: ["PDF417", "QR Code"],

            /**
             * Initiate scan with options
             * NOTE: Some features are unavailable without a license
             * Obtain your key at http://pdf417.mobi
             **/
            options: {
                beep: true,
                noDialog: true,
                removeOverlay: true,
                uncertain: false, //Recommended
                quietZone: false, //Recommended
                highRes: false, //Recommended
                frontFace: false
            },
            licenseiOs: null,
            licenseAndroid: null

        };

        return {
            scan: function (config) {
                if (!config)
                    config = defaultConfig;

                var q = $q.defer();

                cordova.plugins.pdf417Scanner.scanWithOptions(
                    // Register the callback handler
                    function callback(data) {
                        $log.debug("Barcode scan successful");
                        q.resolve(data);
                    },
                    // Register the errorHandler
                    function errorHandler(err) {
                        $log.debug("Error scanning barcode");
                        q.reject(err);
                    },
                    config.types, config.options, config.licenseiOs, config.licenseAndroid
                );
                return q.promise;
            }
        };
    }]);
