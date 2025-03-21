import './style.css'
import { Client, Databases } from 'appwrite'


// console.log('hello')

const PROJECT_ID = ''
const DATABASE_ID = ''
const USERTOKEN_ID = ''

const client = new Client()
client.setProject('')

const db = new Databases(client)


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
 * This function get a user time capsule infomation
 * @param {string} userToken 
 * @returns userData
 */
async function getData(userToken) {
    return    
}

if (userHasDatabase) {
    console.log('get user time capsule')
}

if (!userHasDatabase) {
    setInterval(() => {
        const randomNum = Math.floor( Math.random() * 9999999 )
        displayNum(randomNum)
    }, 3000);
}