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
  $('.orbitLabelCircle').css('padding-top', canvas.width*0.034);
  $('.orbitLabelCircle').css('border', canvas.width*0.008+"px #d8d5d5 solid");

  //$('.orbit1, .orbit2, .orbit3, .taskTTL').css('height', orbitSumRatio);
  //$('.orbit1, .orbit2, .orbit3, .taskTTL').css('width', orbitSumRatio);
  //$('.orbit1 p, .orbit2 p, .orbit3 p').css('margin-top', fontVerticalAlign+'px');
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

function drawPlanitsInOrbit(height, width) {
  var canvas= document.getElementById('singleOrbitCanvas');
  var context= canvas.getContext('2d');
  var orbitSumRatio=canvas.width/8.15;
  var fontVerticalAlign=(canvas.width*0.056*0.4);

  console.log('i sould be drawing the planits right now hmmmm'+orbitSumRatio);

  //set planit font size
  $('.taskWrapper').css('font-size', canvas.width*.056);
  $('.taskWrapper h4').css('font-size', canvas.width*.035);

  //planit TTL size 
  $('.taskTTL').css('height', orbitSumRatio*.6);
  $('.taskTTL').css('width', orbitSumRatio*.6);
  $('.taskTTL p').css('margin-top', fontVerticalAlign+'px');

  //planit TTL size 
  $('.smallPlanet').css('height', orbitSumRatio*1.35);
  $('.smallPlanet').css('width', orbitSumRatio*1.35);
  $('.smallPlanet').css('margin-top', orbitSumRatio*1.35*-.5);
  //$('.smallPlanet').css('margin-left', orbitSumRatio*1.35*-.5);
  $('.mediumPlanet').css('height', orbitSumRatio*1.75);
  $('.mediumPlanet').css('width', orbitSumRatio*1.75);
  $('.mediumPlanet').css('margin-top', orbitSumRatio*1.75*-.5);
  //$('.mediumPlanet').css('margin-left', orbitSumRatio*1.75*-.5);
  $('.largePlanet').css('height', orbitSumRatio*2.2);
  $('.largePlanet').css('width', orbitSumRatio*2.2);  
  $('.largePlanet').css('margin-top', orbitSumRatio*2.2*-.5);
  //$('.largePlanet').css('margin-left', orbitSumRatio*2.2*-.5);  

}

//draw the planits onload

$(function() {
    resizeCanvas();
    resizeCanvasSingle();
     //setTimeout(function(){resizeCanvasSingle()},100);
});

