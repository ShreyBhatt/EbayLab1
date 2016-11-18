var advertisement = angular.module('advertisement', []);
advertisement.controller('advertisement_controller', function($scope, $http) {

    $http({
        method : "GET",
        url : '/displayadvertise'
    })
        .then(function success(data){
            console.log(data);
            $scope.advertisements = data.data;
        },
        function error(err){
            console.log(err);
        })
});

advertisement.controller('advertisement_controller1', function($scope, $http) {

    $http({
        method : "GET",
        url : '/displayalladvertise'
    })
        .then(function success(data){
                console.log(data);
                $scope.advertisements = data.data;
            },
            function error(err){
                console.log(err);
            })
});
/*

$scope.lastlogin = function() {
    $http({
        method : "GET",
        url : '/lastlogin',
        data: {
            "lastlogin": $scope.lastlogin,
        }
    }).success(function(data) {
            //checking the response data for statusCode
            console.log(data);
            $scope.lastlogin = data.data;


        },
        function error(err){
            console.log(err);
        });
};*/
