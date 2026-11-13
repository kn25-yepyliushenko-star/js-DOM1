// Отримуємо елементи DOM
const firstInput = document.getElementById('firstNumber');
const secondInput = document.getElementById('secondNumber');

const btnClear = document.getElementById('btnClear');
const btnDivide = document.getElementById('btnDivide');
const btnMultiply = document.getElementById('btnMultiply');
const btnSubtract = document.getElementById('btnSubtract');
const btnAdd = document.getElementById('btnAdd');

const exprDisplay = document.getElementById('exprDisplay');
const mainDisplay = document.getElementById('mainDisplay');
const errorContainer = document.getElementById('errorContainer');
const errorMessage = document.getElementById('errorMessage');

// Базові математичні функції
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

// Заокруглення до сотих, якщо число не ділиться націло
function formatResult(value) {
    if (Number.isInteger(value)) {
        return value.toString();
    }
    return (Math.round(value * 100) / 100).toString();
}

// Показ повідомлення про помилку
function showError(message) {
    errorMessage.textContent = message;
    errorContainer.style.display = 'flex';
    mainDisplay.textContent = 'Помилка';
    mainDisplay.style.fontSize = '28px';
    exprDisplay.textContent = '';
}

// Приховування помилки
function hideError() {
    errorContainer.style.display = 'none';
    errorMessage.textContent = '';
}

// Оновлення основного дисплея з динамічним розміром шрифту (як у Python версії)
function updateDisplay(text) {
    mainDisplay.textContent = text;
    if (text.length <= 9) {
        mainDisplay.style.fontSize = '40px';
    } else if (text.length <= 13) {
        mainDisplay.style.fontSize = '28px';
    } else {
        mainDisplay.style.fontSize = '20px';
    }
}

// Очищення (кнопка C)
function clearAll() {
    firstInput.value = '';
    secondInput.value = '';
    exprDisplay.textContent = '';
    updateDisplay('0');
    hideError();
    firstInput.focus();
}

// Валідація введених даних
function validateInputs() {
    const raw1 = firstInput.value.trim();
    const raw2 = secondInput.value.trim();

    // Перевірка на пусті поля
    if (raw1 === '' || raw2 === '') {
        showError('Помилка: будь ласка, заповніть обидва поля!');
        return null;
    }

    // Заміна коми на крапку
    const norm1 = raw1.replace(',', '.');
    const norm2 = raw2.replace(',', '.');

    const num1 = Number(norm1);
    const num2 = Number(norm2);

    // Перевірка на літери або спецсимволи
    if (isNaN(num1) || isNaN(num2)) {
        showError('Помилка: введіть коректні числа (без літер чи знаків)!');
        return null;
    }

    return { num1, num2 };
}

// Виконання операції
function handleOperation(operation, symbol) {
    const data = validateInputs();
    if (!data) {
        return;
    }

    const { num1, num2 } = data;
    let result = 0;

    switch (operation) {
        case 'add':
            result = add(num1, num2);
            break;
        case 'subtract':
            result = subtract(num1, num2);
            break;
        case 'multiply':
            result = multiply(num1, num2);
            break;
        case 'divide':
            if (num2 === 0) {
                showError('Помилка: ділення на нуль неможливе!');
                return;
            }
            result = divide(num1, num2);
            break;
        default:
            showError('Невідома операція');
            return;
    }

    hideError();
    const formatted = formatResult(result);
    exprDisplay.textContent = `${num1} ${symbol} ${num2} =`;
    updateDisplay(formatted);
}

// Додавання обробників подій (addEventListener)
btnAdd.addEventListener('click', function () {
    handleOperation('add', '+');
});

btnSubtract.addEventListener('click', function () {
    handleOperation('subtract', '−');
});

btnMultiply.addEventListener('click', function () {
    handleOperation('multiply', '×');
});

btnDivide.addEventListener('click', function () {
    handleOperation('divide', '÷');
});

btnClear.addEventListener('click', clearAll);

// Приховування помилки під час нового введення
firstInput.addEventListener('input', hideError);
secondInput.addEventListener('input', hideError);
