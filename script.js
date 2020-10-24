class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
        this.readyToReset = false
        //reason why we call this is so it clears everything when making a new calculation 
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
        //clear everything
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
        //-1 represents "one from the end", this deletes one thing from the current operand
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
           //so decimal place can only be put in once 
        
        this.currentOperand = this.currentOperand.toString() + number.toString()
        //changes to string cause if you do not it will do math, it appends the number to current operand 
    }

    chooseOperation(operation) {
        if(this.currentOperand === '') return
        //if current operand is empty and someone presses an operation button then it will not execute anything 
        if(this.previousOperand !== '') {
            this.compute()
        }
        //if the previous operation has a number in it and an operation is clicked, compute the number
        this.operation = operation 
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
        //when an operation is clicked, the current operand is set to the previous operand and then the current is set to ''
    }

    compute() {
        let computation 
        //this is the result of our compute method
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        //these are the number versions of our current and previous operands 
        if(isNaN(prev) || isNaN(current)) return
        //if previous or current numbers are not entered, do not compute bc it is not possible
        switch(this.operation) {
            case '+':
                computation = prev + current 
                break
            case '-':
                computation = prev - current 
                break
            case '*':
                computation = prev * current 
                break
            case '÷':
                computation = prev / current 
                break
            default:
                return
                //dont do any computation if operation is not specified
        }
        this.readyToReset = true;
        this.currentOperand = computation 
        this.operation = undefined
        this.previousOperand = ''
        
    }
    getDisplayNumber (number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        //numbers before decimal 
        const decimalDigits =stringNumber.split('.')[1]
        //numbers after decimal
        let integerDisplay 
        if(isNaN(integerDigits)) {
            integerDisplay = ''
        }
        else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})

        }
        //if digits is a number then store the comma version of the number into integerDisplay
        if(decimalDigits !=null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
        //if decimal digits does not equal null then display the integerDisplay which are the integer digits and the decimal digits
        //else just show the integerDisplay or integer digits
    }
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if(this.operation!=null) {
            this.previousOperandTextElement.innerText = 
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
            //applies getDisplayNumber which adds commas to the display 
            //if the operation exists, use concatenation to add the operation symbol to the end of the previous operand
           
        }
        else {
            this.previousOperandTextElement.innerText = '';
            //clears the previous operand if the operation does not exist
        }

    }
}

       

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () =>{
        if(calculator.previousOperand === "" && calculator.currentOperand !== "" && calculator.readyToReset) {
            calculator.currentOperand = ""
            calculator.readyToReset = false
            //when theres a number computed and you want to add more set the current operand to "" and readyToReset to false
        }
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
        //each time we click a button, we have to append the number then update the display 
        //these basically hook the buttons up with what they are supposed to do 
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () =>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
        //every time we choose an operation button, we have to set the current operand to the previous operand and then update display 
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
    //when equals button is clicked, compute and update display 
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
    //when equals button is clicked, compute and update display 
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
    //when equals button is clicked, compute and update display 
})