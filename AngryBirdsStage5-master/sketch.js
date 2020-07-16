//creating a score variable for score
var score=0;

//creating game states
var gamestate="onSling"
 
//creating variable for back ground
var bg ;

//using sections from matter.js
const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

//creating our physics world
var engine, world;


//creating variables for boxes
var box1,box2,box3,box4,box5

//creating variables for pigs
var pig1,pig3


//creating variables for logs
var log1,log2,log3,log4

//creating variables for ground
var backgroundImg,platform;


//some more essential variables
var bird, slingShot;

// creating variable for button
var button

//creating variables for sounds
var birdSound
var spaceSound

//creatingh function preload
function preload() {

//calling our function get started
    getTime()

    //loading sounds 
    birdSound =loadSound("sounds/bird.mp3")
    spaceSound=loadSound("sounds/click.mp3")
}
 
//creating function setup
function setup(){

//creating a canvas of width 1200 and 400 as height
    var canvas = createCanvas(1200,400);

    //creatin our physics engine
    engine = Engine.create();
    world = engine.world;

    //creating a button so that when the button is pressed so bird go back to sling
button=createButton('Replay')
button.position(30,30)

//using classes creating stuff we want
    ground = new Ground(600,height,1200,20);

    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70)
    ;
    box2 = new Box(920,320,70,70);

    pig1 = new Pig(810, 350);

    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);

    box4 = new Box(920,240,70,70);

    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);

    log4 = new Log(760,120,150, PI/7);

    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);

    slingshot = new SlingShot(bird.body,{x:200, y:50});
}
//creatingf function  draw
function draw(){


    //asiggning backgroun an image
if(backgroundImg)
    background(backgroundImg);

    //creating score
    textSize(20)
    textFont("Algerian")
    text("Score:"+score,1000,80)

    //updating our engine
    Engine.update(engine);

    //displkaying our stuff
    box1.display();

    box2.display();

    ground.display();

    pig1.display();

    log1.display();

    box3.display();

    box4.display();

    pig3.display();

    log3.display();

    box5.display();

    log4.display();

    log5.display();

    bird.display();

    platform.display();
 
    slingshot.display(); 
    // assigining a value to score
    pig1.score();
    pig3.score();

    //creating button function
    button.mousePressed(()=>{
       
            bird.trajectory=[]
            Matter.Body.setPosition(bird.body, {x: 200 , y: 50});
    
           slingshot.attach(bird.body) 
           gamestate="onSling"
           
    })  
}

//this function is create that we can drag our bird from sling
function mouseDragged(){
    if(gamestate==="onSling"){
    Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    }
}

//this function is create that after dragging bird can be released
function mouseReleased(){
    slingshot.fly();
    gamestate="launch"
    birdSound.play()
}


//the action we get by pressing replay button assigning same thing to a key
function keyPressed(){
    if(keyCode===32){
        bird.trajectory=[]
        spaceSound.play()
        Matter.Body.setPosition(bird.body, {x: 200 , y: 50});

       slingshot.attach(bird.body) 
       gamestate="onSling"
    }
}

//thius is some intresting this changes the backghroung according to day time
async function getTime(){
     var response=await fetch('http://worldtimeapi.org/api/timezone/Asia/Kolkata');
      var responseJson= await response.json();
       var datetime=responseJson.datetime;
        var hour=datetime.slice(11,13);
         console.log(hour); 
         if(hour>=06&&hour<=18){
        bg="sprites/bg.png"
         }
         else{
        bg="sprites/bg2.jpg"
         }
         backgroundImg = loadImage(bg);

}
