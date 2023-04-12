/* 
Some infos abut data-attributes:
https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
*/

/* fist we have to setup the input elelemtn that are showed into the currentDisplay, 
which are numbers, the dot nad the operand and after we enter the second number, on any operand or equal button pressed, 
we have to make the calculation and than to move the result to the previousDisplay and, in the same time, we have 
to show the operand in the current display. An do on. 
second we have to move this number to the previousDisplay and in th same time to add into the currentDisplay the operand 
*/

class Calculator {
	constructor(previousOperandDisplay, currentOperandDisplay) {
		this.previousOperandDisplay = previousOperandDisplay;
		this.currentOperandDisplay = currentOperandDisplay;
		this.clearAll(); 
	}
	clearAll() {
		this.currentOperand = ''
		this.previousOperand = ''
		this.operation = undefined
// this function will delete both of the displays of the calculator(including: entered numbers, entered operators and result)
	} 
	backspace(){
		this.currentOperand = this.currentOperand.toString().slice(0, -1);
	}
// the entered numbers must be a string type, as Js to do the operations correctly
	enterNumber(number) {
/* taking into consideration that the period has to be add only once inside the string number, 
	we have to check this out and make an empty return */
	if (number ==='.' && this.currentOperand.includes('.')) return
	this.currentOperand = this.currentOperand.toString() + number.toString() 
// in this way the number will always be added to the end of the list

	}

	enterOperation(operation){
		if(this.currentOperand === '') return
		if(this.previousOperand !== '') {
		this.result();
		}
		this.operation = operation;
		this.previousOperand = this.currentOperand;
		this.currentOperand = '';
	}

	result(){
		let finalResult;
		const previous = parseFloat(this.previousOperand);
		const current = parseFloat(this.currentOperand)
		if(isNaN(previous) || isNaN(current)) return
		switch (this.operation) {
		case '+':
			finalResult = previous + current;
			break
		case '-':
			finalResult = previous - current;
			break
		case '*':
			finalResult = previous * current;
			break
		case '/':
			finalResult = previous / current;
			break
		default: 
			return
		}
	this.currentOperand = finalResult;
	this.operation = undefined;
	this.previousOperand = '';
	}

	getDisplayNumber(number) {	
		const strNumber = number.toString();
		const intDigits = parseFloat(strNumber.split('.')[0]);
		const decimalDigits = strNumber.split('.')[1];	
		let integerDisplay;

		if (isNaN(intDigits)) {
			integerDisplay = ''
		} else {
		 integerDisplay = intDigits.toLocaleString('en', {
		 	maximumFractionDigits: 0 })
		}
		if (decimalDigits != null) {
			return `${integerDisplay}.${decimalDigits}`
		} else {
			return integerDisplay;
		}
			}

		updateDisplay(){
		this.currentOperandDisplay.innerText = this.getDisplayNumber(this.currentOperand)

		if (this.operation != null) {
			this.previousOperandDisplay.innerText = 
			`${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
		} else {
			this.previousOperandDisplay.innerText = ''
		}
	}
}

// below we selected all the buttons and both of the displays

const numberButtons = document.querySelectorAll(`[data-no]`);
const operandButtons = document.querySelectorAll(`[data-op]`);
const equalButton = document.querySelector(`[data-equals]`);
const backspaceButton = document.querySelector(`[data-backspace]`);
const allClearButton = document.querySelector(`[data-allClear]`);
const previousOperandDisplay = document.querySelector(`[data-previous-operand]`);
const currentOperandDisplay = document.querySelector(`[data-current-operand ]`);

// making a calculator object with the new function:

const calculator = new Calculator(previousOperandDisplay, currentOperandDisplay);

// appending the inner of each number button to the new Calculator:

numberButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.enterNumber(button.innerText);
		calculator.updateDisplay();
	})
})


operandButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.enterOperation(button.innerText);
		calculator.updateDisplay();
		})
})

equalButton.addEventListener('click', button => {
calculator.result();
calculator.updateDisplay();
})


allClearButton.addEventListener('click', button => {
calculator.clearAll();
calculator.updateDisplay();
})

backspaceButton.addEventListener('click', button => {
calculator.backspace();
calculator.updateDisplay();
})




//https://www.youtube.com/watch?v=j59qQ7YWLxw&t=515s*/ 
	



