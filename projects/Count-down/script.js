const FindDate=()=>{
    var mon=document.getElementById('mon').value;
    console.log(mon);
    var date=document.getElementById('date').value;
    console.log(date);
    var year=document.getElementById('year').value;
    console.log(year);
    var deadlineDate= mon+" "+date+", "+year+" 00:00:00";
    deadline=new Date(deadlineDate).getTime();
    console.log(deadline);
console.log(deadline);
var x = setInterval(function() {
var now = new Date().getTime();
var t = deadline - now;
var days = Math.floor(t / (1000 * 60 * 60 * 24));
var hours = Math.floor((t%(1000 * 60 * 60 * 24))/(1000 * 60 * 60));
var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
var seconds = Math.floor((t % (1000 * 60)) / 1000);
document.getElementById("demo").innerHTML = days + "d " 
+ hours + "h " + minutes + "m " + seconds + "s ";
    if (t < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "EXPIRED";
    }
}, 1000);
}

function myFunction() {
    var x = document.getElementById("meeting-time").value;
    var date = new Date(x); // parse date as a Date object: TODO: Error handling -> sanitize the input
    date.setHours(date.getHours() - 9); // change the date object by subtracting hours from the same date object
    date.setMinutes(date.getMinutes() - 30); // change the date object by subtracting minutes from the same date object
    document.getElementById("demo").innerHTML = date;
  }