var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');



canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var initiateRocket = [innerWidth/2, innerHeight]
var rocketFinish = false
var rocketX = 0
var rocketY = 0
var vectorX = initiateRocket[0] 
var vectorY = initiateRocket[1] 
var x = 0;
var y = 0;
var particles = []
var click = true

function feedParticle(x,y,color) {
    let min = 0; 
let max = 20;
for (let index = 0; index < 150; index++) {
    particles.push([[x,y], [(Math.random() * (max - min) + min)/10-1, (Math.random() * (max - min) + min)/10-1], 10, color])            
}
}

function draw() {
    
    requestAnimationFrame(draw);
    ctx.clearRect(0,0,innerWidth,innerHeight);

    function rocket() { 

        ctx.beginPath();
        ctx.fillStyle = `hsl(180, 80%, 70%)`
        ctx.arc(vectorX,vectorY,10,0,2*Math.PI)
        ctx.fill()

        if (vectorY<=rocketY){
            rocketFinish = true
        }
        if(rocketX != 0 && rocketY != 0){
            vectorX+= (rocketX-initiateRocket[0])/25
            vectorY+= (rocketY-initiateRocket[1])/25
        }
    }

    function draw_particle() {

        particles.forEach(particle => {
            
            particle[0][0] += particle[1][0]*2.3
            particle[0][1] += particle[1][1]*2.5
            particle[1][1] += 0.03
            particle[2] -= 0.2

            if (particle[2] >= 0) {
            ctx.beginPath();
            ctx.fillStyle = `hsl(${particle[3]}, 80%, 70%)`
            particle[3]+=3
            ctx.arc(particle[0][0],particle[0][1],particle[2],0,2*Math.PI)
            ctx.fill()
            }

            if (particle[2] <= 0) {
                particles.shift()
            }

        }); 

    }
    
    canvas.addEventListener('click',function(e){
        click = false
        rocketX = e.clientX
        rocketY = e.clientY
        rocketFinish=false
        vectorX = initiateRocket[0] 
        vectorY = initiateRocket[1] 

    })

    if(rocketFinish==false) {
    rocket()
    }

    if (rocketFinish == true) {
        draw_particle()
    }


    if (click == true) {
        ctx.font = '50px arial';
        ctx.fillStyle = "#EDF5E1";
        ctx.fillText("CLICK", (innerWidth/2)-50,(innerHeight/2)-25);
    }

}

draw()

canvas.addEventListener('click',function(e){
    click = false
    let x = e.clientX
    let y = e.clientY
    let color = (Math.random() * (360 - 0) + 0)
    feedParticle(x,y,color)
})

