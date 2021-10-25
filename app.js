var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');



canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var x = 0;
var y = 0;
var particles = []
var click = true
var isDraw = false

var color = 0

function feedParticle(x,y,color) {
    let min = 0; 
let max = 20;
for (let index = 0; index < 10; index++) {
    particles.push([[x,y], [(Math.random() * (max - min) + min)/10-1, (Math.random() * (max - min) + min)/10-1], 10, color])            
}
}

function draw() {
    
    requestAnimationFrame(draw);
    ctx.clearRect(0,0,innerWidth,innerHeight);

    function draw_particle() {

        particles.forEach(particle => {
            
            particle[0][0] += particle[1][0]*2
            particle[0][1] += particle[1][1]*2
            particle[1][1] += 0.03
            particle[2] -= 0.1

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
            if(particle[0][1]>=innerHeight){particle[1][1]=-2}
        }); 

    }

    draw_particle()
    

  


if (click == true) {
    ctx.font = '50px arial';
    ctx.fillStyle = "#EDF5E1";
    ctx.fillText("CLICK", (innerWidth/2)-50,(innerHeight/2)-25);
}
}

draw()




canvas.addEventListener('mousedown',function(){
    isDraw = true
    canvas.addEventListener('mousemove',function(e){
    click = false
    x = e.clientX
    y = e.clientY
    color ++
    if (isDraw == true){
    feedParticle(x,y,color)}
});
})

canvas.addEventListener('mouseup',function() {
    isDraw = false
})

canvas.addEventListener('touchstart',function(e){
    click = false
    x = e.touches[0].clientX
    y = e.touches[0].clientY
    color ++
    feedParticle(x,y,color)
});
