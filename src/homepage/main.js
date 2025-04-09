import './style.css'
import { getUser } from './users'

const userToken = localStorage.getItem('userToken')
const userHasDatabase = localStorage.getItem('userHasDatabase')


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

/**
 * Find one user and return the user data
 * @param {Array} allUsersList list of all users in the database
 */
function findUser(allUsersList) {
    for (const user of allUsersList) {
        if (user["userToken"] === userToken) {
            return {"selectedDate": user["openDate"]}
        }
    }

    throw Error("Could not find user information")
}

/**
 * Calculate the time in-between today date and the date enter by the user
 * @param {String} date 
 * @returns inBetweenDates
 */
function calcBetweenTime(date) {
    const todayDate = new Date()
    const currentYear = todayDate.getFullYear()
    const currentMonth = todayDate.getMonth() + 1
    const currentDate = todayDate.getDate()

    const userDateParts = date.split('-')
    const userYear = parseInt( userDateParts[0] )
    const userMonth = parseInt( userDateParts[1] )
    const userDate = parseInt( userDateParts[2].split('T')[0] )
    
    // Calculations
    const yearsInbetween = userYear - currentYear
    let inBetweenDates = 0

    // Calc the between for today date and the last day of the current month
    const d = new Date(currentYear, currentMonth, 0)
    const inBetween = d.getDate() - currentDate
    inBetweenDates += inBetween
    
    for(var i = 0; i < yearsInbetween + 1; i++) {
        // Adds the days between the current month and Dec
        if (i === 0) {
            let inBetweenMonths = calcBetweenMonths(currentMonth, 12, currentYear)
            inBetweenDates += inBetweenMonths
        }

        // Adds the days for a full year
        if (i !== 0 && i !== yearsInbetween) {
            let inBetweenMonths = calcBetweenMonths(0, 12, currentYear)
            inBetweenDates += inBetweenMonths
        }

        // Adds the days between Jan and the month enter by the user
        if (i !== 0 && i === yearsInbetween) {
            let inBetweenMonths = calcBetweenMonths(0, userMonth, currentYear)
            inBetweenDates += inBetweenMonths
        }
    }

    return inBetweenDates
}

/**
 * This function loops through a set number of month, and find the last day. 
 * @param {Number} startMonth 
 * @param {Number} endMonth 
 * @param {Number} currentYear 
 * @returns inBetweenMonths
 */
function calcBetweenMonths(startMonth, endMonth, currentYear) {
    let inBetweenMonths = 0
    for(var i = startMonth; i < endMonth; i++) {
        const d = new Date(currentYear, i + 1, 0)

        inBetweenMonths += d.getDate()
    }

    return inBetweenMonths
}



if (userHasDatabase) {
    const userInfo = await getUser(userToken)
    if (userInfo["Error"]) { 
        throw console.error(userInfo["Error"]);
         
    }

    const inBetweenDates = calcBetweenTime(userInfo["selectedDate"])

    document.getElementById('time-frame-selector').classList.remove('hidden')
    document.getElementById('create').classList.add('hidden')
    document.getElementById('delete').classList.remove('hidden')

    displayNum(inBetweenDates)
}


if (!userHasDatabase) {
    setInterval(() => {
        const randomNum = Math.floor( Math.random() * 9999999 )
        displayNum(randomNum)
    }, 3000);
}