const numbers = document.getElementById('numbers');
const input = document.getElementById('input');
const button = document.getElementById('button');
const result = document.getElementById('result');
let level = 3;

function check() {
    numbers.style.color = 'initial';
    result.style.visibility = 'visible';
    if (numbers.innerHTML === input.value) {
        result.innerHTML = `${input.value} - SUCCESS`;
        level += 0.5;
    } else {
        result.innerHTML = `${input.value} - FAIL - ${numbers.innerHTML}`;
    }
    numbers.innerHTML = generateNumber(level);
    input.value = '';
}

button.addEventListener('click', check);
input.addEventListener('focus', () => {
    numbers.style.color = 'transparent';
    result.style.visibility = 'hidden';
});
input.addEventListener('keyup', (event) => {
    numbers.style.color = 'transparent';
    result.style.visibility = 'hidden';
    if (event.keyCode === 13) {
        event.preventDefault();
        check();
    }
});

function generateNumber(length) {
    let number = '';
    for (let i = 0; i < length; i++) {
        number += getRndInteger(0, 9);
    }
    return number;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


numbers.innerHTML = generateNumber(level);