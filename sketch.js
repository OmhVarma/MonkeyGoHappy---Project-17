var PLAY = 1;
var gameState = 1;

var monkey, monkey_running;
var banana, banana1, obstacle, obstacle1;
var foodG, obstacleG;
var score;
var ground, ground1;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  banana1 = loadImage("banana.png");
  obstacle1 = loadImage("obstacle.png");

}

function setup() {
  createCanvas(600, 400);

  score = 0;

  monkey = createSprite(80, 355, 20, 20);
  monkey.addAnimation('running', monkey_running);
  monkey.scale = 0.1

  ground = createSprite(0, 400, 1200, 30);
  ground.velocityX = -4;

  ground1 = createSprite(0, 400, 1200, 20);
  ground1.velocityX = -4;
  ground1.visible = false;

  foodG = new Group();
  obstacleG = new Group();

}


function draw() {

  background('white');

  if (obstacleG.isTouching(monkey)) {
    obstacleG.setVelocityXEach(0);
    monkey.velocityX = 0;
    ground.velocityX = 0;
    foodG.setVelocityXEach(0);
    obstacleG.setLifeTime = -1;
    foodG.setLifeTime = -1;
  }

  if (gameState === PLAY) {
    spawnB();
    spawnO();
  }

  if (frameCount % 80 === 0) {
    score = score + 1;
  }

  if (keyDown("space")) {
    monkey.velocityY = -10;
  }

  monkey.velocityY = monkey.velocityY + 1;

  monkey.collide(ground1);

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }

  if (ground1.x < 0) {
    ground1.x = ground1.width / 2;
  }

  drawSprites();

  textSize(20);

  text('Survival Time: ' + score, 240, 20);

}

function spawnO() {
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(600, 355, 20, 20);
    obstacle.velocityX = -4;
    obstacle.addImage(obstacle1);
    obstacle.lifetime = 300;
    obstacle.scale = 0.2;

    monkey.depth = obstacle.depth + 1;

    obstacleG.add(obstacle);
  }


}

function spawnB() {
  if (frameCount % 80 === 0) {
    banana = createSprite(600, 200, 20, 20);
    banana.y = random(120, 200);
    banana.velocityX = -4;
    banana.scale = 0.075;
    banana.addImage(banana1);
    banana.lifetime = 600;

    monkey.depth = banana.depth + 1;

    foodG.add(banana);

  }
}