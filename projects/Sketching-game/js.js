let container = document.querySelector('#container');
let defaultColor = '#000000';
let eraser = document.querySelector('.eraser');             //storing the three buttons in variables.
let color = document.querySelector('.color')
let randColor = document.querySelector('.randColor');
let customColor = document.querySelector('#customColor');           //variable to hold user color choice.
let currentSize = 16;
let mousedown = false;

function makeGrid(newGridSize) {            //function to create new grid.
    container.style.gridTemplateRows = `repeat(${newGridSize}, 1fr)`;           //rows of grid.
    container.style.gridTemplateColumns = `repeat(${newGridSize}, 1fr)`;            //columns of grid.

    for (let j = 0; j < (newGridSize * newGridSize); j++) {         //removed nested loops, since is grid layouts is designed using css.
        let containerChild = document.createElement('div');         //creating a new div.
        containerChild.classList.add("containerChild");            //adding a class to each new div.

        containerChild.addEventListener('mousedown', () => {            //start drawing once the mouse is being clicked and held.
            mousedown = true;
        });
        containerChild.addEventListener('mouseup', () => {          //stop drawing once the mouse is released.
            mousedown = false;
        });
        //adding an event listener to each div.
        containerChild.addEventListener('mouseover', changeColor);           //for some reason, figuring this out took an hour.
        containerChild.addEventListener('mousedown', changeColor);           //allows for the mouse/cursor to be dragged.
        container.appendChild(containerChild)          //appending new div after each iteration.
    }
}

function changeColor() {
    if (mousedown === true) {           //checking if the condition to drag is true, only allowing to paint if the mouse id clicked and held.
        if (this.style.backgroundColor !== defaultColor) {
            this.style.backgroundColor = defaultColor;         //changes colour everytime mouse hovers over it.
            let audio = new Audio('./sound/QKTA234-pop.mp3');         //variable to hold the audio.
            audio.play();           //playing the audio.
        }
    }
}

function create() {          //button to crete new grid with custom grid size.
    let newGridSize = document.querySelector('#gridSize');          //storing the value from slider.
    container.innerHTML = '';         //removing everything from container and crearting an entirely new grid.
    makeGrid(newGridSize.value);
    currentSize = newGridSize.value;            //assigning value to a varibale for btnReset().
}

function btnReset() {           //function for Reset button.
    container.innerHTML = '';         //removing everything from container and crearting an entirely new grid.
    makeGrid(currentSize);
}

customColor.addEventListener('input', function (event) {
    defaultColor = customColor.value;           //setting the value of color that has been chosen by the user. 
});

color.addEventListener("click", function () {           //button to change color to the default color, by changing 'defaultColor'  
    defaultColor = '#000000';                               //to the color "red".
});

randColor.addEventListener("click", function () {           //button to change color to any random color, by changing 'defaultColor'
    let letters = '0123456789ABCDEF';                       //to any color.
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    defaultColor = color;
});

eraser.addEventListener("click", () => {            //button to change color to nothing, by changing 'defaultColor' to an empty string. 
    defaultColor = '';
});

makeGrid(16);         //Calling the function to create a grid. 