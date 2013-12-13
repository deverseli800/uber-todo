var app= angular.module('TodoModule', ['ui.bootstrap']);


function TodoListController($scope, $http, $filter) {  
  //show or hide add task form 
  $scope.showForm=true;

  $scope.finishTask=function(todo) {
    todo.done=! todo.done;
    $scope.update(todo);
  }

  $scope.todos = [];

  $scope.newTodo = {
    title: '',
    done : false,
    due : new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    description : '',
    orbit: '',
    ttl:'',
    angle:''
  };

  $scope.orbits=[{name:3, remainder:0, sum:0, tasks:0},{name:2, remainder:0, sum:0, tasks:0},{name:1, remainder:0, sum:0, tasks:0}];
  $scope.selectedOrbit=$scope.orbits[0];
  
  $scope.doneFilter = { done : true };

  $scope.notDoneFilter = { done : false };

  $scope.setTodos = function(todos) {
    $scope.todos = todos;
    $scope.calculateRemainder();
    $scope.setOrbitAngle();
  };

  $scope.update = function(todo) {
    console.log('calling update');
    console.log(todo);
    $http.put('/todo/' + todo._id + '.json', todo).success(function(data) {
      if (!data.todo) {
        alert(JSON.stringify(data));
      }
    });
  };


  $scope.updateList = function() {
    $http.get('/todos.json').success(function(data) {
      $scope.todos = data.todos;
    });

    setInterval(function() {
      $scope.updateList();
      $scope.$apply();
    }, 30 * 60 * 1000); // update every 30 minutes;
  };

  $scope.updateList();

  $scope.areSameDate=function(d1, d2) {
    return d1.getFullYear() == d2.getFullYear()
      && d1.getMonth() == d2.getMonth()
      && d1.getDate() == d2.getDate();
  }

  $scope.areSameWeek=function(today, d2) {
    //Get the date value of next week.
    var nextWeek = Date.parse(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7));
    var todayParsed= Date.parse(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
    var compareDate=Date.parse(new Date(d2.getFullYear(), d2.getMonth(), d2.getDate()));
    if (nextWeek > compareDate) {
      return true;
    }
    else {
      return false;
    }  
  }


  $scope.addNewTodo = function() {
    var today= new Date();
    //assign orbit based on the newtodo.due
    //if the task is due today, make the orbit 1
    if($scope.areSameDate(today, $scope.newTodo.due)==true) {
      $scope.newTodo.orbit=1;
    } 
    else{
      if ($scope.areSameWeek(today, $scope.newTodo.due)==true){
        $scope.newTodo.orbit=2;
      } 
      else{
        $scope.newTodo.orbit=3;
      }
    }
    angular.forEach($scope.orbits, function(orbit) {
      if($scope.newTodo.orbit==orbit.name) {
        var ttl= parseInt($scope.newTodo.ttl);
        var sum = parseInt(orbit.sum);
        orbit.sum=ttl+sum;
        orbit.tasks=orbit.tasks+1;
      }
    })
    //send the data to the json 
    $http.post('/todo.json', $scope.newTodo).success(function(data) {
      if (data.todo) {
        $scope.todos.push(data.todo);
        $scope.newTodo.description = '';
      } 
      else {
        alert(JSON.stringify(data));
      }
    });

    //redo the angles of planits
    $scope.setOrbitAngle();
  };

  //filter data by task.orbit 
  $scope.isOrbit = function(orbitId) {
    // take task and return the ones where the orbitID==task.orbit
    var orbitNumber= parseInt(orbitId);
    return function(todo) {
        return todo.orbit == orbitNumber;
    }
  }

  $scope.assignNewOrbits=function(orbit, other) {
    angular.forEach($scope.todos, function(todo){
      if(todo==other) {      
        todo.orbit=orbit.name;
        $scope.update(todo);
      }
      else {
      }
    });
  }


  $scope.reSort=function() {
    var potentialTasks=[];
    angular.forEach($scope.orbits, function(orbit){
      var nextOrbit= orbit.name+1;
      angular.forEach($scope.todos, function(todo){
        if(todo.orbit==nextOrbit && todo.ttl<orbit.remainder) {  
          console.log("orbit"+orbit.name+"has a remainder of "+orbit.remainder+","+"i could fill it with"+todo.title+","+todo.ttl);   
          potentialTasks.push(todo); 
        }
      });
      // instance of filter function in myFilter
      var myFilter=$filter('orderBy');
      //do the assingNewOrbits() as many times as there are potential tasks 
      var recur=potentialTasks.length;
      var other=myFilter(potentialTasks, 'due')[0];
      $scope.assignNewOrbits(orbit, other);
      $scope.calculateRemainder();
    }); 
  }

  $scope.calculateRemainder=function () {
    console.log('calculating remainder');
    angular.forEach($scope.orbits, function(orbit) {
      var remainder= 8;
      var sum=0;
      var totalTasks=$filter('filter') ($scope.todos,$scope.isOrbit(orbit.name));
      console.log(totalTasks.length);
      //iterate through todos and orbits and add up TTLs
      angular.forEach($scope.todos, function(todo){
        //console.log('the current task im looking at is '+todo.title+', and it has a ttl of '+todo.ttl);
        if(todo.orbit==orbit.name){ 
            sum= sum+todo.ttl;
          }
      })
      //set remainder as 8 minues sum of TTLs 
      remainder=remainder-sum;
      //remainder cannot be negative
      if(remainder<0) {
        orbit.remainder=0;
      }
      else{
        orbit.remainder=remainder;
      }
      orbit.sum=sum;
      orbit.tasks=totalTasks.length;
   })
  }

  $scope.setOrbitAngle=function() {
     angular.forEach($scope.orbits, function(orbit) {
      var tasksInOrbit= $filter('filter') ($scope.todos,$scope.isOrbit(orbit.name));
      var taskAngle=360/(tasksInOrbit.length);
      for (var i = tasksInOrbit.length - 1; i >= 0; i--) {
        tasksInOrbit[i].angle=taskAngle*i;
        $scope.update(tasksInOrbit[i]);
      };

      })

      
  }

}  

