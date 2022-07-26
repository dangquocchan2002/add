app.controller('forgotpasswordCtrl', function($rootScope, $scope) {
    $scope.getPass = function() {
        var ck = true;
        $rootScope.students.forEach(st => {
            if (st.email == $scope.email && st.username == $scope.username) {
                Swal.fire({
                    icon: 'success',
                    title: 'Lấy lại tài khoản thành công!',
                    text: 'Mật khẩu: ' + st.password,
                });
                ck = false;
                return;
            }
        });
        if (ck) {
            Swal.fire({
                icon: 'error',
                title: 'Lấy lại tài khoản thất bại!',
                text: 'Vui lòng nhập lại thông tin',
            });
        }
    }

});