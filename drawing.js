const canvas = document.getElementById("canvas");
const body = document.querySelector("body");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const prompts  = ["Draw a house with shapes in it.", "Draw a playground with different shapes in it."]

var theColor = '';
var lineW = 5;
let prevX = null;
let prevY = null;
let draw = false;
let doneStatus = false;

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

function givePrompts(){
    for(prompt in prompts){
        background.querySelector(".prompt").innerHTML = prompt;
        while(!doneStatus){}
    }
}

let clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

let doneBtn = document.querySelector(".done");
doneBtn.addEventListener("click", () => {
    doneStatus = true;
});