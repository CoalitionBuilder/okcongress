var cb = angular.module('cb', ['ngCsv', 'ngMaterial']); 


cb.controller('MainController', ['$scope', "$http", '$mdDialog', function($scope, $http, $mdDialog) {

	$scope.showAdvanced = function(ev) {
	    $mdDialog.show({
	      controller: DialogController,
	      templateUrl: 'views/dialog1.tmpl.html',
	      targetEvent: ev,
	    })
	    .then(function(answer) {
	      $scope.alert = 'You said the information was "' + answer + '".';
	    }, function() {
	      $scope.alert = 'You cancelled the dialog.';
	    });
	  };
	$scope.pageFirstLoad=true;
	$scope.querying = false;
	$scope.query='';
	$scope.previousQuery = '';

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
		$scope.pageFirstLoad = false;
		$scope.previousQuery = String($scope.query);
		if(false ===$scope.querying ){
			$scope.querying = true;
			$http.get("/api/sunlight?query="+ $scope.query)
			.success(function(data, status, headers, config) {
				
				//reset values
				$scope.commissionsText = '';
				$scope.chamberText = '';
				$scope.partyText = '';
				//end reset
			  	$scope.result = data;
			  	console.log($scope.result);
			  	$scope.people = $scope.result.people;
			  	$scope.querying = false;
			  	$scope.commissions.length = 0;
			  	//pull out the committees
			  	var committees = {};
			  	$scope.people.forEach(function(p){
			  		if('undefined' != typeof  p.committeeMembership){
				  		p.committeeMembership.forEach(function(c){
				  			committees[c]=true;//this way duplicate committees are avoided. 
				  			//There may be better ways (and probably are)
				  		});
				  	}
			  	});
			  	// now for that list of committees put them into an object that is useful for the html
			  	for (var property in committees) {
			  	    if (committees.hasOwnProperty(property)) {
			  	    	$scope.commissions.push({'display':property});
			  	    }
			  	}
			  	
			  })
			.error(function(data, status, headers, config) {
			  	console.log('error');
			  	$scope.people = [{'name' : 'issa'}, {'name' : 'jhsbfd'}];
			  	$scope.querying = false;
			  });
		}

	};

  	$scope.people = [];
	$scope.$watch('people', function (newValue, oldValue) {
        if (newValue !== oldValue) $scope.people = newValue;
    });

}]);


function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}

