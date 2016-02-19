'use strict'

// For educational purposes, we have put the entire angular app in one file.  Don't try this at home kids.
var app = angular.module('app', []);

app.controller('MainCtrl', function($scope) {
  $scope.items = [];

  //Creates an item object and adds it to the items array
  $scope.addItem = function() {
    var listItem = {
      todo:$scope.todo,
      completed: false
    }

    $scope.items.push(listItem);
    $scope.todo = "";
  }
})

app.directive('listItem', function() {
  return {
    restrict: "E",
    scope:{
      items: "=",
      item: "="
    },
    templateUrl: '/templates/listItem.html',
    link: function(scope){
      scope.complete = function(){
        scope.item.completed = !scope.item.completed;
      }
      scope.button = function(){
        if(!scope.item.completed) return "Complete it!"
        return "Put it back"
      }
      scope.remove = function(){
        utilsModule.remove(scope.items, scope.item);
      }
    }
  }
})


//This module contains some helpful methods
var utilsModule = {
  remove: function (array, item) {
    var index = array.indexOf(item);
    if (index === -1) return;
    return array.splice(index, 1);
  }

};

