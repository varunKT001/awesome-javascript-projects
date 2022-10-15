const scrInput = document.querySelector(".input")
const scrOutput = document.querySelector(".output")
const clearBtn = document.querySelector(".clear")
const percentageBtn = document.querySelector(".percentage")
const operatorsBtn = document.querySelectorAll(".operator")
const numbersBtn = document.querySelectorAll(".number")
const decimalBtn = document.querySelector(".decimal")
const equalBtn = document.querySelector(".equal")

let prevNumber = ""
let calcOperator = ""
let currentNumber = "0"

const updateInputScreen = (char) => {
  scrInput.value += char
}

const clearAll = () => {
  scrInput.value = "0"
  scrOutput.value = ""
  prevNumber = ""
  calcOperator = ""
  currentNumber = "0"
}

clearBtn.addEventListener("click", () => {
  clearAll()
})

const handleNumber = (number) => {
  // prevent repeated 0 and 0 before other number
  currentNumber == 0 && !currentNumber.includes(".")
    ? (currentNumber = number)
    : (currentNumber += number)

  // first number
  if (prevNumber == "" && calcOperator == "") {
    scrInput.value = currentNumber
  }

  // second number
  if (prevNumber != "" && calcOperator != "") {
    scrInput.value = `${prevNumber}${calcOperator}${currentNumber}`
  }
}

numbersBtn.forEach((number) => {
  number.addEventListener("click", (event) => {
    handleNumber(event.target.value)

    // auto clear all if a number is pressed right after the previous calculation
    if (scrOutput.value) {
      clearAll()
      handleNumber(event.target.value)
    }
  })
})

const okForPercentAndDot = (char1, char2) => {
  /*
    percent and dot can be added if:
    1. they are not in the current number yet
    2. they are not right beside each other
    3. they are not right after operator sign
    4. the output is still empty
  */

  const lastChar = scrInput.value.charAt(scrInput.value.length - 1)

  return (
    !currentNumber.includes(char1) &&
    lastChar !== char2 &&
    ["+", "-", "*", "/"].indexOf(lastChar) === -1 &&
    !scrOutput.value
  )
}

percentageBtn.addEventListener("click", (event) => {
  if (okForPercentAndDot(event.target.value, ".")) {
    updateInputScreen(event.target.value)
    currentNumber = currentNumber / 100
  }
})

decimalBtn.addEventListener("click", (event) => {
  if (okForPercentAndDot(event.target.value, "%")) {
    updateInputScreen(event.target.value)
    currentNumber += event.target.value
  }
})

operatorsBtn.forEach((operator) => {
  operator.addEventListener("click", (event) => {
    // prevent multiple operator signs
    if (!calcOperator && !scrOutput.value) {
      prevNumber = currentNumber
      updateInputScreen(event.target.value)
    }

    calcOperator = event.target.value
    currentNumber = "0"
  })
})

equalBtn.addEventListener("click", () => {
  if (calcOperator) {
    let result = ""

    switch (calcOperator) {
      case "+":
        result = parseFloat(prevNumber) + parseFloat(currentNumber)
        break

      case "-":
        result = parseFloat(prevNumber) - parseFloat(currentNumber)
        break

      case "*":
        result = parseFloat(prevNumber) * parseFloat(currentNumber)
        break

      case "/":
        result = parseFloat(prevNumber) / parseFloat(currentNumber)
        break

      default:
        break
    }

    currentNumber = result
    calcOperator = ""
  }

  // use scientific notation if the answer is long
  scrOutput.value =
    currentNumber.toString().length > 10
      ? parseFloat(currentNumber).toExponential(3)
      : parseFloat(currentNumber)
})
