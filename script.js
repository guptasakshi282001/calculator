let input = document.getElementById('display-input');


// HERE IS THE ADDTODISPLAY FUNCTION 
function addToDisplay(value) {
  let lastChar = input.value.slice(-1);

  if (input.value === 'Infinite' && !isNaN(value) ) {
    return;
  }

  // Check if operator comes after the result is "Infinity"
  if (input.value === 'Infinite' && (value === '+' || value === '-' || value === '*' || value === '/' || value === ".")) {
    return;
  }

  // Check if only subtraction sign is allowed at the beginning
  if (value === '-' && input.value === '') {
    input.value += '-';
    return;
  }

  // Check if decimal comes more than once in a number
  if (value === '.' && (input.value.slice(-2) === '..' || input.value.slice(-3) === '...')) {
    return;
  }

  // Check if decimal comes in the beginning of the expression
  if (value === '.' && (input.value === '' || input.value === '*' || input.value === '/' || lastChar === '(')) {
    input.value += '0';
  }

  // Check if decimal comes before any operator
  if ((value === '+' || value === '-' || value === '*' || value === '/') && (lastChar === '.')) {
    return;
  }
  
  // Check if decimal comes after an operator or a closing parenthesis
  if (value === '.' && (lastChar === ')' || lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/')) {
    input.value += '0.';
  }

  // Check if operator comes between operands
  if ((value === '+' || value === '-' || value === '*' || value === '/') && (lastChar !== '' && lastChar !== '+' && lastChar !== '-' && lastChar !== '*' && lastChar !== '/' && lastChar !== '(')) {
    input.value += value;
  }
  else if (value !== '+' && value !== '-' && value !== '*' && value !== '/') {
    if (value === '.' && (lastChar === '.' || lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/')) {
      return; // Prevent adding decimal point after an operator or another decimal point
    }

    if (lastChar === '0' && input.value.length === 1) {
      // Remove the leading zero if the previous input was zero
      input.value = input.value.slice(0, -1);
    }

    if (value === '.') {
      // Check if decimal point is already present in the current number
      let lastNumber = input.value.split(/[+\-*/()]/).pop();
      if (lastNumber.includes('.')) {
        return;
      }
    }
    input.value += value;
  }
}


//HERE IS CLEARDISPLAY FUNCTION 
function clearDisplay() {
  input.value = '';
}


//HERE IS THE CALCULATE FUNCTION
function calculate() {
  let equation = input.value;

 // Check for division by zero
  if (equation.includes('/0')) {
    input.value = 'Infinite';
    return;
  }

  // Check if an operator comes in the beginning
  if (equation[0] == '+' || equation[0] == '*' || equation[0] == '/') {
    input.value = '';
    return;
  }
  
  // Check if decimal comes more than once in a number
  let decimalCount = 0;
  for (let i = 0; i < equation.length; i++) {
    if (equation[i] === '.') {
      decimalCount++;
    }
    if ((equation[i] === '+' || equation[i] === '-' || equation[i] === '*' || equation[i] === '/') && decimalCount > 1) {
      input.value = '';
      return;
    }
    if (equation[i] === '+' || equation[i] === '-' || equation[i] === '*' || equation[i] === '/') {
      decimalCount = 0;
    }
  }

  // Check if an operator comes between the operands
  let operatorCount = 0;
  for (let i = 0; i < equation.length; i++) {
    if (equation[i] === '+' || equation[i] === '-' || equation[i] === '*' || equation[i] === '/') {
      operatorCount++;
    }
    else {
      operatorCount = 0;
    }
    if (operatorCount > 1) {
      input.value = '';
      return;
    }
  }

  // Check if the last character is an operator
  let lastChar = equation.slice(-1);
  if (lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/') {
    equation = equation.slice(0, -1);
  }

  // If the first character is '-' and the equation is "-1+2", evaluate and return "1"
  if (equation[0] === '-' && equation[1] !== undefined && !isNaN(equation[1])) {
    let result = eval('0' + equation);
    input.value = result;
    return;
  }

  // Evaluate expression using the eval() function and set the result as the value of the text box
  let result = eval(equation);


  // Check for decimal points after any operator
  if (result % 1 !== 0) {
    input.value = result.toFixed(2);
  } else {
    input.value = result;
  }
}



//HERE IS REMOVELAST FUNCTION
function removeLast() {
  input.value = input.value.slice(0, -1);
}
