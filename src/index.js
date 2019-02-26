var numberArray = document.getElementsByClassName('num-bg');
var operatorArray = document.getElementsByClassName('btn-style opera-bg operator');
var result = document.getElementById('result');
var equal = document.getElementById('eqn-bg');
var clear = document.getElementById('delete');

addNumberEventListener(numberArray);
addOperatorEventListener(operatorArray);

equal.addEventListener('click', function(){
  var equation = result.innerHTML;
  equation = equation.toString();
  var solution = eval(equation);
  result.innerHTML = solution;
  
  console.log(result.innerHTML);
})

function addNumberEventListener(arr){
  for(var i = 0; i < arr.length; i++){
    arr[i].addEventListener('click', function(event){
      result.innerHTML += event.target.value;
      
      console.log(event.target.value);
    })
  }
}

function addOperatorEventListener(arr){
  for(var i = 0; i < arr.length; i++){
    arr[i].addEventListener('click', function(event){
      result.innerHTML += event.target.value;
      
      console.log(event.target.value);
    })
  }
}

clear.addEventListener('click', function(){
  result.innerHTML = '';
})
