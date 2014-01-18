angular.module('todo.controllers')
.controller('TodoListController', [
  '$scope',
  '$http',
  '$filter',
  function($scope, $http, $filter) {
  //show or hide add task form 
  $scope.showForm = true;
  $scope.todos = [];
  $scope.newTodo = {
    title: '',
    done : false,
    due : new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    description : '',
    orbit: '',
    ttl: '',
    angle: ''
  };

  $scope.orbits = [{name: 3, remainder: 0, sum: 0, tasks: 0}, {name: 2, remainder: 0, sum: 0, tasks: 0}, {name: 1, remainder: 0, sum: 0, tasks: 0}];
  $scope.selectedOrbit = $scope.orbits[0];
  $scope.doneFilter = { done : true };
  $scope.notDoneFilter = { done : false };

  $scope.setTodos = function (todos) {
    $scope.todos = todos;
    $scope.calculateRemainder();
    $scope.setOrbitAngle();
  };

  $scope.update = function (todo) {
    console.log('calling update');
    $http.put('/todo/' + todo._id + '.json', todo).success(function (data) {
      if (!data.todo) {
        alert(JSON.stringify(data));
      }
    });
  };

  $scope.updateList = function () {
    console.log('i am updating this list yall');
    $http.get('/todos.json').success(function (data) {
      $scope.todos = data.todos;
    });

    setInterval(function () {
      $scope.updateList();
      $scope.$apply();
    }, 30 * 60 * 1000); // update every 30 minutes;
  };

  $scope.updateList();

  $scope.areSameDate = function (d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
     d1.getMonth() === d2.getMonth() && 
     d1.getDate() === d2.getDate();
  };

  $scope.areSameWeek = function (today, d2) {
    //Get the date value of next week.
    var nextWeek = Date.parse(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7));
    var todayParsed = Date.parse(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
    var compareDate = Date.parse(new Date(d2.getFullYear(), d2.getMonth(), d2.getDate()));
    if (nextWeek > compareDate) {
      return true;
    }
    return false;
  };


  $scope.addNewTodo = function() {
    var today = new Date();
    //assign orbit based on the newtodo.due
    //if the task is due today, make the orbit 1
    if($scope.areSameDate(today, $scope.newTodo.due) === true) {
      $scope.newTodo.orbit = 1;
    } 
    else{
      if ($scope.areSameWeek(today, $scope.newTodo.due) === true){
        $scope.newTodo.orbit = 2;
      } 
      else{
        $scope.newTodo.orbit = 3;
      }
    }
    //console.log('my angle is now'+$scope.newTodo.angle); 
    angular.forEach($scope.orbits, function(orbit) {
      if($scope.newTodo.orbit==orbit.name) {
        var ttl= parseInt($scope.newTodo.ttl);
        var sum = parseInt(orbit.sum);
        orbit.sum=ttl+sum;
        orbit.tasks=orbit.tasks+1;
      }
    });
    //send the data to the json 
    $http.post('/todo.json', $scope.newTodo).success(function(data) {
      if (data.todo) {
        $scope.todos.push(data.todo);
        $scope.newTodo.description = '';
        //redo the angles of planits
        $scope.setOrbitAngle();
      } 
      else {
        alert(JSON.stringify(data));
      }
    });
    
  };

  //filter data by task.orbit 
  $scope.isOrbit = function(orbitId) {
    // take task and return the ones where the orbitID==task.orbit
    var orbitNumber= parseInt(orbitId);
    return function(todo) {
        return todo.orbit == orbitNumber;
    };
  };

  $scope.assignNewOrbits=function(orbit, other) {
    angular.forEach($scope.todos, function(todo){
      if(todo==other) {      
        todo.orbit=orbit.name;
        $scope.update(todo);
      }
      else {
      }
    });
  };


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
  };

  $scope.calculateRemainder=function () {
    console.log('calculating remainder');
    angular.forEach($scope.orbits, function(orbit) {
      var remainder= 8;
      var sum=0;
      var tasksNotDone=$filter('filter') ($scope.todos, $scope.notDoneFilter);
      var totalTasks= $filter('filter') (tasksNotDone,$scope.isOrbit(orbit.name));
      //iterate through todos and orbits and add up TTLs
      angular.forEach(tasksNotDone, function(todo){
        //console.log('the current task im looking at is '+todo.title+', and it has a ttl of '+todo.ttl);
        if(todo.orbit==orbit.name){ 
            sum= sum+todo.ttl;
          }
      });
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
   });
  };

  $scope.setOrbitAngle=function() {
    angular.forEach($scope.orbits, function(orbit) {
      console.log('setting orbit angle');
      var tasksNotDone=$filter('filter') ($scope.todos, $scope.notDoneFilter);
      var tasksInOrbit= $filter('filter') (tasksNotDone,$scope.isOrbit(orbit.name));
      var taskAngle=360/(tasksInOrbit.length);
      for (var i = tasksInOrbit.length - 1; i >= 0; i--) {
        tasksInOrbit[i].angle=taskAngle*i;
        $scope.update(tasksInOrbit[i]);
      }
    });   
  };

}]);

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
      };
      scope.toggleDone=function() {
        scope.isTaskDone=! scope.isTaskDone;
      };
    }
  };
});

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
      });
    }
  };
});
