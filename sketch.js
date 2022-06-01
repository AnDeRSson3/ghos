var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;

var greenLine, greenLineGroup;

var gameState = "play";


function preload(){
  towerImg = loadImage("tower.png");
  ghostImg = loadImage("ghost-standing.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY = 1;

  ghost = createSprite(200, 200);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3
  ghost.velocityY = 0;

  doorsGroup = new Group();
  
  climbersGroup=new Group(); 

  greenLineGroup = new Group();
  
}


function draw() {
  background(0);
  if(gameState =="play"){
    if (tower.y>400){
      tower.y=300
    }
  
    ghost.velocityY += 0.8;
    
    if (keyDown("SPACE")){
      ghost.velocityY= -10;
    }
    if (keyDown("RIGHT")){
      ghost.x += 1
    }
    if (keyDown("LEFT")){
      ghost.x -= 1
    }
    
    if(ghost.isTouching(climbersGroup)){
      ghost.velocityY =0;
    }

    if(ghost.isTouching(greenLineGroup) || ghost.y>600){
      gameState = "end";
    }
  }

  else if(gameState == "end"){

    fill("yellow")
    textSize(30);
    text("GAME OVER!!!", 200, 300);
    ghost.destroy()
    doorsGroup.destroyEach();
    climbersGroup.destroyEach();
    greenLineGroup.destroyEach();
    tower.destroy()
  }
  
 

  spawnDoors(); 
  drawSprites();
}

function spawnDoors(){
if(frameCount % 150 ==0){
  door = createSprite(200, -50);
  door.x = Math.round(random(100, 500));
  door.addImage(doorImg);
  door.velocityY =1;
  door.lifetime=800;

  doorsGroup.add(door);
  
  climber = createSprite(200, 20);
  climber.x=door.x;
  climber.addImage(climberImg);
  climber.velocityY=1
  climber.lifetime= 800;
  climbersGroup.add(climber);
                                                               
  ghost.depth = door.depth+1;
  climber.depth= door.depth;

  greenLine = createSprite(200, 30, climber.width, 2);
  greenLine.debug = true;

  greenLine.x=door.x;
  greenLine.velocityY=1
  greenLine.lifetime= 800;
  greenLineGroup.add(greenLine);

  
}

}

