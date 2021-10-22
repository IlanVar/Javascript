var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var x = innerWidth/2;
var y = innerHeight/2;
var particles = []



function draw() {
    
    requestAnimationFrame(draw);
    ctx.clearRect(0,0,innerWidth,innerHeight);

    ctx.beginPath();
    ctx.fillStyle = "#EDF5E1"
    ctx.arc(x,y,10,0,2*Math.PI)
    ctx.fill()

    function draw_particle() {
        let max = 0; 
        let min = 20;
        
        particles.push([[x,y], [(Math.random() * (max - min) + min)/10-1, (Math.random() * (max - min) + min)/10-1], 10])
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