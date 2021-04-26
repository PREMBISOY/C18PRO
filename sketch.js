var monkey, monkey_running, monkey_collided;
var invisibleGround,obstacle_img,bg_img;

var cloudsGroup, cloudImage;
var bg;
//var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var survivalTime=0;
var foodScore = 0;


var PLAY = 1,END = 0,gameState = PLAY;

var restart,restartImage,gameOver,gameOverImage;
var banana_img;

function preload(){
monkey_running=loadAnimation("m1.png","m2.png","m3.png","m4.png","m5.png","m6.png","m7.png","m8.png"); 
  monkey_collided = loadImage("m1.png");
  
  //groundImage = loadImage("ground2.png");
  
  //cloudImage = loadImage("cloud.png");
  
  invisibleGround = createSprite(200,395,400,2);
  banana_img = loadImage("banana.png");
  bg_img = loadImage("jungle_bg.jpg");
  
  obstacle_img = loadImage("stone.png");
  // obstacle2 = loadImage("obstacle2.png");
  // obstacle3 = loadImage("obstacle3.png");
  // obstacle4 = loadImage("obstacle4.png");
  // obstacle5 = loadImage("obstacle5.png");
  // obstacle6 = loadImage("obstacle6.png");

 restartImage=loadImage("restart.png")
 gameOverImage = loadImage("gameOver.png")

}





function setup() {
  createCanvas(500, 350);
  
   bg = createSprite(200,174,20,20);
   bg.addImage("bg",bg_img);
     
  monkey = createSprite(50,330,20,50);
  monkey.addAnimation("walk", monkey_running);
  monkey.addAnimation("collided",monkey_collided);
  monkey.scale = 0.5;
  invisibleGround .x = invisibleGround.width /2;
  monkey.velocityY= -8;
  
  invisibleGround = createSprite(200,360 ,400,10);
  invisibleGround.visible = false;
  
 bananaGroup = new Group();
  obstaclesGroup = new Group();
  
  survivalTime = 0;
  
  restart = createSprite(300,100,20,20);
  restart.addImage("restartImage",restartImage);
  restart.scale = 0.5
  
  gameOver = createSprite(300,50,20,20);
  gameOver.addImage("gameover",gameOverImage);
  gameOver.scale = 0.5
  
  
  
  
  
}

function draw() {
  background(0,255,0);
  monkey.velocityY = monkey.velocityY + 0.8;
  
  
  
  if(gameState === PLAY){
    
      if(monkey.isTouching(bananaGroup))
   {
        foodScore = foodScore+1;
     
       
       }
    
    
   survivalTime = survivalTime + Math.round(getFrameRate()/60);
  
  if(monkey.x<200){
    
    if(keyDown("space")) {
    monkey.velocityY = -10;
  
  }
  }
  
   
    
  if (invisibleGround.x < 0){
    invisibleGround.x = invisibleGround.width/2;
  }
  
  monkey.collide(invisibleGround);
  //spawnClouds();
  spawnObstacles();
    
    
    if(monkey.isTouching(obstaclesGroup)){
      gameState = END;
      
      
    }
    
    gameOver.visible = false;
    restart.visible = false;
    food();
  }
  
  
  
  
 else if (gameState === END){
    invisibleGround.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0)
    monkey.velocityY = 0;
    bananaGroup.setVelocityXEach(0)
  
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);

    monkey.changeAnimation("collided",monkey_collided);
 
    gameOver.visible = true;
    restart.visible = true;
  
 if(mousePressedOver(restart)){
    
  reset();  
  }
   
  
  
  
  
  }
  
  drawSprites();
  strokeWeight(5);
   stroke("white");
  textSize(20);
  fill("red");
  text("Survival Time: "+ survivalTime, 100,50); 
  text("Food : "+foodScore,100,70);
  
}

function reset(){
  gameState = PLAY;
  obstaclesGroup.destroyEach();
  bananaGroup.destroyEach();
  survivalTime = 0;
 
  monkey.addAnimation("running", monkey_running);
  invisibleGround.velocityX = -8
  
}






/*function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -8 ;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}*/

function food(){
  
  if (World.frameCount% 80 === 0){
  var food = createSprite(350,random(300,250),5,5);
  food.addAnimation("banana",banana_img);
  food.scale = 0.4; 
  food.velocityX =-7;
  food.lifetime = 60;
  //food.setCollider("rectangle",20,10,0);
  bananaGroup.add(food);
  }   
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,340,10,40);
    obstacle.velocityX = -8;
    obstacle.addAnimation("stonei",obstacle_img );
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.3;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}