var stellarAlerts = angular.module('stellarAlerts');
var baseUrl = 'https://stellaralerts.info:8000/';

stellarAlerts.controller('frontController', function($scope, $state, $http) {
	$scope.userData = {};
	
	$scope.init = function() {
		

	};

	$scope.subscribe = function() {
		// verify twitter acct
		// verify stellar acct
		// send to db
		
		console.log("userData", $scope.userData);
		if (!StellarSdk.Keypair.isValidPublicKey($scope.userData.accountID)) {
			alert("Invalid Account Id");
			return false;
		} else{
			$http({
                method: 'POST',
                url: baseUrl+'subscribe',
                headers: { 'Content-Type' : 'application/x-www-form-urlencoded'},
                data: $.param($scope.userData)
            })
					.success(function(data) {
						console.log(data);
					})
					.error(function(data) {
						console.log(data);
					});
		}

	};

});


