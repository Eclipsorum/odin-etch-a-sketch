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

const btnEraser = document.createElement('button');
btnEraser.setAttribute('id', 'eraser');
btnEraser.textContent = "Eraser";

const btnRainbow = document.createElement('button');
btnRainbow.setAttribute('id', 'rainbow');
btnRainbow.textContent = "Rainbow";

const btnBold = document.createElement('button');
btnBold.setAttribute('id', 'bold');
btnBold.textContent = "Bold";

body.insertBefore(btnContainer, container);
btnContainer.appendChild(btnGrid);
btnContainer.appendChild(btnClear);
btnContainer.appendChild(btnEraser);
btnContainer.appendChild(btnRainbow);
btnContainer.appendChild(btnBold);


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
btnClear.addEventListener('click', clear);
btnEraser.addEventListener('click', () => {
    btnEraser.classList.toggle('active');
    sketch(false);
});
btnRainbow.addEventListener('click', () => {
    btnRainbow.classList.toggle('active');
    sketch(false);
});
btnBold.addEventListener('click', () => {
    btnBold.classList.toggle('active');
    sketch(false);
});


function addGrid() {
    gridSize = prompt("Enter grid size (max 100)", 16);
    while (gridSize != 0 && gridSize != null && gridSize != '' && !(gridSize/1) || gridSize > 100) {
        gridSize = prompt("Bad input! Enter again! (max 100)");       
    }

    if (!(gridSize == '' || gridSize == null)) {
        const rows = document.querySelectorAll('.row');
        rows.forEach((row) => container.removeChild(row));
        populateGrid(gridSize);  
    }
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
    if (btnEraser.className) {
        btnEraser.classList.toggle('active');
    }
    if (btnBold.className) {
        btnBold.classList.toggle('active');
    }
    if (btnRainbow.className) {
        btnRainbow.classList.toggle('active');
    }
    sketch();
}

function sketch(addAlpha) {
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
            console.log(columnAtt);

            if (columnAtt) {
                const hexToDecimal = hex => parseInt(hex, 16);
                let hexValue = columnAtt.slice(columnAtt.search('#')+1);  
                let alphaValue = hexToDecimal(hexValue.slice(-2));
                const alphaBold = 255;

                if (alphaValue < 235 && addAlpha == undefined) {
                    alphaValue = alphaValue + 18;  
                     
                }

            if (btnRainbow.className) {
                if (btnBold.className) {
                    column.setAttribute('style', `background-color: #${getRandomHex()}${alphaBold.toString(16)}`);
                }
                else {
                column.setAttribute('style', `background-color: #${getRandomHex()}${alphaValue.toString(16)}`);
                }
            }
            else {
                if (btnBold.className) {
                    column.setAttribute('style', `background-color: #000000${alphaBold.toString(16)}`);
                }
                else {
                    column.setAttribute('style', `background-color: #000000${alphaValue.toString(16)}`);
                }

            }
            }
            
            else {
                if (btnRainbow.className) {
                    column.setAttribute('style', `background-color: #${getRandomHex()}19`);
                }
                else {
                    column.setAttribute('style', `background-color: #00000019`);
                }
            
            }
              
    }

    function columnAddListener(column) {
        column.addEventListener('mousemove', () => {
            if (isClicked === true) {
                if (btnEraser.className) {
                    column.removeAttribute('style');
                }  
                else {
                    attributeSet(column);               
                }
        }
    })
        column.addEventListener('click', () => 
        {
        isClicked = true;
        if (btnEraser.className) {
            column.removeAttribute('style');
        } 
        else {
            attributeSet(column);               
        }          
        isClicked = false;
        })
    }
    
    columns.forEach((column) => columnAddListener(column))
}

function clear() {
    const columns = document.querySelectorAll('.column');
    columns.forEach((column) => {
        column.removeAttribute('style');
    })
}