var canvas;
var pixelsclone;
var canvasx = innerWidth;
var canvasy = innerHeight * 2 ;
p5.disableFriendlyErrors = true;

function setup() {
frameRate(15);
canvas = createCanvas(screen.width,  screen.height);


    canvas.position(0,0,);
    canvas.style('z-index', '-1');
      canvas.style('background-repeat', 'repeat-y');
    pixelDensity(1);

}

function draw() {
    loadPixels();


    for(var x = 0; x < width; x++) {
         for(var y = 0; y < height; y++)
       {
           var index = (x + y * width) * 4;
           var r = random(150);
           var r = int(r);
            pixels[index+0] = r;
            pixels[index+1] = r;
            pixels[index+2] = r;
            pixels[index+3] = 255;

       }
      //  noLoop();


    }
 updatePixels();
}



function windowResized() {
  resizeCanvas(window.width, window.height);
}


