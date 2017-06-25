(function(){
    angular
    .module("turtleFacts")
    .controller("quizCtrl", QuizController);
    
    QuizController.$inject = ['quizMetrics','DataService'];
    
    function QuizController(quizMetrics, DataService){
        var vm = this;
        vm.quizMetrics = quizMetrics;
        vm.DataService = DataService;
        vm.questionAnswered = questionAnswered;
        vm.setActiveQuestion = setActiveQuestion;
        vm.selectAnswer = selectAnswer;
        vm.error = false;
        vm.activeQuestion = 0;
        
        var numQuestionsAnswered = 0;
        
        function setActiveQuestion (index) {
            if (index === undefined) {
            var breakOut = false;
            var quizLength = DataService.quizQuestions.length - 1;
            while (!breakOut) {
                vm.activeQuestion = vm.activeQuestion < quizLength? ++vm.activeQuestion:0;
                
                if (vm.activeQuestion === 0) {
                        vm.error = true;
                    }
                    
                if (DataService.quizQuestions[vm.activeQuestion].selected === null) {
                        breakOut = true;
                    }
                }
            }else {
                vm.activeQuestion = index;
            }
        }
        
        function questionAnswered () {
            var quizLenght = DataService.quizQuestions.length;
            
            if (DataService.quizQuestions[vm.activeQuestion].selected !== null) {
                    numQuestionsAnswered++;
                if (numQuestionsAnswered >= quizLenght) {
                        // finalize quiz -- checks for leftover que and focus on it
                        for (i = 0; i < quizLenght; i++) {
                            if (DataService.quizQuestions[i].selected === null) {
                                    setActiveQuestion(i);
                                return;
                                }
                        }
                    }
                }
            vm.setActiveQuestion();
        }
        
        function selectAnswer (index) {
            DataService.quizQuestions[vm.activeQuestion].selected = index;
        }
    }
})();