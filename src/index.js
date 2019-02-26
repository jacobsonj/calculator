var numberArray = document.getElementsByClassName('num-bg');
var operatorArray = document.getElementsByClassName('btn-style opera-bg operator');
var result = document.getElementById('result');
var equal = document.getElementById('eqn-bg');
var clear = document.getElementById('delete');
var operators = ['+', '-', '*', '/', '.'];


addNumberEventListener(numberArray);
addOperatorEventListener(operatorArray);

function flagged(){
  var testResult = result.innerHTML.split('');
  if(operators.includes(testResult[testResult.length-1])){
    return true;
  }
}

// to make equals sign work
function onEnterPress(){
  var equation = result.innerHTML;
  equation = equation.toString();
  var solution = eval(equation);
  result.innerHTML = solution;
  
  // console.log(result.innerHTML);
}
equal.addEventListener('click', onEnterPress);

// to make keyboard work
window.addEventListener('keyup', function(event){
  var num = parseInt(event.key);
  var oper = event.key;
  if(event.keyCode === 13){
    if(flagged() === true){
      alert('dont work');
    }
    onEnterPress(); 
  }
  else if(!Number.isNaN(num)){
    
    onNumberPress(num);
  }
  else if(operators.includes(oper)){
    if(flagged() === true){
      alert('dont work');
    }
    onOperatorPress(oper);
  }
  // console.log(event);
})

window.addEventListener('keydown', function(event){
  event.preventDefault();
});

function onNumberPress(value){
  result.innerHTML += value;
  
  // console.log(value);
}

function addNumberEventListener(arr){
  for(var i = 0; i < arr.length; i++){
    arr[i].addEventListener('click', function(event){
      onNumberPress(event.target.value);
    })
  }
}

function onOperatorPress(value){
  result.innerHTML += value;
}

function addOperatorEventListener(arr){
  for(var i = 0; i < arr.length; i++){
    arr[i].addEventListener('click', function(event){
      onOperatorPress(event.target.value);
      
      // console.log(event.target.value);
    })
  }
}

clear.addEventListener('click', function(){
  result.innerHTML = '';
})
