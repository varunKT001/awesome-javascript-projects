// Code developed by Shubhajeet Pradhan

let checkbox = document.querySelector('input[name="theme"]');
checkbox.addEventListener('change',function(){
    if(this.checked){
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    else{
        document.documentElement.setAttribute('data-theme', 'light');
    }
});

function getHistory(){
    return document.querySelector('.upper-value').innerHTML;
}
function printHistory(num){
    document.querySelector('.upper-value').innerHTML = num;
}
function getOutput(){
    return document.querySelector('.lower-value').innerHTML;
}
function printOutput(num){
    if(num == ""){
        document.querySelector('.lower-value').innerHTML = num;
    }
    else{
        document.querySelector('.lower-value').innerHTML = getFormattedNumber(num);
    }
}
function getFormattedNumber(num){
    if(num == "-"){
        return "";
    }
    let n = Number(num);
    let value = n.toLocaleString("en"); //returns a string with a representation of number

    return value;
}
function reverseNumberFormat(num){
    return Number(num.replace(/,/g,'')); //Give comma seperated value
}

let operator = document.getElementsByClassName("operator");
for( let i = 0; i < operator.length; i++){
    operator[i].addEventListener('click',function(){
        if(this.id == "clear"){
            //this.id gives the current html element id
            printHistory("");
            printOutput("");
        }
        else if(this.id == "backspace"){
            let output = reverseNumberFormat(getOutput()).toString();
            if(output){
                output = output.substr(0, output.length-1);
                printOutput(output);
            }
            console.log(getOutput());
        }
        else{
            let output = getOutput();
            let history = getHistory();
            if(output == "" && history != ""){
                if(isNaN(history[history.length-1])){
                    history = history.substr(0, history.length-1);
                }
            }
            if(output != "" || history != ""){
                output = output == "" ? output : reverseNumberFormat(output);
                history = history + output;
                if(this.id == "="){
                    let result = eval(history);
                    printOutput(result);
                    printHistory("");
                }
                else if(this.id == "%"){
                    let n = reverseNumberFormat(getOutput());
                    let percent = n / 100;
                    printOutput(percent.toFixed(4));
                }
                else{
                    history = history + this.id;
                    printHistory(history);
                    printOutput("");
                }
            }
        }
    })
}
let number = document.getElementsByClassName('number');
for( let i=0; i<number.length; i++){
    number[i].addEventListener('click',function(){
        let output = reverseNumberFormat(getOutput());
        //if output is a number
        if(output != NaN){
            output = output + this.id;
            printOutput(output);
        }
    })
}