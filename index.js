let capture;

const WIDTH = 1280/4
const HEIGHT = 960/4


function setup() {
    createCanvas(WIDTH, HEIGHT);
    capture = createCapture(VIDEO);
    capture.size(WIDTH, HEIGHT);
    //capture.hide();
}

const history = new Array(HEIGHT)
let frame = 0

function draw() {
    background(255);
    image(capture, 0, 0, WIDTH, HEIGHT);

    loadPixels();

    history[frame % HEIGHT] = pixels.slice()

    if (frame > HEIGHT) {
        for (let y = 0; y < height; y++) {
            prevPixels = history[y]
            for (let x = 0; x < width; x++) {
                let index = (x + y * width) * 4;
                let r = prevPixels[index + 0];
                let g = prevPixels[index + 1];
                let b = prevPixels[index + 2];
                let a = prevPixels[index + 3];


                pixels[index + 0] = r;
                pixels[index + 1] = g;
                pixels[index + 2] = b;
                pixels[index + 3] = a;
            }
        }
    }
    updatePixels();
    ++frame;
}
