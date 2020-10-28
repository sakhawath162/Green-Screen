var fgImg = null;
var bgImg = null;

function loadForeground() {
  var fgCanvas = document.getElementById("fgcan");
  //Get file input
  var fgInput = document.getElementById("fginput");
  fgImg = new SimpleImage(fgInput);
  //Display image on canvas
  fgImg.drawTo(fgCanvas);
}

function loadBackground() {
  var bgCanvas = document.getElementById("bgcan");
  //Get file input
  var bgInput = document.getElementById("bginput");
  bgImg = new SimpleImage(bgInput);
  //Display image on canvas
  bgImg.drawTo(bgCanvas);
}

function doGreenScreen() {
  //Checks before beginning
  if (fgImg === null || !fgImg.complete()) {
    alert("Foreground image not loaded.");
    return;
  }
  if (bgImg === null || !bgImg.complete()) {
    alert("Background image not loaded.");
    return;
  }
  if (bgImg.getWidth() < fgImg.getWidth() || bgImg.getHeight() < fgImg.getHeight()) {
    alert("Background image too small for foreground");
    return;
  }
  
  //Make greenscreen version
  var output = new SimpleImage(fgImg.getWidth(), fgImg.getHeight());
  for (var pixel of fgImg.values()) {
    if (pixel.getGreen() > pixel.getRed() + pixel.getBlue()) {
        var newPixel = bgImg.getPixel(pixel.getX(), pixel.getY());
        output.setPixel(pixel.getX(), pixel.getY(), newPixel);
    } else {
        output.setPixel(pixel.getX(), pixel.getY(), pixel);
    }
  }
  //Display new image on canvas
  var outputCanvas = document.getElementById("outputcan");
  var outCtx = outputCanvas.getContext("2d");
  outCtx.clearRect(0, 0, outputCanvas.width, outputCanvas.height);
  output.drawTo(outputCanvas);
}

function clearCanvases() {
  var fgCanvas = document.getElementById("fgcan");
  var bgCanvas = document.getElementById("bgcan");
  var outputCanvas = document.getElementById("outputcan");
  //Clear canvases
  var fgCtx = fgCanvas.getContext("2d");
  fgCtx.clearRect(0, 0, fgCanvas.width, fgCanvas.height);
  var bgCtx = bgCanvas.getContext("2d");
  bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
  var outCtx = outputCanvas.getContext("2d");
  outCtx.clearRect(0, 0, outputCanvas.width, outputCanvas.height);
  //Reset image values to null
  fgImg = null;
  bgImg = null;
}