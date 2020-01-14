app.controller("MyController", ['$scope','$modal', function($scope,$modal)
    {
		console.log('opening pop up');
 $scope.article = "Bahmni printout test";    
 $scope.open = function () {
console.log('opening pop up');
var modalInstance = $modal.open({
templateUrl: 'popup.html',
});
}
}]);