app.directive('task', function() {
  return {
    restrict:"E",
    scope:{
      title:"@",
      description:"@",
      due:"@",
      ttl:"@",
      orbit:"@"
    },
    template:"<div class='task'><h4 ng-click='toggleDetail()'>{{title}} <span class='badge pull-right'>{{orbit}}</span></h4>"+
            "<p ng-show='showDetail'>{{description}}</p></div>",
    link:function(scope, element, attrs) {
      scope.showDetail=false;
      scope.isTaskDone=false;
      scope.toggleDetail=function() {
        scope.showDetail=! scope.showDetail;
      }
      scope.toggleDone=function() {
        scope.isTaskDone=! scope.isTaskDone;
      }
    }
  }
})

app.directive('orbitsum', function() {
  return {
    restrict:"E",
    transclude:true,
    scope:{
      name:"@",
      orbitPos:"@",
      sum:"@",
      class:"@"
    },
    template:"<div class='orbitSumLabel {{orbitPos}}'><p>{{sum}}</p></div>",
    link:function(scope, element, attrs) {
      attrs.$observe('name', function(value) {
        attrs.$set('class', "orbit"+value);
      })
    }
  }
})

app.directive('planetRewrite', function() {
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
      fontSizeH4:"@"
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
                "<div ng-show='showTaskMenu'>"+
                  "<br />"+
                  "<button class='btn btn-danger' ng-click='todo.done=!todo.done; update(todo)'>"+
                    "Delete"+
                  "</button>"+
                "</div>"+
              "</div>",
    link:function(scope, element, attrs) {
      scope.showTaskMenu=false;
      scope.toggleTaskMenu=function() {
        scope.showTaskMenu=! scope.showTaskMenu;
      }

      function calculateOffset() {
        var canvasWidth=document.getElementById('singleOrbitCanvas').width;
        var offset=canvasWidth*.375;
        attrs.$set('offset', offset);
      }

      calculateOffset();

      window.addEventListener('resize', calculateOffset, false);
     
      //assign planet illustration based on time to completion (TTL)
      attrs.$observe('ttl', function(value) {
        //calculate size of various planits
        var canvas=document.getElementById('singleOrbitCanvas');
        var orbitSumRatio=canvas.width/8.15;
        var fontVerticalAlign=(canvas.width*0.0224);

        attrs.$set('ttlSize', canvas.width*.12);
        attrs.$set('ttlMargin', canvas.width*0.025);
        attrs.$set('fontSize', canvas.width*.05);
        attrs.$set('fontSizeH4', canvas.width*.035);

        if(value<2) {
         attrs.$set('size', 'smallPlanet');
         attrs.$set('show', 'yes');
         attrs.$set('planitHeight', orbitSumRatio*1.35);
         attrs.$set('planitWidth', orbitSumRatio*1.35);
         attrs.$set('planitMargin', orbitSumRatio*-0.675);

        }
        else if(value>=2 && value<4) {
          attrs.$set('size', 'mediumPlanet')
          attrs.$set('show', 'yes')
          attrs.$set('planitHeight', orbitSumRatio*1.75);
          attrs.$set('planitWidth', orbitSumRatio*1.75);
          attrs.$set('planitMargin', orbitSumRatio*-0.875);
        }
        else if(value>4) {
          attrs.$set('size', 'largePlanet')
          attrs.$set('show', 'yes')
          attrs.$set('planitHeight', orbitSumRatio*2.25);
          attrs.$set('planitWidth', orbitSumRatio*2.25);
          attrs.$set('planitMargin', orbitSumRatio*-1.125);
        }
        else {
          attrs.$set('size', 'noPlanet')
          attrs.$set('show', 'noShow')
        }
      })
      
    }
  }
})



