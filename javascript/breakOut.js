
/////////////////////////////////////
//Code for Breakout
/////////////////////////////////////
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var dPlus = .7;
var color = "#6FF"
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var lestPressed = false;
var brickRowCount = 6;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
var brickCount = (brickRowCount*brickColumnCount) * 257;
var lives = 5;

var dice = Math.random();

if(dice > .5){
  dx = -2;
}

//a two d array in order to
//initialize the bricks columns
//and rows to 0;
var bricks = [];
for(c = 0; c<brickColumnCount; c++){
  bricks[c] = [];
  for(r = 0; r < brickRowCount; r++){
    bricks[c][r] = { x: 0, y: 0, status: 1};
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

//turns the left and right key value to true
//when the left or right key is pressed
function keyDownHandler(e){
  if(e.keyCode == 39){
    rightPressed = true;
  }
  else if(e.keyCode == 37){
    leftPressed = true;
  }
}
//turns the right and left key val to false
//when the left or right key is released
function keyUpHandler(e){
  if(e.keyCode == 39){
    rightPressed = false;
  }
  else if(e.keyCode == 37){
    leftPressed = false;
  }
}

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX-paddleWidth/2 > 0 && relativeX < canvas.width-paddleWidth/2) {
        paddleX = relativeX - paddleWidth/2;
    }
}

//function to detect the collision
//of the ball and the bricks
function collisionDetection(){
  for(c = 0; c < brickColumnCount; c++){
    for(r = 0; r < brickRowCount; r++){
      var b = bricks[c][r];
      if(b.status == 1){
        if((x > b.x) && (x < b.x+brickWidth) && (y > b.y) && (y < b.y+brickHeight)){
          dy = -dy;
          color = "#CF9"
          b.status = 0;
          score += 257;
          if(score == brickCount){
            alert("GOOD");
            alert("Score: " + score);
            document.location.reload();
          }
        }
      }
    }
  }
}

//draws text onto the canvas
function drawScore(){
  ctx.font = "16px Arial";
  ctx.fillStyle = color;
  ctx.fillText("Score: "+score, 8, canvas.height-20);
}

//draws the lives
function drawLives(){
  ctx.font = "16px, Arial";
  ctx.fillStyle = color;
  ctx.fillText("Balls: "+lives, canvas.width-65, 20);
}

//draws the game ball
function drawBall(parm){
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = parm;
  ctx.fill();
  ctx.closePath();
}

//draws the paddle
function drawPaddle(){
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

//a function to draw all of the bricks
function drawBricks(){
  for(c = 0; c < brickColumnCount; c++){
    for(r = 0; r < brickRowCount; r++){
      if(bricks[c][r].status == 1){
      var brickX = (c*(brickWidth + brickPadding))+brickOffsetLeft;
      var brickY = (r*(brickHeight + brickPadding))+brickOffsetTop;
      //if((r != 2 || c != 0) && (r != 2 || c != 4) && (r != 0 || c != 0) && (r != 0 || c != 4)){
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
        //}
      }
    }
  }
}

//draws the ball and the paddle, and also
//runs the game
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall(color);
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();


    x += dx;
    y += dy;

    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
        color = "#6FF";
    }
    else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
            dx -= dPlus;
            dy -= dPlus;
            color = "#FFF";
        }
        else {
            lives--;
            if(!lives) {
                    alert("BAD");
                    alert("Score: " + score)
                    document.location.reload();
                }
                else {
                    x = canvas.width/2;
                    y = canvas.height-30;
                    dx = 3;
                    dy = -3;
                    paddleX = (canvas.width-paddleWidth)/2;
                }
        }
    }

    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
}



function startBreak(){
  breakCurrentValue = document.getElementById('breakOut').value;
  astCurrValue = document.getElementById('astroids').value;
  //turns on the game, unless the other game is on
  //and then it turns it off
  if(breakCurrentValue == "Off"){
    if(astCurrValue == "On"){
      document.getElementById('astroids').value = "Off";
      document.location.reload();
    }
      setInterval(draw, 10);
      document.getElementById('breakOut').value = "On";
  }
  //turns off the game
  else{
    document.getElementById('breakOut').value = "Off";
    document.getElementById('astroids').value = "Off";
    document.location.reload();
  }

}



















///
