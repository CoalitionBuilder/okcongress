angular
	.module('sampleApp', ['ngRoute', 'appRoutes', 'MainCtrl', 'ngMaterial'])
	.config(function($mdThemingProvider) {
	  // Extend the red theme with a few different colors
	  var neonRedMap = $mdThemingProvider.extendPalette('red', {
	    '500': 'ff0000'
	  });
	  // Register the new color palette map with the name <code>neonRed</code>
	  $mdThemingProvider.definePalette('neonRed', neonRedMap);
	  // Use that theme for the primary intentions
	  $mdThemingProvider.theme('default')
	    .primaryPalette('teal')
	});

