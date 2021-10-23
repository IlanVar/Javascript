var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');



canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var x = innerWidth/2;
var y = innerHeight/2;
var particles = []

function feedParticle(x,y,color) {
    let min = 0; 
let max = 20;
for (let index = 0; index < 75; index++) {
    particles.push([[x,y], [(Math.random() * (max - min) + min)/10-1, (Math.random() * (max - min) + min)/10-1], 10, color])            
}
}


function draw() {
    
    requestAnimationFrame(draw);
    ctx.clearRect(0,0,innerWidth,innerHeight);

    

    function draw_particle() {

        particles.forEach(particle => {
            
            particle[0][0] += particle[1][0]*2.5
            particle[0][1] += particle[1][1]*2.5
            particle[1][1] += 0.03
            particle[2] -= 0.1

            if (particle[2] >= 0) {
            ctx.beginPath();

            ctx.fillStyle = `rgb(${particle[3]})`
            ctx.arc(particle[0][0],particle[0][1],particle[2],0,2*Math.PI)
            ctx.fill()
            }

            if (particle[2] <= 0) {
                particles.shift()
            }

        });

    }
    draw_particle()
    ctx.font = '50px arial';
    ctx.fillStyle = "#EDF5E1";
    ctx.fillText("CLICK", (innerWidth/2)-50,(innerHeight/2)-25);
}

draw()

canvas.addEventListener('click',function(e){
    let x = e.clientX
    let y = e.clientY
    let r = (Math.random() * (255 - 0) + 0)
    let g = (Math.random() * (255 - 0) + 0)
    let b = (Math.random() * (255 - 0) + 0)
    color = [r,g,b]
    feedParticle(x,y,color)
})

