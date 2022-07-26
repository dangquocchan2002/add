var app = angular.module("myapp", ['ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'subject.html',
            controller: 'subjectCtrl'
        })
        .when('/quiz/:Id/:Name/:Logo', {
            templateUrl: 'quiz-app.html',
            controller: 'quizCtrl'
        })
});
//doc file hien thi mon hoc
app.controller("subjectCtrl", function ($scope, $http) {
    $scope.list_subject = [];
    $http.get('db/Subjects.js').then(function (res) {
        $scope.list_subject = res.data;
    });

//dong ho 

var minute = 10;
        var second = 60;
        setInterval(function () {
            if (minute == 0 && second == 1) {
                document.getElementById('counter').innerHTML = "00 : 00";
            } else {
                second--;
                if (second == 0) {
                    minute--;
                    second = 60;

                    if (minute == 0) {
                        minute = minute;
                    }
                }
                if (minute.toString().length == 1) {
                    minute = "0" + minute;
                }

                if (second.toString().length == 1) {
                    second = "0" + second;
                }

                if (minute == 0 && second == 0) {
                    clearInterval(this);
                    
                }

                document.getElementById('counter').innerHTML = minute + " : " + second;
            }
        }, 1000);
    // $scope.time = 10;
    // var refresh;

    // $scope.startTimer = (function () {
    //     var countTime = function () {
    //         $scope.minutes = parseInt($scope.time / 60, 10);
    //         $scope.seconds = parseInt($scope.time % 60, 10);

    //         $scope.minutes = $scope.minutes < 10 ? "0" + $scope.minutes : $scope.minutes;
    //         $scope.seconds = $scope.seconds < 10 ? "0" + $scope.seconds : $scope.seconds;

    //         if (--$scope.timer < 0) {
    //             $scope.stop;
    //         }

    //         countTime();
    //         refresh = $interval(function () {
    //             countTime();
    //         }, 1000);
    //     }
    // });
    // $scope.stop = function () {
    //     $interval.cancel(refresh);
    // };

    //---------//

});
app.controller("quizCtrl", function ($scope, $http, $routeParams, myquiz) {
    $http.get('db/Quizs/' + $routeParams.Id + '.js').then(function (res) {
        myquiz.questions = res.data;
    });
});
app.directive('quiz', function (myquiz, $routeParams) {
    return {
        restrict: 'AE',
        scope: {},
        templateUrl: 'template-quiz.html',
        link: function ($scope, $element, $attrs) {
            $scope.start = function () {
                myquiz.getQuestions().then(function () {
                    $scope.subjectName = $routeParams.Name;
                    $scope.subjectLogo = $routeParams.Logo;
                    $scope.Id = 0;
                    $scope.inProgess = true;
                    $scope.getQuestion();
                    $scope.quizOver = false;
                });
            };

            $scope.reset = function () {
                $scope.inProgess = false;
                $scope.score = 0;
            };

            $scope.getQuestion = function () {
                var quiz = myquiz.getQuestion($scope.Id);
                if (quiz) {
                    $scope.question = quiz.Text;
                    $scope.options = quiz.Answers;
                    $scope.answer = quiz.AnswerId;
                    $scope.answerMode = true;
                } else {
                    $scope.quizOver = true;
                }
            };
            $scope.checkAnswer = function () {
                if (!$('input[name = answer]:checked').length) return;
                var ans = $('input[name = answer]:checked').val();
                if (ans == $scope.answer) {
                    $scope.score++;
                    
                } 
                $scope.answerMode = false;
            };
            $scope.nextQuestion = function () {
                $scope.checkAnswer();
                $scope.Id++;
                $scope.getQuestion();
            };

            
            $scope.reset();
        }
    }
});




app.factory("myquiz", function ($http, $routeParams) {
    return {
        getQuestions: function () {
            return $http.get('db/Quizs/' + $routeParams.Id + '.js').then(function (res) {
                questions = res.data;
            });
        },
        getQuestion: function (Id) {
            var randomQuestion = questions[Math.floor(Math.random() * questions.length)];
            var count = questions.length;
            if (count > 10) {
                count = 10;
            }
            if (Id < 10) {
                return randomQuestion;
            } else {
                return false;
            }
            return questions[Id];
        }
    }
});