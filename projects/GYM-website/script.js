var menu = document.getElementById("bar");
var item = document.getElementById("items");

item.style.right = '-300px';
menu.onclick = function () {
    if (item.style.right == '-300px') {
        item.style.right = '0';
    }
    else {
        item.style.right = '-300px';
    }
}


let mybutton = document.getElementById("btnScrollToTop");

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
