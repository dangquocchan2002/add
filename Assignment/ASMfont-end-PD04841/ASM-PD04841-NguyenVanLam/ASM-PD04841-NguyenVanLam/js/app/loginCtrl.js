app.controller('loginCtrl', function($scope, $rootScope) {
    $scope.login = function() {
        var ig = true;
        $rootScope.students.forEach(st => {
            if (st.username == $scope.username) {
                if (st.password == $scope.password) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Đăng nhập thành công!',
                        text: 'Quay lại trang chủ!',
                        showConfirmButton: false,
                        closeOnClickOutside: false,
                        allowOutsideClick: false,
                        timer: 1600
                    });
                    $rootScope.indexStudent = st.index;
                    $rootScope.student = st;
                    window.location.href = "#!index";


                    ig = false;
                    return;
                };
            };
        });
        if (ig == true) {
            Swal.fire({
                icon: 'error',
                title: 'Đăng nhập thất bại!',
                text: 'Nhập lại!'
            });
        }
    };

});