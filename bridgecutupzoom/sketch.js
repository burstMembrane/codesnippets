var result = [];
 var splitresult = [];
var joinedresult = [];
var strings;
var ind;
    var noiseinit;
var noiseshifted;
var scaleFactor, translateX, translateY;;
var URL = "https://" + "burstmembrane.github.io" + "/interfacespeech/bridgecutupzoom/bridge.txt" ;
var r;
var randomOpacity;
var arraylength;
var pg;
var value;
var mx;
var my;
function setup() {
     
  
 
 createCanvas(innerWidth,innerHeight, WEBGL);
    setAttributes('antialias', true);

     pg = createGraphics(innerWidth, innerHeight);
 // pg.textSize(100);
     scaleFactor = 1;
   translateX = 0;
 
  translateY = 0;
    
    
    
     background(0);
 //frameRate(60);
      loadStrings(URL, fileReady);

  
}
     

  

function fileReady(result)
    {  
        joinedresult = join(result, ' \n');
    
            splitresult = splitTokens(joinedresult, "-*.'!?");
 
  
        
    }
    
    
function draw()
{
   background(0,0,0);
   
     scale(scaleFactor);
   //  translate(mouseX, mouseY);
    var randomOpacity = random(127);
    var randomX = random(innerWidth * 2.5);
var randomY = random(innerHeight * 2.5);
var randomSize = int(random(16));
     if (value == 255) {
   translate(mx, 0, my,);
     }
     
      
     
    var r = int(random(splitresult.length));

  //  console.log(randomWord);

//
//noiseinit = noise();
//noiseinit = map(noiseinit, 0, 1, 0, splitresult.length);
////
//noiseshifted = int(noiseinit);
//   // console.log(noiseshifted);
////   
    
   pg.textAlign(CENTER);
   pg.textFont('arial', 8);
    pg.textSize(randomSize);
    pg.fill(randomOpacity);   
   var randomWord = splitresult[r];
     pg.text(String(randomWord), randomX, randomY);
      texture(pg);
  plane(innerWidth * 2.5, innerHeight * 2.5);
        
  
}

   function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
       background(0);
       
       
      
}





function mouseMoved() {

    mx = mouseX +- innerWidth/2;
    my = mouseY +- innerHeight/2;
}
