import './style.css'
import { Client, ExecutionMethod, Functions } from 'appwrite'

const projectID = import.meta.env.VITE_PROJECT_ID
const userToken = localStorage.getItem('userToken')
const userHasDatabase = localStorage.getItem('userHasDatabase')

const client = new Client()
    .setProject(projectID)
    .setEndpoint("https://cloud.appwrite.io/v1")
const functions = new Functions(client)




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


function calcData() {
    return
}


if (userHasDatabase) {
    const req = await functions.createExecution('67ddc5a00015a21d4ce8', JSON.stringify( {"userID": userToken} ), undefined, undefined, ExecutionMethod.GET)

    if (req.responseBody === '') {
        console.error('Error 404: can\'t find user information')
    } else {
        console.log(await req.responseBody)
    }

}


if (!userHasDatabase) {
    setInterval(() => {
        const randomNum = Math.floor( Math.random() * 9999999 )
        displayNum(randomNum)
    }, 3000);
}