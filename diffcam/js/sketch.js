let myVid;
let frame;
var idx = 0;
w = 320;
h = 240;
var rows = 2;
var cols = 2;
downScaledW = 320;
downScaledH = 240;
fpsVals = [];

// video file
var myVida; // VIDA

var downScaledVid = new p5.Image(w, h);
var interactionStartedFlag = false;
var letterBag = ['SPECTACULAR', 'ACTION'];
var divisions = [2.2, 1.9];
p5.disableFriendlyErrors = true; // disables FES
function preload() {
    track = loadSound('./grainswarm.mp3');
    myVid = createCapture(VIDEO, vidLoad);
    myVid.elt.muted = true;
    // fix for some mobile browsers
    myVid.elt.setAttribute('playsinline', '');
    myVid.addCue(0.1, touchEnded);
    vidaSetup();
    console.log(
        '[initCaptureDevice] capture ready. Resolution: ' +
        myVid.width + ' ' + myVid.height
    );

}


function videoLoaded(video) {

    console.log(myVid);


}

function setup() {
    console.log('loading took ' + floor(millis()) + ' milliseconds');
    pixelDensity(1);

    // w = windowWidth;


    // something kind of like this ...


    var canvas = createCanvas(windowWidth, windowHeight);
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    canvas.position(x, y);





}

function draw() {
    if (myVid !== null && myVid !== undefined) { // safety first
        if (interactionStartedFlag) {
            downScaledVid.copy(myVid, 0, 0, w, h, 0, 0, downScaledW, downScaledH)
            updateVideo(downScaledVid);




            image(myVida.differenceImage, 0, 0, width, height);

            myVida.drawBlobs(0, 0, width, height);

            drawFPS();
        }



    }
}




function touchEnded() {


    if (myVid !== null && myVid !== undefined) {
        safeStartVideo();
    }
    // init video (if needed)

}


function vidLoad() {
    myVid.size(w, h);

}


function safeStartVideo() {
    // safety first..
    if (myVid === null || myVid === undefined) return;
    // here we check if the video is already playing...


    // if no, we will try to play it
    try {
        vidLoad();
        interactionStartedFlag = true;
        let fs = fullscreen();
        fullscreen(!fs);
        track.loop();
        track.setVolume(0.1);

    } catch (e) {
        console.log('[safeStartVideo] ' + e);
    }
}



function vidaSetup() {
    myVida = new Vida(this);
    myVida.progressiveBackgroundFlag = true;
    myVida.normMinBlobArea = 0.0002; // uncomment if needed
    myVida.normMaxBlobArea = 0.9; // uncomment if needed
    myVida.imageFilterThreshold = 0.1;
    myVida.rejectBlobsMethod = myVida.REJECT_INNER_BLOBS;
    myVida.handleBlobsFlag = true;
    myVida.trackBlobsFlag = true;
    approximateBlobPolygonsFlag = false;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function drawFPS() {
    let fps = frameRate();

    idx = fpsVals.push(fps);
    avgFps = getAverage(fpsVals);
    fill(255);
    stroke(0);


    if (fpsVals != 0) {
        text("Average FPS: " + avgFps.toFixed(2), 10, height - 20);
    }

    text("FPS: " + fps.toFixed(2), 10, height - 10);
}


function getAverage(elements) {
    let sum = elements.reduce((previous, current) => current += previous);
    let avg = sum / elements.length;
    return avg;

}

function updateVideo(vid) {
    myVida.update(vid);
}