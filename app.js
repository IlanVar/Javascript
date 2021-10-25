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
var nbrParticle = 0

function draw() {
    
    requestAnimationFrame(draw);
    ctx.clearRect(0,0,innerWidth,innerHeight);

    function draw_particle() {

        
        particles.forEach(particle => {
            
            particle[0][0] += particle[1][0]*2
            particle[0][1] += particle[1][1]*2
            particle[1][1] += 0.06
            if(particle[5]==true){
                particle[4] += 0.01
            }
            else{
                particle[4] -= 0.005
            }
            particle[2] -= 0.05

            if (particle[2] >= 0) {
            ctx.beginPath();
            ctx.fillStyle = `hsl(${particle[3]}, 80%, 70%)`
            
            ctx.arc(particle[0][0],particle[0][1],particle[2],0,2*Math.PI)
            ctx.fill()
            }

            if (particle[2] <= 0) {
                particles.shift()
            }
            if(particle[0][1]>=innerHeight-particle[2]){
                particle[1][1]=-2*particle[4];
                particle[5] = false
            }
            if(particle[4]<=0){
                particle[1][1]=0
            }
            if(particle[0][0]>=innerWidth-particle[2]){particle[1][0]=particle[1][0]*-1}
            if(particle[0][0]<=0+particle[2]){particle[1][0]=particle[1][0]*-1}

        }); 

    }

    draw_particle()

    nbrParticle = particles.length
    ctx.font = '15px arial';
        ctx.fillStyle = "#EDF5E1";
        ctx.fillText("Nombre de particules : " + nbrParticle, 20,20)

    if (click == true) {
        ctx.font = '30px arial';
        ctx.fillStyle = "#EDF5E1";
        ctx.fillText("CLICK and DRAG", (innerWidth/2)-150,(innerHeight/2)+15);
}
}

draw()

function feedParticle(x,y,color) {
    let min = 0; 
let max = 20;
particles.push([[x,y], [(Math.random() * (max - min) + min)/10-1, (Math.random() * (max - min) + min)/10-1], 20, color,0.5, true])            

}

canvas.addEventListener('mousedown',function(){
    isDraw = true
    canvas.addEventListener('mousemove',function(e){
    click = false
    x = e.clientX
    y = e.clientY
    color ++
    if (isDraw == true && nbrParticle < 650){
    feedParticle(x,y,color)}
});
})

canvas.addEventListener('mouseup',function() {
    isDraw = false
})

canvas.addEventListener('touchstart',function(){
    isDraw = true
    canvas.addEventListener('touchmove',function(e){
    click = false
    x = e.touches[0].clientX
    y = e.touches[0].clientY
    color ++
    if (isDraw == true && nbrParticle < 650){
    feedParticle(x,y,color)}
});
})
