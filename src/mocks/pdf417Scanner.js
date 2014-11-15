/**
 * @ngdoc service
 * @name ngCordovaMocks.cordovaPdf417Scanner
 *
 * @description
 * A service for testing PDF417 scanner features
 * in an app build with ngCordova. https://github.com/PDF417/pdf417-phonegap
**/ 
ngCordovaMocks.factory('$cordovaPdf417Scanner', ['$q', '$log', function($q, $log) {
    var type = '';
    var data = '';
    var raw = '';
    var resultList = [];

	var throwsError = false;
    var wasCancelled = false;

	return {
        /**
		 * @ngdoc property
		 * @name throwsError
		 * @propertyOf ngCordovaMocks.cordovaPdf417Scanner
		 *
		 * @description
		 * A flag that signals whether a promise should be rejected or not. 
		 * This property should only be used in automated tests.
		**/		
		throwsError: throwsError,

        /**
		 * @ngdoc property
		 * @name scannedText
         * @propertyOf ngCordovaMocks.cordovaPdf417Scanner
		 *
		 * @description
		 * Used to set the scanned barcode type in the result. Possible options are:
         * "PDF417", "QR Code", "Code 128", "Code 39", "EAN 13", "EAN 8", "ITF", "UPCA", "UPCE"
		**/		
		type: type,

        /**
		 * @ngdoc property
		 * @name scannedFormat
         * @propertyOf ngCordovaMocks.cordovaPdf417Scanner
		 *
		 * @description
		 * Used to simulate the result data of a successful scan
		**/
		data: data,

        /**
         * @ngdoc property
         * @name raw
         * @propertyOf ngCordovaMocks.cordovaPdf417Scanner
         *
         * @description
         * Used to simulate the raw result data of a successful scan
         **/
        raw: raw,

        /**
         * @ngdoc property
         * @name resultList
         * @propertyOf ngCordovaMocks.cordovaPdf417Scanner
         *
         * @description
         * Used to simulate the resultList field when there are more
         * than one barcode scanned at a time. Returns and array of
         * {
         *   type: ...
         *   data: ...
         *   raw: ...
         * }
         *
         * The first value of the resultList is always the
         * same as the root type, data, and value
         **/
        resultList: resultList,

        /**
		 * @ngdoc property
		 * @name wasCancelled
         * @propertyOf ngCordovaMocks.cordovaPdf417Scanner
		 *
		 * @description
		 * Used to simulate the cancelled property of a
		 * successful scan.
		**/
		wasCancelled: wasCancelled,

        scan: function() {
            var defer = $q.defer();

            $log.debug("~~ Mock scanner ~~");

            if (this.throwsError) {
                $log.debug("Error scanning barcode");
                defer.reject("Unexpected error");
            } else {
                $log.debug("Barcode scan successful");
                defer.resolve({
                    type: this.type,
                    data: this.data,
                    raw: this.raw,
                    cancelled: this.wasCancelled,
                    resultList: this.resultList
                });
            }
            return defer.promise;
        }
	};
}]);