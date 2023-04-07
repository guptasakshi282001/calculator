let input = document.getElementById('display-input');



function addToDisplay(value) {
  let lastChar = input.value.slice(-1);

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
  
  // Check if decimal comes after an operator
  if (value === '.' && (lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/')) {
    return;
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

function clearDisplay() {
  input.value = '';
}

function calculate() {
  let equation = input.value;

  // Check if an operator comes in the beginning
  if (equation[0] == '+' || equation[0] == '-' || equation[0] == '*' || equation[0] == '/') {
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

  // Evaluate expression using the Function constructor and set the result as the value of the text box
  input.value = new Function('return ' + equation)();
}

function removeLast() {
  input.value = input.value.slice(0, -1);
}
