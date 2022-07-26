var app = angular.module("myapp", []);
app.directive('quiz', function(myquiz) {
    return {
        restrict: 'AE',
        scope: {},
        templateUrl:'template-quiz.html',
        link: function($scope, $element, $attrs) {
            $scope.start = function() {
                $scope.Id = 0;
                $scope.inProgess = true;
                $scope.getQuestion();
                $scope.quizOver = false;
            };

            $scope.reset = function() {
                $scope.inProgess = false;
                $scope.score = 0;
            };

            $scope.getQuestion = function() {
                var quiz = myquiz.getQuestion($scope.Id);
                if(quiz) {
                    $scope.question = quiz.Text;
                    $scope.options = quiz.Answers;
                    $scope.answer = quiz.AnswerId;
                    $scope.answerMode = true;
                }else {
                    $scope.quizOver = true;
                }
            };
            $scope.checkAnswer = function() {
                if (!$('input[name = answer]:checked').length) return;
                var ans = $('input[name = answer]:checked').val();
                if (ans == $scope.answer) {
                    $scope.score++;
                    $scope.correctAns = true;
                } else {
                    $scope.correctAns = false;
                };
                $scope.answerMode = false;
            };
            $scope.nextQuestion = function() {
                $scope.Id++;
                $scope.getQuestion();
            }
            $scope.reset();
        }
    }
});

app.factory("myquiz", function($http) {
    $http.get('db/Quizs/ADAV.js').then(function(res) {
        questions = res.data;
    });
    return {
        getQuestion: function(Id) {
            var randomQuestion = questions[Math.floor(Math.random() * questions.length)];
            var count = questions.length;
            if(count > 10) {
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