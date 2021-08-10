var background1, bg;
var ground;
var spaceBall, sphere;
var stars, starsImg, starGr;
var score = 0;
var obstacles, obstaclesImg, obstaclesGr;
var time;
var D = new Date();

function preload(){
  bg = loadImage("backgr.jpg");
  sphere = loadImage("spere.png");
  starsImg = loadImage("stars.png");
  obstaclesImg = loadImage("pyramid.webp");
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  background1 = createSprite(windowWidth/2,windowHeight/2,windowWidth,windowHeight);
  background1.addImage(bg);
  background1.scale = 1.5;
  background1.velocityX = -3;

  time = D.getSeconds();

  ground = createSprite(width/2,height-50,width*2,20);
  ground.shapeColor = "brown";
  ground.velocityX = -3;

  spaceBall = createSprite(width/2-200,height-90,30,20);
  spaceBall.addImage(sphere);
  spaceBall.scale = 0.1;

  starGr = new Group();
  obstaclesGr = new Group();
}

function draw() {
  background(51);
  if(background1.x < 80){
    background1.x = width/2;
  }

  if(ground.x < 0){
    ground.x= width/2;
  }

  time = time+0.05;

  

  if(score <= -10 || time > time+120){
    gameOver();
    starGr.destroyEach();
    obstaclesGr.destroyEach();
    time = 0;
  }

  if(score >= 10){
    posGameOver();
    starGr.destroyEach();
    obstaclesGr.destroyEach();
  }

  spaceBall.x = mouseX;

  spawnStars();
  spawnObstacles();

  

  

  spaceBall.velocityY+= 0.5;
  spaceBall.collide(ground);

 drawSprites();

  textSize(40);
  fill("green");
  text("stars:"+score,width-200,100);

  textSize(40);
  fill("red")
  text("Time:"+time,width-200,50);
}

function spawnStars(){
  if(frameCount%60 === 0){
    stars = createSprite(width/2+200,0,30,20);
    stars.x = Math.round(random(50,width-50));
    stars.velocityY = 2;
    stars.addImage(starsImg);
    stars.scale = 0.25;
    stars.collide(ground);
    starGr.add(stars);
    stars.lifetime = 310;

    if(starGr.isTouching(spaceBall)){
      score = score+5;
      stars.x = stars.x+50;
    }
  }
}

function spawnObstacles(){
  if(frameCount%100 === 0){
    obstacles = createSprite(width/2+200,0,30,20);
    obstacles.x = Math.round(random(30,width-50));
    obstacles.velocityY = 3;
    obstacles.addImage(obstaclesImg);
    obstacles.scale = 0.05;
    obstacles.lifetime = 210;
    obstaclesGr.add(obstacles);
    
    if(spaceBall.isTouching(obstaclesGr)){
      score = score-8;
      obstacles.x = obstacles.x+50;
    }
  }
}

function gameOver(){
 swal(
   {
     title: 'Game Over',
     text: 'BETTER LUCK NEXT TIME!',
     confirmButtonText: 'RETRY',
     imageUrl: "https://tse3.mm.bing.net/th?id=OIP.Ea272AyUfZdnIo1IoGrIAwHaEK&pid=Api&P=0&w=293&h=166"
   },
     function(isConfirm){
       if(isConfirm){
         location.reload();
       }
     }
 )
}

function posGameOver(){
  swal({
    title: 'Winner',
    text: 'You won',
    confirmButtonText: 'PLAY AGAIN',
    imageUrl:"https://tse4.mm.bing.net/th?id=OIP.LC3Q9PPnbBplazXwC7pBpQHaHa&pid=Api&P=0&w=300&h=300"
  },
  function(isConfirm){
    if(isConfirm){
      location.reload();
    }
  }
  )
}
