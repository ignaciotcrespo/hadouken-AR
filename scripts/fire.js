var fca = document.getElementById("canvas_face");
var fcontext = fca.getContext("2d");
fcontext.fillStyle = "#FF0000";
var fire1 = new FireEye();
var fire2 = new FireEye();

function clearFaces() {
    fcontext.clearRect(0, 0, fca.width, fca.height);
}

function FireEye() {
    this.particles = [];
    this.max = 60;
    this.mouseX=0;
    this.mouseY=0;

    this.speed=3;
    this.size=5;

    this.update_fire = function() {

        var stage = fcontext;
        var particles = this.particles;
        var max = this.max;
        var size = this.size;

      //Adds ten new particles every frame
      for (var i=0; i<10; i++) {

        if(isDrawingFluids) {
            //Adds a particle at the mouse position, with random horizontal and vertical speeds
            var p = new Particle(this.mouseX, this.mouseY, (Math.random() * 2 * this.speed - this.speed)/2, 0 - Math.random() * 2 * this.speed);
            particles.push(p);
        }
      }

      //Clear the stage so we can draw the new frame
//      clearFaces();

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
}

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

    function init_fire() {

      //See if the browser supports canvas
        //Get the canvas context to draw onto
        var stage = fcontext;

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

init_fire();
