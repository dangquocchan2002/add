var app = angular.module("myApp", ["ngRoute"]);
app.config(function ($routeProvider) {
    $routeProvider
    .when("/home", {
        templateUrl: "bai1/home.html"
    })
    .when("/about", {
        templateUrl: "bai1/about.html"
    })
    .when("/contact", {
        templateUrl: "bai1/contact.html"
    })
    .otherwise({
        redirectTo: "/home"
    })
});
app.run(function($rootScope){
    $rootScope.$on('$routeChangeStart', function(){
        $rootScope.loading = true;
    });
    $rootScope.$on('$routeChangeSuccess', function(){
        $rootScope.loading = false;
    });
    $rootScope.$on('$routeChangeError', function(){
        $rootScope.loading = false;
        alert("Lỗi, không tải được template");
    });
});