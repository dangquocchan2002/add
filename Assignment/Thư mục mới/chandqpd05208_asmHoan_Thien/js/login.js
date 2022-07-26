var app = angular.module("myapp", []);
app.controller('mylogin', function($scope, $location, $http, $rootScope, $window) {
    $http.get("db/Students.js").then(function (response) {
        $scope.students = response.data;

        if ($window.sessionStorage.getItem('"account"') == null) {
            $window.sessionStorage.setItem('"account"', JSON.stringify($scope.students));
        }

        var acc = JSON.parse($window.sessionStorage.getItem('"account"'));
        
        
        // login
        $scope.login = function() {
            for(var i = 0; i < acc.length; i++) {
                if (acc[i].username == $scope.username && acc[i].password == $scope.password) {
                    // $location.path('/');
                    $window.location.href = "index.html";
                    $rootScope.username = acc[i].username;
                    $rootScope.password = acc[i].password;
                    $rootScope.fullname = acc[i].fullname;
                    $rootScope.email = acc[i].email;
                    $rootScope.birthday = acc[i].birthday;
                    $rootScope.gender = acc[i].gender;
                    $window.sessionStorage.setItem('fullname', JSON.stringify($rootScope.fullname));
                    $rootScope.success = true;
                    break;
                }
                if(!$rootScope.success) {
                    alert("Đăng nhập thất bại!");
                    return;
                };
            }
        }
        // sign up
        $scope.signup = function() {
            
            for (var i = 0; i < acc.length; i++) {
                if (acc[i].username != $scope.student.username && $scope.student.password == $scope.confirm_password) {
                    $rootScope.success = true;
                }else {
                    $rootScope.success = false;
                }
            }
            if ($rootScope.success == true) {
                acc.push(angular.copy($scope.student));
                $window.sessionStorage.setItem('"account"', JSON.stringify(acc));
                alert("Đăng ký thành công !");
                $location.path("'/login'");
            }else {
                if ($scope.student.password == $scope.student.confirm_password) {
                    alert("Tài khoản đã tồn tại !");
                }else {
                    alert("Mật khẩu xác nhận không đúng !")
                }
            }
        };
        // update
        for (var i = 0; i < acc.length; i++) {
            if ($rootScope.username == acc[i].username) {
                $scope.student = angular.copy(acc[i]);
                break;
            }
        }

        console.log($scope.student);

        $scope.update = function() {
            for (var i = 0; i < acc.length; i++) {
                if ($rootScope.username == acc[i].username) {
                    acc[i] = (angular.copy($scope.student));
                    $window.sessionStorage.setItem('"account"', JSON.stringify(acc));
                    $rootScope.username = acc[i].username;
                    $rootScope.password = acc[i].password;
                    $rootScope.fullname = acc[i].fullname;
                    $rootScope.email = acc[i].email;
                    $rootScope.birthday = acc[i].birthday;
                    $rootScope.gender = acc[i].gender;
                    alert("Cập nhật thành công !")
                }
            }
        }
        // đăng xuất
        $scope.logout = function() {
            $rootScope.success = false;
            $rootScope.fullname = "";
        }
    });
});