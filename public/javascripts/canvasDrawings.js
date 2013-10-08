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
  var canvas= document.getElementById('solarCanvas');
  var solarWrapperWidth=$('#solarWrapper').width();
  canvas.width=solarWrapperWidth;
  canvas.height=solarWrapperWidth*1.775;
  console.log(solarWrapperWidth);
  drawCircularOrbits(canvas.height, canvas.width, canvas.width/6);
  drawCircularOrbits(canvas.height, canvas.width, canvas.width/3);
  drawCircularOrbits(canvas.height, canvas.width, canvas.width/2.1);
}

function drawCircularOrbits(height, width, radius) {
  //resizeCanvas();
  var canvas= document.getElementById('solarCanvas');
  var solarWrapperWidth=$('#solarWrapper').width();
  var context= canvas.getContext('2d');
  var circle={radius: radius, centerX: width/2, centerY: height/2};

  //draw circle
  context.beginPath();
  context.arc(circle.centerX, circle.centerY, circle.radius, 0, 2*Math.PI, false); 
  context.lineWidth = 2;
  context.setLineDash([5])
  context.strokeStyle='#747f93';
  context.stroke();
 
}
	
drawStraightOrbits(5, 283, 1500);
resizeCanvas();