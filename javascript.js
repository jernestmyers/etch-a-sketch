
const gridContainer = document.querySelector(`.grid-container`);
const gridContainerWidth = gridContainer.clientWidth
// const gridsDimensions = ``;

function createGrid(rows, columns) {
    // const gridsDimensions = (gridContainerWidth / rows);
    // const gridContainer = document.querySelector(`.grid-container`);

    for (let i = 0; i < rows; i++) {
        const gridsRows = document.createElement(`div`);
        gridsRows.classList.add('grids-rows');
        gridContainer.appendChild(gridsRows);
        
        for (let j = 1; j < columns; j++) {
            const gridsColumns = document.createElement(`div`);
            gridsColumns.classList.add('grids-columns');
            gridContainer.appendChild(gridsColumns);
        }
    }

    gridTemplate(rows);
}

function gridTemplate(rows) {
    let frs = ``;
    const gridsDimensions = (gridContainerWidth / rows);
    for (i = 0; i < rows; i++) {
        frs += `1fr `;
    }
    gridContainer.setAttribute('style', `grid-template-rows: ${frs}; grid-template-columns: ${frs}; width: ${gridsDimensions}px; height: ${gridsDimensions}px`);
    // gridContainer.setAttribute(`style`, `width: ${gridsDimensions}px; height: ${gridsDimensions}px`);
}

