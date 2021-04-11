
const gridContainer = document.querySelector(`.grid-container`);
const gridContainerWidth = gridContainer.clientWidth

function createGrid(rows) {
    const gridsDimensions = (gridContainerWidth / rows);

    for (let i = 0; i < rows*rows; i++) {
        const grids = document.createElement(`div`);
        grids.classList.add('grids');
        gridContainer.appendChild(grids);
        grids.setAttribute('style', `width: ${gridsDimensions}px; height: ${gridsDimensions}px`);
    }
    gridTemplate(rows);
}

function gridTemplate(rows) {
    let frs = ``;
    for (i = 0; i < rows; i++) {
        frs += `1fr `;
    }
    gridContainer.setAttribute('style', `grid-template-rows: ${frs}; grid-template-columns: ${frs}`);
}


// let isDrawing = false;
// function changeColors(grids) {
//     gridContainer.addEventListener(`mousedown`, function(event) {
//         isDrawing = true;
//         window.addEventListener(`mouseup`, function(event) {
//             isDrawing = false;
//         });
//         if (isDrawing === true) {
//             grids.addEventListener(`mouseover`, function(event) {
//             grids.setAttribute(`style`, `background-color: black`);
//         });
//         } else if (isDrawing === false) {
//             grids.removeEventListener(`mouseover`, function(event) {
//             grids.setAttribute(`style`, `background-color: black`);
//         });
//     }
//     });
// }

createGrid(16);

// mousedown begins the sketching
// mousedown && mouseover continues sketching
// mouseup stops the sketching

let isDrawing = false;
const gridsCreated = document.querySelector(`.grids`);
gridsCreated.addEventListener(`mousedown`, e => {
    isDrawing = true;
});

gridsCreated.addEventListener(`mouseover`, e => {
    if (isDrawing === true) {
        changeColors();
    }
});

window.addEventListener(`mouseup`, e => {
    if (isDrawing === true) {
        changeColors();
        isDrawing = false;
    }
});

function changeColors() {
    gridsCreated.setAttribute(`style`, `background-color: black`);
}