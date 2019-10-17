let myVid;
let frame;
let vidFiles = ["./test.mp4"];
w = 320;
h = 240;
var numImages = 4;
var myVideo, // video file
    myVida; // VIDA
var cropped = [];



p5.disableFriendlyErrors = true; // disables FES
function preload() {


    myVid = createVideo([random(vidFiles)], vidLoad);
    myVid.elt.muted = true;
    // fix for some mobile browsers
    myVid.elt.setAttribute('playsinline', '');
    myVid.addCue(0.1, touchEnded);


    vidaSetup();
    console.log("loading complete");
}

function setup() {

    mobileMax = 500;

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


    //image(myVid, 0, 0, width, height);
    //image(myVida.differenceImage, 0, 0, width, height);
    if (frameCount % 6 == 0) {
        //console.log("tick");


    }

    cropImg = findBlobs();
    drawGrid(cropImg);
    updateVideo();
    //drawFPS();



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


function vidaSetup() {
    myVida = new Vida(this);
    myVida.rejectBlobsMethod = myVida.REJECT_NONE_BLOBS;
    myVida.handleBlobsFlag = true;
    myVida.trackBlobsFlag = false;
}

function vidaSetup() {
    myVida = new Vida(this);
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


function updateVideo() {
    myVida.update(myVid);
}