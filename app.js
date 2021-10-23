var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var x = innerWidth/2;
var y = innerHeight/2;
var particles = []

function feedParticle(x,y) {
    let min = 0; 
let max = 20;
for (let index = 0; index < 100; index++) {
    particles.push([[x,y], [(Math.random() * (max - min) + min)/10-1, (Math.random() * (max - min) + min)/10-1], 10])            
}
}


function draw() {
    
    requestAnimationFrame(draw);
    ctx.clearRect(0,0,innerWidth,innerHeight);

    

    function draw_particle() {

        particles.forEach(particle => {
            
            particle[0][0] += particle[1][0]
            particle[0][1] += particle[1][1]
            particle[2] -= 0.05

            if (particle[2] >= 0) {
            ctx.beginPath();
            ctx.fillStyle = "#EDF5E1"
            ctx.arc(particle[0][0],particle[0][1],particle[2],0,2*Math.PI)
            ctx.fill()
            }

            console.log(particle[2]);
            if (particle[2] <= 0) {
                particles.shift()
            }

        });

    }
    draw_particle()
}

draw()

canvas.addEventListener('click',function(e){
    x = e.clientX
    y = e.clientY
    feedParticle(x,y)
})

