const tbody = document.getElementsByTagName('tbody')[0];
const select = document.getElementsByTagName('select')[0];
select.addEventListener('change', () => {
    clear(tbody);
    fill(select.value);
})

const sizes = {
    'five': 5,
    'six': 6,
    'seven': 7
}

function clear(node) {
    let child;
    while ((child = node.lastChild)) {
        node.removeChild(child);
    }
};

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function* randomNumber(size) {
    let index = 1;
    let bag = Array.from({ length: size * size }, () => index++);
    while (bag.length > 0) {
        yield bag.splice(getRndInteger(0, bag.length), 1)[0];
    }
}

function fill(size) {
    const sizeValue = sizes[size];
    let randomIt = randomNumber(sizeValue);
    for (let i = 0; i < sizeValue; i++) {
        let row = document.createElement('tr');
        row.classList.add(size);
        for (let j = 0; j < sizeValue; j++) {
            let td = document.createElement('td');
            td.innerText = randomIt.next().value;
            row.append(td);
        }
        tbody.append(row);
    }
}

clear(tbody);
fill('five');