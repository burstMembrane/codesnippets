// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ML5 Example
ImageNet_Camera
Video Camera Classification using p5.js
=== */
var rectImage;

const classifier = new ml5.ImageClassifier('SqueezeNet');
var capture;

var tracker;
var trackingData;
let classifyimage;
var yoffset;
var camPos;
var camLastSize;
p5.disableFriendlyErrors = true;

setInterval(guess, 2000);

function setup() {
    createCanvas(window.innerWidth, window.innerHeight)
    //capture = createImg("http://192.168.1.107:8081/");
    frameRate(30);

    capture = createCapture(VIDEO, guess);
    capture.size(320, 240);
    //capture the webcam
    capture.position(0, 50) //move the capture to the top left
    capture.style('opacity', 0) // use this to hide the capture later on (change to 0 to hide)...
    capture.id("myVideo"); //give the capture an ID so we can use it in the tracker below.

    var tracker = new tracking.ObjectTracker(['face']);
    tracker.setInitialScale(6.5);
    tracker.setStepSize(1);
    tracker.setEdgesDensity(0.1);

    tracking.track('#myVideo', tracker, {
        camera: true,

    });
    // start the tracking of the colors above on the camera in p5

    //start detecting the tracking
    tracker.on('track', function (event) { //this happens each time the tracking happens
        trackingData = event.data // break the trackingjs data into a global so we can access it with p5
    });


}

function draw() {

    //  console.log(frameRate);
    if (trackingData) { //if there is tracking data to look at, then...
        // guess();
        for (var i = 0; i < trackingData.length; i++) { //loop through tracking data;




            rectImage = capture.get(trackingData[i].x, trackingData[i].y, trackingData[i].width, trackingData[i].height);

            image(rectImage, trackingData[i].x, trackingData[i].y, trackingData[i].width * 2, trackingData[i].height * 2);


            //            image(capture, trackingData[i].x, trackingData[i].y, trackingData[i].width, trackingData[i].height, trackingData[i].x, trackingData[i].y, trackingData[i].width, trackingData[i].height);




        }
    }



}

function guess() {
    classifier.predict(capture.elt, 10, gotResult);
}

function gotResult(results) {
    // The results are in an array ordered by probability.
    select('#result').html(results[0].label);

}
