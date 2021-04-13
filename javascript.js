
const gridContainer = document.querySelector(`.grid-container`);
const gridContainerWidth = gridContainer.clientWidth
let colorSelectorBackground = document.querySelector(`#backgroundColor`);
let colorSelectorDrawing = document.querySelector(`#userColor`);
let colorUser = colorSelectorDrawing.value;
let colorBackground = colorSelectorBackground.value;
let isDrawing = false;

// updates colorUser according to the change in the color well
colorSelectorDrawing.addEventListener(`change`, () => {
    colorUser = colorSelectorDrawing.value;
    resetEraser();
    resetRandomizer();
})

// re-creates grid according to background color choice
colorSelectorBackground.addEventListener(`change`, () => {
    colorBackground = colorSelectorBackground.value;
    resetEraser();
    resetGrid();
    createGrid(gridSlider.value);
})

// creates a string of '1fr' based on number of rows
// adds string to grid-template to determine CSS grid config
function gridTemplate(rows) {
    let frs = ``;
    for (i = 0; i < rows; i++) {
        frs += `1fr `;
    }
    gridContainer.setAttribute('style', `grid-template-rows: ${frs}; grid-template-columns: ${frs}`);
}

// creates the grid according to number of rows
// maintains the container by distributing row spacing evenly
// attaches a listener to each created grid
function createGrid(rows) {
    const gridsDimensions = (gridContainerWidth / rows);

    for (let i = 0; i < rows*rows; i++) {
        const grids = document.createElement(`div`);
        grids.classList.add('grids');
        gridContainer.appendChild(grids);
        grids.setAttribute('style', `background-color: ${colorBackground}; width: ${gridsDimensions}px; height: ${gridsDimensions}px`);
        grids.addEventListener('mouseover', () => {
            if (isDrawing === true && randomOn !== true) {
                grids.setAttribute(`style`, `background-color: ${colorUser}`);
            } else if (isDrawing === true && randomOn === true) {
                randomizesRGB();
                grids.setAttribute(`style`, `background-color: ${colorUser}`);
            }
        });
        grids.addEventListener('mousedown', () => {
            if (randomOn !== true) {
                grids.setAttribute(`style`, `background-color: ${colorUser}`);
            } else if (randomOn === true) {
                randomizesRGB();
                grids.setAttribute(`style`, `background-color: ${colorUser}`);
            }
        });
    }
    gridTemplate(rows);
}

// removes all grids from the container
function resetGrid() {
    function removeGrid(parent) {
        while (gridContainer.firstChild) {
            gridContainer.removeChild(gridContainer.firstChild);
        }
    }
    removeGrid(gridContainer);
}

// creates a default 16 by 16 grid on page load
createGrid(16);

// takes value from slider, calls resetGrid to remove existing grid
// then creates a new grid with the slider value
const gridSlider = document.querySelector(`#rowsUserChoice`);
const confirmGridChange = document.querySelector(`#confirmUserGridSize`);
confirmGridChange.addEventListener('click', () => {
    resetEraser();
    resetGrid();
    createGrid(gridSlider.value);
})

// clears the grid and reloads the currently-selected grid size
const confirmClear = document.querySelector(`#clearGrid`);
confirmClear.addEventListener('click', () => {
    resetEraser();
    resetGrid();
    createGrid(gridSlider.value);
})

// displays the default grid size and updates display as slider changes
const inputDiv = document.querySelector(`#gridSize-container`);
const numbersOfRowsSelected = document.createElement('p');
numbersOfRowsSelected.textContent = `16 x 16 grid`;
numbersOfRowsSelected.setAttribute('id', 'grid-size-label');
inputDiv.appendChild(numbersOfRowsSelected);
gridSlider.addEventListener('change', () => {
    numbersOfRowsSelected.textContent = `${gridSlider.value} x ${gridSlider.value} grid`;
    inputDiv.appendChild(numbersOfRowsSelected);
})

// used to start sketching on mousedown and stop sketching on mouseup
gridContainer.addEventListener(`mousedown`, () => {
    isDrawing = true;
});
window.addEventListener(`mouseup`, () => {
    if (isDrawing === true) {
        isDrawing = false;
    }
});

// toggles eraser button on and off
let eraserOn;
const labelEraser = document.querySelector(`#labelEraser`);
eraser.addEventListener('click', () => {
        if (eraserOn !== true) {
            resetRandomizer();
            labelEraser.textContent = `eraser: on`;
            colorUser = colorSelectorBackground.value;
            eraserOn = true;
            eraser.setAttribute(`style`, `background-color: black`);
            labelEraser.setAttribute(`style`, `color: white`);
        } else if (eraserOn === true) {
            labelEraser.textContent = `eraser: off`;
            colorUser = colorSelectorDrawing.value;
            eraserOn = false;
            eraser.setAttribute(`style`, `background-color: white`);
            labelEraser.setAttribute(`style`, `color: black`);
        } 
    })
function resetEraser() {
    labelEraser.textContent = `eraser: off`;
    colorUser = colorSelectorDrawing.value;
    eraserOn = false;
    eraser.setAttribute(`style`, `background-color: white`);
    labelEraser.setAttribute(`style`, `color: black`);
}

// creates the color randomizer
let r;
let g;
let b;
let randomOn;
const randomColorToggle = document.querySelector(`#randomColor`);
const labelRandomColor = document.querySelector(`#labelRandomColor`);

randomColorToggle.addEventListener(`click`, () => {
    if (randomOn !== true) {
        resetEraser();
        randomizesRGB();
        labelRandomColor.textContent = "rainbow pen: on";
        randomColorToggle.setAttribute(`style`, `background-color: black`);
        labelRandomColor.setAttribute(`style`, `color: white`);
    } else if (randomOn === true) {
        randomOn = false;
        labelRandomColor.textContent = "rainbow pen: off";
        randomColorToggle.setAttribute(`style`, `background-color: white`);
        labelRandomColor.setAttribute(`style`, `color: black`);
        colorUser = colorSelectorDrawing.value;
    }
});

function randomizesRGB() {
    r = Math.floor(Math.random() * 256);
    g = Math.floor(Math.random() * 256);
    b = Math.floor(Math.random() * 256);
    colorUser = `rgb(${r},${g},${b})`;
    randomOn = true;
}

function resetRandomizer() {
    labelRandomColor.textContent = "rainbow pen: off";
    colorUser = colorSelectorDrawing.value;
    randomOn = false;
    randomColorToggle.setAttribute(`style`, `background-color: white`);
    labelRandomColor.setAttribute(`style`, `color: black`);
}
