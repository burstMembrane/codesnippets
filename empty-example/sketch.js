function setup() {

  createCanvas(1920,1080)
  // put setup code here

}

function draw() {

  for (var i=0; i<255; i++)
  {ellipse(width/2, height/2, i, i);
    console.log(i);
  if (i==255)
  {i = 0;}
  
  
  }
  
  // put drawing code here
}