var cb = angular.module('cb', []); 


cb.controller('MainController', function($scope, $http) {


	$scope.querying = false;
	$scope.query='';

	$scope.tagline = 'To the moon and back!';	
	$scope.result = '';
	$scope.people = [];
	
	$scope.commissions = [];

	$scope.keydown = function(e){
		console.log("keydown?");
		if(e.which===13 ){
			$scope.search();
		}
	};

	$scope.search = function(){
		if(false ===$scope.querying ){
			$scope.querying = true;
			$http.get("/api/sunlight?query="+ $scope.query)
			.success(function(data, status, headers, config) {
				
			  	$scope.result = data;
			  	console.log($scope.result);
			  	$scope.people = $scope.result.people;
			  	$scope.querying = false;
			  	$scope.people.forEach(function(p){
			  		p.committeeMembership.forEach(function(c){
			  			console.log(c)
			  			$scope.commissions.push({'display':c, 'valueText':c});
			  		});
			  	});
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