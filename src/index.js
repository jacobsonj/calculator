var numbers = document.getElementsByClassName('num');
var operatorButtons = document.getElementsByClassName('btn-style operator');
var period = document.querySelector('.btn-style.operator.period');
var result = document.getElementById('result');
var equal = document.getElementById('eqn-bg');
var clear = document.getElementById('delete');
var operators = ['+', '-', '*', '/', '.'];
var operations = ['+', '-', '*', '/']
var canDecimal = true;
var canOperator = false;
var newValues = [];
var posNeg = document.getElementById('pos-neg');
var currNumber = null;
var currOperator = null;
var equalWasLastPressed = false;

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
  if(equalWasLastPressed){
    clearResult();
  }
  addToResult(num);
  canOperator = true;
  storeValues(num);
  equalWasLastPressed = false;
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

period.addEventListener('click', handleDeicmal);

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
  else if (operations.includes(oper)) {
    handleOperator(oper);
  }
  else if(oper === '.'){
    handleDeicmal();
  }
});

function replacePeriodWithZero(arr){
  for(var i in arr){
    if(arr[i] === '.'){
      arr[i] = '0';
    }
  }
  return arr;
}

// evaluate string input in result window
function handleEqual() {
  equalWasLastPressed = true;
  if(currNumber === null && newValues.length < 1){
    currNumber = '0';
  }
  newValues.push(currNumber);
  
  newValues = replacePeriodWithZero(newValues);
  equation = newValues.join('');
  // equation = newValues.toString();
  var solution = eval(equation.replace('--', '- -'));
  result.innerHTML = solution;
  newValues = [];
  currNumber = solution;
  if (result.innerHTML.includes('.')) {
    canDecimal = false;
  }
  else { canDecimal = true; }
  // console.log(result.innerHTML);
}

function handleDeicmal(){
  equalWasLastPressed = false;
  if(currNumber !== null && currNumber.indexOf('.') > -1){
    return;
  }
  else{
    storeDecimal();
  }
  canOperator = true;
  renderResult();
}

function handleOperator(oper) {
  equalWasLastPressed = false;
  if (operations.includes(oper)) {
    if (canOperator) {
      // console.log('addToResult');
      addToResult(oper);
      canOperator = false;
      storeCurrentOperator(oper);
    } else {
      storeCurrentOperator(oper);
      renderResult();
    }
  }
}

// display input in result window
function addToResult(value) {
  result.innerHTML += value;
}

function renderResult(){
  var finalValue = '';
  if(currNumber !== null && currOperator !== null){
    finalValue = newValues.join('') + currOperator + currNumber;
  }
  else if(currNumber !== null){
    finalValue = newValues.join('') + currNumber;
  }
  else{
    finalValue = newValues.join('') + currOperator;
  }
  result.innerHTML = finalValue;
}

function clearResult () {
  result.innerHTML = '';
  newValues = [];
  canOperator = false;
  canDecimal = true;
  currNumber = null;
  currOperator = null;
  equalWasLastPressed = false;
}

// clear button
clear.addEventListener('click', clearResult);

window.addEventListener('keydown', function (event) {
  event.preventDefault();
});

posNeg.addEventListener('click', function () {
  if(currNumber === null){
    return;
  }
  else if(currNumber.indexOf('-') > -1){
    currNumber = currNumber.replace('-', '');
  }
  else{
    currNumber = '-' + currNumber;
  }
  renderResult();
});

function storeCurrentOperator(oper) {
  currOperator = oper;
  if (currNumber === null) {
    return;
  }
  else {
    newValues.push(currNumber)
  }
  currNumber = null;
}

function storeCurrentNumber(number) {
  if (currNumber === null) {
    number = number.toString();
    currNumber = number;
  }
  else {
    number = number.toString();
    currNumber += number;
  }

    if (currOperator === null) {
    return;
  }
  else {
    newValues.push(currOperator)
  }
  currOperator = null;
}

function storeDecimal() {
  if(currNumber === null){
    currNumber = '.';
  }
  else{
    currNumber += '.';
  }
  if (currOperator !== null) {
    newValues.push(currOperator);
  }
  currOperator = null;
}

function storeValues(digit) {
  if (operations.includes(digit)) {
    storeCurrentOperator(digit);
  }
  else if (!Number.isNaN(digit)) {
    storeCurrentNumber(digit);
  }
  else if (digit === '.') {
    storeDecimal();
  }
  console.log(newValues);
}