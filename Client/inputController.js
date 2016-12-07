angular.module('ChooseForMe',[]) // naming the module
	.controller('inputController', function($scope, $http){ // defining the controller, inject $scope and $http
		$scope.entry;
		$scope.username;
		$scope.password;


		$scope.object = {};
		$scope.data = [];
		$scope.temp = []
			// declare the $scope.entry property

		$scope.save = function(){ // create a function that will send entered art to server
			console.log("$scope.save called with: ", $scope.entry);
			$scope.object.data  = $scope.entry;
			var data = JSON.stringify($scope.object);
			console.log("STRingafy me, baby!", data);
			$http({
				'method': 'POST',
				'url': '/list',
				'Content-Type': 'text/plain',
				'data': data
			})
			.then(function successCallback(response) {
			   console.log('superSuccess: ', response);
			   	$http({
				'method': 'GET',
				'url': '/list',
				'Content-Type': 'application/json'
				}).then(function successCallback(response) {
			   console.log('THIS IS THE RESPONSE DATA: ', response.data);
			   $scope.data = response.data;
			   console.log("in client success response, sending this to local $scope.data: ", $scope.data, "scope.temp: ", $scope.temp);
				}, function errorCallback(response) {
		  		console.log('uh oh, we got an error in the Get response: ', response);
		    	// called asynchronously if an error occurs
		    	// or server returns response with an error status.
				});
		  	}, function errorCallback(response) {
		  		console.log('uh oh, we got an error: ', response);
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  	});
		}

	$scope.list = function(){
		console.log("in client/scope.list")
		$http({
			'method': 'GET',
			'url': '/list',
			'Content-Type': 'application/json'
		}).then(function successCallback(response) {
			   
			   console.log('THIS IS THE RESPONSE DATA: ', response.data);
			   $scope.data = response.data;

			   console.log("in client success response, sending this to local $scope.data: ", $scope.data, "scope.temp: ", $scope.temp);
		}, function errorCallback(response) {
		  		console.log('uh oh, we got an error in the Get response: ', response);
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});


	}

	$scope.display = function(){
		return $scope.data;

	}

	})