var numbers = document.getElementsByClassName('num');
var operatorButtons = document.getElementsByClassName('btn-style operator');
var result = document.getElementById('result');
var equal = document.getElementById('eqn-bg');
var clear = document.getElementById('delete');
var operators = ['+', '-', '*', '/', '.'];
var operations = ['+', '-', '*', '/']
var canDecimal = true;
var canOperator = false;
var newValues = [];
var posNeg = document.getElementById('pos-neg');
var currNumber = '';
var currOperator = '';

// buttons
// numbers
addNumberEventListener(numbers);
function addNumberEventListener(arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].addEventListener('click', function (event) {
      handleNumber(event.target.value);
    })
  }
}

function handleNumber(num) {
  addToResult(num);
  canOperator = true;
  storeValues(num);
}

// operators
addOperatorEventListener(operatorButtons);
function addOperatorEventListener(arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].addEventListener('click', function (event) {
      handleOperator(event.target.value);

      // console.log(event.target.value);
    })
  }
}

// equals
equal.addEventListener('click', handleEqual);

// add event listener to keys
window.addEventListener('keyup', function (event) {
  var num = parseInt(event.key);
  var oper = event.key;
  // equals
  if (event.keyCode === 13) {
    handleEqual();
    // canDecimal = true;
  }
  // numbers
  else if (!Number.isNaN(num)) {
    handleNumber(num);
  }
  // operators
  else if (operators.includes(oper)) {
    handleOperator(oper);
  }
});

// in case of operators being used twice in a row, replaces old operator with new
function replaceLast(value) {
  var resultArray = result.innerHTML.split('');
  resultArray[resultArray.length - 1] = value;
  // newValues[newValues.length - 1] = value;
  currOperator = value;
  replacedStr = resultArray.join('');
  result.innerHTML = replacedStr;
}

// evaluate string input in result window
function handleEqual() {
  var equation = result.innerHTML;
  equation = equation.toString();
  var solution = eval(equation);
  result.innerHTML = solution;
  newValues = [solution];
  currNumber = '';
  if (result.innerHTML.includes('.')) {
    canDecimal = false;
  }
  else { canDecimal = true; }
  // console.log(result.innerHTML);
}


function handleOperator(oper) {
  console.log(oper);
  if (oper === '.' && canDecimal === true) {
    addToResult(oper);
    canDecimal = false;
    storeValues(oper);
  }
  else if (oper === '.' && canDecimal === false) {
    return;
  }
  else if (oper === '+' || oper === '-' || oper === '*' || oper === '/') {
    if (canOperator) {
      // console.log('addToResult');
      addToResult(oper);
      canDecimal = true;
      canOperator = false;
      storeValues(oper);
    } else {
      // console.log('replaceLast');
      replaceLast(oper);
      canDecimal = true;
    }
  }

}

// display input in result window
function addToResult(value) {
  result.innerHTML += value;
}

// clear button
clear.addEventListener('click', function () {
  result.innerHTML = '';
  newValues = [];
  canDecimal = true;
  currNumber = '';
  currOperator = '';
})

window.addEventListener('keydown', function (event) {
  event.preventDefault();
});

posNeg.addEventListener('click', function () {

});


function storeValues(digit) {

  if (operations.includes(digit)) {
    currOperator = digit;
    if (currNumber === '') {
      return;
    }
    else {
      newValues.push(currNumber)
    }
    currNumber = '';

  }
  else if (!Number.isNaN(digit)) {
    digit = digit.toString();
    currNumber += digit;
    if (currOperator === '') {
      return;
    }
    else {
      newValues.push(currOperator)
    }
    currOperator = '';
  }
  else if (digit === '.') {
    currNumber += digit;
    if (currOperator === '') {
      return;
    }
    else {
      newValues.push(currOperator)
    }
    currOperator = '';

  }
console.log(newValues);
}










// function init(){
//   var numbers = document.getElementsByClassName('num');
//   var operatorButtons = document.getElementsByClassName('btn-style operator');
//   var result = document.getElementById('result');
//   var equal = document.getElementById('eqn-bg');
//   var clear = document.getElementById('delete');
//   var posNeg = document.getElementById('pos-neg');
//   var main = document.getElementById('main');

