function evaluate(expression) {
  let op = [];
  let value = [];
  let tokens = expression.split("");
  for (let i = 0; i < tokens.length; i++) {
    // for number
    if ((tokens[i] >= "0" && tokens[i] <= "9") || tokens[i] == ".") {
      let subStr = "";
      // condition of number has more than 1 digit
      while (
        (i < tokens.length && tokens[i] >= "0" && tokens[i] <= "9") ||
        (i < tokens.length && tokens[i] >= "0" && tokens[i] <= "9") ||
        tokens[i] == "."
      ) {
        subStr += tokens[i++];
      }
      value.push(parseFloat(subStr, 10));
      i--; // bcs for loop will increment i hence to offset that
    }

    //for (
    if (tokens[i] == "(") {
      op.push(tokens[i]);
    }
    // for )
    if (tokens[i] == ")") {
      while (op[op.length - 1] != "(") {
        value.push(applyOp(op.pop(), value.pop(), value.pop()));
      }
      op.pop();
    }
    // for operand
    if (
      tokens[i] == "+" ||
      tokens[i] == "-" ||
      tokens[i] == "*" ||
      tokens[i] == "/"
    ) {
      while (op.length > 0 && hasPrecedence(op[op.length - 1], tokens[i])) {
        value.push(applyOp(op.pop(), value.pop(), value.pop()));
      }
      op.push(tokens[i]);
    }
  }
  // Entire expression has been
  // parsed at this point, apply remaining
  // ops to remaining values
  while (op.length > 0) {
    value.push(applyOp(op.pop(), value.pop(), value.pop()));
  }

  // Top of 'values' contains
  // result, return it
  return value.pop();
}

// to check precedence
function hasPrecedence(newOp, oldOp) {
  if (newOp == "(" || newOp == ")") {
    return false;
  }
  if ((oldOp == "*" || oldOp == "/") && (newOp == "+" || newOp == "-")) {
    return false;
  } else {
    return true;
  }
}

// doing operation
function applyOp(operation, val2, val1) {
  switch (operation) {
    case "+":
      return val1 + val2;
    case "-":
      return val1 - val2;
    case "*":
      return val1 * val2;
    case "/":
      if (val2 == 0) {
        alert("can not divide by 0");
        return 0;
      } else {
        return val1 / val2;
      }

    default:
      return 0;
  }
}

export { evaluate };
