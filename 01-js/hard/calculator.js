/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
*/

class Calculator {
  constructor() {
    this.result = 0;
    this.allowedChars = '1234567890.+-*/()'
    this.operators = ['+', '-', '*', '/'];
    this.currentPosition = 0;
  }

  add(num) {
    this.result += num;
  }

  subtract(num) {
    this.result -= num;
  }

  multiply(num) {
    this.result *= num;
  }

  divide(num) {
    if (num == 0) {
      throw new Error('Division by zero is not allowed');
    }
    this.result /= num;
  }

  clear() {
    this.result = 0;
  }

  getResult() {
    return this.result;
  }

  isExpressionValid(expression) {
    var isValid = true;

    for (var char of expression) {
      if (!this.allowedChars.includes(char)) {
        isValid = false
      }
    }

    return isValid;
  }

  cleanExpression(expression) {
    return expression.replace(/\s/g, '').trim();
  }

  calculate(expression) {
    // Removes whitespace
    expression = this.cleanExpression(expression);

    if (!this.isExpressionValid(expression)) {
      throw new Error('Unexpected character when parsing expression');
    }

    const expressionTree = this.parseExpression(expression);

    this.result = this.solve(expressionTree);

    return this.result;
  }

  parseExpression(expression) {
    // Parse the expression into a tree
    this.currentPosition = 0;
    const result = this.parseAdditionSubtraction(expression);
    if (this.currentPosition !== expression.length) {
      throw new Error('Unexpected character at the end of expression');
    }
    return result;
  }

  parseAdditionSubtraction(expression) {
    let left = this.parseMultiplicationDivision(expression);
    while (this.currentPosition < expression.length) {
      const operator = expression[this.currentPosition];
      if (operator === '+' || operator === '-') {
        this.currentPosition++;
        const right = this.parseMultiplicationDivision(expression);
        left = { type: operator, left, right };
      } else {
        break;
      }
    }
    return left;
  }

  parseMultiplicationDivision(expression) {
    let left = this.parsePrimary(expression);
    while (this.currentPosition < expression.length) {
      const operator = expression[this.currentPosition];
      if (operator === '*' || operator === '/') {
        this.currentPosition++;
        const right = this.parsePrimary(expression);
        left = { type: operator, left, right };
      } else {
        break;
      }
    }
    return left;
  }

  parsePrimary(expression) {
    const char = expression[this.currentPosition];
    if (char === '(') {
      this.currentPosition++;
      const result = this.parseAdditionSubtraction(expression);
      if (expression[this.currentPosition] !== ')') {
        throw new Error('Expected closing parenthesis');
      }
      this.currentPosition++;
      return result;
    } else if (/\d/.test(char) || char === '.') {
      let num = '';
      while (this.currentPosition < expression.length && (/\d/.test(expression[this.currentPosition]) || expression[this.currentPosition] === '.')) {
        num += expression[this.currentPosition];
        this.currentPosition++;
      }
      return { type: 'number', value: parseFloat(num) };
    } else {
      throw new Error('Unexpected character in expression');
    }
  }

  solve(root) {
    if (root.type == 'number') {
      return root.value;
    }

    if (root.type == '+') {
      return this.solve(root.left) + this.solve(root.right);
    } else if (root.type == '-') {
      return this.solve(root.left) - this.solve(root.right);
    } else if (root.type == '*') {
      return this.solve(root.left) * this.solve(root.right);
    } else {
      var left = this.solve(root.left);
      var right = this.solve(root.right);
      if (right == 0) {
        throw new Error('Division by zero is not allowed');
      }
      return left / right;
    }
  }
}

module.exports = Calculator;
