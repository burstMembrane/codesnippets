//
//
//var n = 0;
//var millis = 100;
//var result;
//function preload() {
//  var trees = loadStrings("flannery.txt");
//}
//
//function setup() {
// createCanvas(innerWidth,innerHeight);
//    frameRate(1);
//   
//    textSize(36);
//text(trees[0], randomX, randomY); 
//    
//    //framerate(30);
//}
//
//function draw() {
//    
//    
//         background(255);
//   var randomWord = random(trees.length);
//   var randomX = random(innerWidth/2);
//var randomY = random(innerHeight/2);
// textSize(32);
//
//   
//textSize(36);
//text(trees[0], randomX, randomY); 
//
//
//  
//     
//}
//


var result = [];
 var splitresult = [];
var joinedresult = [];
var strings;
var ind;
    var noiseinit;
var noiseshifted;
var scaleFactor, translateX, translateY;;

function preload() {
   bg = loadImage("7.jpg", setup);
  
}

function setup() {
     
  
 
 createCanvas(windowWidth,windowHeight);
     scaleFactor = 1;
   translateX = 0;
 
  translateY = 0;
    
     background(0);
 frameRate(30);
      loadStrings('bridge.txt', fileReady);

  //  capture.size(320, 240);
 
  //var  strings = loadStrings(splitresult);
   
}
     

  

function fileReady(result)
    {  
        joinedresult = join(result, ' \n');
         splitresult = split(joinedresult, ' ');
        
    }
    
    
function draw()
{
    
     scale(scaleFactor);
     translate(translateX, translateY);
    var randomOpacity = random(127);
    var randomX = random(innerWidth);
var randomY = random(innerHeight);
  var r = int(random(splitresult.length));
    




noiseinit = noise();
noiseinit = map(noiseinit, 0, 1, 0, splitresult.length);
//
noiseshifted = int(noiseinit);
   // console.log(noiseshifted);
//   
    
            textAlign(CENTER);
    textFont('arial', 8);
    textSize(14);
    fill(255, 255, 255, randomOpacity); 
           
     text(splitresult[r], randomX, randomY);   
        
  
}

   function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
       background(0);
       
       
      
}

function mouseWheel(event) {
 
  //move the square according to the vertical scroll amount
  //var pos += event.delta;
    
var pos = event.delta;
     console.log(pos);
    
     scaleFactor += event.delta / 100;
 
   
  if (scaleFactor < 1.0) scaleFactor = 1.0;
 
  if (scaleFactor > 2.0) scaleFactor = 2.0;
}

