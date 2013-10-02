var app= angular.module('TodoModule', ['ui.bootstrap']);

function TodoListController($scope, $http, $filter) {

  $scope.finishTask=function(todo) {
    todo.done=! todo.done;
    todo.title="Learn to Code";
    $scope.update(todo);
    console.log(todo)
  }

  $scope.todos = [];
  $scope.newTodo = {
    title: '',
    done : false,
    due : new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    description : '',
    orbit: '',
    ttl:''
  };
  $scope.orbits=[{name:5, remainder:0},{name:4, remainder:0},{name:3, remainder:0},{name:2, remainder:0},{name:1, remainder:0}];

  $scope.doneFilter = { done : true };
  $scope.notDoneFilter = { done : false };

  $scope.setTodos = function(todos) {
    $scope.todos = todos;
    $scope.calculateRemainder();
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

  setInterval(function() {
    $scope.updateList();
    $scope.$apply();
  }, 30 * 60 * 1000); // update every 30 minutes;

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
        return false;
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

      //update remainders 
      $scope.calculateRemainder();
  };

  //filter data by task.orbit 
  $scope.isOrbit = function(orbitId) {
      // take task and return the ones where the orbitID==task.orbit
        return function(todo) {
            return todo.orbit == orbitId;
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
         angular.forEach($scope.orbits, function(orbit) {
            var remainder= 8;
            var sum=0;
            //iterate through todos and orbits and add up TTLs
            angular.forEach($scope.todos, function(todo){
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
    template:"<div class='task'><h4 ng-click='toggleDetail()'>{{title}} <span class='badge pull-right'>{{orbit}}</span></h4><p ng-show='showDetail'>{{description}} {{ttl}} {{due}}</p></div>",
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


app.directive('planetRewrite', function() {
  return {
    restrict:"A",
    scope:{
      ttl:"@",
      size:"@",
      update:"&",
      title:"@"
    },
    template:"<div class='taskWrapper {{show}} {{orbit}}' style='height:{{83+ttl*25}}px; margin-top:{{-10-12.5*tl}}px;'>{{todo.done}}<input type='checkbox' ng-model='todo.done', ng-change='update()' ><div class='taskPlanet {{size}}' style='width:{{50+25*ttl}}px; height:{{50+25*ttl}}px;'><div class='taskTTL'><h3>{{ttl}}</h3></div></div><div class='taskTitle'>{{todo.title}}<h4 class='lead'>{{title}}</h4></div><div ng-show='showTaskMenu'><br /><button class='btn btn-danger'>Delete</button></div></div>",
    link:function(scope, element, attrs) {
      scope.showTaskMenu=false;
      scope.toggleTaskMenu=function() {
        scope.showTaskMenu=! scope.showTaskMenu;
        //element.css({'opacity':'0.5'});

      }

      //assign planet illustration based on time to completion (TTL)
      attrs.$observe('ttl', function(value) {
        
        if(value<2) {
         attrs.$set('size', 'smallPlanet')
         attrs.$set('show', 'yes')
        }
        else if(value>=2 && value<4) {
          attrs.$set('size', 'mediumPlanet')
          attrs.$set('show', 'yes')
        }
        else if(value>4) {
          attrs.$set('size', 'largePlanet')
          attrs.$set('show', 'yes')
        }
        else {
          attrs.$set('size', 'noPlanet')
          attrs.$set('show', 'noShow')
        }

      })
      
    }
  }
})



