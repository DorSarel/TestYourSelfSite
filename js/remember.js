// RememberFeature.js
/*
The script will generate 10 words with their meanings.
Each word will be on another card as the meanings.
The user will need to choose 2 cards -
if the word match the meaning score will added and the 2 cards will disappear.
else the card will hide themselve and the user will keep looking.
*/

function Remember() {
    Test.call(this);
    this.choices = 0;
    this.selectedWord;
    this.secondSelect;
    this.childrenIndex = [];
    
    this.generateCards = function(words) {
      usedWords = [];
      
      /*for (var i = 0; i < 10; i++) {
          usedWords.push(words[i]);
          var ans = localStorage.getItem(words[i]);
          usedWords.push(ans);
      }*/
      
      var lastRnd;
      while (usedWords.length < 20) {
          var rnd = Math.floor(Math.random() * words.length);
          
          do {
              usedWords.push(words[rnd]);
              lastRnd = rnd;
              usedWords.push(localStorage.getItem(words[rnd]));
          } while (rnd !== lastRnd)
      }
      
      this.shuffle(usedWords);
      var htmlStatus = "";
      for (var i = 0; i < usedWords.length; i++) {
          htmlStatus += "<div class='card'>";
          htmlStatus += "<span>" + usedWords[i] + "</span>";
          htmlStatus += "</div>";
      }
      
      $("#test").html(htmlStatus);
      
      //Need to bind event to the #test childs.
      childs = $("#test").children();
      for (var i = 0; i < childs.length; i++) {
        childs[i].onclick = function() {
          $(this).addClass("selected");
          var spanText = $(this).children().text();
          rem.getChoices(spanText);
        }  
      }
      
    };
    
    this.getChoices = function(ans) {
        this.choices++;
        
        if (this.choices === 1) {
            this.selectedWord = ans;
            console.log(this.selectedWord);
        } else {
            this.choices = 0;
            this.secondSelect = ans;
            console.log(this.secondSelect);
            
            this.check(this.secondSelect);
        }
    };
    
    this.check = function(userAnswer) {
        var rightAnswer = localStorage.getItem(this.selectedWord);
        var testWrap = document.getElementById("test");
        var list = testWrap.querySelectorAll(".selected");
        
        if (rightAnswer === userAnswer) {
            this.score++;
            console.log(this.score);
            
            alert("Good One! Your score is: " + this.score);
            for (var i = 0; i < list.length; i++) {
                list[i].remove();
            }
        } else {
            alert("Have another try!");
            for (var i = 0; i < list.length; i++) {
                $wrong = $(list[i]);
                $wrong.removeClass("selected");
            }
        }
    };
}

Remember.prototype = Object.create(Test.prototype);
var rem = new Remember();
rem.getWords();

$("#rem").click(function() {
    
    if (!checkFor_10_Words()){
        rem.score = 0;
        rem.childrenIndex = [];
        rem.generateCards(rem.words);
    }
});

function checkFor_10_Words() {
    
    if (localStorage.length < 10) {
        alert("To create a game, need minimum 10 words.");
        $("#test").html("");
        return true;
    }
}