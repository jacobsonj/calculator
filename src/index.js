var numberArray = document.getElementsByClassName('num');
var operatorArray = document.getElementsByClassName('btn-style operator');
var result = document.getElementById('result');
var equal = document.getElementById('eqn-bg');
var clear = document.getElementById('delete');
var operators = ['+', '-', '*', '/', '.'];
var canDecimal = true;
var canOperator = false;

// buttons
// numbers
addNumberEventListener(numberArray);
function addNumberEventListener(arr){
  for(var i = 0; i < arr.length; i++){
    arr[i].addEventListener('click', function(event){
      addToResult(event.target.value);
      canOperator = true;
    })
  }
}

// operators
addOperatorEventListener(operatorArray);
function addOperatorEventListener(arr){
  for(var i = 0; i < arr.length; i++){
    arr[i].addEventListener('click', function(event){
      checkNaN(event.target.value);
      
      // console.log(event.target.value);
    })
  }
}

// equals
equal.addEventListener('click', onEnterPress);

// add event listener to keys
window.addEventListener('keyup', function(event){
  var num = parseInt(event.key);
  var oper = event.key;
  // equals
  if(event.keyCode === 13){
    onEnterPress(); 
    // canDecimal = true;
  }
  // numbers
  else if(!Number.isNaN(num)){
    addToResult(num);
    canOperator = true;
  }
  // operators
  else if(operators.includes(oper)){
    checkNaN(oper);
  }
});

// in case of operators being used twice in a row, replaces old operator with new
function replaceLast(value){
  var resultArray = result.innerHTML.split('');
  resultArray[resultArray.length-1] = value;
  replacedStr = resultArray.join('');
  result.innerHTML = replacedStr; 
}

// evaluate string input in result window
function onEnterPress(){
  var equation = result.innerHTML;
  equation = equation.toString();
  var solution = eval(equation);
  result.innerHTML = solution;
  if(result.innerHTML.includes('.')){
    canDecimal = false;
  }
  else{canDecimal = true;}
  // console.log(result.innerHTML);
}

// to prevent operators and decimal from being input invalidly
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

// display input in result window
function addToResult(value){
  result.innerHTML += value;
}

// clear button
clear.addEventListener('click', function(){
  result.innerHTML = '';
})

window.addEventListener('keydown', function(event){
  event.preventDefault();
});