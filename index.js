let setup=document.createElement("div");

setup.setAttribute("style","position:absolute; background-color:black");
let H1score=document.createElement("h1");
H1score.setAttribute("id","score");
H1score.setAttribute("style","position: fixed;color:lightblue ;margin-left:15px")

let canvas=document.createElement("canvas");
canvas.setAttribute("id","canvas");
canvas.setAttribute("style","border-style: inset;border-width:10px;border-color:blue;");

canvas.setAttribute("width",getComputedStyle(setup).width);
canvas.setAttribute("height",getComputedStyle(setup).height);

setup.appendChild(H1score);
setup.appendChild(canvas);
document.body.appendChild(setup);

let ctx = canvas.getContext('2d');
let blockArray=[];
let ballArray=[];
let bottomBlock=0.05;
let ballNumber=1;
let score=0;
let width=0;
let height=0;


class block{
    constructor(hp,posX,posY,spe){
        this.hp=hp;
        this.posX=posX;
        this.posY=posY;
        this.spe=spe;
        this.scaleX=0.05;
        this.scaleY=0.05;

    }
}

class ball{
    constructor(posX,posY,){
    this.BallSpeedX=Math.random()*10-5;
    this.BallSpeedY=Math.random()*-5;
    this.posX=posX;//0.47.5;
    this.posY=posY;//0.47.5;
    this.radius=0.025;
    this.hidden=false;
    }
};

const palet={
        posX:0.375,       
        posY:0.85,
        scaleX:0.25,
        scaleY:0.1,
};
alert("press enter to start!!");    
ballArray.push(new ball(0.475,0.475));
ballArray[0].BallSpeedY=-1.5;
addBlock();
function run(){

    setup.setAttribute("height","auto");
    setup.setAttribute("width",document.documentElement.scrollWidth);
    canvas.setAttribute("height","700");
    canvas.setAttribute("width",document.documentElement.scrollWidth-30);
    width=getComputedStyle(canvas).width;
    height=getComputedStyle(canvas).height;
    H1score.textContent="score:"+score.toString();
    width=parseInt(width.substring(0, width.length -2));
    height=parseInt(height.substring(0, height.length -2));
    Mball();
    document.onkeydown = function(e) {
        key=e.keyCode;
        if(key==65||key==81 ||key==37){

            if(palet.posX>0){
                palet.posX-=0.02;
            }
        }
        else if(key==68 || key==39){
            if(palet.posX+palet.scaleX<=1){
                palet.posX+=0.02;
            }
        }
    }
    ctx.clearRect(0,0,width,height);
    ctx.beginPath();
    ctx.rect(palet.posX*width,palet.posY*height,palet.scaleX*width,palet.scaleY*height);
    ctx.fillStyle="green";
    ctx.fill();
    ctx.closePath();
    for(let i=0;i<ballArray.length;i++){
        if(ballArray[i].hidden==false){
        ctx.beginPath();
        ctx.arc(ballArray[i].posX*width,ballArray[i].posY*height,ballArray[i].radius*height,0.1,false);
        ctx.fillStyle="white";
        ctx.fill();
        ctx.closePath();
        }
    }
    for(let i=0;i<blockArray.length;i++){
        ctx.beginPath();
        ctx.rect(blockArray[i].posX*width,blockArray[i].posY*height,blockArray[i].scaleX*width,blockArray[i].scaleY*height);
        if(blockArray[i].spe==0){
        switch(blockArray[i].hp){
            case 5:
                ctx.fillStyle="green";
            break
            case 4:
                ctx.fillStyle="yellowgreen";
            break
            case 3:
                ctx.fillStyle="yellow";
            break
            case 2:
                ctx.fillStyle="orange";
            break
            case 1:
                ctx.fillStyle="red";
            break
        }}
        else{
            ctx.fillStyle="pink";
        }
        
        ctx.fill();
        ctx.closePath();
    }
    
}
function Mball(){
    let move=0.001;
    for(let i=0;i<ballArray.length;i++){
            
    let Xmove=ballArray[i].posX+move*ballArray[i].BallSpeedX;
    let Ymove=ballArray[i].posY+move*ballArray[i].BallSpeedY;
    if (Xmove-0.025*0.5<=0 || Xmove+0.025*0.5>=1){
        
        ballArray[i].BallSpeedX*=-1;
        //ballArray[i].posX=ballArray[i].posX+move*ballArray[i].BallSpeedX;
    }
    else if(Ymove+0.025 >=1 && ballArray[i].hidden==false){
        ballNumber-=1;
        ballArray[i].BallSpeedX=0;
        ballArray[i].BallSpeedY=0;
        ballArray[i].hidden=true;
        if(ballNumber<=0){ 
        gameOver();
        }
    }
    ballArray[i].posY=Ymove;
    ballArray[i].posX=Xmove;
    if((ballArray[i].posY+ballArray[i].radius>=palet.posY && ballArray[i].posY<=palet.posY+palet.scaleY) && (ballArray[i].posX>= palet.posX && ballArray[i].posX <= palet.posX+palet.scaleX)){
        ballArray[i].BallSpeedY*=-1;
    }
    
    else if(ballArray[i].posY-ballArray[i].radius<bottomBlock){
        
        for(let a=0;a<blockArray.length;a++){
            
            if((blockArray[a].posX<=ballArray[i].posX && ballArray[i].posX<=blockArray[a].posX+blockArray[a].scaleX )&& (blockArray[a].posY<=ballArray[i].posY-ballArray[i].radius && ballArray[i].posY-ballArray[i].radius<=blockArray[a].posY+blockArray[a].scaleY)){
               // ballArray[i].posY+=0.2;
                if (blockArray[a].spe==1){
                    addBall();
                }
                blockArray[a].hp-=1;
                if(blockArray[a].hp<=0){
                    blockArray.splice(a,1);
                    score+=1;
                    ballArray[i].BallSpeedX*=1.25;
                    ballArray[i].BallSpeedY*=1.25;
                }
                ballArray[i].BallSpeedY=Math.abs(ballArray[i].BallSpeedY);

            }
        }
    }
    if(ballArray[i].posY-ballArray[i].radius<0){
        ballArray[i].BallSpeedY=Math.abs(ballArray[i].BallSpeedY);
    }

    }
}
 function addBlock(){
    for(let i=0;i<blockArray.length;i++){
        blockArray[i].posY+=0.05;
        if(blockArray[i].posY>bottomBlock){
            bottomBlock=blockArray[i].posY;
        }
    } 
    let TempPosX=0;
    while(TempPosX<1){
        let rand=Math.random();
        if(rand>0.05){
            let spe=Math.random();
            if (spe>0.1){
                blockArray.push(new block(Math.floor(Math.random()*4+1),TempPosX,0,0));
            }
            else{
                blockArray.push(new block(1,TempPosX,0,1));
            }
        }
        TempPosX+=0.05;
    }
    bottomBlock+=0.05;
    if(bottomBlock==palet.posX){
        gameOver();
    }
}
function addBall(){
    ballArray.push(new ball(palet.posX+palet.scaleX/2,palet.posY-0.05));
    ballNumber+=1;
}
function gameOver(){
    score=0;
    ballNumber=1;
    blockArray=[];
    ballArray.slice(0,ballArray.length);
    addBlock();
    alert("Game Over");
    console.log(ballArray);
    ballArray.push(new ball(0.475,0.475));
    ballArray[0].BallSpeedY=-1.5;
}
//addBlock();
setInterval(run,20);
setInterval(addBlock,30000);
