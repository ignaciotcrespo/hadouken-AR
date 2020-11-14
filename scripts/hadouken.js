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

    faceDetectorCallback: onFaceDetected,
    eyes: false,

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
    document.getElementById("messageLayer").outerHTML = ""
}

var fca = document.getElementById("canvas_face");
var fcontext = fca.getContext("2d");
fcontext.fillStyle = "#FF0000";

function onFaceDetected(face){
    fcontext.clearRect(0, 0, fca.width, fca.height);
    if(hadouken.eyes){
//    drawEye(face.annotations.leftEyeUpper0);
//    drawEye(face.annotations.leftEyeUpper1);
//    drawEye(face.annotations.leftEyeUpper2);
    drawEye(face.annotations.leftEyeLower0);
//    drawEye(face.annotations.leftEyeLower1);
//    drawEye(face.annotations.leftEyeLower2);
//    drawEye(face.annotations.leftEyeLower3);
//    drawEye(face.annotations.leftEyebrowUpper);
//    drawEye(face.annotations.leftEyebrowLower);
    
//    drawEye(face.annotations.rightEyeUpper0);
//    drawEye(face.annotations.rightEyeUpper1);
//    drawEye(face.annotations.rightEyeUpper2);
//    drawEye(face.annotations.rightEyeLower0);
//    drawEye(face.annotations.rightEyeLower1);
//    drawEye(face.annotations.rightEyeLower2);
//    drawEye(face.annotations.rightEyeLower3);
//    drawEye(face.annotations.rightEyebrowUpper);
//    drawEye(face.annotations.rightEyebrowLower);

//    drawEye(face.annotations.midwayBetweenEyes);
    }
}

function clearFaces() {
    fcontext.clearRect(0, 0, fca.width, fca.height);
}

var stage;
var particles = [];
var max = 60;
var mouseX=0;
var mouseY=0;

var speed=3;
var size=5;

//The class we will use to store particles. It includes x and y
//coordinates, horizontal and vertical speed, and how long it's
//been "alive" for.
function Particle(x, y, xs, ys) {
  this.x=x;
  this.y=y;
  this.xs=xs;
  this.ys=ys;
  this.life=0;
}

//function resizeCanvas() {
//  setTimeout(function() {
//    width = window.innerWidth;
//    height = window.innerHeight;
//    canvas.width = width;
//    canvas.height = height;
//    canvas.style.width = width + "px";
//    canvas.style.height = height + "px";
//    mouseX=canvas.width/2;
//    mouseY=canvas.height*0.8;
//   stage.globalCompositeOperation="lighter"
//  }, 0);
//}

function init_fire() {

  //See if the browser supports canvas
    //Get the canvas context to draw onto
    stage = fcontext;

    //Makes the colors add onto each other, producing
    //that nice white in the middle of the fire
    stage.globalCompositeOperation="xor";

//    window.addEventListener("resize", function() {
//      resizeCanvas();
      stage.globalCompositeOperation="lighter";
//      mouseX=canvas.width/2;
//      mouseY=canvas.height*0.8;
//    });

    //Update the particles every frame
//    var timer=setInterval(update,40);

}

//function getMousePos (evt) {
//  var rect = canvas.getBoundingClientRect();
//  var root = document.documentElement;
//
//   return mouse position relative to the canvas
//  mouseX = evt.clientX - rect.left - root.scrollLeft;
//  mouseY = evt.clientY - rect.top - root.scrollTop;
//}

function update_fire() {

  //Adds ten new particles every frame
  for (var i=0; i<10; i++) {

    if(isDrawingFluids) {
        //Adds a particle at the mouse position, with random horizontal and vertical speeds
        var p = new Particle(mouseX, mouseY, (Math.random()*2*speed-speed)/2, 0-Math.random()*2*speed);
        particles.push(p);
    }
  }

  //Clear the stage so we can draw the new frame
  clearFaces();

  //Cycle through all the particles to draw them
  for (i=0; i<particles.length; i++) {

    //Set the file colour to an RGBA value where it starts off red-orange, but progressively gets more grey and transparent the longer the particle has been alive for
    stage.fillStyle = "rgba("+(260-(particles[i].life*2))+","+((particles[i].life*2)+50)+","+(particles[i].life*2)+","+(((max-particles[i].life)/max)*0.4)+")";

    stage.beginPath();
    //Draw the particle as a circle, which gets slightly smaller the longer it's been alive for
    stage.arc(particles[i].x,particles[i].y,(max-particles[i].life)/max*(size/2)+(size/2),0,2*Math.PI);
    stage.fill();

    //Move the particle based on its horizontal and vertical speeds
    particles[i].x+=particles[i].xs;
    particles[i].y+=particles[i].ys;

    particles[i].life++;
    //If the particle has lived longer than we are allowing, remove it from the array.
    if (particles[i].life >= max) {
      particles.splice(i, 1);
      i--;
    }
  }
}

init_fire();

function drawEye(eye) {
//    try{
    //    console.log("face: "+ eye);
        var posx = parseInt(eye[4][0]);
        var posy = parseInt(eye[4][1]);

    //    console.log("face X,Y: "+ posx +","+posy);
//        fcontext.beginPath();
//        fcontext.arc(posx, posy, 2, 0, 2 * Math.PI);
//        fcontext.stroke();
//        fcontext.fill();

        mouseX = posx;
        mouseY = posy;
        update_fire();

//    }catch(e){}
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

var isDrawingFluids = hadouken.handsDetectionEngine == 1 ? true : false;

// https://github.com/tensorflow/tfjs-models/tree/master/handpose
//                thumb: [1, 2, 3, 4],
//                indexFinger: [5, 6, 7, 8],
//                middleFinger: [9, 10, 11, 12],
//                ringFinger: [13, 14, 15, 16],
//                pinky: [17, 18, 19, 20],
//                palmBase: [0]
function onHandDetected2(prediction){
    isDrawingFluids = false;
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
                isDrawingFluids = true;
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
