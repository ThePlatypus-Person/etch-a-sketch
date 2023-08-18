const sketchPad = document.querySelector(".sketch-pad");

// Grid Size Slider
const slider = document.querySelector("#slider");
let gridSize = 16;
generateSketchPad(gridSize);
let gridValue = document.querySelector(".grid-size");
gridValue.textContent = `${gridSize} x ${gridSize}`;
slider.addEventListener("input", (e) => {
    gridSize = e.target.value;
    gridValue.textContent = `${gridSize} x ${gridSize}`;
});

slider.addEventListener("change", () => {
    generateSketchPad(gridSize);
});


// Color Change for grid
let colorSetting = "default";
let defaultHue = 33;
const radios = document.querySelectorAll(`input[type="radio"]`);

radios.forEach(radio => {
    radio.addEventListener("click", (e) => {
        colorSetting = e.target.value;
    })
});

function changeColor(e) {
    if (mouseDown) {
        if (colorSetting === "default") {
            e.target.style.backgroundColor = `hsla(${defaultHue}, 100%, 70%, 1)`;
        } else if (colorSetting === "random") {
            let hue = Math.floor(Math.random() * 360 );
            e.target.style.backgroundColor = `hsl(${hue}, 100%, 60%)`;
        } 
    }
}

// Conditional for coloring pixels only when mouse is clicked
let mouseDown = false;
document.addEventListener("mousedown", () => {mouseDown = true});
document.addEventListener("mouseup", () => {mouseDown = false});

// Generate Sketch Pad
function generateSketchPad() {
    sketchPad.innerHTML = '';
    for (let i = 1; i <= gridSize; i++) {
        let row = document.createElement("div");
        row.classList.add("row");

        for (let i = 1; i <= gridSize; i++) {
            let grid = document.createElement("div");
            grid.classList.add("grid");

            grid.addEventListener("mouseout", (e) => {
                changeColor(e);
            });

            row.appendChild(grid);
        }
        sketchPad.appendChild(row);
    }
}

// Clear
const btnClear = document.querySelector(".clear");
btnClear.addEventListener("click", () => {
    let gridList = document.querySelectorAll(".grid");
    gridList.forEach(grid => {
        grid.style.backgroundColor = "white";
    });
});

