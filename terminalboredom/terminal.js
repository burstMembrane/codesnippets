if (typeof console != "undefined")
    if (typeof console.log != 'undefined')
        console.olog = console.log;
    else
        console.olog = function () {};

var result = $('#console');

console.log = function (message) {
    console.olog(message);
    $('#console').append('<br />' + message + '<br />' + ' >> &nbsp;');
    result.focus();
    placeCaretAtEnd(document.getElementById("console"));
};
console.error = console.debug = console.info = console.log

function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined" &&
        typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
}


var listener = new window.keypress.Listener();
listener.sequence_combo("p a r a g r a p h enter", function () {
    var $div = $('#console');
    $div.contents().remove();

    //    hideHeader();

    console.log("/// S Y N T H E T I C \\\\\\<br /><br />\\\\\\\ M O N O L O G U E ///<br /><br /> <br /><br />");
    makewords();



});

listener.sequence_combo("s e n t e n c e enter", function () {
    var $div = $('#console');
    $div.contents().remove();

    //    hideHeader();

    console.log("/// L I F E \\\\\\<br /><br />\\\\\\\ S E N T E N C E ///<br /><br /> <br /><br />");
    genSentence();



});



var listener = new window.keypress.Listener();
listener.sequence_combo("h e l l o enter", function () {



    console.log(markov.generateUntil("hey"));

});



listener.sequence_combo("a b o u t enter", function () {
    var str = "liamfpower.com"
    var result = str.link("https://www.liamfpower.com");

    console.log("<br> These generators form part of a project by Liam Power which uses Markov Chains and Natural Language Processing to provide a simulation of speech.<br> Using data gained from a decade of Facebook Messenger logs, new text is generated procedurally ad infinitum. For more info visit " + result);


});

listener.sequence_combo("s t o p enter", function () {
    stopwords();

});

listener.sequence_combo("c l e a r enter", function () {

    var $div = $('#console');
    $div.contents().remove();

    console.log("<br />available commands: help, about, paragraph, sentence, stop, clear, back, reload <br />")



});
listener.sequence_combo("b a c k enter", function () {
    goBack();

});


listener.sequence_combo("h e l p enter", function () {
    console.log("<br> about -- displays information about the project <br> paragraph -- starts dialogue generation algorithm <br> sentence -- generates endless sentence <br> stop -- stop generating <br> clear -- clear page content and return to top <br> back -- go back to previous page <br> reload -- reload page <br>");






});



listener.sequence_combo("r e l o a d enter", function () {


    location.reload();






});



//
//
//function hideHeader() {
////    var x = document.getElementById("heading");
// //    if (x.style.display === "none") {
// //        x.style.display = "block";
// //    } else {
// //        x.style.display = "none";
// //    }
//}
