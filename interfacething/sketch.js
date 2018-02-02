
var bugs = []; // array of Jitter objects
var size = 4;
function setup() {
  createCanvas(innerWidth, innerHeight);
    frameRate(30);
  // Create objects
  for (var i=0; i<1000; i++) {
    bugs.push(new Jitter());
  }
    noStroke();
    
    
    background(0);
   
}

function draw() {
        textAlign(CENTER);
 strokeWeight(0);
     textSize(96);
 fill(0,0,0,127)
   textStyle(BOLD);
  text("INTERFACE", mouseX, mouseY)
     
  
   
  for (var i=0; i<bugs.length; i++) {
    bugs[i].move();
    bugs[i].display();
  }
}

// Jitter class
function Jitter() {
    this.rectsize = 4;
  this.x = random(width);
  this.y = random(height);
  this.diameter = random(2, 4);
  this.speed = 10;
    this.randOpacity = random(255);

  this.move = function() {
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);
  };

  this.display = function() {
      fill(255,255,255,this.randOpacity)
   
      ellipse(this.x, this.y,  this.rectsize,  this.rectsize);
      
    
      
    
  };
}