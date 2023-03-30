/* global p5 $frame $fps */

(async () => {
  async function getCameraSize () {
    // suppose we require a full HD video
    const constraints = {
      audio: false,
      video: {
        width: 400,
        height: 400
      }
    }

    const stream = await navigator.mediaDevices.getUserMedia(constraints)

    const streamSettings = stream.getVideoTracks()[0].getSettings()

    return {
      cameraWidth: streamSettings.width,
      cameraHeight: streamSettings.height
    }
  }

  const { cameraWidth, cameraHeight } = await getCameraSize()

  const s = (p) => {
    let capture

    p.setup = function () {
      p.createCanvas(cameraWidth, cameraHeight)
      capture = p.createCapture(p.VIDEO)
      capture.size(cameraWidth, cameraHeight)
      capture.hide()
    }

    const history = new Array(cameraHeight)
    let frame = 0

    p.draw = function () {
      p.background(255)
      p.image(capture, 0, 0, cameraWidth, cameraHeight)

      p.loadPixels()

      history[frame % cameraHeight] = p.pixels.slice()

      if (frame > cameraHeight) {
        for (let y = 0; y < p.height; y++) {
          const prevPixels = history[(frame + y) % cameraHeight]
          const lineOffset = y * p.width * 4
          for (let x = 0; x < p.width; x++) {
            const pixelOffset = lineOffset + x * 4
            for (let channel = 0; channel < 4; channel++) {
              const i = pixelOffset + channel
              p.pixels[i] = prevPixels[i]
            }
          }
        }
      }
      p.updatePixels()
      ++frame
      $size.innerText = `${cameraWidth}x${cameraHeight}`
      $frame.innerText = `${frame}`
      $fps.innerText = `${p.frameRate().toFixed(2)}`
    }
  }

  new p5(s,'$p5')
  defaultCanvas0.style.height = 'auto'
  defaultCanvas0.style.width = '90vmin'
})()
