const star=document.getElementById("star");
star.style.display="none";   
const xMax = document.documentElement.scrollWidth;
console.log(xMax);
const yMax = document.documentElement.scrollHeight;
let toss;
let rngX;
let rngY;
let rngStarX;
let rngStarY;
function tossF(){
    toss=Math.round(Math.random()*1);
}
function randomX(){
    if(toss==1){
        rngX=xMax;
    } else{
        rngX=0;
    }
    return rngX
}
function randomY (){
    if(toss==1){
        rngY=yMax-100;
    } else{
        rngY=100;
    }
    return rngY;
}
function randomStar(){
    rngStarX=Math.round(Math.random()*xMax);
    rngStarY=Math.round(Math.random()*(0.9*yMax));
    return rngStarX,rngStarY;
}
function firestar(){
    star.style.display="block";
    tossF();
    randomX();
    tossF();
    randomY();
    randomStar();
    for(let i=0; i<200; i++){
        setTimeout(etoile,i*4);
        function etoile(){
            let blaX=(rngStarX+(((rngX-rngStarX)/200)*i));
            let blaY=(rngStarY+(((rngY-rngStarY)/200)*i)-100);
            star.style.left=blaX + "px";
            star.style.top=blaY + "px";            
            console.log(blaX,blaY);
            if(blaX<10 || blaX>(xMax-50)){
                star.style.display="none"; 
            }
        }
    }
}  
firestar();
setInterval(firestar,3000);