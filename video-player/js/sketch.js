let myVid;
let frame;
let vidFiles = ["./yoga_downscaled.mp4"];
w = 320;
h = 240;
debug = false;
var threshval = 0.1;
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
var letterBag = ['A SIMPLE', 'RESTORATIVE', 'POSE'];
var divisions = [2.6, 2.2, 1.9];
//p5.disableFriendlyErrors = true; // disables FES
function preload() {
    track = loadSound("./yogachoppedmax.mp3");
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
    frameRate(25);
    if (myVid !== null && myVid !== undefined) { // safety first
        /*
        Wait for user interaction. Some browsers prevent video playback if the
        user does not interact with the webpage yet.
        */

        if (!interactionStartedFlag) {
            push();
            idx += 0.1;
            fill((sin(idx) + 1) * 127);

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
        //image(myVida.differenceImage, 0, 0, width, height);

        if (frameCount % int(random(20, 200)) == 0) {
            rows = int(random(1, 4));
            cols = int(random(1, 4));

        }
        cropImg = findBlobs();
        background(0);
        drawGrid(cropImg, rows, cols);
        downScaledVid.copy(myVid, 0, 0, w, h, 0, 0, downScaledW, downScaledH)
        updateVideo(downScaledVid);
        drawFPS();
        if (debug) {
            image(myVid, 0, 0, width, height);
            myVida.drawBlobs(0, 0, width, height);
            myVida.drawActiveZones(0, 0, width, height);
        }
        if (!debug) {
            if (!track.isPlaying()) {
                track.play();
                myVid.elt.muted = true;
            }
            return;
        }


    }
}



function findBlobs() {

    //frame = myVid.get(0, 0, 1920, 1080);
    //image(frame, 0, 0, w, h);
    //image(myVid, 0, 0, width, height);


    var temp_blobs = myVida.getBlobs();
    var arrLength = temp_blobs.length;
    if (arrLength > numImages) {
        temp_blobs.splice(0, arrLength - numImages);
    }
    if (temp_blobs.length == 0) {
        debug = true;
        track.pause();
        myVid.elt.muted = false;
        return;
    }
    if (temp_blobs.length > 0) {
        debug = false;
    }
    // define size of the drawing
    temp_blobs.sort();
    var temp_w = w;
    var temp_h = h;
    // offset from the upper left corner
    var offset_x = w;
    var offset_y = h;
    // pixel-based blob coords
    var temp_rect_x, temp_rect_y, temp_rect_w, temp_rect_h,
        temp_mass_center_x, temp_mass_center_y;

    for (var i = 0; i < temp_blobs.length; i++) {

        temp_rect_x = temp_blobs[i].normRectX * temp_w;
        temp_rect_y = temp_blobs[i].normRectY * temp_h;
        temp_rect_w = temp_blobs[i].normRectW * temp_w;
        temp_rect_h = temp_blobs[i].normRectH * temp_h;


        temp_rect_x = ~~temp_rect_x;
        temp_rect_y = ~~temp_rect_y;
        temp_rect_w = ~~temp_rect_w;
        temp_rect_h = ~~temp_rect_h;
        //rect(temp_rect_x, temp_rect_y, temp_rect_w, temp_rect_h);
        cropped[i] = myVid.get(temp_rect_x, temp_rect_y, temp_rect_w, temp_rect_h);
    }



    return cropped;


}


function drawGrid(array, rows, cols) {
    var idx = 0;
    var rows = rows;
    var cols = cols;
    var numImages = rows * cols;
    var cellHeight = height / rows;
    var cellWidth = width / cols;

    for (var y = 0; y < rows; y++) {
        for (var x = 0; x < cols; x++) {
            idx += 1;

            //calculate cell position
            var pixelX = cellWidth * x;
            var pixelY = cellHeight * y;

            // //add half to center letters
            // pixelX += cellWidth;
            // pixelY += cellHeight;

            try {

                image(cropped[(idx - 1) + (y * cols)], pixelX, pixelY, cellWidth, cellHeight);
                if (idx == cropped.length) { idx = 0; }
                //console.log(idx - 1);
            } catch (err) {


                return;

            }


        }


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

    }
    // init video (if needed)

}


function vidLoad() {
    myVid.size(w, h);
    myVid.loop();
    myVid.hide();

}


function safeStartVideo() {
    // safety first..
    if (myVid === null || myVid === undefined) return;
    // here we check if the video is already playing...
    if (!isNaN(myVid.time())) {
        if (myVid.time() < 1) {
            track.play();
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
    myVida.handleActiveZonesFlag = false;
    myVida.normMinBlobArea = 0.0002; // uncomment if needed
    myVida.normMaxBlobArea = 2; // uncomment if needed
    myVida.imageFilterThreshold = threshval;
    myVida.imageFilterFeedback = 0.91;
    myVida.rejectBlobsMethod = myVida.REJECT_NONE_BLOBS;
    myVida.handleBlobsFlag = true;
    myVida.trackBlobsFlag = false;
    approximateBlobPolygonsFlag = false;
}

function mouseDragged() {



}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function drawFPS() {
    let fps = frameRate();
    fill(255);
    stroke(0);
    text("Window: " + width + "x" + height, 10, height - 20);
    text("FPS: " + fps.toFixed(2), 10, height - 10);
}


function updateVideo(vid) {
    myVida.update(vid);
}