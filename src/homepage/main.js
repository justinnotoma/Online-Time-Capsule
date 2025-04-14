import { createErrorToast } from './error'
import './style.css'
import { getUser } from './users'

const userToken = localStorage.getItem('userToken')
const userHasDatabase = localStorage.getItem('userHasDatabase')


const todayDate = new Date()
const currentYear = todayDate.getFullYear()
const currentMonth = todayDate.getMonth() + 1
const currentDate = todayDate.getDate()

let userYear;
let userMonth;
let userDate;


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

function resetTimer() {
    const digitWrappers = document.getElementsByClassName('digit-wrapper')
    for(const digitWrapper of digitWrappers) { digitWrapper.style.transform = `translateY(0px)` }
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
    const userDateParts = date.split('-')

    userYear = parseInt( userDateParts[0] )
    userMonth = parseInt( userDateParts[1] )
    userDate = parseInt( userDateParts[2].split('T')[0] )
    
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

let inBetweenDates;
if (userHasDatabase) {
    if (!userToken) {
        createErrorToast({"message": "404: could not find user token"})
        throw console.log("404: could not find user token")
    }

    const userInfo = await getUser(userToken)
    if (userInfo["Error"]) {
        createErrorToast(userInfo["Error"])
        throw console.error(userInfo["Error"]);
    }

    inBetweenDates = calcBetweenTime(userInfo["selectedDate"])

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

const timeFrameSelector = document.getElementById('time-frame-selector')
timeFrameSelector.onchange = () => {
    resetTimer()

    if (timeFrameSelector.value === 'days') displayNum(inBetweenDates) 

    if (timeFrameSelector.value === 'years') displayNum(Math.floor( inBetweenDates / 365 )) 
    if (timeFrameSelector.value === 'weeks') displayNum(Math.floor( inBetweenDates / 7 )) 

    if (timeFrameSelector.value === 'months') {
        const yearsInbetween = userYear - currentYear

        let inBetween = 0
        for(var i = 0; i < yearsInbetween + 1; i++) {
            // Adds the months between the current month and Dec
            if (i === 0) {
                const inBetweenMonths = 12 - (currentMonth - 1)
                inBetween += inBetweenMonths
            }
    
            // Adds the months for a full year
            if (i !== 0 && i !== yearsInbetween) {
                inBetween += 12
            }
    
            // Adds the months between Jan and the month enter by the user
            if (i !== 0 && i === yearsInbetween) {
                const inBetweenMonths = userMonth
                inBetween += inBetweenMonths
            }
        }

        displayNum(inBetween)
    }
}

// Create time capsule button
document.getElementById('create').addEventListener('click', e=>  location.href = "http://localhost:5173/src/creations/index.html" )

// Delete time capsule

// Delete time capsule button
document.getElementById('delete').addEventListener('click', e=> document.getElementById('confirm-model').classList.add('show') )

// Confirm time capsule deletion buttons
document.getElementById('denied').addEventListener('click', e=> document.getElementById('confirm-model').classList.remove('show') )

document.getElementById('confirm').addEventListener('click', e=> {
    document.getElementById('confirm-model').classList.remove('show')
    console.log('delete')
})