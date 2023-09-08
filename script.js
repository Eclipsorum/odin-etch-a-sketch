const container = document.querySelector('.container');
const body = document.querySelector('body');

const btnContainer = document.createElement('div');
btnContainer.classList.add('btn-container');

const btnGrid = document.createElement('button');
btnGrid.setAttribute('id', 'addgrid');
btnGrid.textContent = "Add Grid";

const btnClear = document.createElement('button');
btnClear.setAttribute('id', 'clear');
btnClear.textContent = "Clear";

body.insertBefore(btnContainer, container);
btnContainer.appendChild(btnGrid);
btnContainer.appendChild(btnClear);


let isClicked = false;
window.addEventListener('mousedown', e => {
isClicked = true;
});
window.addEventListener('mouseup', e => {
if (isClicked === true) {
isClicked = false;
}});

let gridSize = 16;
populateGrid(gridSize);
btnGrid.addEventListener('click', addGrid);
btnClear.addEventListener('click', () => {
    const rows = document.querySelectorAll('.row');
    rows.forEach((row) => container.removeChild(row));
    populateGrid(gridSize); 
});


function addGrid() {
    gridSize = prompt("Enter grid size (max 100)", 16);
    while (gridSize != 0 && gridSize != null && gridSize != '' && !(gridSize/1)) {
        gridSize = prompt("Bad input! Enter again! (max 100)");       
    }
    if (gridSize > 100) {
        gridSize = 100;
    }
    const rows = document.querySelectorAll('.row');
    rows.forEach((row) => container.removeChild(row));
    populateGrid(gridSize);  
}

function populateGrid(gridSize) {
    for (let i=0; i<gridSize; i++) {
        container.appendChild(document.createElement('div')).classList.add(`row`);
    }
    
    const rows = document.querySelectorAll('.row')
    
    for (let i=0; i<gridSize; i++) {
    rows.forEach((row) => {
        row.appendChild(document.createElement('div')).classList.add(`column`); 
        row.style.height = `${600/gridSize}px`;    
    })
    }
    const columns = document.querySelectorAll('.column');
    
    function getRandomHex() {
        const randomNum = (Math.floor(Math.random() * 16777215));
        let hexValue = randomNum.toString(16);
        if (hexValue.length != 6) {
            for (i=hexValue.length;i<6;i++) {
               hexValue = hexValue.concat("0");
            }
        }
        return hexValue;
    }

    function attributeSet(column) {

            let columnAtt = column.getAttribute('style');
        if (columnAtt) {
            const hexToDecimal = hex => parseInt(hex, 16);
            let hexValue = columnAtt.slice(columnAtt.search('#')+1);    
            let alphaValue = hexToDecimal(hexValue.slice(-2));
            if ( alphaValue < 255) {
                alphaValue = alphaValue + 10;
            }
            column.setAttribute('style', `background-color: #${getRandomHex()}${alphaValue.toString(16)}`);
        }

        else {
        column.setAttribute('style', `background-color: #${getRandomHex()}19`);
        }
             
    }
    
    columns.forEach((column) => {
        column.addEventListener('mousemove', () => {
            if (isClicked === true) {
            attributeSet(column);
        }
    })
    })

    columns.forEach((column) => {
        column.addEventListener('click', () => {
            isClicked = true;
            attributeSet(column);
            isClicked = false;
        })
    })
}


