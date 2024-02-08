let gameseq=[];
let userseq=[];


let btns=["yellow","red","purple","green"];

let level=0;
let highScore=0;
let started=false;

let h2=document.querySelector("h2");
let h3=document.querySelector("#highscore");

document.addEventListener("keypress",function () {
    if(started==false){
        console.log("Game is started");
        started=true;

        levelUp();
    }
});

function levelUp () {
    userseq=[];
    level++;
    h2.innerText=`Level ${level}`;

    let randInd=Math.floor(Math.random()*3);
    let randCol=btns[randInd];
    let randBtn=document.querySelector(`.${randCol}`);

    gameseq.push(randCol);
    console.log(gameseq);
    btnFlash(randBtn);
}

function btnFlash (btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    },200);
}
function btnFlashuser (btn) {
    btn.classList.add("flashuser");
    setTimeout(function () {
        btn.classList.remove("flashuser");
    },200);
}

function checkAns(idx) {
    if(userseq[idx]===gameseq[idx]) {
        if(userseq.length==gameseq.length) {
            setTimeout(levelUp,1000);
        }
    } else {
        h2.innerHTML=`Game over.your score was <b>${level}</b><br>Press any key to Start.`
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor="white";
        },150);
        if(level>highScore) {
            highScore=level;
            h3.innerText=`High Score : ${highScore}`;
        }
        reset();
    }
}

function btnPress () {
    let btn = this;
    btnFlashuser(btn);

    userCol=btn.getAttribute("id");
    userseq.push(userCol);

    checkAns(userseq.length-1);
}

let allBtns=document.querySelectorAll(".btn");

for(btn of allBtns) {
    btn.addEventListener("click",btnPress);
}

function reset() {
    started=false;
    gameseq=[];
    userseq=[];
    level=0;
}