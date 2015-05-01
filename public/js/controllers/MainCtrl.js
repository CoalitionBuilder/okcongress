var cb = angular.module('cb', ['ngCsv']); 


cb.controller('MainController', function($scope, $http) {


	$scope.querying = false;
	$scope.query='';

	$scope.tagline = 'To the moon and back!';	
	$scope.result = '';
	$scope.people = [];

	$scope.keydown = function(e){
		console.log("keydown?");
		if(e.which===13 ){
			$scope.search();
		}
	};


	$scope.getHeader = function(){
		return Object.keys($scope.flatpeople[0])
	}

	$scope.getFlats = function(){
		$scope.flatpeople = []
		$scope.people.forEach(function(d){
			var peep = {
				lastname : d['lastname'],
				firstname : d['firstname'],
				website 	: d['website'],
				party		: d['party'],
				state		: d['state'],
				title		: d['title']
			}
			$scope.flatpeople.push(peep)
		})
		return $scope.flatpeople
	}



	$scope.search = function(){
		if(false ===$scope.querying ){
			$scope.querying = true;
			$http.get("/api/sunlight?query="+ $scope.query)
			.success(function(data, status, headers, config) {
				
			  	$scope.result = data;
			  	console.log($scope.result);
			  	$scope.people = $scope.result.people;
			  	$scope.querying = false;
			  })
			.error(function(data, status, headers, config) {
			  	console.log('error');
			  	$scope.people = [{'name' : 'issa'}, {'name' : 'jhsbfd'}];
			  	$scope.querying = false;
			  });
		}

	};

  	$scope.people = [];

});
