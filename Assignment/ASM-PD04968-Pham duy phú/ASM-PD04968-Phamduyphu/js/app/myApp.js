var app = angular.module("myApp", ['ngRoute', 'ngAnimate']);
app.run(function($rootScope, $http, $timeout) {

    $http.get("db/Students.js").then(function(response) {
        $rootScope.students = response.data;
    });

    $http.get("db/Subjects.js").then(function(response) {
        $rootScope.subjects = response.data;
    });

    $rootScope.student = null;

    $rootScope.logoff = function() {
        $rootScope.student = null;
        $rootScope.indexStudent = -1;
        Swal.fire({
            icon: 'warning',
            title: 'Đã đăng xuất!',
            text: 'Quay lại trang chủ!',
            showConfirmButton: false,
            closeOnClickOutside: false,
            allowOutsideClick: false,
            timer: 1600
        });
        window.location.href = "#!index";
    }
});

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when("/index", { templateUrl: "html/index.html", controller: "indexCtrl" })
        .when("/about", { templateUrl: "html/about.html" })
        .when("/contact", { templateUrl: "html/contact.html" })
        .when("/feedback", { templateUrl: "html/feedback.html" })
        .when("/FAQ", { templateUrl: "html/FAQ.html" })
        .when("/login", { templateUrl: "html/login.html", controller: "loginCtrl" })
        .when("/register", { templateUrl: "html/register.html", controller: "registerCtrl" })
        .when("/forgotpassword", { templateUrl: "html/forgotpassword.html", controller: "forgotpasswordCtrl" })
        .when("/updateaccount", { templateUrl: "html/updateaccount.html", controller: "updateaccountCtrl" })
        .when("/changepassword", { templateUrl: "html/changepassword.html", controller: "changepasswordCtrl" })
        .when("/viewtest/:id", { templateUrl: "html/viewtest.html", controller: "viewtestCtrl" })
        .when("/test/:id", { templateUrl: "html/test.html", controller: "testCtrl" })
        .otherwise({ redirectTo: "/index" });



});

app.directive('rePass', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attr, mCtrl) {
            function rePas(value) {
                var pass = scope.studentR.password;
                if (pass == value) {
                    mCtrl.$setValidity('charE', true);
                } else {
                    mCtrl.$setValidity('charE', false);
                }
                return value;
            }
            mCtrl.$parsers.push(rePas);
        }
    }
});
app.directive('fee', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attr, mCtrl) {
            function Sfee(value) {
                var pass = parseInt(value)
                if (pass >= 2000000) {
                    mCtrl.$setValidity('charE', true);
                } else {
                    mCtrl.$setValidity('charE', false);
                }
                return value;
            }
            mCtrl.$parsers.push(Sfee);
        }
    }
});