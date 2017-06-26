(function () {
    angular
    .module("turtleFacts")
    .factory("quizMetrics", QuizMetrics);
    
    function QuizMetrics () {
        var quizObj = {
            quizActive : false,
            resultActive: false,
            changeState : changeState
        };
        return quizObj;
        
        function changeState (metric, state) {
            if (metric === "quiz") {
            quizObj.quizActive = state;
                }
            else if (metric === "results") {
                     quizObj.resultActive = state;
                     }
            else{
                return false;
            }
        }
    }
})();