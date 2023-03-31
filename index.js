/* global p5 defaultCanvas0 $frame $fps $size */

(async () => {
  async function getCameraSize () {
    // suppose we require a full HD video
    const constraints = {
      audio: false,
      video: {
        width: 256,
        height: 256
      },
    }

    const stream = await navigator.mediaDevices.getUserMedia(constraints)

    const streamSettings = stream.getVideoTracks()[0].getSettings()

    return {
      cameraWidth: streamSettings.width,
      cameraHeight: streamSettings.height
    };
  }

  const { cameraWidth, cameraHeight } = await getCameraSize()

  const s = (p) => {
    let capture
    let d
    let dw

    p.setup = function () {
      p.createCanvas(cameraWidth, cameraHeight)
      capture = p.createCapture(p.VIDEO)
      capture.size(cameraWidth, cameraHeight)
      capture.hide()
      d = p.pixelDensity()
      dw = d * p.width
    };

    const AGE = cameraHeight
    const history = new Array(AGE)
    let frame = 0

    p.draw = function () {
      p.background(255)
      p.image(capture, 0, 0, cameraWidth, cameraHeight)

      p.loadPixels()

      history[frame % AGE] = p.pixels.slice()

      if (frame > AGE) {
        for (let y = 0; y < p.height; y++) {
          const prevPixels =
            history[Math.trunc(frame + (y * AGE) / cameraHeight) % AGE]
          const subpixelY0 = y * d
          for (let x = 0; x < p.width; x++) {
            const subpixelX0 = x * d
            for (let j = 0; j < d; j++) {
              const subpixelOffset = (subpixelY0 + j) * dw
              for (let i = 0; i < d; i++) {
                const index = 4 * (subpixelOffset + subpixelX0 + i)
                for (let channel = 0; channel < 4; channel++) {
                  p.pixels[index + channel] = prevPixels[index + channel]
                }
              }
            }
          }
        }
      }
      p.updatePixels()
      ++frame
      $size.innerText = `${cameraWidth}x${cameraHeight}`
      $frame.innerText = `${frame}`
      $fps.innerText = `${p.frameRate().toFixed(2)}`
    };
  }

  new p5(s, '$p5')
  defaultCanvas0.style.height = 'auto';
  defaultCanvas0.style.width = '90vmin';
})()
