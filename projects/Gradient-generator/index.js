
const generateBtn = document.querySelector(".generate-btn");
const copyBtn = document.querySelector(".copy-btn");

const outputColor = document.querySelector(".output-color");

const outputCode = document.querySelector(".output-code");
const body = document.querySelector("body");

const randomHex = () =>
  Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, "0");


const randomColor = () => `#${[...Array(3)].map(randomHex).join("")}`;

const randomAngle = () => `${Math.floor(Math.random() * 361)}deg`;

const randomGradient = () => [randomAngle(), randomColor(), randomColor()];


const update = () => {
  const [angle, color1, color2] = randomGradient();

  outputColor.style.setProperty("--color-1", color1);
  outputColor.style.setProperty("--color-2", color2);
  outputColor.style.setProperty("--angle",angle);
  body.style.setProperty("--color-1", color1);
  body.style.setProperty("--color-2", color2);
  body.style.setProperty("--angle",angle);
  outputCode.value = `background: linear-gradient(${angle}, ${color1}, ${color2});`;
};

copyBtn.addEventListener("click", () =>

  navigator.clipboard.writeText(outputCode.value)
);

generateBtn.addEventListener("click", update);

update();