const tbody = document.getElementsByTagName('tbody')[0];
const select = document.getElementsByTagName('select')[0];
select.addEventListener('change', () => {
    SIZE = select.value;
    clear();
    fill();
})
const reset = document.getElementsByTagName('button')[0];
reset.addEventListener('click', () => {
    clear();
    fill();
});

const sizes = {
    'three': 3,
    'four': 4,
    'five': 5
}

let FIRST = null;
let BLOCK = false;
let SIZE = 'three';

const emojis = ['😀', '😘', '😴', '💩', '💀', '🥳', '🤖', '🤑', '🤬', '😝'];

function clear() {
    let child;
    while ((child = tbody.lastChild)) {
        tbody.removeChild(child);
    }
};

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function* randomNumber(size) {
    let index = 0;
    let bag = Array.from({ length: 4 * size }, () => {
        return emojis[Math.floor(index++ / 2)];
    });
    while (bag.length > 0) {
        yield bag.splice(getRndInteger(0, bag.length), 1)[0];
    }
}

function checkPairs(td) {
    let value = td.innerText;
    if (FIRST && FIRST !== td && FIRST.innerText === value) {
        td.setAttribute('paired', true);
        FIRST.setAttribute('paired', true);
        FIRST = null;
        checkWin();
    } else if(FIRST && FIRST !== td && FIRST.innerText !== value) {
        BLOCK = true;
        setTimeout(() => {
            td.innerText = '';
            FIRST.innerText = '';
            FIRST = null;
            BLOCK = false;
        }, 1000)
    } else {
        FIRST = td;
    }
}

function checkWin() {
    let pairedElements = document.querySelectorAll('[paired=true]');
    if(pairedElements.length === 4 * sizes[SIZE]) {
        pairedElements.forEach((td) => {
            let clicks = td.getAttribute('clicks');
            td.innerText = clicks;
            if(parseInt(clicks) > 2) {
                td.classList.add('bad');
            } else {
                td.classList.add('good');
            }
        });
    }
}

function handleClick(td, value) {
    let paired = td.getAttribute('paired');
    if (!BLOCK && !paired) {
        td.innerText = value
        let clicks = td.getAttribute('clicks');
        td.setAttribute('clicks', (td !== FIRST) ? ++clicks : clicks);
        checkPairs(td);
    }
}

function fill() {
    const sizeValue = sizes[SIZE];
    let randomIt = randomNumber(sizeValue);
    for (let i = 0; i < sizeValue; i++) {
        let row = document.createElement('tr');
        row.classList.add(SIZE);
        for (let j = 0; j < 4; j++) {
            let td = document.createElement('td');
            let value = randomIt.next().value;
            td.setAttribute('clicks', 0);
            td.addEventListener('click', () => {
                handleClick(td, value);
            });
            row.append(td);
        }
        tbody.append(row);
    }
}

clear(tbody);
fill();