
const quedatabase=[
{
    que:"Que 1: Which of the following is the correct identifier?",
    a:"varname@",
    b:"$var_name",
    c:"VAR_123",
    d:"None of the above",
    ans:"ans3"

},
{
    que:"Que 2:  Which of the following is the address operator?",
    a:"@",
    b:"&",
    c:"#",
    d:"$",
    ans:"ans2"

}, 
{
    que:"Que 3: Which of the following is the original creator of the C++ language?",
    a:"Dennis Ritchie",
    b:"Ken Thompson",
    c:"Brian Kernighan",
    d:"Bjarne Stroustrup",
    ans:"ans4"

}, 
{
    que:"Que 4: Which of the following comment syntax is correct to create a single-line comment in the C++ program?",
    a:"//Comment",
    b:"/Comment/",
    c:"Comment//",
    d:"None of the above",
    ans:"ans1"

}, 
{
    que:"Que 5: C++ is a ___ type of language.",
    a:"High-level Language",
    b:"Low-level language",
    c:"Middle-level language",
    d:"None of the above",
    ans:"ans3"
},

]

const quetion=document.querySelector('.que');
const answers=document.querySelectorAll('.answer');
const option1=document.querySelector('#option1');
const option2=document.querySelector('#option2');
const option3=document.querySelector('#option3');
const option4=document.querySelector('#option4');
const subbtn=document.querySelector('#sub-btn');
const showscore=document.querySelector("#showscore");

let quecount=0;
let score=0;

const loadque=()=>{
   quetion.innerText =quedatabase[quecount].que;
   option1.innerText =quedatabase[quecount].a;
   option2.innerText =quedatabase[quecount].b;
   option3.innerText =quedatabase[quecount].c;
   option4.innerText =quedatabase[quecount].d;
   
}
loadque();

const getCheckAnswer=()=>{
    let userans;

    answers.forEach((curansele)=>{
         if(curansele.checked){
             userans=curansele.id;
         }
    });

   return userans;
};

const deselectoption=()=>{
    
    answers.forEach((curansele)=>{
         if(curansele.checked){
             curansele.checked = false;
         }
    });

};


subbtn.addEventListener('click',()=>{
    const checkans=getCheckAnswer();
   
//check fill ans and correct ans
    if(checkans==quedatabase[quecount].ans){
           score++;
   
    };

    //load new questions
     quecount++;
     //remove fill after fill option 
     deselectoption();
    if(quecount<quedatabase.length)
    {
        loadque();
    }
    // all que fill show user score
    
  
    else{
     
    showscore.innerHTML=`
    <h3>Your score is ${score}/${quedatabase.length}  </h3>
    <button class="btn" onclick="location.reload()">Play Again</button>`;
   
    showscore.classList.remove('score');

    }

});
