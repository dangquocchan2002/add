var app = angular.module("myapp", []);
app.controller('mylogin', function($scope, $location, $http, $rootscope, $window) {
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
                    $rootscope.username = acc[i].username;
                    $rootscope.password = acc[i].password;
                    $rootscope.fullname = acc[i].fullname;
                    $rootscope.email = acc[i].email;
                    $rootscope.birthday = acc[i].birthday;
                    $rootscope.gender = acc[i].gender;
                    $window.sessionStorage.setItem('fullname', JSON.stringify($rootscope.fullname));
                    $rootscope.success = true;
                    break;
                }
                if(!$rootscope.success) {
                    alert("Username hoặc password không đúng !");
                };
            }
        }
        // sign up
        $scope.signup = function() {
            for (var i = 0; i < acc.length; i++) {
                if (acc[i].username != $scope.student.username && $scope.student.password == $scope.confirm_password) {
                    $rootscope.success = true;
                }else {
                    $rootscope.success = false;
                }
            }
            if ($rootscope.success == true) {
                acc.push(angular.copy($scope.student));
                $window.sessionStorage.setItem('account', JSON.stringify(acc));
                alert("Đăng ký thành công !");
                $location.path('/login');
            }else {
                if ($scope.student.password == $scope.student.confirm_password) {
                    alert("Tài khoản đã tồn tại !");
                }else {
                    alert("Mật khẩu xác nhận không đúng !")
                }
            }
        }
        // update
        for (var i = 0; i < acc.length; i++) {
            if ($rootscope.username == acc[i].username) {
                $scope.student = angular.copy(acc[i]);
                break;
            }
        }

        console.log($scope.student);

        $scope.update = function() {
            for (var i = 0; i < acc.length; i++) {
                if ($rootscope.username == acc[i].username) {
                    acc[i] = (angular.copy($scope.student));
                    $window.sessionStorage.setItem('account', JSON.stringify(acc));
                    $rootscope.username = acc[i].username;
                    $rootscope.password = acc[i].password;
                    $rootscope.fullname = acc[i].fullname;
                    $rootscope.email = acc[i].email;
                    $rootscope.birthday = acc[i].birthday;
                    $rootscope.gender = acc[i].gender;
                    alert("Cập nhật thành công !")
                }
            }
        }
        // đăng xuất
        $scope.logout = function() {
            $rootscope.success = false;
            $rootscope.fullname = "";
        }
    });
});