//   addNumberEventListener(numbers, result);
//   addOperatorEventListener(operatorArray, result);
//   // addEqualEventListener
// }
// if(document.getElementById('main')){
//   init();
// }

// var operators = ['+', '-', '*', '/', '.'];
// var operations = ['+', '-', '*', '/']
// var canDecimal = true;
// var canOperator = false;
// var newValues = [];


// // main.addEventListener('click', function(event) {
// //   console.log(event)
// // })
// // buttons
// // numbers

// function addNumberEventListener(numbers, screen) {
//   for (var i = 0; i < numbers.length; i++) {
//     numbers[i].addEventListener('click', function (event) {
//       handleNumber(event.target.value, screen);
//     });
//   }
// }

// function handleNumber(num, screen){
//   addToResult(num, screen);
//   canOperator = true;
// }

// // operators

// function addOperatorEventListener(arr, screen) {
//   for (var i = 0; i < arr.length; i++) {
//     arr[i].addEventListener('click', function (event) {
//       handleOperator(event.target.value, screen);

//       // console.log(event.target.value);
//     })
//   }
// }

// equals
// equal.addEventListener('click', handleEqual);

// // add event listener to keys
// document.addEventListener('keyup', function (event) {
//   var num = parseInt(event.key);
//   var oper = event.key;
//   // equals
//   if (event.keyCode === 13) {
//     onEnterPress();
//     // canDecimal = true;
//   }
//   // numbers
//   else if (!Number.isNaN(num)) {
//     handleNumber(num, screen);
//     canOperator = true;
//     console.log(num);
//   }
//   // operators
//   else if (operators.includes(oper, screen)) {
//     checkNaN(oper, screen);
//   }
// });

// // in case of operators being used twice in a row, replaces old operator with new
// function replaceLast(value, screen) {
//   var resultArray = screen.innerHTML.split('');
//   resultArray[resultArray.length - 1] = value;
//   topBarArray[topBarArray.length - 1] = value;
//   replacedStr = resultArray.join('');
//   screen.innerHTML = replacedStr;
// }

// // evaluate string input in result window
// function onEnterPress() {
//   var equation = result.innerHTML;
//   equation = equation.toString();
//   var solution = eval(equation);
//   result.innerHTML = solution;
//   topBarArray =[solution];
//   if (result.innerHTML.includes('.')) {
//     canDecimal = false;
//   }
//   else { canDecimal = true; }
//   // console.log(result.innerHTML);
// }

// // to prevent operators and decimal from being input invalidly
// function checkNaN(oper, screen) {
//   console.log(oper);
//   if (oper === '.' && canDecimal === true) {
//     addToResult(oper, screen);
//     canDecimal = false;
//   }
//   else if (oper === '.' && canDecimal === false) {
//     return;
//   }
//   else if (oper === '+' || oper === '-' || oper === '*' || oper === '/') {
//     if (canOperator) {
//       console.log('addToResult');
//       addToResult(oper, screen);
//       canDecimal = true;
//       canOperator = false;
//     } else {
//       console.log('replaceLast');
//       replaceLast(oper, screen);
//       canDecimal = true;
//     }
//   }
// }

// // // display input in result window
// function addToResult(value, screen) {
//   topBarArray.push(value);
//   screen.innerHTML += value;
// }

// clear button
// clear.addEventListener('click', function () {
//   result.innerHTML = '';
//   topBarArray = [];
// })

// window.addEventListener('keydown', function (event) {
//   event.preventDefault();
// });

// posNeg.addEventListener('click', function(){
//   var last = findLastNumber();
//   last = eval(-last);
//   topBarArray.splice(topBarArray.length - findLastNumber().length);
//   last = last + '';
//   for(var i = 0; i < last.length; i++){
//     topBarArray.push(last[i]);
//   }
//   result.innerHTML = topBarArray.join('');
// });

// function findLastNumber(){
//   var num = '';
//   for(var i = topBarArray.length - 1; i >= 0; i--){
//     var current = topBarArray[i];
//     if(operations.includes(current)){
//       break
//     }
//     else{num = (current + '') + num}
//   }
//   return num
// }