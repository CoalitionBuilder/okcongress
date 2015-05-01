angular.module('MainCtrl', []).controller('MainController', ['$scope', '$http', function($scope, $http) {


	$scope.query=''

	$scope.tagline = 'To the moon and back!';	
	$scope.result = ''
	$scope.chambers = []
	$scope.committees = []

	$scope.keydown = function(e){
		if(e.which===13){			
			console.log(e)
			getretval($scope.query)
		}
	}


	$scope.checkit = function(property){
		console.log(property)


	}



	var getretval = function(){
	  	$scope.people = {}
		$http.get("https://congress.api.sunlightfoundation.com/bills/search?query="+ $scope.query +"&apikey=1872af8ee52349d1a0b1f7e001d53b46")
		.success(function(data, status, headers, config) {
		  	$scope.result = data
		  	console.log($scope.result.results)
		  	data.results.forEach(function(d){

		  		var personname = d['sponsor']['title'] + '. ' + d['sponsor']['first_name'] + " " + d['sponsor']['last_name']
		  		if(! $scope.people.hasOwnProperty(personname)){
			  		$scope.people[personname] = {}
			  		$scope.people[personname].bills = []
		  			$scope.people[personname].bills.push(d)		  						  				  			
		  		} else {
		  			$scope.people[personname].bills.push(d)		  			
		  		}
	  			$scope.people[personname].chamber = d.chamber
	  			$scope.people[personname].score = d.search.score
	  			$scope.people[personname].committees = d.committee_ids

		  	})
		  	$scope.peeps = Object.keys($scope.people)
		  	console.log('$scope.people')
		  	console.log($scope.peeps)
		  	$scope.peeps.forEach(function(p){
		  		console.log($scope.people[p])
		  	})
		  })
		.error(function(data, status, headers, config) {
		  	console.log('error')
		  	$scope.people = [{'name' : 'issa'}, {'name' : 'jhsbfd'}]
		  })
	}

}]);