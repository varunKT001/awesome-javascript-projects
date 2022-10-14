'use strict';
const player0El = document.querySelector('.player-0');
const player1El = document.querySelector('.player-1');
const score0El = document.querySelector('#score-0');
const score1El = document.getElementById('score-1');
const current0El = document.getElementById('current-0');
const current1El = document.getElementById('current-1');




const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn-new');
const btnHold = document.querySelector('.btn-hold');
const btnRoll = document.querySelector('.btn-roll');
const ruleButton = document.querySelector('.btn-rule');
const ruleSet=document.querySelector('.rule-set');

const mainSelect=document.querySelector(".main");

let currentScore,score,activePlayer,temp,playing;
const init=function()
{
    score0El.textContent=0;
    score1El.textContent=0;
    current0El.textContent=0;
    current1El.textContent=0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player-winner');
    player1El.classList.remove('player-winner');
    player1El.classList.remove('player-active');
    player0El.classList.add('player-active');

    currentScore=0;
    activePlayer=0;
    score=[0,0];
    temp="one";
    playing=true;
}
init();

const switchPlayer=function()
{
    document.getElementById(`current-${activePlayer}`).textContent=0;
    activePlayer=activePlayer === 0 ? 1 : 0;
    currentScore=0;
    player0El.classList.toggle('player-active');
    player1El.classList.toggle('player-active');
}

const declareWinner=function()
{
    document.querySelector(`.player-${activePlayer}`).classList.add('player-winner');
    document.querySelector(`.player-${activePlayer}`).classList.remove('player-active');
}



btnRoll.addEventListener('click',function()
{
    if(playing)
    {
        diceEl.classList.remove(`fa-dice-${temp}`);
        const dice = Math.trunc(Math.random()*6) + 1;
        let count;
        if(dice===1) count="one";
        if(dice===2) count="two";
        if(dice===3) count="three";
        if(dice===4) count="four";
        if(dice===5) count="five";
        if(dice===6) count="six";

        //console.log(dice);
        temp=count;
        diceEl.classList.remove('hidden');
        diceEl.classList.add(`fa-dice-${count}`);

        if(dice!==1)
        {
            currentScore+=dice;
            document.getElementById(`current-${activePlayer}`).textContent=currentScore;
            if(currentScore>=50) 
            {
                declareWinner();
                document.getElementById(`score-${activePlayer}`).textContent=currentScore;
                playing=false;
                diceEl.classList.add('hidden');

            }
        }
        else{
            
            switchPlayer();
            
        }
    }
})

btnHold.addEventListener('click',function()
{
    if(playing)
    {
        score[activePlayer]+=currentScore;
        document.getElementById(`score-${activePlayer}`).textContent=score[activePlayer];
        if(score[activePlayer]>=50)
        {
            declareWinner();
            playing=false;
            diceEl.classList.add('hidden');
        }

        else    switchPlayer();
    }
    
})

btnNew.addEventListener('click',function()
{
    init();
})

ruleButton.addEventListener('click',function()
{
    
    
    if(mainSelect.style.opacity==="0" || ruleSet.style.opacity==="1")
    {
        console.log("first clicked");
        mainSelect.style.opacity="1";
        ruleSet.style.opacity="0";
        ruleButton.innerHTML="Rules";
    }
    else
    {
        console.log("second clicked");
        mainSelect.style.opacity="0";
        ruleSet.style.opacity="1";
        ruleButton.innerHTML="Back to Game";
    }

})

