angular.module('ChooseForMe',['ngFileUpload']) // naming the module
	.controller('inputController', function($scope, $http){ // defining the controller, inject $scope and $http
		$scope.entry;
		$scope.username = 'Anonymous';
		$scope.password;

		$scope.newData = []
		$scope.pictures = [];
		$scope.object = {};
		$scope.data = [];
		$scope.temp = []
			// declare the $scope.entry property

		$scope.submit = function(file){
			console.log('File, yo!', file);

		}

		$scope.save = function(){ // create a function that will send entered art to server
			console.log("$scope.save called with: ", $scope.entry);
			var newEntry = $scope.entry;
			$scope.newData.push(newEntry)
			console.log($scope.newData);
			$scope.object.data  = $scope.username + ': ' + $scope.entry;
			var data = JSON.stringify($scope.object);
			console.log("STRingafied data", data);
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
		  	});
		}
		$scope.add = function(){
  			console.log("in add")
  			var f = document.getElementById('file').files[0];
  			console.log("in add with pre-json f", f);
      		r = new FileReader();
      		$scope.object.data  = f;
			var data = JSON.stringify($scope.object);
      		console.log('post json f: ', f);
      		$http({
				'method': 'POST',
				'url': '/upload',
				'Content-Type': 'application/json',
				'data': data
			})
			.then(function successCallback(response) {
			   console.log('imageSuccess: ', response);
			   	
		  	}, function errorCallback(response) {
		  		console.log('uh oh, we go an image error: ', response);
		  	});
  	// 		r.onloadend = function(e){
   //  		var data = e.target.result;
   //  		//console.log('dat data: ', data);
   //  //send your binary data via $http or $resource or do anything else with it
   //  		$http({
			// 	'method': 'POST',
			// 	'url': '/upload',
			// 	'Content-Type': 'text/plain',
			// 	'data': data
			// })
			// .then(function successCallback(response) {
			//    console.log('imageSuccess: ', response);
			   	
		 //  	}, function errorCallback(response) {
		 //  		console.log('uh oh, we go an image error: ', response);
		 //  	});



  	// 		}
  		//	r.readAsBinaryString(f);
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