var balloon, balloonImg1, balloonImg2;
var bgImg;
var database;

function preload(){
  bgImg = loadImage("Images/city.png");
  balloonImg1=loadAnimation("Images/HotAirBallon-01.png");
  balloonImg2=loadAnimation("Images/HotAirBallon-01.png","Images/HotAirBallon-01.png",
   "Images/HotAirBallon-01.png","Images/HotAirBallon-02.png","Images/HotAirBallon-02.png",
   "Images/HotAirBallon-02.png","Images/HotAirBallon-03.png","Images/HotAirBallon-03.png","Images/HotAirBallon-03.png")}

function setup() {
  
  createCanvas(500,500);
  database = firebase.database();
  
  balloon = createSprite(240, 240, 50, 50);
  balloon.addAnimation(balloonImg1);
  balloon.scale = 0.4;

  var balloonPosition = database.ref('balloon/position');
  balloonPosition.on("value", readHeight, showError);
}

function draw() {
  background(bgImg);  

  if(keyDown(UP_ARROW)){
    writeHeight(0,-10);
    balloon.addAnimation("hotAirBalloon",balloonImg2);
    balloon.scale = balloon.scale - 0.01;
  }

  else if(keyDown(DOWN_ARROW)){
    writeHeight(0,10);
    balloon.addAnimation("hotAirBalloon",balloonImg2);
    balloon.scale = balloon.scale + 0.01;
  }
  else if(keyDown(RIGHT_ARROW)){
    writeHeight(10,0);
  }
  else if(keyDown(LEFT_ARROW)){
    writeHeight(-10,0);
  }
  
  drawSprites();

  textSize(20);
  stroke("black");
  text("Use ARROW KEYS to move the balloon!!!",10,30);
}


function writeHeight(x,y){
  database.ref('balloon/position').set({
    'x':balloon.x+x,
    'y':balloon.y+y
  })
}

function readHeight(data){
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  console.log("there is an error in reading position from database");
}
