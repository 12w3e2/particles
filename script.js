"use strict";
const canvas1=document.getElementById("canvas1");
canvas1.width=window.innerWidth;
canvas1.height=window.innerHeight;
const ctx=canvas1.getContext("2d");

class Particles{
    //Creating properties for the circle/Particl
    constructor(effect){
        this.effect=effect;
        this.x=Math.random()*this.effect.width;
        this.y=Math.random()*this.effect.height;
        this.radius=25*Math.random();
        this.speedX=Math.random()*5;
        this.speedY=Math.random()*5;
        this.color1=Math.random()*255;
        this.color2=Math.random()*255;
        this.color3=Math.random()*255;


    }

    //Drawing the particles
    draw(context){
        context.fillStyle=`hsl(${this.x*0.5},70%,60%)`; //HUE,Saturataion,Light
        context.strokeStyle="white";
        context.beginPath();
        context.arc(this.x,this.y,this.radius,0,2*Math.PI);
        context.fill();
        context.stroke();

    }
    update(){
        this.x+=this.speedX;
        this.y+=this.speedY;
        if (this.x>=canvas1.width-this.radius || this.x<=0) this.speedX=-this.speedX;
        if(this.y>=canvas1.height-this.radius || this.y<=0) this.speedY=-this.speedY;
    }


}


//Effects: Helping methods
class Effects {
    constructor(canvas) {
        this.canvas=canvas;
        this.width=this.canvas.width;
        this.height=this.canvas.height;
        this.particles=[] //This will hold all the particles
        this.numberOfParticles=1000;
        this.createParticles();
    }
    createParticles(){
        for(let i=0;i<this.numberOfParticles;i++){
           this.particles.push(new Particles(this));
        }
    }
    handleParticles(context) {
        this.particles.forEach(particle=>{
            particle.draw(context);
            particle.update();

        })
    }
}

const particle1=new Particles(canvas1);
console.log(particle1.draw(ctx)); //Drawing on the screen
const effect1=new Effects(canvas1);
console.log(effect1);
console.log(effect1.handleParticles(ctx));

function GameUpdate(){
    ctx.clearRect(0,0,canvas1.width,canvas1.height);
    effect1.handleParticles(ctx);

    requestAnimationFrame(GameUpdate);
}

GameUpdate();