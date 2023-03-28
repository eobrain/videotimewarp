let capture;

function setup() {
    createCanvas(390, 240);
    capture = createCapture(VIDEO);
    capture.size(320, 240);
    //capture.hide();
}

function draw() {
    background(255);
    image(capture, 0, 0, 320, 240);

    loadPixels();
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            var index = (x + y * width) * 4;
            var r = pixels[index + 0];
            var g = pixels[index + 1];
            var b = pixels[index + 2];
            var a = pixels[index + 3];

            var luma = r * .299 + g * .587 + b * .0114;

            pixels[index + 0] = luma;
            pixels[index + 1] = luma;
            pixels[index + 2] = luma;
        }
    }
    updatePixels();
}
