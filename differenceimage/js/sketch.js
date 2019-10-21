let myVid;
let frame;
let vidFiles = ["./bikefetish.mp4"];
var switchFlag = false;
var idx = 0;
if (window.innerWidth < 500) {
    w = 160;
    h = 120;
    downScaledW = 160;
    downScaledH = 120;
} else {
    w = 320;
    h = 240;
    downScaledW = 320;
    downScaledH = 240;
}
// video file
var myVida; // VIDA
var buffer = [];
var cropped = new p5.Image(w, h);
var downScaledVid = new p5.Image(downScaledW, downScaledH);
var interactionStartedFlag = false;
var letterBag = ["SPECTACULAR", "ACTION"];
var divisions = [2.2, 1.9];
p5.disableFriendlyErrors = true; // disables FES

function preload() {
    track = loadSound("./grainswarm.mp3");
    track2 = loadSound("./bike.mp3");
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

    // w = windowWidth;

    // something kind of like this ...

    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent("sketch-div");
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    canvas.position(x, y);
}

function loadScreen() {
    if (frameCount % 2 == 0) {
        switchFlag = !switchFlag;
        background(0);
        for (var x = 0; x < 4; x++) {

            if (switchFlag) {
                push();
                fill(0, 0, 255);
                textSize(48);
                textAlign(CENTER, CENTER);
                text(
                    letterBag[x],
                    width / 2,
                    height / divisions[x]
                );
                pop();
            } else {
                push();
                fill(255, 0, 0);
                textSize(45);
                text(
                    letterBag[x],
                    width / 2,
                    height / divisions[x]
                );
                pop();
            }




        }

    }

}

function draw() {
    if (!interactionStartedFlag) {
        loadScreen();
    }



    background(0);
    if (myVid !== null && myVid !== undefined) {
        downScaledVid.copy(myVid, 0, 0, w, h, 0, 0, downScaledW, downScaledH);

        if (frameCount % 2 == 0) {
            updateVideo(downScaledVid);
        }


        image(myVida.differenceImage, 0, 0, width, height);
        push();
        fill(255);

        myVida.drawBlobs(0, 0, width, height);
        pop();
        findBlobs();
        drawFPS();
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
        console.log("background set");
        track.loop();
        track.setVolume(0.1);
        track2.loop();
        track.setVolume(0.01);
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
            myVida.setBackgroundImage(myVid);
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
        return;
    } catch (e) {
        console.log("[safeStartVideo] " + e);
    }
}

function findBlobs() {


    var temp_blobs = myVida.getBlobs();
    var arrLength = temp_blobs.length;
    print(arrLength);
    if (arrLength == 0) { return; }
    // define size of the drawing
    temp_blobs.sort();
    if (arrLength != 0) {

        for (var i = 0; i < temp_blobs.length; i++) {

            downBlobX = temp_blobs[i].normRectX * w;
            downBlobY = temp_blobs[i].normRectY * h;
            downBlobW = temp_blobs[i].normRectW * w;
            downBlobH = temp_blobs[i].normRectH * h;

            stretchBlobX = temp_blobs[i].normRectX * width;
            stretchBlobY = temp_blobs[i].normRectY * height;
            stretchBlobW = temp_blobs[i].normRectW * width;
            stretchBlobH = temp_blobs[i].normRectH * height;


            downBlobX = ~~downBlobX;
            downBlobY = ~~downBlobY;
            downBlobW = ~~downBlobW;
            downBlobH = ~~downBlobH;

            stretchBlobX = ~~stretchBlobX;
            stretchBlobY = ~~stretchBlobY;
            stretchBlobW = ~~stretchBlobW;
            stretchBlobH = ~~stretchBlobH;
            //rect(temp_rect_x, temp_rect_y, temp_rect_w, temp_rect_h);

            try {
                cropped = myVid.get(downBlobX, downBlobY, downBlobW, downBlobH);
                image(cropped, stretchBlobX, stretchBlobY, stretchBlobW, stretchBlobH);

            } catch (e) {

                break;

            }
        }

    }



    return;


}

function vidaSetup() {
    myVida = new Vida(this);
    myVida.progressiveBackgroundFlag = true;
    myVida.normMinBlobArea = 0.0002; // uncomment if needed
    myVida.normMaxBlobArea = 0.9; // uncomment if needed
    myVida.imageFilterThreshold = 0.2;
    myVida.rejectBlobsMethod = myVida.REJECT_INNER_BLOBS;
    myVida.handleBlobsFlag = true;
    myVida.trackBlobsFlag = false;
    approximateBlobPolygonsFlag = false;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

var fpsVals = [];

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
};