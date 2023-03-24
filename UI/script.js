function listenerVisual() {
  const audio = document.querySelector(".audio");
  const canvas = document.querySelector(".visual").getContext("2d");
  let WIDTH = canvas.canvas.clientWidth;
  let HEIGHT = canvas.canvas.clientHeight;
  let bufferLength = null;
  let drawVisual = null;
  let dataArray = null;
  let analyser = null;
  console.log("audio", canvas);

  let audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  audio.addEventListener("play", (e) => {
    console.log("event", e);

    let stream = audio.captureStream();
    console.log("stream", stream);
    analyser = audioCtx.createAnalyser();
    source = audioCtx.createMediaStreamSource(stream);
    console.log("audio", source);
    source.connect(analyser);
    analyser.fftSize = 2048;
    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
    console.log("dataArray", dataArray);
    analyser.getByteFrequencyData(dataArray);
    // analyser.connect(distortion);
    /// distortion.connect(audioCtx.destination)
    draw();
  });

  function draw() {
    canvas.clearRect(0, 0, WIDTH, HEIGHT);

    analyser.getByteFrequencyData(dataArray);

    canvas.fillStyle = "#000";
    canvas.fillRect(0, 0, WIDTH, HEIGHT);

    canvas.lineWidth = 2;
    canvas.strokeStyle = "rgb(0, 0, 0)";

    canvas.beginPath();

    let barWidth = (WIDTH * 1.0) / bufferLength;
    let barHeight = 0;
    let heightScale = HEIGHT / 256;
    let x = 0;

    for (var i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i];

      canvas.fillStyle = `rgb(${barHeight * 1}, 203, 52)`;
      barHeight *= heightScale;
      canvas.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight / 2);

      x += barWidth + 2;
    }

    // canvas.lineTo(canvas.width, canvas.height / 2);
    // canvas.stroke();

    requestAnimationFrame(draw);
  }
}

listenerVisual();
