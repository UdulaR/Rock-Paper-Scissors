let score = JSON.parse(localStorage.getItem('score')) || {
  wins:0,
  losses: 0,
  ties: 0
} ; //JSON.parse converts back into object while JSON.stringify converts to string

/*
if(score===null){
score={
  wins:0,
  losses: 0,
  ties: 0
} 
} */


//updateScore();

let isAutoPlaying=false;
let intervalID;
function autoPlay(){
  
  if(!isAutoPlaying){
    intervalID=setInterval(function(){
      const playerMove=pickCompMove();
      playGame(playerMove);
    },1000);
    isAutoPlaying=true;
  }
  else{
    clearInterval(intervalID);
    isAutoPlaying=false;

  }
}

document.querySelector('.js-rock-button').addEventListener('click',()=>{
  playGame('Rock'); //use wrapper funtion --> ()=> as if you put playGame 
  // funtion without it it will run  --> wrapper funciton prevents it
});

document.querySelector('.js-paper-button').addEventListener('click',()=>{
  playGame('Paper');
});

document.querySelector('.js-scissors-button').addEventListener('click',()=>{
  playGame('Scissors')
});

//Listen for keyboard
document.body.addEventListener('keydown',(event)=>{
  if(event.key==='r'){
    playGame('Rock');
  }else if(event.key==='p'){
    playGame('Paper');
  }else if(event.key==='s'){
    playGame('Scissors');
  }
});

function playGame(playerMove){
const compMove=pickCompMove();
let result = '';

if(playerMove==='Scissors'){
  console.log(compMove);
  if(compMove === 'Rock'){
    result = 'lose';
  }else if(compMove === 'Paper'){
    result = 'win';
  }else if(compMove === 'Scissors'){
    result = 'tie';
  }
} else if(playerMove==='Paper'){
  console.log(compMove);
    if(compMove === 'Rock'){
      result = 'win';
    }else if(compMove === 'Paper'){
      result = 'tie';
    }else if(compMove === 'Scissors'){
      result = 'lose';
    }
} else if(playerMove==='Rock'){
  console.log(compMove);
    if(compMove === 'Rock'){
      result = 'tie';
    }else if(compMove === 'Paper'){
      result = 'lose';
    }else if(compMove === 'Scissors'){
      result = 'win';
    }
}


if(result ==='win'){
  score.wins=score.wins+1;
}else if(result==='lose'){
  score.losses=score.losses+1;
}else if(result==='tie'){
  score.ties=score.ties+1;
}

localStorage.setItem('score', JSON.stringify(score));

updateScore();
document.querySelector('.js-result').innerHTML = `${result}`;
document.querySelector('.js-moves').innerHTML = `You <img class ="icon" src="images/${playerMove}-emoji.png"> <img class="icon" src="images/${compMove}-emoji.png"> Computer`;

  /*alert(`You picked ${playerMove}. Computer picked ${compMove}. ${result}
wins: ${score.wins}, losses: ${score.losses}, ties: ${score.ties}`); */
}

function pickCompMove(){
let compMove='';
const randNum = Math.random();
if(randNum >=0 && randNum < 1/3){
compMove = 'Rock';
} else if(randNum>=1/3 && randNum<2/3){
compMove ='Paper';
}else if(randNum>=2/3 && randNum<1){
compMove ='Scissors';
}
return compMove;
}

function updateScore(){
document.querySelector('.js-score').innerHTML = `wins: ${score.wins}, losses: ${score.losses}, ties: ${score.ties}`;
}