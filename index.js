let capture;

const WIDTH = 1280 / 2
const HEIGHT = 960 / 2


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
            pixels.set(prevPixels.slice(y * width * 4, (y + 1) * width * 4), y * width * 4);
        }
    }
    updatePixels();
    ++frame;
}
