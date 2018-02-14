var result = [];
var splitresult = [];
var joinedresult = [];
var strings;
var ind;
var noiseinit;
var noiseshifted;
var scaleFactor, translateX, translateY;;
var URL = "https://" + "liamfpower.com/codesnippets/bridgecutupzoom/bridge.txt";
var bg;
var r;
var randomOpacity;
var arraylength;
var pg;
var value;
var mx;
var my;

var sensitivity = 10;
var zMin = 0.05;
var zMax = 1000.00;
var zoom;
var vid;
var zoomVector;

function setup() {


    //vid.size(innerWidth, innerHeight);
    bg = loadImage("7.jpg");
    createCanvas(innerWidth, innerHeight, WEBGL);
    setAttributes('antialias', true);

    pg = createGraphics(innerWidth, innerHeight);
    // pg.textSize(100);
    scaleFactor = 1;
    translateX = 0;

    translateY = 0;


    // background(0);
    //frameRate(60);
    loadStrings(URL, fileReady);




}




function fileReady(result) {

    joinedresult = join(result, ' \n');

    splitresult = splitTokens(joinedresult, "-*.'!?");



}

function mouseWheel(event) {
    var zoom = 0;
    zoom += sensitivity * event.delta;
    zoom = constrain(zoom, zMin, zMax);
    //var  zoomVector = createVector(zoom);
    console.log(zoom);

    //uncomment to block page scrolling
    // return false;
}

function draw() {
    var zoom;


    //  translate(mouseX, mouseY);
    var randomOpacity = random(127);
    var randomX = random(innerWidth * 2.5);
    var randomY = random(innerHeight * 2.5);
    var randomSize = int(random(16));


    //scale(zoom);


    var r = int(random(splitresult.length));

    //  console.log(randomWord);

    //
    //noiseinit = noise();
    //noiseinit = map(noiseinit, 0, 1, 0, splitresult.length);
    ////
    //noiseshifted = int(noiseinit);
    //   // console.log(noiseshifted);
    ////



    push();



    console.log(zoom)

    pg.textAlign(CENTER);
    pg.textFont('arial', 8);
    pg.textSize(randomSize);
    pg.fill(randomOpacity);
    //pg.stroke(255);
    var randomWord = splitresult[r];
    pg.text(String(randomWord), randomX, randomY);

    plane(innerWidth * 2.5, innerHeight * 2.5);
    texture(pg);

    plane(innerWidth * 2.5, innerHeight * 2.5);
    pop();

    //  scale(zoom);

}




function mouseClicked() {
    if (value === 0) {
        value = 255;
    } else {
        value = 0;
    }
}

function mouseMoved() {

    mx = mouseX + -innerWidth / 2;
    my = mouseY + -innerHeight / 2;
    translate(mx, my, zoom);

}
