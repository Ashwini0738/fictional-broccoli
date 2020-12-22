//First Function
function Quiz(questions){
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
};
Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}
Quiz.prototype.guess = function(answer){
    if(this.getQuestionIndex().isCorrectAnswer(answer)){
        this.score++;
    }
    this.questionIndex++;
}
Quiz.prototype.isEnded = function(){
    return this.questionIndex === this.questions.length;
}

//Second Function - 
function Question(text,choices,answer){
    this.text = text;
    this.choices = choices;
    this.answer = answer;
};
Question.prototype.isCorrectAnswer = function(choice){
    return this.answer === choice;
}

//Third Function - populate questions in index.html
function populate(){
    if(quiz.isEnded()){
        showScores();
    }
    else {
        //show questions
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        //show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++){
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

//Fourth Function - button
function guess(id,guess){
    var button = document.getElementById(id);
    button.onclick = function(){
        quiz.guess(guess);
        populate();
    }
};

//Fifth Function - Show Progress
function showProgress(){
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

//Sixth Function - Show Score
function showScores(){
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score' style='color:green'>Your Score:" + quiz.score + "</h2>"
    gameOverHTML += "<br><br><div style='text-align:center'><a id='score' href='index.html'>TAKE QUIZ AGAIN</a></div>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

//Using array to add questions
//Using Constructor to add array of questions
var questions = [
    new Question("Which command used to display top of the file?", ["cat", "head" , "more" , "grep"], "head"),
    new Question("How many types of heading does an HTML contain?", ["5", "8", "3", "6"], "6"),
    new Question("Which HTML tag is used to display the data in the tabular form?", ["table", "thead", "trow", "tab"], "table"),
    new Question("Which tag is used to change color of a text?", ["textcolor", "text-color", "color", "text-decoration"], "color"),
    new Question("Which tag used to break the line", ["break", "br", "hr", "line"], "br")
]
var quiz = new Quiz(questions);
//display quiz
populate();     