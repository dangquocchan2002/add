app.controller('updateaccountCtrl', function($rootScope, $scope) {
    $scope.update = function() {
        $rootScope.students[$rootScope.indexStudent] = angular.copy($rootScope.student);
        Swal.fire({
            icon: 'success',
            title: 'Cập nhật thông tin cá nhân thành công!',
        });

    }
});