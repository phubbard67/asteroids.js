////////////////////////////////////////////
//Code for Astroids
////////////////////////////////////////////


var xPos = Math.random() * 100; //240
var yPos = Math.random() * 100; //160
var xPosSmall = Math.random() * 1000;
var yPosSmall = Math.random() * 1000;
var shipXPos = canvas.width/2; //240
var shipYPos = canvas.height/2; //160
var colors = "#6f6";
var colors2 = "#000";
var distX = 0.5;
var distY = -0.5;
var largeAstroidRadius = 20;
var smallAstroidRadius = 5;
var xNum = 30;
var yNum = 20;
var randomY = Math.random()*100 - 40;
var randomYsmall = Math.random()*10 +20;

//Random coordnates for the astroids
//lines corrections so that they don't
//look wonky
if (randomY <= 0){
  randomY+=40;
}
if(randomY >= 70){
  randomY-=45;
}
if(randomYsmall <= 0){
  randomYsmall+=72;
}

//Random coordnates for the asteroids
//corrections, so they start within the
//canvas




function drawLargeAstroid(parmX, parmY){
  ctx.beginPath();
  ctx.moveTo(xPos, yPos);
  ctx.lineTo(xPos, yPos + randomY);
  ctx.lineTo(xPos - 10, yPos + 52);
  ctx.lineTo(xPos, yPos + 60);
  ctx.lineTo(xPos - 31, yPos + 70);
  ctx.lineTo(xPos - 49, yPos + 60);
  ctx.lineTo(xPos - 49, yPos + 20);
  ctx.fillStyle = colors2;
  ctx.fill();
  ctx.closePath();
  ctx.strokeStyle = colors;
  ctx.stroke();
}

function drawSmallAstroid(parmX, parmY){
  ctx.beginPath();
  ctx.moveTo(xPosSmall, yPosSmall);
  ctx.lineTo(xPosSmall, yPosSmall + randomYsmall);
  ctx.lineTo(xPosSmall - 15, yPosSmall + 32);
  ctx.lineTo(xPosSmall, yPosSmall + 40);
  ctx.lineTo(xPosSmall - 11, yPosSmall + 50);
  ctx.lineTo(xPosSmall - 30, yPosSmall + 40);
  ctx.lineTo(xPosSmall - randomYsmall, yPosSmall + 5);
  ctx.fillStyle = colors2;
  ctx.fill();
  ctx.closePath();
  ctx.strokeStyle = colors;
  ctx.stroke();
}


function drawShip(){
  ctx.beginPath();
  ctx.moveTo(shipXPos,shipYPos);
  ctx.lineTo(shipXPos-7,shipYPos+30);
  ctx.lineTo(shipXPos+7,shipYPos+30);
  ctx.fillStyle = colors2;
  ctx.fill();
  ctx.closePath();
  ctx.strokeStyle = colors;
  ctx.stroke();
}

//function to make objects move
//and re-create themselves if they
//cross the edge of the canvas
function movement(){

  xPos += distX;
  yPos += distY;

  xPosSmall+=distX;
  yPosSmall+=distY;


//Small asteroids
if(xPosSmall <= 0){
  xPosSmall = xPosSmall + canvas.width;
}
if(xPosSmall >= canvas.width){
  xPosSmall = xPosSmall - canvas.width;
}
if(yPosSmall >= canvas.height){
  yPosSmall = yPosSmall - canvas.height;
}
if(yPosSmall <= 0){
  yPosSmall = yPosSmall + canvas.height;
}

//Large asteroids
  if(xPos <= 0){
    xPos = xPos + canvas.width;
  }
  if(xPos >= canvas.width){
    xPos = xPos - canvas.width;
  }
  if(yPos >= canvas.height){
    yPos = yPos - canvas.height;
  }
  if(yPos <= 0){
    yPos = yPos + canvas.height;
  }

}
//"main" function to draw
//on the canvas
function drawAst(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawShip();
  drawLargeAstroid(5, 10);
  drawLargeAstroid(2, 4);
  drawSmallAstroid(200, 20);
  movement();

}

//function to start astroids
function startAst(){
  astCurrentValue = document.getElementById('astroids').value;
  breakCurrValue = document.getElementById('breakOut').value;
  //starts the game unless the other
  //game is running, in which case
  //it reloads the page and sets
  //the value of the other game to off
  if(astCurrentValue == "Off"){
    if(breakCurrValue == "On"){
      document.getElementById('breakOut').value = "Off";
      document.location.reload();
    }
      setInterval(drawAst, 10);
      document.getElementById('astroids').value = "On";

  }
  //turns off the game and reloads
  //the page
  else{
    document.getElementById('astroids').value = "Off";
    document.getElementById('breakOut').value = "Off";
    document.location.reload();
  }
}
