angular.module('RubberDuck',['ngFileUpload']) // naming the module
	.controller('inputController', ['Upload', '$window', '$scope','$http', function(Upload, $window, $scope, $http){ // defining the controller, inject $scope and $http
		
		var vm = this;
		$scope.entry;
		$scope.username = 'Anonymous';
		$scope.password;

		var temporary;
		vm.picData;
		$scope.picData = []
		$scope.textData = [];
		var newData = $scope.newData;
		$scope.pictures = [];
		$scope.object = {};
		$scope.data = [];
		$scope.temp = [];
			// declare the $scope.entry property
	
		
	vm.getImagePath = function(imageName) {
    	console.log('pathin: ',"/uploads/" + imageName )
    	return "/uploads/" + imageName;};  
    	
    vm.submit = function(){
        if (vm.upload_form.file.$valid && vm.file) { //check if from is valid
        vm.upload(vm.file); //call upload function
      }
}

// 		$scope.getImagePath = function(imageName) {
// 			console.log('pathin: ',"/uploads/" + imageName )
// 		return "/uploads/" + imageName;
// };	
// 		var vm = this;
// 		vm.submit = function(){
// 			if (vm.upload_form.file.$valid && vm.file) { //check if from is valid
//             vm.upload(vm.file); //call upload function
// 			}
// 		}

		vm.upload = function (file) {
			console.log("me file: ", file);
			var newFile = file;
			
	        Upload.upload({
	            url: 'http://localhost:8672/upload', //webAPI exposed to upload the file
	            data:{file:file} //pass file as data, should be user ng-model
	        }).then(function (resp) { //upload function returns a promise
	            if(resp.data.error_code === 0){ //validate success
	                $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
	                   	$http({
						'method': 'GET',
						'url': '/upload',
						'Content-Type': 'application/json'
						}).then(function successCallback(response) {
					   console.log('This is the Picture response data: ', response.data);
					   $scope.picData = response.data;
					   console.log('PICS!!!!!!!!!!',$scope.picData)
					   temporary = $scope.picData;
					   vm.picData = temporary;
					   console.log("TEMP!", temporary, 'vm.picData', vm.picData);
					   console.log("in client success response, sending this to local $scope.data: ", $scope.data, "scope.temp: ", temporary);
						}, function errorCallback(response) {
				  		console.log('uh oh, we got an error in the Get response: ', response);
				    	// called asynchronously if an error occurs
				    	// or server returns response with an error status.
						});
	    //             $scope.picData.push(newFile.name)
					// console.log('after image upload picData', $scope.picData, "and textData", $scope.textData);
	            } else {
	                $window.alert('an error occured');
	            }
	        }, function (resp) { //catch error
	            console.log('Error status: ' + resp.status);
	            $window.alert('Error status: ' + resp.status);
	        }, function (evt) { 
	            console.log(evt);
	            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
	            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
	            vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
	        });
	    };

		$scope.save = function(){ // create a function that will send entered art to server
			console.log("$scope.save called with: ", $scope.entry);
			var newEntry = $scope.username + ': ' + $scope.entry;
			$scope.textData.push(newEntry)
			
			$scope.object.data  = newEntry;
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
			   console.log('textData after text:',$scope.textData, "and picData:", $scope.picData, "temporary", temporary, 'vm.picData', vm.picData);
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

	}])