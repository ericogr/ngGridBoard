angular.module('grGridBoard', [])
	.directive('grGridBoard', function() {
		'use strict';
	    return {
			restrict: 'E',
			transclude: true,
			scope: {
				values: '=',
				rows: '@',
				columns: '@',
				width: '@',
				height: '@',
				lineColour: '@',
				selectedColour: "@",
				unselectedColour: "@"
			},
			link: function($scope, $element) {
				updatePositions();

				$scope.$watch('rows', function(rows) {
		    		updatePositions();
		    	});

		    	$scope.$watch('columns', function(columns) {
		    		updatePositions();
		    	});
		    	
		    	function updatePositions() {
			    	$scope.viewBox = "0 0 " + $scope.width + " " + $scope.height;
					$scope.rectWidth = $scope.width / $scope.columns;
					$scope.rectHeight = $scope.height / $scope.rows;
					$scope.lineColour = $scope.lineColour || 'black';
					$scope.selectedColour = $scope.selectedColour || $scope.lineColour;
					$scope.unselectedColour = $scope.unselectedColour || 'white';
					$scope.positions = generatePositions($scope.rows, $scope.columns, $scope.rectWidth, $scope.rectHeight, $scope.value);
		    	}

				$scope.clickRect = function(line, column) {
					$scope.values[line][column] = !$scope.values[line][column];
				};

				function generatePositions(rows, columns, width, height) {
					var ret = [];

					for (var row = 0; row < rows; row++) {
						for (var col = 0; col < columns; col++) {
							ret.push({"line": row, "column": col, "x": col * width, "y": row * height});
						}
					}

					return ret;
				}
			},
			templateUrl: 'gr-grid-board-template',
			replace: true
	    };
	});;angular.module('grGridBoard').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('gr-grid-board-template',
    "<svg xmlns=\"http://www.w3.org/2000/svg\" ng-attr-viewBox=\"{{viewBox}}\">\n" +
    "\t<rect \n" +
    "\t\tng-repeat=\"pos in positions\" ng-click=\"clickRect(pos.line, pos.column)\"\n" +
    "\t\tng-attr-x=\"{{pos.x}}\" ng-attr-y=\"{{pos.y}}\"\n" +
    "\t\tng-attr-width=\"{{rectWidth}}\" ng-attr-height=\"{{rectHeight}}\"\n" +
    "\t\tng-attr-stroke=\"{{lineColour}}\" ng-attr-fill=\"{{values[pos.line][pos.column] ? selectedColour : unselectedColour}}\" fill-opacity=\"1.0\" stroke-opacity=\"1.0\">\n" +
    "\t</rect>\n" +
    "</svg>"
  );

}]);
