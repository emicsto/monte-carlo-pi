let radius = 200;
let width = 2 * radius;
let height = 2 * radius;


let iterations = 100000;
let pointsInCircle = 0;
let pointsInSquare = 0;

let pointsInCircleSpan = document.getElementById('pointsInCircle');
let pointsInSquareSpan = document.getElementById('pointsInSquare');
let approximatePiSpan = document.getElementById('approximatePi');
let toggler = document.getElementById('toggler');

let isRunning = false;

function random(min, max) {
    return Math.random() * (max - min + 1) + min;
}

function centerPointer() {
    translate(radius, radius);
}

function drawPoints(n) {
    for (let i = 0; i < n; i++) {
        iterations--;
        pointsInSquare++;
        
        let x = random(-radius, radius);
        let y = random(-radius, radius);

        stroke('#f00');

        if (x * x + y * y <= radius * radius) {
            pointsInCircle++;

            stroke('#0f0');
        }

        point(x, y);
    }
}

function updateResult() {
    pointsInCircleSpan.innerText = pointsInCircle;
    pointsInSquareSpan.innerText = pointsInSquare;
    approximatePiSpan.innerText = (4.0 * (pointsInCircle / pointsInSquare)).toFixed(4) + ' (' + ((Math.abs(3.14159265359 - parseFloat(4.0 * (pointsInCircle / pointsInSquare))) / 3.14159265359) * 100).toFixed(2) + '%)';
}

toggler.addEventListener('click', function () {
    toggle();
});

function toggle() {
    if (isRunning) {
        noLoop();
        toggler.innerText = 'Start';
    } else {
        loop();
        toggler.innerText = 'Stop';
    }

    isRunning = !isRunning;
}

function setup() {
    let canvas = createCanvas(width, height);
    canvas.parent('canvas');

    centerPointer();

    rectMode(CENTER);
    fill('#000');
    rect(0, 0, width, height);
    
    stroke('#fff');
    ellipseMode(CENTER);
    ellipse(0, 0, width - 1, height - 1);
}

function draw() {
    if (!isRunning) {
        return;
    }

    if (iterations <= 0) {
        noLoop();
        toggler.setAttribute('disabled', 'disabled');

        return;
    }

    centerPointer();
    drawPoints(250);
    updateResult();
}