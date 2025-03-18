import './style.css'

/**
 * Display a number of the timer
 * @param {Number} num 
 */
function displayNum(num) {
    const numDigits = num.toString().split('')
    const digitWrappers = document.getElementsByClassName('digit-wrapper')

    const startingDigit = 7 - numDigits.length
    
    numDigits.forEach((digit, index) => {
        const numShift = parseInt(digit) * -92.5
        digitWrappers[index + startingDigit].style.transform = `translateY(${numShift}px)`
    })
}

// setInterval(() => {
//     const randomNum = Math.floor( Math.random() * 9999999 )
//     displayNum(randomNum)
// }, 3000);

    
displayNum(264719)
// displayNum(999999)