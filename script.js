let model, webcam, ctx, labelContainer, maxPredictions;

async function setup() {
  const URL = "https://teachablemachine.withgoogle.com/models/PRB_hn_nt/";
  model = await tmImage.loadFromFiles(URL + "model.json", URL + "metadata.json");
  maxPredictions = model.getTotalClasses();

  const flip = true;
  webcam = new tmImage.Webcam(224, 224, flip);
  await webcam.setup();
  await webcam.play();

  createCanvas(224, 224);
  ctx = canvas.getContext("2d");
  document.getElementById("status").innerText = "Model Loaded";
  document.getElementById("prediction").innerText = "Waiting for prediction...";
  labelContainer = document.getElementById("prediction");
  for (let i = 0; i < maxPredictions; i++) {
    labelContainer.appendChild(document.createElement("div"));
  }
}

async function draw() {
  webcam.update();
  await predict();
}

async function predict() {
  const prediction = await model.predict(webcam.canvas);
  for (let i = 0; i < maxPredictions; i++) {
    const classPrediction =
      prediction[i].className + ": " + prediction[i].probability.toFixed(2);
    labelContainer.childNodes[i].innerHTML = classPrediction;
  }
}
