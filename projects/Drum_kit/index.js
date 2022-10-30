var numberofbutton = document.querySelectorAll(".dram").length;
for (var i = 0; i < numberofbutton; i++) {
    document.querySelectorAll(".dram")[i].addEventListener("click", function () {
        var ButtonInnerHtml = this.innerHTML;
        makesound(ButtonInnerHtml);
        ButtonAnimation(ButtonInnerHtml);
    });
}

document.addEventListener("keypress", function(event) {
    makesound(event.key);
    ButtonAnimation(event.key);
});

function makesound(key){
    switch (key) {
        case "a":
            var sound1 = new Audio("song1.mp3");
            sound1.play();
            break;
        case "s":
            var sound2 = new Audio("song8.mp3");
            sound2.play();
            break;
        case "d":
            var sound3 = new Audio("song3.mp3");
            sound3.play();
            break;
        case "f":
            var sound4 = new Audio("song4.mp3");
            sound4.play();
            break;
        case "h":
            var sound5 = new Audio("song5.mp3");
            sound5.play();
            break;
        case "j":
            var sound6 = new Audio("song6.mp3");
            sound6.play();
            break;
        case "k":
            var sound7 = new Audio("song7.mp3");
            sound7.play();
            break;
        case "l":
            var sound8 = new Audio("song8.mp3");
            sound8.play();
            break;    
        default: console.log(ButtonInnerHtml);
            break;
    }
}

function ButtonAnimation(currentKey) {
    var activeButton = document.querySelector("."+currentKey);
    activeButton.classList.add("changeBackground");
    setTimeout (function() {
        activeButton.classList.remove("changeBackground");
    },100);
}