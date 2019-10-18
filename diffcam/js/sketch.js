let myVid;
let frame;
var idx = 0;
w = 320;
h = 240;
var rows = 2;
var cols = 2;
downScaledW = 320;
downScaledH = 240;

// video file
var myVida; // VIDA

var downScaledVid = new p5.Image(w, h);
var interactionStartedFlag = false;
var letterBag = ['SPECTACULAR', 'ACTION'];
var divisions = [2.2, 1.9];
p5.disableFriendlyErrors = true; // disables FES
function preload() {
    track = loadSound('./grainswarm.mp3');
    setTimeout(1000);
    myVid = createCapture(VIDEO);
    myVid.elt.muted = true;
    // fix for some mobile browsers
    myVid.elt.setAttribute('playsinline', '');
    myVid.addCue(0.3, touchEnded);
    vidaSetup();
    console.log(
        '[initCaptureDevice] capture ready. Resolution: ' +
        myCapture.width + ' ' + myCapture.height
    );

}

function initCaptureDevice() {
    try {
        myVid = createCapture(VIDEO);
        myVid.size(320, 240);
        myVid.elt.setAttribute('playsinline', '');
        myVid.hide();
        console.log(
            '[initCaptureDevice] capture ready. Resolution: ' +
            myCapture.width + ' ' + myCapture.height
        );
    } catch (_err) {
        console.log('[initCaptureDevice] capture error: ' + _err);
    }
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
    canvas.parent('sketch-div');
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
    myVid.hide();
    reverb = new p5.Reverb();
    track.disconnect();
    reverb.process(track, 3, 2);
}


function safeStartVideo() {
    // safety first..
    if (myVid === null || myVid === undefined) return;
    // here we check if the video is already playing...
    if (!isNaN(myVid.time())) {
        if (myVid.time() < 1) {

            vidLoad();
            interactionStartedFlag = true;
            let fs = fullscreen();
            fullscreen(!fs);

            return;
        }
    }
    // if no, we will try to play it
    try {
        vidLoad();
        interactionStartedFlag = true;
        let fs = fullscreen();
        fullscreen(!fs);
        myVida.setBackgroundImage(myVid);
        console.log('background set');
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
    fill(255);
    stroke(0);
    text("FPS: " + fps.toFixed(2), 10, height - 10);
}


function updateVideo(vid) {
    myVida.update(vid);
}