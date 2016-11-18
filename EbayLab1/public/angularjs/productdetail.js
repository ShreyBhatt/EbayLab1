var productdetail = angular.module('productdetail', []);
productdetail.controller('productdetail_controller', function($scope, $http)
{
    $scope.addcart = function(req,res){
        console.log($scope.productname);
        $http({
            method:'post',
            url:'/addcart',

            data:{
                "productname":$scope.productname,
                "price":$scope.price,
                "quantity":$scope.quantity,
            }
        }).success(function(data){
            //console.log(data);

        }).error(function(error) {
            console.log("error");
        })

    }
/*    $scope.loadCart=function()
    {}*/
   /* $http({
        method : "GET",
        url : "/productdetail",
        data: {
            "productid": $scope.productid,
            "productname": $scope.productname,
            "description": $scope.description,
            "price": $scope.price,
            "quantity": $scope.quantity,
            "seller": $scope.seller,
            "sellingfrom": $scope.sellingfrom


        }
    })
        .then(function success(data){
                console.log(data);
                $scope.productname = data.productname;
                $scope.price = data.price

            },
            function error(err){
                console.log(err);
            })*/
});