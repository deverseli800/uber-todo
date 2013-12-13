// resize the canvas to fill browser window dynamically
window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
  //draw the right size galaxy 
  var canvas= document.getElementById('solarCanvas');
  var solarWrapperWidth=$('#solarWrapper').width();

  canvas.width=solarWrapperWidth;
  canvas.height=solarWrapperWidth*1.775;
  drawCircularOrbits(canvas.height, canvas.width, canvas.width);

  //draw the orbit sums
  var orbitSumRatio=canvas.width/8.15;
  var fontVerticalAlign=(orbitSumRatio/2)-(canvas.width*0.056*0.5);

  $('.orbit1, .orbit2, .orbit3').css('height', orbitSumRatio);
  $('.orbit1, .orbit2, .orbit3').css('width', orbitSumRatio);
  $('.orbit1 p, .orbit2 p, .orbit3 p').css('margin-top', fontVerticalAlign+'px');
}

function drawCircularOrbits(height, width, radius) {
  var canvas= document.getElementById('solarCanvas');
  var solarWrapperWidth=$('#solarWrapper').width();
  var context= canvas.getContext('2d');
  var circle={radius: radius, centerX: width/2, centerY: height/2};


  //draw orbit 1
  context.beginPath();
  context.arc(circle.centerX, circle.centerY, circle.radius/6, 0, 2*Math.PI, false); 
  context.lineWidth = 2;
  context.setLineDash([5])
  context.strokeStyle='#747f93';
  context.stroke();

   //draw orbit 2 
  context.beginPath();
  context.arc(circle.centerX, circle.centerY, circle.radius/3, 0, 2*Math.PI, false); 
  context.lineWidth = 2;
  context.setLineDash([5])
  context.strokeStyle='#747f93';
  context.stroke();

  //draw orbit 3
  context.beginPath();
  context.arc(circle.centerX, circle.centerY, circle.radius/2.1, 0, 2*Math.PI, false); 
  context.lineWidth = 2;
  context.setLineDash([5])
  context.strokeStyle='#747f93';
  context.stroke();
 
  //place orbitSum 1
  $('.orbit1').css('left', canvas.width*.6);
  $('.orbit1').css('top', canvas.width*.77);
  $('.orbit1').css('font-size', canvas.width*.056);

   //place orbitSum 2
  $('.orbit2').css('left', canvas.width*.24);
  $('.orbit2').css('top', canvas.width*.57);
  $('.orbit2').css('font-size', canvas.width*.056);

    //place orbitSum 3
  $('.orbit3').css('left', canvas.width*.764);
  $('.orbit3').css('top', canvas.width*.46);
  $('.orbit3').css('font-size', canvas.width*.056);
}

// resize the single orbit canvas. I SHOULD BE ABLE TO ONLY USE ONE FUNCTION IN FUTURE AND 
// PASS THE CANVAS AND WRAPPER IDs AS ARGUMENTS
window.addEventListener('resize', resizeCanvasSingle, false);

function resizeCanvasSingle() {
  //draw the right size galaxy 
  var canvas= document.getElementById('singleOrbitCanvas');
  var solarWrapperWidth=$('#singleOrbitWrapper').width();
  
  canvas.width=solarWrapperWidth;
  canvas.height=solarWrapperWidth*1.775;
  drawCircularSingleOrbit(canvas.height, canvas.width, canvas.width);
  //drawPlanitsInOrbit(canvas.height, canvas.width);
  
  //draw the orbit sums
  var orbitSumRatio=canvas.width/8.15;
  var fontVerticalAlign=(orbitSumRatio/2)-(canvas.width*0.056*0.5);

  //orbitLabel Styles
  $('.orbitLabel h2').css('font-size', canvas.width*0.045);
  $('.orbitLabel p').css('font-size', canvas.width*0.037);
  $('.orbitLabel').css('margin-top', canvas.width*-0.121);
  $('.orbitLabelCircle').css('width', canvas.width*0.2);
  $('.orbitLabelCircle').css('height', canvas.width*0.2);
  $('.orbitLabelCircle').css('padding-top', canvas.width*0.035);
  $('.orbitLabelCircle').css('border', canvas.width*0.008+"px #d8d5d5 solid");

}

function drawCircularSingleOrbit(height, width, radius) {
  //resizeCanvas();
  var canvas= document.getElementById('singleOrbitCanvas');
  var solarWrapperWidth=$('#singleOrbitWrapper').width();
  var context= canvas.getContext('2d');
  var circle={radius: radius, centerX: width/2, centerY: height/2};

  //draw orbit 1
  context.beginPath();
  context.arc(circle.centerX, circle.centerY, circle.radius*.375, 0, 2*Math.PI, false); 
  context.lineWidth = 2;
  context.setLineDash([5])
  context.strokeStyle='#747f93';
  context.stroke();

  //place orbitSum 1
  $('.orbit1').css('left', canvas.width*.6);
  $('.orbit1').css('top', canvas.width*.77);
  $('.orbit1').css('font-size', canvas.width*.056);

   //place orbitSum 2
  $('.orbit2').css('left', canvas.width*.24);
  $('.orbit2').css('top', canvas.width*.57);
  $('.orbit2').css('font-size', canvas.width*.056);

    //place orbitSum 3
  $('.orbit3').css('left', canvas.width*.764);
  $('.orbit3').css('top', canvas.width*.46);
  $('.orbit3').css('font-size', canvas.width*.056);

}

//draw the planits onload

$(function() {
    resizeCanvas();
    resizeCanvasSingle();
     //setTimeout(function(){resizeCanvasSingle()},100);
});

