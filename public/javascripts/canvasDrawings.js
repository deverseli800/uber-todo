function drawCurvedOrbits() {
	var canvas = document.getElementById('solarCanvas');
      var context = canvas.getContext('2d');

     context.beginPath();
      context.moveTo(0, 900);
      context.quadraticCurveTo(340, 625, 680, 900);
      context.lineWidth = 2;

   
      context.strokeStyle = 'white';
      context.stroke();


      context.beginPath();
      context.moveTo(0, 700);
      context.quadraticCurveTo(340, 425, 680, 700);
      context.lineWidth = 2;

      context.strokeStyle = 'white';
      context.stroke();


      context.beginPath();
      context.moveTo(0, 500);
      context.quadraticCurveTo(340, 225, 680, 500);
      context.lineWidth = 2;

      context.strokeStyle = 'white';
      context.stroke();

      context.beginPath();
      context.moveTo(0, 300);
      context.quadraticCurveTo(340, 25, 680, 300);
      context.lineWidth = 2;

      
      context.strokeStyle = 'white';
      context.stroke(); 

}

function drawStraightOrbits(number, spacing, height) {
	var canvas = document.getElementById('solarCanvas');
      var context = canvas.getContext('2d');
      var startPoint= height-spacing;
      context.setLineDash([5])

     context.beginPath();
      context.moveTo(0, startPoint);
      context.lineTo(canvas.width, startPoint);
      context.lineWidth = 1;

   
      context.strokeStyle = '#747f93';
      context.stroke();


     context.beginPath();
      context.moveTo(0, startPoint-spacing);
      context.lineTo(canvas.width, startPoint-spacing);
      context.lineWidth = 1;

      
      context.strokeStyle =' #747f93';
      context.stroke();

     context.beginPath();
      context.moveTo(0, startPoint-(2*spacing));
      context.lineTo(canvas.width, startPoint-(2*spacing));
      context.lineWidth = 1;

   
      context.strokeStyle = '#747f93';
      context.stroke();

    context.beginPath();
      context.moveTo(0, startPoint-(3*spacing));
      context.lineTo(canvas.width, startPoint-(3*spacing));
      context.lineWidth = 1;

   
      context.strokeStyle = '#747f93';
      context.stroke();

     context.beginPath();
      context.moveTo(0, startPoint-(4*spacing));
      context.lineTo(canvas.width, startPoint-(4*spacing));
      context.lineWidth = 1;

   
      context.strokeStyle = '#747f93';
      context.stroke();


     $('.orbit').css('height',spacing+'px');
     $('.orbit').css('margin-top',0+'px');

}

// resize the canvas to fill browser window dynamically
window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
  //draw the right size galaxy 
  var canvas= document.getElementById('solarCanvas');
  var solarWrapperWidth=$('#solarWrapper').width();
  
 
  canvas.width=solarWrapperWidth;
  canvas.height=solarWrapperWidth*1.775;
  console.log(solarWrapperWidth);
  drawCircularOrbits(canvas.height, canvas.width, canvas.width);

  //draw the orbit sums
  var orbitSumRatio=canvas.width/8.15;
  var fontVerticalAlign=(orbitSumRatio/2)-(canvas.width*0.056*0.5);

  $('.orbit1, .orbit2, .orbit3').css('height', orbitSumRatio);
  $('.orbit1, .orbit2, .orbit3').css('width', orbitSumRatio);
  $('.orbit1 p, .orbit2 p, .orbit3 p').css('margin-top', fontVerticalAlign+'px');
}

function drawCircularOrbits(height, width, radius) {
  //resizeCanvas();
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
  console.log(solarWrapperWidth);
  drawCircularSingleOrbit(canvas.height, canvas.width, canvas.width);
  drawPlanitSectors(canvas.height, canvas.width, canvas.width, 6);
  drawPlanitSectors(canvas.height, canvas.width, canvas.width, 1);

  //draw the orbit sums
  var orbitSumRatio=canvas.width/8.15;
  var fontVerticalAlign=(orbitSumRatio/2)-(canvas.width*0.056*0.5);

  $('.orbit1, .orbit2, .orbit3').css('height', orbitSumRatio);
  $('.orbit1, .orbit2, .orbit3').css('width', orbitSumRatio);
  $('.orbit1 p, .orbit2 p, .orbit3 p').css('margin-top', fontVerticalAlign+'px');
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

function drawPlanitSectors(height, width, radius, position) {
  var canvas= document.getElementById('singleOrbitCanvas');
  var context= canvas.getContext('2d');
  var circle={radius: radius, centerX: width/2, centerY: height/2};

  // convert radians to degrees because yes
  function toRadians(deg) {
      return deg * Math.PI / 180
  }

}


//draw the planits onload

$( document ).ready(function() {
    resizeCanvas();
    resizeCanvasSingle();
});

