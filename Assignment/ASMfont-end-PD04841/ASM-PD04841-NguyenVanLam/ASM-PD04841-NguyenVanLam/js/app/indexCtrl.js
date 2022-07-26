app.controller('indexCtrl', function($scope, $rootScope) {
    $scope.cout = 0;
    $scope.pageCount = Math.ceil($rootScope.subjects.length / 4);
    $scope.prev = function() {
        if ($scope.cout > 0) {
            $scope.cout -= 4;
        }
    }
    $scope.next = function() {
        if ($scope.cout < ($scope.pageCount - 1) * 4) {
            $scope.cout += 4;
        }
    }
});