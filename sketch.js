var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , ground , jungle ,invisibleGround, score; 

var bananaGroup , obstacleGroup;

var monkeyAnimation , groundImage , bananaImage ,  stoneImage, monkeyStill ;

function preload(){
  
  monkeyAnimation = loadAnimation("Monkey_01.png",
  "Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  monkeyStill = loadAnimation ("Monkey_01.png");
  
  bananaImage = loadImage("banana.png");
  
  
  
  jungleImage = loadImage("36430944-illustration-of-a-scene-of-a-forest.jpg");
  
  stoneImage = loadImage("stone.png");
}

function setup(){
  createCanvas(400,400);
  
  jungle = createSprite(200,200,400,400);
  jungle.addImage(jungleImage);
  jungle.velocityX = -5;
  jungle.x = jungle.width / 2;
  
  monkey = createSprite(50,335,20,20);
  monkey.addAnimation("moving",monkeyAnimation);
  monkey.scale = 0.14;
  monkey.setCollider("rectangle",0,0,340,monkey.height);
  //monkey.debug = true;
  
  ground = createSprite(200,395,450,15);
  
  ground.velocityX = -5;
  ground.x = ground.width / 2;
  
  invisibleGround = createSprite(200,394,400,10);
  invisibleGround.visible = false; 
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;
}



function draw(){
  background("white");
  
  
  if(gameState===PLAY){
  if ((ground.x<200)){
    ground.x = ground.width / 2;
     }
  
    score = score + Math.round(getFrameRate()/60);
 
    
  if(jungle.x <0){
   jungle.x = jungle.width/2; 
  }
  
  if(keyDown("space")&&monkey.y>335){
     monkey.velocityY = -15;
     }
    
    if(bananaGroup.isTouching(monkey)){
     bananaGroup.destroyEach(); 
    }
  //console.log(monkey.y);
  
  monkey.velocityY =  monkey.velocityY + 0.7;
  
  if (obstacleGroup.isTouching(monkey)){
     gameState = END;
  }
  
  food();
  stone();
    
  }
   else if (gameState===END){
     monkey.addAnimation("still",monkeyStill);
     monkey.destroy();
     
     obstacleGroup.setLifetimeEach(-1);
     bananaGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);    
      ground.velocityX = 0;
      jungle.velocityX = 0;
  }
  
  monkey.collide(invisibleGround);
  

  drawSprites();
 textSize(30);
   text("survival time:" + score , 100,50);
}

function food(){
  if (frameCount%80===0){
      var banana = createSprite(500,280,20,20);
      banana.addImage(bananaImage);
      banana.scale = 0.07;
    
      banana.y = Math.round(random(170,280));
      banana.velocityX = -5;
      banana.lifetime = 100;
      console.log(banana.y);
      bananaGroup.add(banana);
  }
  
}

function stone(){
  if (frameCount%100===0){
      var stone = createSprite(500,360,10,10);
      stone.addImage(stoneImage);
      stone.scale = 0.2;
      stone.velocityX = -7;
      stone.lifetime = 100;
      stone.collide(invisibleGround);
      stone.setCollider("rectangle",0,0,300,400);
      //stone.debug = true;
      obstacleGroup.add(stone);
  }
}