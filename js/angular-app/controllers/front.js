var stellarAlerts = angular.module('stellarAlerts');
var baseUrl = 'https://stellaralerts.info:8000/';

stellarAlerts.controller('frontController', function($scope, $state, $http) {
	$scope.userData = {};
	$scope.infoMsg = "";
	
	$scope.init = function() {
		

	};

	$scope.subscribe = function() {
		// verify twitter acct
		// verify stellar acct
		// send to db
		
		$scope.infoMsg = "Attempting to subscribe @"+$scope.userData.username+"...";
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
						$scope.infoMsg = "Successfully to subscribed @"+$scope.userData.username+".\n You will now receive notifications on twitter.";

					})
					.error(function(data) {
						console.log(data);
						$scope.infoMsg = "Subscription of @"+$scope.userData.username+" failed.";
						if (data.error) {
							data.error.forEach(function(e) {
								$scope.infoMsg += "\n"+e;
							});
						}
					});
		}

	};

});


