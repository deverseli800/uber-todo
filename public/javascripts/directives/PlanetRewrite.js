
angular.module('todo.directives')
.directive('planetRewrite', function() {
  return {
    restrict:"E",
    scope:{
      ttl:"@",
      size:"@",
      update:"&",
      title:"@",
      orbit:"@",
      angle:"@",
      offset:"@",
      planitHeight:"@",
      planitWidth:"@",
      planitMargin:"@",
      ttlSize:"@",
      ttlMargin:"@",
      fontSize:"@",
      fontSizeH4:"@",
      deleteTask:"&"
    },
    template:"<div class='taskWrapper' style='height:10px; font-size:{{fontSize}}px; -webkit-transform:rotate({{angle}}deg) translate({{offset}}px) rotate(-{{angle}}deg)'>"+
                "{{todo.done}}"+
                "<div class='taskPlanet {{size}}' style='height:{{planitHeight}}px; width:{{planitWidth}}px; margin-top:{{planitMargin}}px'>"+
                  "<div class='taskTTL' style='height:{{ttlSize}}px; width:{{ttlSize}}px;'>"+
                    "<p style='margin-top:{{ttlMargin}}px'>{{ttl}}</p>"+
                  "</div>"+
                "</div>"+
                "<div class='taskTitle'>"+
                  "{{todo.title}}"+
                  "<h4  style='font-size:{{fontSizeH4}}px'>"+
                    "{{title}}"+
                  "</h4>"+
                "</div>"+
                "<div class='taskOptions' ng-show='showTaskMenu'>"+
                  "<button class='btn btn-danger' ng-model='todo.done' ng-click='deleteTask()''>"+
                    "Delete"+
                  "</button>"+
                "</div>"+
              "</div>",
    link:function(scope, element, attrs) {
      scope.showTaskMenu=false;
      scope.toggleTaskMenu=function() {
        scope.showTaskMenu=! scope.showTaskMenu;
      };

      function calculateOffset() {
        var canvasWidth=document.getElementById('singleOrbitCanvas').width;
        var offset=canvasWidth*0.375;
        attrs.$set('offset', offset);
      }

      calculateOffset();
     
      //assign planet illustration based on time to completion (TTL)
      attrs.$observe('ttl', function(value) {
        //calculate size of various planits
        var canvas=document.getElementById('singleOrbitCanvas');
        var orbitSumRatio=canvas.width/8.15;
        var fontVerticalAlign=(canvas.width*0.0224);

        attrs.$set('ttlSize', canvas.width*0.12);
        attrs.$set('ttlMargin', canvas.width*0.025);
        attrs.$set('fontSize', canvas.width*0.05);
        attrs.$set('fontSizeH4', canvas.width*0.035);

        if(value<2) {
         attrs.$set('size', 'smallPlanet');
         attrs.$set('show', 'yes');
         attrs.$set('planitHeight', orbitSumRatio*1.35);
         attrs.$set('planitWidth', orbitSumRatio*1.35);
         attrs.$set('planitMargin', orbitSumRatio*-0.675);

        }
        else if(value>=2 && value<4) {
          attrs.$set('size', 'mediumPlanet');
          attrs.$set('show', 'yes');
          attrs.$set('planitHeight', orbitSumRatio*1.75);
          attrs.$set('planitWidth', orbitSumRatio*1.75);
          attrs.$set('planitMargin', orbitSumRatio*-0.875);
        }
        else if(value>=4) {
          attrs.$set('size', 'largePlanet');
          attrs.$set('show', 'yes');
          attrs.$set('planitHeight', orbitSumRatio*2.25);
          attrs.$set('planitWidth', orbitSumRatio*2.25);
          attrs.$set('planitMargin', orbitSumRatio*-1.125);
        }
        else {
          attrs.$set('size', 'noPlanet');
          attrs.$set('show', 'noShow');
        }
      });
    }
  };
});



