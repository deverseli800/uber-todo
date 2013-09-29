var app= angular.module('TodoModule', ['ui.bootstrap']);

function TodoListController($scope, $http) {
  $scope.bling=function(todo) {
    todo.done=! todo.done;
    $scope.update(todo);
    todo.title="bob";
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
  };

  $scope.update = function(todo) {
    console.log('calling update');
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
      if($scope.areSameDate($scope.newTodo.due, today)==true) {
        $scope.newTodo.orbit=1;
      }
      else{
        //iftask is due this week, make orbit 2
        if($scope.areSameWeek($scope.newTodo.due, today)==true) {
          $scope.newTodo.orbit=2;
        }
        else {
          //if task is due after this week, put it in orbit 3
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
  };

  //filter data by task.orbit 
  $scope.isOrbit = function(orbitId) {
      // take task and return the ones where the orbitID==task.orbit
        return function(todo) {
            return todo.orbit == orbitId;
        }
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


app.directive('planet', function() {
  return {
    restrict:"A",
    scope:{
      title:"@",
      description:"@",
      due:"@",
      ttl:"@",
      orbit:"@",
      size:"@",
      done:"@"
    },
    template:"<div class='taskWrapper {{show}}' style='height:{{83+ttl*25}}px; margin-top:{{-10-12.5*ttl}}px;'><div class='taskPlanet {{size}}' style='width:{{50+25*ttl}}px; height:{{50+25*ttl}}px;'><div class='taskTTL'><h3>{{ttl}}</h3></div></div><div class='taskTitle'><h4 class='lead'>{{title}}</h4></div><div ng-show='showTaskMenu'><br /><button class='btn btn-danger'>Delete</button></div></div>",
    link:function(scope, element, attrs) {
      scope.showTaskMenu=false;
      scope.toggleTaskMenu=function() {
        scope.showTaskMenu=! scope.showTaskMenu;
        //element.css({'opacity':'0.5'});

      }
      attrs.$observe('ttl', function(value) {
        
        if(value<4) {
         attrs.$set('size', 'smallPlanet')
         attrs.$set('show', 'yes')
        }
        else if(value>=4) {
          attrs.$set('size', 'mediumPlanet')
          attrs.$set('show', 'yes')
        }
        else if(value>6) {
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


app.directive('planetRewrite', function() {
  return {
    restrict:"A",
    scope:{
      ttl:"@",
      size:"@",
      update:"&",
    },
    template:"<div class='taskWrapper {{show}} {{orbit}}' style='height:{{83+ttl*25}}px; margin-top:{{-10-12.5*tl}}px;'>{{todo.done}}<input type='checkbox' ng-model='todo.done', ng-change='update()' ><div class='taskPlanet {{size}}' style='width:{{50+25*ttl}}px; height:{{50+25*ttl}}px;'><div class='taskTTL'><h3>{{ttl}}</h3></div></div><div class='taskTitle'><h4 class='lead'>{{todo.title}}</h4></div><div ng-show='showTaskMenu'><br /><button class='btn btn-danger'>Delete</button></div></div>",
    link:function(scope, element, attrs) {
      scope.showTaskMenu=false;
      scope.toggleTaskMenu=function() {
        scope.showTaskMenu=! scope.showTaskMenu;
        //element.css({'opacity':'0.5'});

      }

      //assign planet illustration based on time to completion (TTL)
      attrs.$observe('ttl', function(value) {
        
        if(value<4) {
         attrs.$set('size', 'smallPlanet')
         attrs.$set('show', 'yes')
        }
        else if(value>=4) {
          attrs.$set('size', 'mediumPlanet')
          attrs.$set('show', 'yes')
        }
        else if(value>6) {
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

app.directive('sortOrbit', function() {
  return {
    link:function (scope, element, attrs) {
         scope.sum=0;
         scope.remainder=0;
         
         angular.forEach(scope.todos, function(todo) {
           if(todo.orbit==scope.orbit.name) {
            scope.sum=scope.sum+parseInt(todo.ttl);
           }              
         })

         if(scope.sum<8) {
            scope.remainder=8-scope.sum;
            angular.forEach(scope.todos, function(todo) {
                //console.log("my current orbit is"+scope.orbit+"my remainder is"+scope.remainder+","+"now i'm going up to"+parseInt(scope.orbit+1)+"and the ttls here are"+todo.ttl);
                if(todo.orbit==(scope.orbit.name+1)) {
                  if(todo.ttl==scope.remainder){
                    //alert('current orbit'+scope.orbit.orbit+todo.title+todo.orbit);    
                  }
                  else{
                    console.log('my orbit is'+todo.orbit+'im coming up from'+scope.orbit.name+"my ttl is "+todo.ttl);
                  }  
                }

            })
          }

        }
  }
})

