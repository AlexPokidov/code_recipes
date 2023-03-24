function listenerVisual() {
  const audio = document.querySelector('.audio');
  const canvas = document.querySelector('.visual').getContext("2d");
  const WIDTH = 500;
  const HEIGHT = 400;
  let bufferLength = null;
  let drawVisual = null;
  let dataArray = null;
  let analyser = null;
  console.log('audio', audio)

  let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  

  audio.addEventListener('play', (e) => {
    console.log('event', e)
    
    let stream = audio.captureStream();
    console.log('stream', stream)
    analyser = audioCtx.createAnalyser();
    source = audioCtx.createMediaStreamSource(stream);
    console.log('audio', source)
    source.connect(analyser);
    analyser.fftSize = 2048;
    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
    console.log('dataArray', dataArray);
    analyser.getByteFrequencyData(dataArray);
    // analyser.connect(distortion);
    // distortion.connect(audioCtx.destination)
    draw();
  })

  function draw() {
    canvas.clearRect(0, 0, WIDTH, HEIGHT);

    analyser.getByteFrequencyData(dataArray);
    console.log(dataArray)

    canvas.fillStyle = "#fff";
    canvas.fillRect(0, 0, WIDTH, HEIGHT);

    canvas.lineWidth = 2;
    canvas.strokeStyle = "rgb(0, 0, 0)";

    canvas.beginPath();

    let barWidth = (WIDTH * 1.0) / bufferLength;
    let barHeight = 0;
    let heightScale = HEIGHT/128;
    let x = 0;

    for(var i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i];


      canvas.fillStyle = 'rgb(' + (barHeight+0) + ',10,160)';
      barHeight *= heightScale;
      canvas.fillRect(x, HEIGHT-barHeight/2, barWidth, barHeight/2);

      x += barWidth + 2;
    }

    // canvas.lineTo(canvas.width, canvas.height / 2);
    // canvas.stroke();

    requestAnimationFrame(draw);
  }

}

listenerVisual()