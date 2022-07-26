var app = angular.module("myapp",[]);
app.controller("subjectCtrl", function($scope, $http){
    $scope.list_subject = [];
    $http.get('db/Subjects.js').then(function(reponse){
        $scope.list_subject = reponse.data;
    })
});