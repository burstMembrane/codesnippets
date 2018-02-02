var result = [
In the summer of 2011 I was at a pretty low point in my life. I was going out a lot and drinking every day and night. Most of my money went on booze and I got blackout drunk often, trying to outdo myself every time. I was sleeping on friends couches and dumpster-diving food. This particular night was nice and warm, so I borrowed a friends bike and we rode down to the Merri Creek. We got a few longnecks in the afternoon and later split a bottle of whisky. By the time night fell I could barely stand up except to piss in the bushes to the side of where we were sitting. After a while we stopped talking and I started thinking about where I would stay that night. I knew I had exhausted my welcome with a lot of my friends, and the one friend I could stay with lived in Carlton, about a half an hours ride away from where I was. My parents place was an hour and half away. My friend and I decided it would be a good idea to look around for a hidden little nook to pass out in. We walked up onto the railway bridge and saw a little platform in between the struts of the bridge. It was about 5 metres up from the creek bed, and we somehow made our way over the fence and onto the platform. It was about big enough for two people to curl up in and was hidden from view. We lay down with the remainder of the whisky and listened to the creek rushing beneath us. 

When I woke up I was under the water and my friend was gone. I didnt know how long I had been under but all I remember is this incredible impulse to open my mouth and take a breath. I was floating under the water in the current looking up at the surface. I could see the dawn sun filtering through the murky water. I swam up and broke through the surface. I had to keep blinking as my eyes filled with blood from a wound on my head. I dog paddled my way to the bank up the side. It was probably a seventy-degree incline. I scrambled up and first noticed a sharp pain in my side and the dull throb in my head. I was in a clearing. I kept thinking keep going, get somewhere, get help. It was nice and warm in the sun and I lay there for a while. I think I blacked out for a bit. I woke up and staggered towards Rushall Station. Not thinking I climbed up onto the platform from the tracks just as the train was coming. I heard the trains horn blowing at me before I boarded the first carriage and sat down.

I looked down and saw the pinkish stains of water and blood pooling on the ground around me. I avoided everyones stares. My clothes were soaking. The leather jacket, borrowed from a friend, was torn into strips and split at the back. My head was bleeding freely and the sharp pains in my side winded me. I dont remember if anyone asked if I needed help. I knew that I needed to get on the train to get to Carlton to the Royal Melbourne. I saw a station go by and realised I was going the wrong way. I stood up with difficulty and limped to the door to try to get it open. The door wouldnt open so I leant against it. I waited a long time before I saw a police car pull up outside the station. The driver got out and talked to them. He pointed me out. I tried to go and sit down but the doors opened. 


The police, a man and a woman, pulled me off the train. I winced as they guided me onto a hard bench. They asked me a few questions. I tried to get up and get away. I didnt want to get done for trespassing. I minimized my injuries, saying I had fallen into the Merri from the bank and hit my head on the way out. I tried to act sheepish and repentant but my teeth chattered horribly and I found it hard to speak. I was very confused. They asked for my parents numbers. Somehow I remembered my Mums. They called her and told her I had been drinking heavily and had fallen into the Merri Creek and they would put me in an ambulance and send me to the hospital. I waited with them for the ambulance to arrive. They kept asking me what I had been doing, how much I had drunk, and took down my details. 

The ambulance came and told me they were taking me to the Austin Hospital, the same place where Id been kicked out of a clinical trial a few months before. I told them I didnt want to go. I wanted to go to the Royal Melbourne so I tried to get up. Eventually they got on the radio and I painfully switched ambulances. In the second ambulance, the paramedic looking after me was a young woman probably only a little bit older than I was. She asked me how the pain was and if I could rate it from one to ten. It was a ten, but my voice cracked as I said seven. After a furtive conversation with her colleague she pulled out a syringe and shot me full of morphine. The pain melted away and she held my hand for a bit before I drifted out.

When I got the hospital they told me I had four broken ribs and my head wound was leaking brain fluid. My mum showed up and trying to keep me conscious she read me short stories from the Raymond Carver book in her handbag. They propped me up to take an X-ray and tears finally flowed from my eyes. They told me I had to stop crying and stay still or they couldnt take the scan. I swallowed the lump in my throat and they took the scan.

After I got a bed in the Trauma ward my family and friends came and visited me. The friend I had been with told me he had woken up and left in the morning. When he had left I was curled up in the nook. Another friend brought a Walkman and I listened to Elvis: Words and Music and Ziggy Stardust and the Spiders from Mars.  I watched Drunken Master on TV. They gave me a button connected to an IV for Morphine and I saw how many times I could press it. They said Id be there for about a week but I had to have tests to see whether I had sustained any brain damage from the fall. I felt alright mentally but I was a bit dreamy and morphine made me itchy at nights. A young orderly helped me shower the first few times as I was a fall risk at that time. After a few days the pain got a little better and I breathed easier. The tests came back and I was given the all clear for brain damage. Once the pain was dealt with boredom set in. Visiting hours only went for so long. I listened to all the tapes ad nauseum. I could barely sleep as the guy next to me was moaning in pain in between snores.

On the fourth morning I heard a voice through the curtains. A middle-aged woman with chunky glasses walked in and asked how I was doing. I said I felt okay. She asked me what had happened to me. I told her. She asked if I had been drinking, how much. I was used to answering these questions at this point and thought nothing of it as I answered. She talked to the nurse and peered at my chart. Then she asked if I would mind telling my story to a few of her students. I figured they were medical students and that I was being exhibited as part of their rounds. I said yes and a few minutes later I heard giggling in the hall. About ten preteens walked in wearing scout uniforms and glasses-woman asked me to tell them my story. I tried to make it funny and make myself sound brave. I tried to make it look like a freak accident, like I had just fallen off the bridge. I bent the truth. After I had finished glasses woman asked me again, had I been drinking? How much had I drunk? Was it spirits or beer? Why was I on the bridge? I answered truthfully and she pursed her lips disapprovingly before she asked Do you think this accident could have been avoided if you hadnt been drinking? I replied that it probably wouldnt have happened if it werent for the bottle of scotch I had drunk. She asked if I was sorry it had happened and I said yes. For the first time she smiled, she had gotten what she wanted, and I said I was tired. Her and the kids walked away. 
];
var splitresult = [];
var joinedresult = [];
var strings;
var ind;
var noiseinit;
var noiseshifted;
var scaleFactor, translateX, translateY;;

function setup() {
     
 createCanvas(windowWidth,windowHeight);
     scaleFactor = 1;
   translateX = 0;
 
  translateY = 0;
      joinedresult = join(result, ' \n');
         splitresult = split(joinedresult, ' ');
        
     background(0);
 frameRate(30);
     

   
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

