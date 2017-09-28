var app = angular.module('app', [])
app.controller('ctr', function($scope) {

    $scope.review = 1;

    $scope.add = function() {

        $scope.review++;

    };
})