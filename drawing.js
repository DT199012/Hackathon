const canvas = document.getElementById("canvas");
const body = document.querySelector("body");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const solution = document.querySelector('.ourPrompt');
const prompts  = ["Draw a volcano with lava","Draw an apple falling from a tree","Draw a pizza slice","Draw a face",""]
//["Draw a house with shapes in it.", "Draw a playground with different shapes in it."]


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