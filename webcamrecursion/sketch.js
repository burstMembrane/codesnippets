var videoScale = 10;

// Number of columns and rows in our system
var cols, rows;

function preload() {

    var constraints = {
        video: {
            facingMode: "user"
        }
    };

    video = createCapture(constraints);




}

function setup() {

    button = createButton('save image');
    button.id('instructions');
    createCanvas(windowWidth, windowHeight, P2D);

    // Initialize columns and rows
    cols = width / videoScale;
    rows = height / videoScale;

    pixelDensity(1);

    video.size(cols, rows);
    video.hide();

}

function draw() {
    button.mousePressed(saveImage);

    //videoScale = scaleslider.value;
    //video.hide();
    background(0);
    video.loadPixels();

    // Begin loop for columns
    for (var i = 0; i < cols; i++) {
        // Begin loop for rows
        for (var j = 0; j < rows; j++) {
            // Reversing x to mirror the image
            // In order to mirror the image, the column is reversed with the following formula:
            // mirrored column = width - column - 1
            var loc = ((cols - i - 1) + j * cols) * 4;

            // The functions red(), green(), and blue() pull out the three color components from a pixel.
            var r = video.pixels[loc];
            var g = video.pixels[loc + 1];
            var b = video.pixels[loc + 2];

            // A rectangle size is calculated as a function of the pixel's brightness.
            // A bright pixel is a large rectangle, and a dark pixel is a small one.

            var sz = map((r + g + b) / 3, 0, 255, 0, videoScale);

            // For every column and row, a rectangle is drawn at an (x,y) location scaled and sized by videoScale.
            var x = i * videoScale;
            var y = j * videoScale;
            // tint(r, g, b, 255);
            image(video, x + videoScale / 2, y + videoScale / 2, sz, sz);


        }

    }


}

function saveImage() {

    save("webcam.jpg")
    return false;
}
