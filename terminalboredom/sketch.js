var lines, markov, data2;
var data1;
var sentence;
var counter;
var joined;
var splitarray;
var textdiv;
var counter = 0;
var handle = 0;
var myInterval;
var timer = 3000;
var markov;
var sentences;

function preload() {

    data1 = loadStrings('./data/data.txt');

}

function setup() {

    noCanvas();


    // create a markov model w' n=4
    markov = new RiMarkov(3);


    var textdiv = select('#textContainer');
    var search_term = ',';




    for (var i = data1.length - 1; i >= 0; i--) {
        if (data1[i] === search_term) {
            array.splice(i, 1);
            // break;       //<-- Uncomment  if only the first term has to be removed
        }
    }


    joined = data1.join(' ');
    // load text into the model

    markov.loadText(joined);

    //makesentences();
    if (markov.ready()) {

        console.log('models loaded')

    };

}

function makeparagraphs()

{




    sentence = markov.generateSentences(10);

}

function makesentences() {

    sentence = markov.generateTokens(10);
}

function makewords() {
    makeparagraphs();
    myInterval = setInterval(outputtext, timer);

    return;

}

function genSentence() {
    makesentences();
    myInterval = setInterval(outputSentence, 50);
    return;



}




// declare your variable for the setInterval so that you can clear it later


// this code clears your interval (myInterval)




function stopwords() {

    clearInterval(myInterval);


}

function outputtext() {
    counter++;
    var mydiv = document.getElementById("console");
    var newcontent = document.createElement('div');
    var cleansentence = RiTa.stripPunctuation(sentence[counter]);



    newcontent.innerHTML += cleansentence + "<br> <br> ";

    while (newcontent.firstChild) {
        mydiv.appendChild(newcontent.firstChild);
    }

    if (counter == 9) {
        makeparagraphs();
        counter = 0;
        //       var $div = $('#console');
        //$div.contents().remove();
        //    }
    }
}

function outputSentence() {

    counter++;
    var mydiv = document.getElementById("console");
    var newcontent = document.createElement('div');




    newcontent.innerHTML += sentence[counter] + " ";

    while (newcontent.firstChild) {
        mydiv.appendChild(newcontent.firstChild);
    }

    if (counter == 9) {
        newcontent.innerHTML += "</br> </br> ";
        while (newcontent.firstChild) {
            mydiv.appendChild(newcontent.firstChild);
        }


        makesentences();
        counter = 0;
        //       var $div = $('#console');
        //$div.contents().remove();
        //    }
    }
}

function goBack() {
    window.history.back();
}
