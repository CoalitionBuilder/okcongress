angular.module('MainCtrl', []).controller('MainController', ['$scope', '$http', function($scope, $http) {


	$scope.query=''

	$scope.tagline = 'To the moon and back!';	
	$scope.result = ''
	$scope.people = []

	$scope.keydown = function(e){
		if(e.which===13){			
			console.log(e)
			getretval($scope.query)
		}
	}


  	$scope.people = {}
	var getretval = function(){
		$http.get("https://congress.api.sunlightfoundation.com/bills/search?query="+ $scope.query +"&apikey=1872af8ee52349d1a0b1f7e001d53b46").
		  success(function(data, status, headers, config) {
		  	$scope.result = data
		  	console.log($scope.result.results)
		  	data.results.forEach(function(d){
		  		var personname = d['sponsor']['first_name'] + " " + d['sponsor']['last_name']
		  		if($scope.people.hasOwnProperty(personname)===-1){
			  		$scope.people[personname] = []
		  			$scope.people[personname].push(d)		  						  				  			
		  		} else {
		  			$scope.people[personname].push(d)		  			
		  		}
		  	})
		  	console.log('$scope.people')
		  	console.log($scope.people)
		  });
	}

}]);