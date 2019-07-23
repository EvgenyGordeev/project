  let number1 = +prompt("Введите первое число", "");
  let operator = prompt("Введите желаемую арифметическую операцию", "");
  let number2 = +prompt("Введите второе число", "");


function calculator(number1, operator, number2) {

  if (operator === "+") {
      return number1 + number2;
  } else if (operator === "-") {
      return number1 - number2;
  } else if (operator === "*") {
      return number1 * number2;
  } else if (operator === "/") {
      return number1 / number2;
  } else if (operator === "%") {
	  return number1 % number2;
  } else if (operator === "^")
      return Math.pow(number1,number2); 
}

alert(number1 + String(operator) + number2 + '=' + calculator(number1, operator, number2));

confirm("Хотите выполнить еще вычисления ?");   