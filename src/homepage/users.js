import { Client, ExecutionMethod, Functions } from 'appwrite'

const projectID = import.meta.env.VITE_PROJECT_ID
const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(projectID)
const functions = new Functions(client)

export async function deleteUser(userToken) {
    const FUNCTION_ID = "67fd3d810023ad4d8b1e"

    try {
        const req = await functions.createExecution(FUNCTION_ID, JSON.stringify({ "userId": userToken, "message": "test" }), undefined, undefined, ExecutionMethod.DELETE)
        const res = await req
        console.log(res.responseBody)
    } catch (error) {
        console.log(error)
    }
}

/**
 * This function gets every user in the database and search through them using the "userToken" to determine the right user
 * @param {String} userToken 
 * @returns userData or error
 */
export async function getUser(userToken) {
    const FUNCTION_ID = '67ddc5a00015a21d4ce8'
    try {
        // Get all users
        const req = await functions.createExecution(FUNCTION_ID, JSON.stringify( {"userID": userToken} ), undefined, undefined, ExecutionMethod.GET)
        const allUsers = JSON.parse( req.responseBody )["results"]

        // find the user current on the website
        const userData = findUser(allUsers, userToken)

        return userData
    } catch (error) {
        return {"Error": error}
    }
}

/**
 * Find one user and return the user data
 * @param {Array} allUsersList list of all users in the database
 * return user["openDate"] or error
 */
function findUser(allUsersList, userToken) {
    for (const user of allUsersList) {
        if (user["userToken"] === userToken) {
            return {"selectedDate": user["openDate"]}
        }
    }

    throw Error("404: Could not find user information")
}