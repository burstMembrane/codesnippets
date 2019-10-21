let myVid;
let frame;
let vidFiles = ["./bikefetish.mp4"];
w = 320;
h = 240;
var rows = 2;
var cols = 2;
downScaledW = 320;
downScaledH = 240;
var numImages = 16;
// video file
var myVida; // VIDA
var cropped = [];
var cnt = 0;
var idx = 0;
var changeFlag = false;
var downScaledVid = new p5.Image(w, h);
var interactionStartedFlag = false;
var letterBag = ['SPECTACULAR', 'ACTION'];
var divisions = [2.2, 1.9];
p5.disableFriendlyErrors = true; // disables FES
function preload() {
    track = loadSound('./grainswarm.mp3');
    track2 = loadSound('./bike.mp3');
    myVid = createVideo([random(vidFiles)], videoLoaded);
    myVid.elt.muted = true;
    // fix for some mobile browsers
    myVid.elt.setAttribute('playsinline', '');
    myVid.addCue(0.3, touchEnded);
    vidaSetup();


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

    for (var i = 0; i < numImages; i++) {
        cropped[i] = new p5.Image(w, h);
    }



}

function draw() {
    if (myVid !== null && myVid !== undefined) { // safety first
        /*
        Wait for user interaction. Some browsers prevent video playback if the
        user does not interact with the webpage yet.
        */
        downScaledVid.copy(myVid, 0, 0, w, h, 0, 0, downScaledW, downScaledH)
        updateVideo(downScaledVid);
        if (!interactionStartedFlag) {
            push();
            idx += 0.1;
            fill((sin(idx) + 1) * 127);
            console.log();
            noStroke();
            translate(width / 2, height / 2);
            rotate(radians(frameCount % 360));
            rect(0, 0, 2, windowHeight * 2);

            pop();
            for (var x = 0; x < 4; x++) {
                if (frameCount % 2 == 0) {
                    push();
                    fill(random(255));
                    textSize(48);
                    textAlign(CENTER, CENTER);
                    text(letterBag[x], width / 2 + random(-4, 4), height / divisions[x] + random(-4, 4));
                    pop();
                }
            }
            return;

        }

        //background(0);
        //image(myVid, 0, 0, width, height);
        //image(myVida.backgroundImage, 0, 0, width, height);

        //image(myVid.get(0, myVid.height - (myVid.height / 8), myVid.width, myVid.height - (myVid.height / 8)), 0, height - (height / 8), width, height - (height / 8));

        //image(myVid.get(0, myVid.height - (myVid.height / 8) * 2, myVid.width, myVid.height - (myVid.height / 8* 2) ), 0, height - (height / 2) * 2, width, height - (height / 2) );
        //image(myVida.backgroundImage.get(0, myVida.backgroundImage.height - (myVida.backgroundImage.height / 3) * 3, myVida.backgroundImage.width, myVida.backgroundImage.height - (myVida.backgroundImage.height / 3) * 3), 0, height - (height / 3) * 3, width, height - (height / 3) * 3);
        // for (var i = 0; i < 3; i++) {


        //     image(myVida.differenceImage.get(0, myVida.differenceImage.height - (myVida.differenceImage.height / 3) * i, myVida.differenceImage.width, myVida.differenceImage.height - (myVida.differenceImage.height / 3) * i), 0, height - (height / 3) * i - i, width, height - (height / 3) * i - i);
        // }
        image(myVida.differenceImage, 0, 0, width, height);
        //image(myVida.thresholdImage.get(0, myVida.thresholdImage.height - (myVida.thresholdImage.height / 3), myVida.thresholdImage.width, myVida.thresholdImage.height - (myVida.thresholdImage.height / 3)), 0, height - (height / 3), width, height - (height / 3));
        //cropImg = findBlobs();
        myVida.drawBlobs(0, 0, width, height);
        //drawGrid(cropImg, rows, cols);

        //drawFPS();



    }
}




function touchEnded() {
    /*
      Capture current video frame and put it into the VIDA's background buffer.
    */

    if (!interactionStartedFlag) {
        safeStartVideo();
    }
    if (myVid !== null && myVid !== undefined) {
        myVida.setBackgroundImage(myVid);
        console.log('background set');
        track.loop();
        track2.loop();
        track.setVolume(0.1);
    }
    // init video (if needed)

}


function vidLoad() {
    myVid.size(w, h);
    myVid.loop();
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

    } catch (e) {
        console.log('[safeStartVideo] ' + e);
    }
}



function vidaSetup() {
    myVida = new Vida(this);
    myVida.progressiveBackgroundFlag = true;
    myVida.normMinBlobArea = 0.002; // uncomment if needed
    myVida.normMaxBlobArea = 0.9; // uncomment if needed
    myVida.imageFilterThreshold = 0.1;
    myVida.rejectBlobsMethod = myVida.REJECT_INNER_BLOBS;
    myVida.handleBlobsFlag = true;
    myVida.trackBlobsFlag = false;
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