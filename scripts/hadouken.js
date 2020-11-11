// ------ CONFIG -----------------------------------------------------------------------------------------------------------------------------------------------

const hadouken = {

    // draw a square where a hand is detected
    drawHandBox: false,

    // black alpha in top of video, to make it darker. Set a lower value to make the video clearer.
    darkLayerOpacity: 0.4,

    // hand detection parameters
    handDetectionModelParams: {
      flipHorizontal: true,   // flip e.g for video
      maxNumBoxes: 1,        // maximum number of boxes to detect
      iouThreshold: 0.5,      // ioU threshold for non-max suppression
      scoreThreshold: 0.79,    // confidence threshold for predictions.
    },

    // draw fps in top/left corner
    drawFps: false,

    // margin at right of vieo to show the controls to manage the fluid effects.
    rightMarginForControls: 0.20,

    // set here your own callback for hands detector.
    // the current detector draws the fluid
    // Parameters: posX, posY
    handsDetectorCallback: onHandDetected,

    // set to false to disable fluids
    drawFluids: true,
}

// ------ INTERNAL ---------------------------------------------------------------------------------------------------------------------------------------------

const hadoukenVideo = document.querySelector("#videoElement");
const canvasHands = document.getElementById("canvasHands");
const contextHands = canvasHands.getContext("2d");
let handDetectionModel = null;

resizeLayers();
startWebCamera();

function onHandDetected(posX, posY){
    if(posX > 0 && posY > 0) {
        //console.log("Predictions: ", posX +","+ posY);
        drawFluid(posX, posY);
    }
}

function resizeLayers() {
    Array.from(document.getElementsByClassName("box")).forEach( box => {
        box.style.width =  ((1 - hadouken.rightMarginForControls) * 100) + "%";
    });
}


function drawFluid(posX, posY) {
    if(hadouken.drawFluids){
        var pointer = pointers.find(function (p) { return p.id == -1; });
        if (pointer == null) {
            pointer = new pointerPrototype();
        }
        updatePointerMoveData(pointer, posX, posY);
    }
}


function startWebCamera() {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
          initializeWebVideo(stream)
          startHandsDetection();
        })
        .catch(function (err0r) {
          console.log("Something went wrong! "+ err0r);
        });
    }
}

function initializeWebVideo(stream) {
    hadoukenVideo.srcObject = stream;
    hadoukenVideo.width =  window.innerWidth * (1 - hadouken.rightMarginForControls);
    hadoukenVideo.height = window.innerHeight;
    hadoukenVideo.scale = true;
}

function startHandsDetection(){
    //Load the hands detection model.
    handTrack.load(hadouken.handDetectionModelParams).then(model => {
        // detect objects in the image.
        handDetectionModel = model
        runHandsDetectionInCurrentFrame();
    });
}

function runHandsDetectionInCurrentFrame() {
    handDetectionModel.detect(hadoukenVideo).then(predictions => {
        handDetectionModel.renderPredictions(predictions, canvasHands, contextHands, hadoukenVideo);

        if(predictions.length > 0){
         for(i=0; i<predictions.length; i++) {
           // var i=0;
            var posX = scaleByPixelRatio(parseInt(predictions[i].bbox[0] + predictions[i].bbox[2]/2));
            var posY = scaleByPixelRatio(parseInt(predictions[i].bbox[1] + predictions[i].bbox[3]/2));
            hadouken.handsDetectorCallback(posX, posY);
          }
        }

        // only for video
        requestAnimationFrame(runHandsDetectionInCurrentFrame);
    });
}

function updateDarkLayer() {
    document.getElementById("darkTransparentLayer").style.opacity = "" + hadouken.darkLayerOpacity;
}

updateDarkLayer();

