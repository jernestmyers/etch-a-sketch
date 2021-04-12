
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
            if (isDrawing === true) {
                grids.setAttribute(`style`, `background-color: ${colorUser}`);
            }
        });
        grids.addEventListener('mousedown', () => {
                grids.setAttribute(`style`, `background-color: ${colorUser}`);
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
    resetGrid();
    createGrid(gridSlider.value);
})

// clears the grid and reloads the currently-selected grid size
const confirmClear = document.querySelector(`#clearGrid`);
confirmClear.addEventListener('click', () => {
    resetGrid();
    createGrid(gridSlider.value);
})

// displays the default grid size and updates display as slider changes
const inputDiv = document.querySelector(`.user-inputs`);
const numbersOfRowsSelected = document.createElement('p');
numbersOfRowsSelected.textContent = `16 x 16`;
inputDiv.appendChild(numbersOfRowsSelected);
gridSlider.addEventListener('change', () => {
    numbersOfRowsSelected.textContent = `${gridSlider.value} x ${gridSlider.value} grid`;
    inputDiv.appendChild(numbersOfRowsSelected);
})


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
            labelEraser.textContent = `eraser: on`;
            colorUser = colorSelectorBackground.value;
            eraserOn = true;
        } else if (eraserOn === true) {
            labelEraser.textContent = `eraser: off`;
            colorUser = colorSelectorDrawing.value;
            eraserOn = false;
        } 
    })
function resetEraser() {
    labelEraser.textContent = `eraser: off`;
    colorUser = colorSelectorDrawing.value;
    eraserOn = false;
}
