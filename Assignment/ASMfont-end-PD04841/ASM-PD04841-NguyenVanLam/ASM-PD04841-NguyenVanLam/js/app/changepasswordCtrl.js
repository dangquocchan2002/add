app.controller('changepasswordCtrl', function($rootScope, $scope) {
    $scope.change = function() {
        if ($rootScope.student.password == $scope.oldpassword) {
            if ($rootScope.student.password == $scope.studentR.password) {
                Swal.fire({
                    icon: 'error',
                    title: 'Mật khẩu mới trùng với mật khẩu cũ!'
                });
            } else {
                $rootScope.student.password = $scope.studentR.password;
                $rootScope.students[$rootScope.indexStudent] = angular.copy($rootScope.student);
                Swal.fire({
                    title: 'Đổi mật khẩu thành công',
                    text: "Bạn có muốn quay lại trang chủ!",
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Có!',
                    cancelButtonText: 'Không'
                }).then((result) => {
                    if (result.value) {
                        window.location.href = "#!index";
                    }
                })
            }

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Mật khẩu cũ không đúng!'
            });
        }
        $scope.oldpassword = "";
        $scope.studentR.password = "";
        $scope.renewpassword = "";
    }
});