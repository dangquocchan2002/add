var app = angular.module("myapp", ["ngRoute"]);
app.config(function ($routeProvider) {
    $routeProvider
    .when("/home", {
        templateUrl: "bai2/home.html"
        })
        .when("/about", {
        templateUrl: "bai2/about.html"
        })
        .when("/contact", {
        templateUrl: "bai2/contact.html"
        })
        .when("/feedback", {
        templateUrl: "bai2/feedback.html"
        })
        .when("/faq", {
        templateUrl: "bai2/faq.html"
    })
    .when("/account/login", {
    templateUrl: "bai2/account/login.html"
    })
    .when("/account/register", {
    templateUrl: "bai2/account/register.html"
    })
    .when("/account/forgot", {
    templateUrl: "bai2/account/forgot.html"
    })
    .when("/account/logoff", {
    redirectTo: "/home"
    })
    .when("/account/change", {
    templateUrl: "bai2/account/change.html"
    })
    .when("/account/profile", {
    templateUrl: "bai2/account/profile.html"
    })
    .when("/account/orders", {
    templateUrl: "bai2/account/orders.html"
    })
    .when("/account/products", {
    templateUrl: "bai2/account/products.html"
    })
    .when("/category/:id", {
    templateUrl: "bai2/ProductList.html",
    controller:"categoryCtrl"
    })
    .when("/supplier/:id", {
    templateUrl: "bai2/ProductList.html",
    controller: "supplierCtrl"
    })
    .when("/special/:id", {
    templateUrl: "bai2/ProductList.html",
    controller: "specialCtrl"
    })
    .otherwise({
    redirectTo: "/home"
    });
});

app.run(function ($rootScope) {
    $rootScope.$on('$routeChangeStart', function () {
        $rootScope.loading = true;
    });
    $rootScope.$on('$routeChangeSuccess', function () {
        $rootScope.loading = false;
    });
    $rootScope.$on('$routeChangeError', function () {
        $rootScope.loading = false;
    alert("Lỗi");
    });
});