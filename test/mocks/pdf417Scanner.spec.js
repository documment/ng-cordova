describe('ngCordovaMocks', function() {
	beforeEach(function() {
		module('ngCordovaMocks');
	});

	describe('cordovaPdf417Scanner', function () {
		var $rootScope = null;
		var $cordovaPdf417Scanner = null;

		beforeEach(inject(function (_$cordovaPdf417Scanner_, _$rootScope_) {
			$cordovaPdf417Scanner = _$cordovaPdf417Scanner_;
			$rootScope = _$rootScope_;
		}));

		it('should do a scan', function (done) {
            var type = 'PDF417';
            $cordovaPdf417Scanner.type = type;

			var data = 'Some scan data';
			$cordovaPdf417Scanner.data = data;

            var rawData = 'Some raw scan data';
            $cordovaPdf417Scanner.raw = rawData;

			$cordovaPdf417Scanner.scan()
				.then(
					function(result) {
						expect(result.type).toBe(type);
						expect(result.data).toBe(data);
                        expect(result.raw).toBe(rawData);
                        expect(result.resultList.length).toBe(0);
                        expect(result.cancelled).toBe(false);
                    },
					function() { expect(false).toBe(true); }
				)
				.finally(function() { done(); })
			;

			$rootScope.$digest();
		});

        it('should cancel a scan', function (done) {
            $cordovaPdf417Scanner.wasCancelled = true;

            $cordovaPdf417Scanner.scan()
                .then(
                function(result) {
                    expect(result.cancelled).toBe(true);
                },
                function() { expect(false).toBe(true); }
            )
                .finally(function() { done(); })
            ;

            $rootScope.$digest();
        });

		it('should throw an error while scanning.', function(done) {
			$cordovaPdf417Scanner.throwsError = true;
			$cordovaPdf417Scanner.scan()
				.then(
					function() { expect(true).toBe(false); },
					function() { expect(true).toBe(true); }
				)
				.finally(function() { done(); })
			;

			$rootScope.$digest();
		});
	});
});