let myVid;
let frame;
let vidFiles = ["./productreview_downscaled.mp4"];
w = 320;
h = 240;
var rows = 2;
var cols = 2;
downScaledW = 320;
downScaledH = 240;
var numImages = 4;
// video file
var myVida; // VIDA
var cropped = [];
var cnt = 0;
var changeFlag = false;
var downScaledVid = new p5.Image(w, h);
var interactionStartedFlag = false;
var letterBag = ['SYNTHETIC', 'PERCEPTION'];
var divisions = [2.8, 2];
p5.disableFriendlyErrors = true; // disables FES
function preload() {


    myVid = createVideo([random(vidFiles)], videoLoaded);
    myVid.elt.muted = false;
    // fix for some mobile browsers
    myVid.elt.setAttribute('playsinline', '');
    myVid.addCue(0.1, touchEnded);
    vidaSetup();

}

function videoLoaded(video) {




}

function setup() {
    console.log('loading took ' + floor(millis()) + ' milliseconds');


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

        if (!interactionStartedFlag) {
            //background(0);
            fill(127)
                //ellipse(width / 2 + random(-1, 1), height / 2 + random(-1, 1), random(70, 80), random(70, 80));

            //console.log("tick");




            push();

            fill(frameCount % 255);
            noStroke();
            translate(width / 2, height / 2);
            rotate(radians(frameCount * 5.2 % 360));
            rect(0, 0, 1, windowHeight * 2);

            pop();
            for (var x = 0; x < 4; x++) {
                if (frameCount % 2 == 0) {
                    push();
                    fill(random(255));
                    textSize(100);
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


        cropImg = findBlobs();

        drawGrid(cropImg);
        downScaledVid.copy(myVid, 0, 0, w, h, 0, 0, downScaledW, downScaledH)
        updateVideo(downScaledVid);
        drawFPS();



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
    if (temp_blobs.length == 0) { return myVid.get(temp_rect_x, temp_rect_y, temp_rect_w, temp_rect_h); }
    console.log(temp_blobs.length);
    // define size of the drawing
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


function drawGrid(array) {

    var rows = 2;
    var cols = 2;
    var numImages = rows * cols;
    var cellHeight = height / rows;
    var cellWidth = width / cols;

    for (var y = 0; y < rows; y++) {
        for (var x = 0; x < cols; x++) {


            //calculate cell position
            var pixelX = cellWidth * x;
            var pixelY = cellHeight * y;

            // //add half to center letters
            // pixelX += cellWidth;
            // pixelY += cellHeight;

            try {

                image(cropped[x + y], pixelX, pixelY, cellWidth, cellHeight);
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
    myVida.progressiveBackgroundFlag = false;
    myVida.normMinBlobArea = 0.002; // uncomment if needed
    myVida.normMaxBlobArea = 0.5; // uncomment if needed
    myVida.imageFilterThreshold = 0.2;
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