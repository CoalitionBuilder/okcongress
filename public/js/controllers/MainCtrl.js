angular.module('MainCtrl', []).controller('MainController', ['$scope', '$http', function($scope, $http) {


	$scope.query=''

	$scope.tagline = 'To the moon and back!';	

	$scope.keydown = function(e){
		console.log(e)
	}

	$http.get("https://congress.api.sunlightfoundation.com/bills/search?query="+ query +"&apikey=1872af8ee52349d1a0b1f7e001d53b46").
	  success(function(data, status, headers, config) {

	  }).
	  error(function(data, status, headers, config) {


	  });


}]);