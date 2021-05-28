var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloud_image, cloud_group;
var obstacle1,
  obstacle2,
  obstacle3,
  obstacle4,
  obstacle5,
  obstacle6,
  obstacle_group;
var rand;
var score = 0;
var r = "good";
var gamestate = "play";
bg = "grey";
var c = 0;
function preload() {
  trex_running = loadAnimation(
    "images/trex1.png",
    "images/trex3.png",
    "images/trex4.png"
  );
  trex_collided = loadImage("../images/trex_collided.png");
  gameover = loadImage("images/gameOver.png");
  groundImage = loadImage("images/ground2.png");
  restart_button = loadImage("images/restart.png");
  cheat_button = loadImage("images/Cheat.png");
  obstacle1 = loadImage("images/obstacle1.png");
  obstacle2 = loadImage("images/obstacle2.png");
  obstacle3 = loadImage("images/obstacle3.png");
  obstacle4 = loadImage("images/obstacle4.png");
  obstacle5 = loadImage("images/obstacle5.png");
  obstacle6 = loadImage("images/obstacle6.png");
  white_img = loadImage("images/white.jpg");
  grey_img = loadImage("images/Image.jpg");
  cloud_image = loadImage("images/cloud.png");
}

function setup() {
  createCanvas(displayWidth, 200);
  cheat = createSprite(35, 15, 50, 20);
  cheat.shapeColor = "black";
  cheat.addImage("cheat", cheat_button);
  cheat.scale = 0.2;

  stroke("black");

  red = createSprite(105, 15, 50, 25);
  red.shapeColor = "red";

  blue = createSprite(175, 15, 50, 25);
  blue.shapeColor = "blue";

  white = createSprite(245, 15, 50, 25);
  white.shapeColor = "white";

  green = createSprite(245 + 70 + 70 + 70, 15, 50, 25);
  green.shapeColor = "green";

  yellow = createSprite(245 + 70, 15, 50, 25);
  yellow.shapeColor = "yellow";

  pink = createSprite(245 + 70 + 70, 15, 50, 25);
  pink.shapeColor = "pink";

  trex = createSprite(50, 180, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;

  image1 = createSprite(245 + 70 + 70 + 70 + 70, 15, 50, 25);
  image1.shapeColor = "black";

  image2 = createSprite(245 + 70 + 70 + 70 + 70 + 70, 15, 50, 25);
  image2.shapeColor = "grey";

  trex.setCollider("rectangle", 0, 0, 20, 80, 0);

  trex1 = createSprite(trex.x, trex.y, 20, 50);
  trex1.addImage("collided", trex_collided);
  trex1.scale = 0.5;
  trex1.visible = false;

  restart = createSprite(displayWidth / 2, 150, 20, 50);
  restart.addImage("restart_button_name", restart_button);
  restart.scale = 0.5;

  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;
  ground.velocityX = -3;
  ground.scale = 1.15;

  invisibleGround = createSprite(200, 190, 400, 10);
  invisibleGround.visible = false;

  cloud_group = new Group();
  obstacle_group = new Group();

  gameOver = createSprite(displayWidth / 2, 100, 20, 20);
  gameOver.addImage("over", gameover);
  gameOver.scale = 0.5;
}

function draw() {
  background(bg);
  trex.velocityY = trex.velocityY + 0.7;

  fill("black");
  textSize(19);
  stroke("white");
  text("Score : " + score, displayWidth - 195, 60);
  text("Game : " + gamestate, displayWidth - 195, 80);
  text("Frame Count : " + Math.round(frameCount), displayWidth - 195, 100);
  text("Velocity: " + ground.velocityX, displayWidth - 195, 120);
  text("Colour :  " + bg, displayWidth - 195, 140);
  textSize(18);
  stroke("white");
  text("cheat", 10, 25);
  stroke("black");
  line(displayWidth - 200, 40, displayWidth - 200, 160);
  line(displayWidth - 30, 40, displayWidth - 30, 160);
  line(displayWidth - 200, 40, displayWidth - 30, 40);
  line(displayWidth - 200, 160, displayWidth - 30, 160);

  console.log(gamestate);

  if (gamestate === "play") {
    if (obstacle_group.isTouching(trex)) {
      gamestate = "end";
    }
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    restart.visible = false;
    gameOver.visible = false;

    score = score + Math.round(getFrameRate() / 60);
    ground.velocityX = -3;
  } else if (gamestate === "end") {
    trex.visible = false;
    trex1.visible = true;

    ground.velocityX = 0;
    frameCount = 0;
    obstacle_group.destroyEach();
    cloud_group.destroyEach();

    gameOver.visible = true;
    restart.visible = true;
  }
  if (gamestate === "play") {
    if (mousePressedOver(red)) {
      bg = "red";
      c = 1;
    } else if (mousePressedOver(blue)) {
      bg = "blue";
      c = 2;
    } else if (mousePressedOver(white)) {
      bg = "white";
      c = 4;
    } else if (mousePressedOver(green)) {
      bg = "green";
      c = 3;
    } else if (mousePressedOver(yellow)) {
      bg = "yellow";
      c = 5;
    } else if (mousePressedOver(pink)) {
      bg = "pink";
      c = 6;
    } else if (mousePressedOver(image1)) {
      c = 7;
    } else if (mousePressedOver(image2)) {
      c = 8;
    }

    if (c === 1) {
      fill("yellow");
      textSize(19);
      stroke("yellow");
      text("Score : " + score, displayWidth - 195, 60);
      text("Game : " + gamestate, displayWidth - 195, 80);
      text("Frame Count : " + Math.round(frameCount), displayWidth - 195, 100);
      text("Velocity: " + ground.velocityX, displayWidth - 195, 120);
      text("Colour :  " + bg, displayWidth - 195, 140);
    } else if (c === 2) {
      fill("white");
      textSize(19);
      stroke("white");
      text("Score : " + score, displayWidth - 195, 60);
      text("Game : " + gamestate, displayWidth - 195, 80);
      text("Frame Count : " + Math.round(frameCount), displayWidth - 195, 100);
      text("Velocity: " + ground.velocityX, displayWidth - 195, 120);
      text("Colour :  " + bg, displayWidth - 195, 140);
    } else if (c === 3) {
      fill("pink");
      textSize(19);
      stroke("pink");
      text("Score : " + score, displayWidth - 195, 60);
      text("Game : " + gamestate, displayWidth - 195, 80);
      text("Frame Count : " + Math.round(frameCount), displayWidth - 195, 100);
      text("Velocity: " + ground.velocityX, displayWidth - 195, 120);
      text("Colour :  " + bg, displayWidth - 195, 140);
    } else if (c === 4) {
      background(white_img);
    } else if (c === 5) {
      fill("red");
      textSize(19);
      stroke("red");
      text("Score : " + score, displayWidth - 195, 60);
      text("Game : " + gamestate, displayWidth - 195, 80);
      text("Frame Count : " + Math.round(frameCount), displayWidth - 195, 100);
      text("Velocity: " + ground.velocityX, displayWidth - 195, 120);
      text("Colour :  " + bg, displayWidth - 195, 140);
    } else if (c === 6) {
      fill("green");
      textSize(19);
      stroke("green");
      text("Score : " + score, displayWidth - 195, 60);
      text("Game : " + gamestate, displayWidth - 195, 80);
      text("Frame Count : " + Math.round(frameCount), displayWidth - 195, 100);
      text("Velocity: " + ground.velocityX, displayWidth - 195, 120);
      text("Colour :  " + bg, displayWidth - 195, 140);
    } else if (c === 8) {
      background(grey_img);
    } else if (c === 7) {
      background("black");
      fill("white");
      textSize(19);
      stroke("white");
      text("Score : " + score, displayWidth - 195, 60);
      text("Game : " + gamestate, displayWidth - 195, 80);
      text("Frame Count : " + Math.round(frameCount), displayWidth - 195, 100);
      text("Velocity: " + ground.velocityX, displayWidth - 195, 120);
      text("Colour : black ", displayWidth - 195, 140);
    }
  }

  trex.collide(invisibleGround);
  trex1.collide(invisibleGround);
  drawSprites();

  spawnclouds();
  spawnObstacles();
  keyPressed();
  restartF();
  cheatButton();
}

function spawnclouds() {
  if (frameCount % 100 === 0) {
    rand = random(100, 120);
    cloud = createSprite(1200, rand, 10, 10);
    cloud.addImage("cloud_image", cloud_image);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    cloud.lifetime = 400;
    cloud.depth = trex.depth - 1;
    cloud_group.add(cloud);
  }
}
function spawnObstacles() {
  if (frameCount % 60 === 0) {
    obstacle = createSprite(1200, 165, 10, 40);
    obstacle.velocityX = -6;

    //generate random obstacles
    rand = Math.round(random(1, 6));
    switch (rand) {
      case 1:
        obstacle.addImage(obstacle1);
        break;
      case 2:
        obstacle.addImage(obstacle2);
        break;
      case 3:
        obstacle.addImage(obstacle3);
        break;
      case 4:
        obstacle.addImage(obstacle4);
        break;
      case 5:
        obstacle.addImage(obstacle5);
        break;
      case 6:
        obstacle.addImage(obstacle6);
        break;
      default:
        break;
    }

    obstacle.scale = 0.5;
    obstacle.lifetime = 400;
    obstacle_group.add(obstacle);
  }
}
function keyPressed() {
  if (keyDown("space") && trex.y > 160 && gamestate === "play") {
    trex.velocityY = -11;
  }
}

function restartF() {
  if (mousePressedOver(restart) && gamestate === "end") {
    gamestate = "play";
    score = 0;
    trex1.visible = false;
    trex.visible = true;

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
  }
}
function cheatButton() {
  if (mousePressedOver(cheat) && gamestate === "play") {
    score = score - 100;
    r = "bad";
  }
  if (r === "bad") {
    fill("black");
    stroke("black");
    textSize(23);
    text("C.H.E.A.T.E.R", displayWidth / 2 - 60, 20);
  }
}
