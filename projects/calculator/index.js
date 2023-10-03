(function () {
  let screen = document.querySelector(".screen");
  let buttons = document.querySelectorAll(".btn");
  let clear = document.querySelector(".btn-clear");
  let equal = document.querySelector(".btn-equal");
  let clearDigit = document.querySelector(".btn-clearDigit");

  //retrieve data from numbers that are clicked
  buttons.forEach(function (button) {
    button.addEventListener("click", function (e) {
      let value = e.target.dataset.num;
      screen.value += value;
    });
  });

  equal.addEventListener("click", function (e) {
    if (screen.value === "") {
      screen.value = "Please Enter a Value";
    } else {
      try {
        const unusualPattern = /[^0-9+\-*/().]/;

        if (unusualPattern.test(screen.value)) {
          throw new Error("Unusual calculation detected!");
        }

        let answer = eval(screen.value);
        screen.value = answer;
      } catch (error) {
        screen.value = "NaN";
      }
    }
  });

  clearDigit.addEventListener("click", function (e) {
    if (screen.value === "") {
      screen.value = "";
    }
    screen.value = screen.value.slice(0, -1);
  });

  clear.addEventListener("click", function (e) {
    screen.value = "";
  });
})();
