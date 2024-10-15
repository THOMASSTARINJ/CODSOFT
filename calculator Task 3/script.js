const display = document.getElementById('display');
let currentInput = '';  // Stores the current number input by the user
let operator = null;    // Stores the operator selected by the user
let previousInput = ''; // Stores the previous number input before the operator

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        // Clear button logic
        if (button.id === 'clear') {
            currentInput = '';
            previousInput = '';
            operator = null;
            display.value = '';
            return;
        }

        // Equal button logic
        if (button.id === 'equal') {
            if (operator && previousInput !== '') {
                currentInput = calculate(previousInput, currentInput, operator);
                display.value = currentInput;
                operator = null;
                previousInput = '';
            }
            return;
        }

        // Operator buttons (+, -, *, /)
        if (button.classList.contains('operator')) {
            if (currentInput === '') return; // Prevent operator if no current input

            if (operator !== null && previousInput !== '') {
                previousInput = calculate(previousInput, currentInput, operator);
                display.value = previousInput;
            } else {
                previousInput = currentInput;
            }

            currentInput = '';
            operator = value;
            return;
        }

        // Append numbers and decimal points to current input
        if (value === '.' && currentInput.includes('.')) return; // Avoid multiple decimal points

        currentInput += value;
        display.value = currentInput;
    });
});

function calculate(num1, num2, operator) {
    let result;

    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            if (num2 === 0) {
                result = 'Error'; // Handle division by zero
            } else {
                result = num1 / num2;
            }
            break;
        default:
            return '';
    }

    return result.toString();
}
