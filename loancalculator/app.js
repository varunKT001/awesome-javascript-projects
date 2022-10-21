
document.getElementById("submit").addEventListener("click",()=>{    
	const a=document.querySelector("#amount").value;
	const b=document.querySelector("#rate").value;
    const c=document.querySelector("#months").value;
    const interest = (a * (b * 0.01)) / c;
	const output=document.querySelector("#total");
    const amount = ((a / c) + interest).toFixed(2);
    console.log(amount);
    output.textContent="Your total amount is: "+ amount+ " Rs";
	document.querySelector(".output").style.color= "white";
	});
  

document.getElementById("reset").addEventListener("click",()=>{  
    const a=document.querySelector("#amount").value;
	const b=document.querySelector("#rate").value;
    const c=document.querySelector("#months").value;
	const output=document.querySelector("#total");
    a.value=" ";
    b.value=" ";
    c.value=" ";
    output.textContent=" ";
  });