var app = angular.module("myapp", ["ngRoute"]);
app.config(function ($routeProvider) {
    $routeProvider
    .when("/home", {
        templateUrl: "home.html"
    })
    .when("/about", {
        templateUrl: "about.html"
    })
    .when("/contact", {
        templateUrl: "contact.html"
    })
    .when("/feedback", {
        templateUrl: "feedback.html"
    })
    .when("/account/login", {
        templateUrl: "login.html"
    })
    .when("/account/register", {
        templateUrl: "register.html"
    })
    .when("/account/forgot", {
        templateUrl: "forgot.html"
    })
    .when("/account/logoff", {
        redirectTo: "/home"
    })
    .when("/account/change", {
        templateUrl: "change.html"
    })
    .when("/account/profile", {
        templateUrl: "profile.html"
    })
    .when("/account/orders", {
        templateUrl: "orders.html"
    })
    .when("/account/products", {
        templateUrl: "products.html"
    })
    .when("/category/:id", {
        templateUrl: "ProductList.html",
        controller:"categoryCtrl"
    })
    .when("/supplier/:id", {
        templateUrl: "bai2/ProductList.html",
        controller:"supplierCtrl"
    })
    .when("/special/:id", {
        templateUrl: "bai2/ProductList.html",
        controller:"specialCtrl"
    })
    .oherwise({
        redirectTo: "/home"
    });
});

app.run(function ($rootScope){
    $rootScope.$on('$routeChangeStart', function(){
        $rootScope.loading = true;
    });
    $rootScope.$on('$routeChangeSuccess', function(){
        $rootScope.loading = false;
    });
    $rootScope.$on('$routeChangeError', function(){
        $rootScope.loading = false;
        alert("Lỗi");
    });
});

app.controller("categoryCtrl", function ($scope, $routeParams) 
{
 $scope.title = "CATEGORY MANAGER";
 $scope.id = $routeParams.id;
});
app.controller("supplierCtrl", function ($scope, $routeParams) 
{
 $scope.title = "SUPPLIER MANAGER";
 $scope.id = $routeParams.id;
});
app.controller("specialCtrl", function ($scope, $routeParams) 
{
 $scope.title = "SPECIAL MANAGER";
 $scope.id = $routeParams.id;
});