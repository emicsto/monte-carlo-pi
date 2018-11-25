let pointsInSquare = 0;
let pointsInCircle = 0;
let r = 200;
let x;
let y;
let approximatePi;
let pi;
let circle;
let square;
let difference = 0;
let record;
let recordPi = 0;

function setup() {
    let canvas = createCanvas(500, 500);
    canvas.parent('sketch-holder');
    pi = select('#pi');
    approximatePi = select('#approximatePi');
    circle = select('#circle');
    square = select('#square');
    record = select('#record');
    difference = select('#difference');

    translate(width / 2, height / 2);

    noFill();
    ellipse(0, 0, r * 2, r * 2);
    rectMode(CENTER);
    rect(0, 0, r * 2, r * 2);
}

function draw() {

    translate(width / 2, height / 2);

    calculatePi(100);

    approximatePi.html(pi);
    difference.html('Difference: ' + diff);
    circle.html(pointsInCircle);
    square.html(pointsInSquare);
}

function calculatePi(n) {
    for (let i = 0; i < n; i++) {
        x = random(-r, r);
        y = random(-r, r);

        ++pointsInSquare;

        if (x * x + y * y < r * r) {
            stroke(0, 255, 0);
            ++pointsInCircle;
        } else {
            stroke(255, 0, 0);
        }

        point(x, y);

        pi = (4.0 * (pointsInCircle / pointsInSquare));

        let recordDiff = abs(PI - recordPi);
        diff = abs(PI - pi)
        if (diff < recordDiff) {
            recordDiff = diff;
            recordPi = pi;
            record.html('Record PI: ' + recordPi);
        }
    }
}