//test.js
/*
The script will retrieve data from the localStorage API.
then, it will create the test template with the word to translate
and 4 options for guessing.

if the user will answer correctly, one point will be added.
*/


function Test() {
    this.words = [];
    this.options = [];
    this.score = 0;
    this.wordIndex = 0;
    this.wrongWords = [];
}

Test.prototype.getWords = function() {
    this.words = [];
    
    for (var i = 0; i < localStorage.length; i++) {
        this.words.push(localStorage.key(i));
    }
    
}

Test.prototype.getOptions = function() {
    this.options = [];
    
    for (var i = 0; i < this.words.length; i++) {
        this.options.push(localStorage.getItem(this.words[i]));
    }
    
}

Test.prototype.shuffle = function(arr) {
    var j, x, i;
    
    for (i = arr.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = arr[i - 1];
        arr[i - 1] = arr[j];
        arr[j] = x;
    }
}

Test.prototype.renderHTML = function(word, four_options) {
    
    this.shuffle(four_options);
    
    var htmlStatus = "<h2 id='word'>" + word + "</h2>";
    htmlStatus += "<ul id='options'>";
    htmlStatus += "<li class='b-border r-border'>" + four_options[0] + "</li>";
    htmlStatus += "<li class='b-border'>" + four_options[1] + "</li>";
    htmlStatus += "<li class='r-border'>" + four_options[2] + "</li>";
    htmlStatus += "<li>" + four_options[3] + "</li>";
    htmlStatus += "</ul>";
    
    $("#test").html(htmlStatus);
    
    //Get all the li elements
    answers = $("#options").children();
    
    //Bind onclick event to the li
    for (var i = 0; i < answers.length; i++) {
        answers[i].onclick = function() {
            var listItemText = $(this).text();
            test.checkAns(listItemText);
        }
    }
    
}

Test.prototype.startGame = function() {
    
    var currentWord = this.words[this.wordIndex];
    var currentAnswer = localStorage.getItem(currentWord);
    
    var randomOptions = [];
    var lastWord = "";
    //Adding 3 options to the array above
    while (randomOptions.length < 3) {
        var rnd = Math.floor(Math.random() * this.options.length);
        var optionalWord = this.options[rnd];
        
        //Checking the word generated for avoiding duplicates
        if ((optionalWord == currentAnswer) || (optionalWord == lastWord)) {
            continue;
        } else {
            randomOptions.push(optionalWord);
            lastWord = optionalWord;
        }
        
    }
    
    //Pushing the correct answer to the array
    randomOptions.push(currentAnswer);
    
    this.renderHTML(currentWord, randomOptions);
    
}

Test.prototype.checkAns = function (userAns) {
    currentAns = localStorage.getItem(this.words[this.wordIndex]);
    
    if (userAns == currentAns) {
        this.score++;
        this.wordIndex++;
        
        if (this.checkForEnd()) {

            var htmlStatus = this.finishQuiz();
            $("#test").html(htmlStatus);
            
            this.wordIndex = 0;
            this.score = 0;
            
        } else {
            this.startGame();
        }

    } else {
        
        var wrong = {
            "word" : [this.words[this.wordIndex], userAns, currentAns]
        };
        
        this.wrongWords.push(wrong);
        this.wordIndex++;
        if (this.checkForEnd()) {
            
            var htmlStatus = this.finishQuiz();
            $("#test").html(htmlStatus);
            
            this.wordIndex = 0;
            this.score = 0;
            
        } else {
            this.startGame();
        }
    }
}

Test.prototype.checkForEnd = function() {
    return this.wordIndex == this.words.length;
}

Test.prototype.finishQuiz = function() {
    
    var htmlStatus = "<h2>You finished your quiz!</h2>";
    htmlStatus += "<h3>Your score is: " + this.score + "/" + this.words.length + "</h3>";
    
    if (this.wrongWords.length > 0) {
        htmlStatus += "<p>You got this words wrong:</p>";
        htmlStatus += "<table id='result'>";
        htmlStatus += "<thead>";
        htmlStatus += "<tr>";
        htmlStatus += "<th>Word</th>";
        htmlStatus += "<th>Your answer</th>";
        htmlStatus += "<th>Correct answer</th>";
        htmlStatus += "</tr></thead>";
        htmlStatus += "<tbody>";
        
        for (var i = 0; i < this.wrongWords.length; i++) {
            htmlStatus += "<tr>";
            htmlStatus += "<td>" + this.wrongWords[i].word[0] + "</td>";
            htmlStatus += "<td>" + this.wrongWords[i].word[1] + "</td>";
            htmlStatus += "<td>" + this.wrongWords[i].word[2] + "</td>";
            htmlStatus += "</tr>";
        }
        htmlStatus += "</tbody>";
        htmlStatus += "</table>"; 
    }
    
    
    return htmlStatus
}






//Starting The test plan

var test = new Test();

$("#start").click(function() {
    
    if (!checkForWords()) {
        test.getWords();
        test.getOptions();
        test.score = 0;
        test.wordIndex = 0;
        test.startGame();
    }
});



function checkForWords() {
    
    if (localStorage.length < 4) {
        alert("To create a test, need minimum 4 words.");
        $("#test").html("");
        return true;
    }
}

