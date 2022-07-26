var app = angular.module('myapp', []);

app.directive('quizzfpoly', function (quizFactory) {
    return {
        restrict: 'AE',
        scope: {},
        templateUrl: 'template-quiz.html',
        link: function (scope, elem, attrs) {
            scope.start = function () {

                    scope.id = 1;
                    scope.quizOver = false; // chua hoan thanh 
                    scope.inProgess = true;
                    scope.getQuestion();
                };

            
            scope.reset = function () {
                scope.inProgess = false;
                scope.score = 0;
            };
            scope.getQuestion = function () {
                var quiz = quizFactory.getQuestion(scope.id);
                if (quiz) {
                    scope.question = quiz.Text;
                    scope.options = quiz.Answers
                    scope.answer = quiz.AnswerId;
                    scope.answerMode = true;
                } else {
                    scope.quizOver = true;
                }


            }
           
            scope.checkAnswer = function () {
                // alert('answer');
                if (!$('input[name = answer]:checked').length) return;
                var ans = $('input[name = answer]:checked').val();
                if (ans == scope.answer) {
                    // alert('dung');
                    scope.score++;
                    scope.correctAns = true;
                }
                else {
                    // alert('sai');
                    scope.correctAns = false;
                }
                scope.answerMode = false;
            };
            scope.nextQuestion = function () {
                scope.id++;
                scope.getQuestion();
            }

            scope.reset();
        }
    }
});
app.factory('quizFactory', function ($http) {
    $http.get('../db/Quizs/ADAV.js').then(function(res) {
        questions = res.data;
        // alert(questions.length);
    });
    return {
        getQuestion: function (id) {
            var randomItem = questions[Math.floor(Math.random() * questions.length)];
            var count = questions.length;
            if (count > 10) {
                count = 10;
            }
            if (id < count) {
                return randomItem;
            } else {
                return false;
            }
            // return questions[id];

        }
    }
});
app.diem(function(){
    if(score < 5){
        alert("Bạn đã rớt");
    }else{
        alert("Bạn đã đậu");
    }
    return false;
})

    // return {
    //     getQuestions: function () {
    //         return $http.get('../db/Quizs/' + $routeParams.id + '.js').then(function (res) {
    //             questions = res.data;
    //             // alert(questions.length);
    //         });
    //     },
    //     getQuestion: function (id) {
    //         var randomItem = questions[Math.floor(Math.random() * questions.length)];
    //         var count = questions.length;
    //         if (count > 10) {
    //             count = 10;
    //         }

    //         if (id < count) {
    //             return randomItem;
    //         } else {
    //             return false;
    //         }
    //         return questions[id];
    //     }
    // }
// });