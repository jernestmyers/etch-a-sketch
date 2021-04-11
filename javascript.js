
const gridContainer = document.querySelector(`.grid-container`);
const gridContainerWidth = gridContainer.clientWidth

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
        grids.setAttribute('style', `width: ${gridsDimensions}px; height: ${gridsDimensions}px`);
        grids.addEventListener(`mouseover`, function(event) {
            grids.setAttribute(`style`, `background-color: black`);
            });
        // changeColors(isDrawing);
        // window.addEventListener(`mouseup`, function(event) {
        //     if (isDrawing === true) {
        //         isDrawing = false;
        //         changeColors(grids, isDrawing);
        //         console.log(`up`);
        //     }
        // });
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

const inputDiv = document.querySelector(`.user-inputs`);
const numbersOfRowsSelected = document.createElement('p');
gridSlider.addEventListener('change', () => {
    numbersOfRowsSelected.textContent = `${gridSlider.value} x ${gridSlider.value} grid`;
    inputDiv.appendChild(numbersOfRowsSelected);
})

// let isDrawing = false;
// function changeColors(grids, condition) {
//     gridContainer.addEventListener(`mousedown`, function(event) {
//         isDrawing = true;
//         if (isDrawing === true) {
//             grids.addEventListener(`mouseover`, function(event) {
//             grids.setAttribute(`style`, `background-color: black`);
//             });
//     }
// });
// }

// window.addEventListener(`mouseup`, function(event) {
//     if (isDrawing === true) {
//         isDrawing = false;
//         changeColors(grids, isDrawing);
//     }
// });


// mousedown begins the sketching
// mousedown && mouseover continues sketching
// mouseup stops the sketching

// let isDrawing = false;
// let gridIndex;
// const gridsCreated = document.querySelectorAll(`.grids`);
// let gridsArray = [];
// for(let i = gridsCreated.length; i--; gridsArray.unshift(gridsCreated[i]));


// gridsCreated.forEach((gridsCreated) => {
// gridsCreated.addEventListener(`mousedown`, e => {
//     isDrawing = true;
// });
// });

// gridsCreated.forEach((gridsCreated) => {
// gridsCreated.addEventListener(`mouseover`, e => {
//     if (isDrawing === true) {
//         gridIndex = gridsCreated.index;
//         console.log(gridIndex);
//         changeColors(gridIndex);
//     }
// });
// });

// window.addEventListener(`mouseup`, e => {
//     if (isDrawing === true) {
//         changeColors(gridIndex);
//         isDrawing = false;
//     }
// });

// function changeColors(index) {
//     gridsCreated.setAttribute(`style`, `background-color: black`);
// }