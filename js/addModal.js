//AddModal.js
/*
Part 1:
The script will hide the addModal div.
when the "Add Word" button will be clicked, 
the screen will get black shade and on a white background the div will be showed.

Part 2:
The script will get 2 values from the user.
First, the word in english.
second, the translated word.

The pair will be saved in the user web browser using LocalStorage API.
*/


//Checking if the browser support the localStorage API
if (typeof(Storage) !== "undefined") {
    
    var $addModal = $("#addModal");
    $addModal.hide()
    
    //Binding the click event to #add div
    $("#add").click(function() {
        $addModal.fadeIn()
    });
    
    //Binding the submit event to the form
    $("form").submit(function(event) {
        event.preventDefault();
        
        //Getting the values from the input
        var word = $("#addWord").val();
        var tranWord = $("#transWord").val();
        
        if (word !== "" && tranWord !== "") {
            localStorage.setItem(word, tranWord);
        }
        
        $("#addWord").val("");
        $("#transWord").val("");
        
        // Closing the div
        $addModal.fadeOut();
    });
    
    $("#show").click(function() {
        
        if(localStorage.length > 0) {
            var htmlStatus = "<table id='result' style='margin:auto;'>";
            htmlStatus += "<thead>";
            htmlStatus += "<tr>";
            htmlStatus += "<th>Word</th>";
            htmlStatus += "<th>Translated Word</th>";
            htmlStatus += "</tr></thead>";
            htmlStatus += "<tbody>";
            
            for(var i = 0; i < localStorage.length; i++) {
                var word_key = localStorage.key(i);
                var tran_key = localStorage.getItem(word_key);
                
                htmlStatus += "<tr>";
                htmlStatus += "<td>" + word_key + "</td>";
                htmlStatus += "<td>" + tran_key + "</td>";
                htmlStatus += "</tr>";
            }
            
            htmlStatus += "</tbody>";
            htmlStatus += "</table>"; 
            
            $("#test").html(htmlStatus);
        } else {
            var htmlStatus = "<h2 style='text-align: center;'>No Words To Show</h2>";
            $("#test").html(htmlStatus);
        }
    });
    
    $("#clean").click(function() {
        var replay = confirm("Are you sure you want to erase all the words?");
        if (replay === true) {
            localStorage.clear();
        }
    });
    
    
} else {
    $("body").html("<h1>Sorry! but your browser does not support localStorage!</h1>");
}