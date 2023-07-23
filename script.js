let firstnum = ''
let secondnum = ''
let currentoperator = null
let reset = false

const numbers = document.querySelectorAll(".num")
const currentdisplay = document.querySelector(".currentdisplay")
const afterdisplay = document.querySelector(".afterdisplay")
const clear = document.querySelector(".clear")
const deletebutton = document.querySelector(".delete")
const decimal = document.querySelector(".decimal")
const equals = document.querySelector(".equals")
const operators = document.querySelectorAll(".operator")

window.addEventListener('keydown', keyboardInput)
clear.addEventListener('click', resetDisplay)
deletebutton.addEventListener('click', deleteNumber)
decimal.addEventListener('click', appendDecimal)
equals.addEventListener('click', evaluate)

numbers.forEach((button) => 
    button.addEventListener('click', () => appendNumber(button.textContent))
)
operators.forEach((operator) =>
    operator.addEventListener('click', () => setOperator(operator.textContent))
)
function appendNumber(number) {
    if (reset) resetScreen()
    if (currentdisplay.textContent.length >= 100) resetDisplay()
    currentdisplay.textContent += number
}
function keyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key)
    if (e.key === '.') appendDecimal()
    if (e.key === '=' || e.key === 'Enter') evaluate()
    if (e.key === 'Backspace') deleteNumber()
    if (e.key === 'Escape') resetDisplay()
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') setOperator(convertOperator(e.key))    
}
function appendDecimal() {
  if (reset) resetDisplay()
  if (currentdisplay.textContent === '')
    currentdisplay.textContent = '0'
  if (currentdisplay.textContent.includes('.')) return
  currentdisplay.textContent += '.'
}
function deleteNumber() {
    currentdisplay.textContent = currentdisplay.textContent.toString().slice(0, -1)
}
function resetDisplay() {
    currentdisplay.textContent = ''
    afterdisplay.textContent = ''
    firstnum = ''
    secondnum = ''
    currentoperator = null
    reset = false
}
function resetScreen() {
    currentdisplay.textContent = ''
    reset = false
}
function setOperator(operator) {
    if (currentoperator !== null) evaluate()
    firstnum = currentdisplay.textContent
    currentoperator = operator
    afterdisplay.textContent = `${firstnum} ${currentoperator}`
    reset = true
}
function evaluate() {
    if (currentoperator === null || reset) return
    if (currentoperator === '÷' && currentdisplay.textContent === '0') {
      alert("You can't divide by 0!")
      return
    }
    secondnum = currentdisplay.textContent
    currentdisplay.textContent = roundResult(
      solve(currentoperator, firstnum, secondnum)
    )
    afterdisplay.textContent = `${firstnum} ${currentoperator} ${secondnum} =`
    currentoperator = null
}
  
function roundResult(number) {
    return Math.round(number * 1000) / 1000
}
function convertOperator(keyboardOperator) {
    if (keyboardOperator === '/') return '÷'
    if (keyboardOperator === '*') return 'x'
    if (keyboardOperator === '-') return '-'
    if (keyboardOperator === '+') return '+'
}
function add(a, b) {
    return a + b
}
  
function substract(a, b) {
    return a - b
}
  
function multiply(a, b) {
    return a * b
}
  
function divide(a, b) {
    return a / b
}
  
function solve(operator, a, b) {
    a = Number(a)
    b = Number(b)
    switch (operator) {
      case '+':
        return add(a, b)
      case '-':
        return substract(a, b)
      case 'x':
        return multiply(a, b)
      case '÷':
        if (b === 0) return null
        else return divide(a, b)
      default:
        return null
    }
}