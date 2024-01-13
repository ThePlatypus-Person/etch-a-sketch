const body = document.querySelector("body");
const screen = document.querySelector(".screen");

let size = 16;
createScreen();

// Change Slider h3 Text
const slider = document.querySelector("input[type='range']");
const sliderLabel = document.querySelector(".slider > h3");
slider.addEventListener("input", () => {
    sliderLabel.textContent = slider.value;
});

// Resets Button
const reset = document.querySelector(".reset.btn");
reset.addEventListener("click", createScreen);

// Reloads Screen on Slider Change
slider.onchange = () => {
    size = slider.value;
    createScreen();
};

// Pick different color
const colorList = [
    { name: "red", hex: "#ef4444" },
    { name: "orange", hex: "#f97316" },
    { name: "yellow", hex: "#eab308" },
    { name: "lime", hex: "#84cc16" },
    { name: "blue", hex: "#3b82f6" },
];
const colorSelect = document.querySelectorAll(".right-input > .btn");
colorSelect.forEach(button => {
    button.addEventListener("click", (e) => {
        setColor(e.target.dataset.color);
    })
});

// Changes Color When Drawing on Screen
let mouseDown = false;
screen.addEventListener("mousedown", () => mouseDown = true);
screen.addEventListener("mouseup", () => mouseDown = false);
screen.addEventListener("mousemove", changeColor);

// Functions
let target;
function changeColor(e) {
    if (!mouseDown || target == e.target) return;

    target = e.target;
    if (selectedColor === "random") {
        const randomNum = Math.floor(Math.random() * 5);
        const randomColor = colorList[randomNum]["hex"];
        target.setAttribute("style", `background-color: ${randomColor}`);
        return;
    } 

    target.setAttribute("style", `background-color: ${selectedColor}`);
}

function clearScreen() {
    while (screen.firstChild)
        screen.removeChild(screen.lastChild);
}

function createScreen() {
    clearScreen(); 

    // Create Screen (size x size)
    for (let i = 1; i <= size; i++) {
        const row = document.createElement("div");
        row.classList.add("row");

        for (let j = 1; j <= size; j++) {
            const cell = document.createElement("div");
            cell.setAttribute("data-key", `(${i},${j})`);
            row.appendChild(cell);
        }

        screen.appendChild(row);
    }
}

// Changes Selected Color
let selectedColor = "random";
function setColor(color) {
    if (color === "random") {
        selectedColor = "random";
        body.setAttribute("style", "background-color: #1e293b");
        return;
    }

    selectedColor = colorList.find(item => item.name === color)["hex"];
    body.setAttribute("style", `background-color: ${selectedColor}`);
}
