const canvas = document.getElementById("canvas");
const body = document.querySelector("body");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const solution = document.querySelector('.ourPrompt');
const prompts  = ["Draw a volcano with lava","Draw an apple falling from a tree","Draw a pizza slice","Draw a face",""];
const descriptions = [`This is an example of a house.
    There are different shapes such as trinagles for the roof, square for the body, rectangle for the door, and a circle for the sun.
    Let's look at another one.`, `This is a picture of a volcano.
    Volcanos erupt and lava comes out of it. Lava is very hot and will be painful to touch! But this is all a part of nature.`, `This is an image of an apple falling from a tree.
    The apple falls down due to gravity. Gravity is a natural phenomenon. In fact, we are still on the ground because of it. Imagine if gravity didn't exist! We all would be flying.`, `This is an image of a pizza.
    The shape of a pizza is a circle. The circle can be split up into different slices. These slices can be represented as a fraction of a whole, which you will learn later. For now, imagine you get 2 slices from a 16 slices pizza. This can be represented as 2/16 in fractions.`,
`This is an image of a face. A face has eyes for seeing, nose for smelling, ears for hearing, mouth for tasting and skin for feeling. These are the five senses.`];

var theColor = '';
var lineW = 5;
let prevX = null;
let prevY = null;
let draw = false;
let doneStatus = false;
let promptNum = 0;
let picture = ["house", "volcano", "apple", "pizza", "Face"];


function pic(){
    return`/images/${picture[promptNum]}.png`;
}



body.style.backgroundColor = "#FFFFFF";
var theInput = document.getElementById("favcolor");

theInput.addEventListener("input", function(){
    theColor = theInput.value;
    body.style.backgroundColor = theColor;
}, false);

const ctx = canvas.getContext("2d");
ctx.lineWidth = lineW;

document.getElementById("ageInputId").oninput = function() {
    lineW = document.getElementById("ageInputId").value;
    document.getElementById("ageOutputId").innerHTML = lineW;
    ctx.lineWidth = lineW;
};

let clrs = document.querySelectorAll(".clr");
clrs = Array.from(clrs);
clrs.forEach(clr => {
    clr.addEventListener("click", () => {
        ctx.strokeStyle = clr.getAttribute("data-clr");
    });
});

window.addEventListener("mousedown", (e) => {
    prevX = e.clientX;
    prevY = e.clientY;
    draw = true;
});

window.addEventListener("mouseup", () => {
    draw = false;
});

window.addEventListener("mousemove", (e) => {
    if (!draw) return;
   
    let currentX = e.clientX;
    let currentY = e.clientY;

    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();

    prevX = currentX;
    prevY = currentY;
});

function doneBtn(){
    if (promptNum < prompts.length) {
        document.getElementById("prompt-img").src = `/images/${picture[promptNum]}.png`;
        solution.classList.add('active');
        document.querySelector(".prompt-text").innerHTML = descriptions[promptNum];
    }
}

function nextPrompt(){
    promptNum++;
    if(promptNum < prompts.length){
        solution.classList.remove('active');
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
        document.getElementById("prompt").innerText = prompts[promptNum-1];
        return true;
    } else {
        solution.style.display = "none";
        return false;
    }
}



let clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});


let crossBtn = document.querySelector(".cross");
crossBtn.addEventListener("click", () => {
    doneStatus = true;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    nextPrompt();
});