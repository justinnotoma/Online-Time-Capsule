/**
 * Display a number of the timer
 * @param {Number} num 
 */
export function displayNum(num) {
    const numDigits = num.toString().split('')
    const digitWrappers = document.getElementsByClassName('digit-wrapper')

    const startingDigit = 7 - numDigits.length
    
    numDigits.forEach((digit, index) => {
        const numShift = parseInt(digit) * -92.5
        digitWrappers[index + startingDigit].style.transform = `translateY(${numShift}px)`
    })
}

export function resetTimer() {
    const digitWrappers = document.getElementsByClassName('digit-wrapper')
    for(const digitWrapper of digitWrappers) { digitWrapper.style.transform = `translateY(0px)` }
}