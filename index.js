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

    history[frame % HEIGHT] = pixels

    if (frame > HEIGHT) {
        for (let y = 0; y < height; y++) {
            prevPixels = history[y]
            const lineOffset = y * width * 4
            for (let x = 0; x < width; x++) {
                const pixelOffset = lineOffset + x * 4
                for (let channel = 0; channel < 4; channel++) {
                    const i = pixelOffset + channel
                    pixels[i] = prevPixels[i]
                }
            }
        }
    }
    updatePixels();
    ++frame;
}
