var myVid;
var vidFiles = ["./yoga_downscaled.mp4"];
var lowres;
if (window.innerWidth < 500) {
    lowres = true;
    var w = 180;
    var h = 120;
    var rows = 1;
    var cols = 2;
    downScaledW = 180;
    downScaledH = 120;
    var numImages = 4;

} else {
    lowres = false;
    var w = 320;
    var h = 240;
    var rows = 4;
    var cols = 4;
    downScaledW = 320;
    downScaledH = 240;
    var numImages = 16;

}

var debug = false;
var drawFramesPerSecond = false;
var threshval = 0.1;



var myVida;
var cropped = [];
var idx = 0;
var downScaledVid = new p5.Image(w, h);
var interactionStartedFlag = false;

// LOAD SCREEN
var letterBag = [" ", "RESTORATIVE", "CIRCULATION"];
var divisions = [2.6, 2.2, 1.9];

p5.disableFriendlyErrors = true; // disables FES

//FPS VARIABLES
var fpsVals = [];
var avgFps = 0;

function preload() {
    track = loadSound("./yogachoppedmax.mp3");
    myVid = createVideo([random(vidFiles)], videoLoaded);
    myVid.elt.muted = true;
    // fix for some mobile browsers
    myVid.elt.setAttribute("playsinline", "");
    myVid.addCue(0.3, touchEnded);
    vidaSetup();
}

function videoLoaded(video) {
    console.log(myVid);

}

function setup() {
    console.log("loading took " + floor(millis()) + " milliseconds");
    pixelDensity(1);

    w = windowWidth;

    if (w < 500) {
        lowres = true;
        console.log("low resolution mobile of " + windowWidth + " detected");
    } else {
        lowres = false;
    }

    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.parent("sketch-div");
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    canvas.position(x, y);

    for (var i = 0; i < numImages; i++) {
        cropped[i] = new p5.Image(w, h);
    }
}

function draw() {
    if (myVid !== null && myVid !== undefined) {
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
                    text(
                        letterBag[x],
                        width / 2 + random(-4, 4),
                        height / divisions[x] + random(-4, 4)
                    );
                    pop();
                }
            }
            return;
        }

        if (lowres) {
            rows = 2;
            cols = 1;
            numImages = 4;
            cropImg = findBlobs(numImages);
            drawGrid(cropImg, rows, cols);
            downScaledVid.copy(myVid, 0, 0, w, h, 0, 0, downScaledW, downScaledH);
            updateVideo(downScaledVid);
            if (drawFramesPerSecond) { drawFPS(); }
        } else {

            myVid.size(320, 240);
            cropImg = findBlobs();
            background(0);
            rows = 2;
            cols = 2;
            numImages = 16;
            drawGrid(cropImg, rows, cols);
            downScaledVid.copy(myVid, 0, 0, w, h, 0, 0, downScaledW, downScaledH);
            downScaledVid.filter(GRAY);
            updateVideo(downScaledVid);
            if (drawFramesPerSecond) { drawFPS(); }
        }

        if (debug) {
            image(myVid, 0, 0, width, height);
            myVida.drawBlobs(0, 0, width, height);
            if (drawFramesPerSecond) { drawFPS(); }
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

    var numBlobs = 0;
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
    var temp_rect_x,
        temp_rect_y,
        temp_rect_w,
        temp_rect_h,
        temp_mass_center_x,
        temp_mass_center_y;

    for (var i = 0; i < temp_blobs.length; i++) {
        temp_rect_x = ~~(temp_blobs[i].normRectX * temp_w);
        temp_rect_y = ~~(temp_blobs[i].normRectY * temp_h);
        temp_rect_w = ~~(temp_blobs[i].normRectW * temp_w);
        temp_rect_h = ~~(temp_blobs[i].normRectH * temp_h);

        // temp_rect_x = ~~temp_rect_x;
        // temp_rect_y = ~~temp_rect_y;
        // temp_rect_w = ~~temp_rect_w;
        // temp_rect_h = ~~temp_rect_h;
        //rect(temp_rect_x, temp_rect_y, temp_rect_w, temp_rect_h);
        cropped[i] = myVid.get(temp_rect_x, temp_rect_y, temp_rect_w, temp_rect_h);
    }

    return cropped;
}

function drawGrid(array, rows, cols) {
    var idx = 0;
    // var numImages = rows * cols;
    var cellHeight = height / rows;
    var cellWidth = width / cols;

    for (var y = 0; y < rows; y++) {
        for (var x = 0; x < cols; x++) {
            idx += 1;

            //calculate cell position
            var pixelX = cellWidth * x;
            var pixelY = cellHeight * y;

            try {
                image(
                    cropped[idx - 1 + y * cols],
                    pixelX,
                    pixelY,
                    cellWidth,
                    cellHeight
                );
                if (idx == cropped.length) {
                    idx = 0;
                    cropped.length = 0;
                }
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
        console.log("background set");
    }
    // init video (if needed)
    fpsVals = [];
}

function vidLoad() {
    myVid.size(w, h);
    myVid.loop();
    // myVid.hide();
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
            var fs = fullscreen();
            fullscreen(!fs);

            return;
        }
    }
    // if no, we will try to play it
    try {
        vidLoad();
        interactionStartedFlag = true;
        var fs = fullscreen();
        fullscreen(!fs);
    } catch (e) {
        console.log("[safeStartVideo] " + e);
    }
}

function vidaSetup() {
    myVida = new Vida(this);
    myVida.automaticPixelsDataTransferFlag = false;
    myVida.progressiveBackgroundFlag = true;
    myVida.normMinBlobArea = 0.008; // uncomment if needed
    myVida.normMaxBlobArea = 2; // uncomment if needed
    myVida.imageFilterThreshold = threshval;
    myVida.rejectBlobsMethod = myVida.REJECT_NONE_BLOBS;
    myVida.handleBlobsFlag = true;
    myVida.trackBlobsFlag = false;
    approximateBlobPolygonsFlag = false;
}

function mouseDragged() {
    debug = true;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function drawFPS() {
    var fps = frameRate();

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
    var sum = elements.reduce((previous, current) => (current += previous));
    var avg = sum / elements.length;
    return avg;
}

function updateVideo(vid) {
    myVida.update(vid);
}