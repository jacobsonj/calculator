var numberArray = document.getElementsByClassName('num');
var operatorArray = document.getElementsByClassName('btn-style operator');
var result = document.getElementById('result');
var equal = document.getElementById('eqn-bg');
var clear = document.getElementById('delete');
var operators = ['+', '-', '*', '/', '.'];


addNumberEventListener(numberArray);
addOperatorEventListener(operatorArray);

var canDecimal = true;
var canOperator = false;

function replaceLast(value){
  var resultArray = result.innerHTML.split('');
  resultArray[resultArray.length-1] = value;
  replacedStr = resultArray.join('');
  result.innerHTML = replacedStr; 
}

// to make equals sign work
function onEnterPress(){
  var equation = result.innerHTML;
  equation = equation.toString();
  var solution = eval(equation);
  result.innerHTML = solution;
  canDecimal = true;
  // console.log(result.innerHTML);
}

equal.addEventListener('click', onEnterPress);

// to make keyboard work
window.addEventListener('keyup', function(event){
  var num = parseInt(event.key);
  var oper = event.key;
  if(event.keyCode === 13){
    onEnterPress(); 
    // canDecimal = true;
  }
  else if(!Number.isNaN(num)){
    addToResult(num);
    canOperator = true;
  }
  else if(operators.includes(oper)){
    checkNaN(oper);
  }
  // console.log(event);
})

function checkNaN(oper){
  console.log(oper);
  if(oper === '.' && canDecimal === true){
    addToResult(oper);
    canDecimal = false;
  }
    else if(oper === '.' && canDecimal === false){
      return;
    }
    else if(oper === '+' || oper === '-' || oper === '*' || oper === '/'){
      if(canOperator){console.log('addToResult');
      addToResult(oper);
      canDecimal = true;
      canOperator = false;
    } else{
        console.log('replaceLast');
      replaceLast(oper);
      canDecimal = true;
      }
    }
}

window.addEventListener('keydown', function(event){
  event.preventDefault();
});

function addToResult(value){
  result.innerHTML += value;
  
  // console.log(value);
}

function addNumberEventListener(arr){
  for(var i = 0; i < arr.length; i++){
    arr[i].addEventListener('click', function(event){
      addToResult(event.target.value);
      canOperator = true;
    })
  }
}

function addOperatorEventListener(arr){
  for(var i = 0; i < arr.length; i++){
    arr[i].addEventListener('click', function(event){
      checkNaN(event.target.value);
      
      // console.log(event.target.value);
    })
  }
}

clear.addEventListener('click', function(){
  result.innerHTML = '';
})
