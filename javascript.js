
const gridContainer = document.querySelector(`.grid-container`);
const gridContainerWidth = gridContainer.clientWidth

function createGrid(rows) {
    const gridsDimensions = (gridContainerWidth / rows);

    for (let i = 0; i < rows*rows; i++) {
        const grids = document.createElement(`div`);
        grids.classList.add('grids');
        gridContainer.appendChild(grids);
        grids.setAttribute('style', `width: ${gridsDimensions}px; height: ${gridsDimensions}px`);
        changeColors(grids);
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

let isDrawing = false;
function changeColors(grids) {
    window.addEventListener(`mouseup`, function(event) {
        isDrawing = false;
        break
    });
    gridContainer.addEventListener(`mousedown`, function(event) {
        isDrawing = true;
        if (isDrawing === true) {
            grids.addEventListener(`mouseover`, function(event) {
                grids.setAttribute(`style`, `background-color: white`);
            });
        }
        // if (isDrawing === true) {
           
        // }
    });
}
