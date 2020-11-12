// ------ CONFIG -----------------------------------------------------------------------------------------------------------------------------------------------

const hadouken = {

    // engine used for hands detection.
    // engine 1 is simple, and can detect many hands, but can not detect fingers.
    // engine 2 is better, some comments:
    //      - can detect fingers!
    //      - issue: detects only one hand.
    //      - I've decided to draw fluids simulation only when the hand is open, with the fingers up. It has a "wizard" feeling.
    handsDetectionEngine: 2,

    // engine 1: draw a square where a hand is detected
    // engine 2: draw a hand skeleton where a hand is detected
    drawHandBox: false,

    // black alpha in top of video, to make it darker. Set a lower value to make the video clearer.
    darkLayerOpacity: 0.4,

    // hand detection parameters
    handDetectionModelParams: {
      flipHorizontal: true,   // flip e.g for video

      // valid only for detection engine 1
      maxNumBoxes: 1,        // maximum number of boxes to detect
      iouThreshold: 0.5,      // ioU threshold for non-max suppression
      scoreThreshold: 0.79,    // confidence threshold for predictions.
    },

    // draw fps in top/left corner (currently it works only in detection engine 1)
    drawFps: false,

    // margin at right of vieo to show the controls to manage the fluid effects.
    rightMarginForControls: 0.20,

    // set here your own callback for hands detector, in case you create your own detector.
    handsDetectorCallback: onHandDetected,

    // set to false to disable fluids
    drawFluids: true,

    // the callback when the video recording is ready
    // parameters: width, height
    onVideoInitialized: handsDetectorVideoInitialized,

}

// ------ INTERNAL ---------------------------------------------------------------------------------------------------------------------------------------------

var hadoukenVideo;
var canvasHands;
var contextHands;
var handDetectionModel;
if(hadouken.handsDetectionEngine == 1) {
    hadoukenVideo = document.querySelector("#videoElement");
    canvasHands = document.getElementById("canvasHands");
    contextHands = canvasHands.getContext("2d");
    handDetectionModel = null;
}

resizeLayers();
startWebCamera();

function handsDetectorVideoInitialized(width, height) {
    initFluids(width, height);
}

function onHandDetected(prediction){
    if(hadouken.handsDetectionEngine == 1) {
        onHandDetected1(prediction);
    } else if(hadouken.handsDetectionEngine == 2) {
        onHandDetected2(prediction);
    } else {
        console.log("unknown callback!")
    }
}

function onHandDetected1(prediction){
    var posX = scaleByPixelRatio(parseInt(prediction.bbox[0] + prediction.bbox[2]/2));
    var posY = scaleByPixelRatio(parseInt(prediction.bbox[1] + prediction.bbox[3]/2));
    if(posX > 0 && posY > 0) {
        //console.log("Predictions: ", posX +","+ posY);
        drawFluid(posX, posY);
    }
}

// https://github.com/tensorflow/tfjs-models/tree/master/handpose
//                thumb: [1, 2, 3, 4],
//                indexFinger: [5, 6, 7, 8],
//                middleFinger: [9, 10, 11, 12],
//                ringFinger: [13, 14, 15, 16],
//                pinky: [17, 18, 19, 20],
//                palmBase: [0]
function onHandDetected2(prediction){
    if(prediction.handInViewConfidence > 0.9) {
        // draw fluids in base middle finger
        var posX = scaleByPixelRatio(prediction.annotations.middleFinger[0][0]);
        var posY = scaleByPixelRatio(prediction.annotations.middleFinger[0][1]);

        // detect open hand
        if(
            isFingerOpen(prediction.annotations.middleFinger)
            && isFingerOpen(prediction.annotations.indexFinger)
            && isFingerOpen(prediction.annotations.ringFinger)
//            && isFingerOpen(prediction.annotations.pinky)
        ){
            if(posX > 0 && posY > 0) {
//                console.log("Predictions: ", posX +","+ posY);
                drawFluid(posX, posY);
            }
        }
    }
}

function isFingerOpen(finger) {
    var open = true;
    var y = finger[0][1];
    for(var i=1; i<finger.length; i++){
        var newY = finger[i][1];
        if(newY > y) {
            open = false;
            break;
        }
        y = newY;
    }
    if(!open){
        // detect open down. Not useful for hadouken. Detection jumps from one hand to another. Flickering.
//        open = true;
//        var y = finger[0][1];
//        for(var i=1; i<finger.length; i++){
//            var newY = finger[i][1];
//            if(newY < y) {
//                open = false;
//                break;
//            }
//            y = newY;
//        }
    }
    return open;
}

function resizeLayers() {
    Array.from(document.getElementsByClassName("box")).forEach( box => {
        box.style.width =  ((1 - hadouken.rightMarginForControls) * 100) + "%";
    });
    // reload fluids, or load it after layers are resized
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
    if(hadouken.handsDetectionEngine == 1){
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
}

function initializeWebVideo(stream) {
    var w = window.innerWidth * (1 - hadouken.rightMarginForControls);
    var h = window.innerHeight;
    hadoukenVideo.srcObject = stream;
    hadoukenVideo.width =  w;
    hadoukenVideo.height = h;
    hadoukenVideo.scale = true;
    hadouken.onVideoInitialized(w, h);
}

function startHandsDetection(){
    if(hadouken.handsDetectionEngine == 1) {
        //Load the hands detection model.
        handTrack.load(hadouken.handDetectionModelParams).then(model => {
            // detect objects in the image.
            handDetectionModel = model
            runHandsDetectionInCurrentFrame();
        });
    }
}

function runHandsDetectionInCurrentFrame() {
    handDetectionModel.detect(hadoukenVideo).then(predictions => {
        handDetectionModel.renderPredictions(predictions, canvasHands, contextHands, hadoukenVideo);

        if(predictions.length > 0){
         for(i=0; i<predictions.length; i++) {
            hadouken.handsDetectorCallback(predictions[i]);
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
