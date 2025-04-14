import { Client } from "appwrite"

const PROJECT_ID = process.env.PROJECT_ID
const DB_ID = process.env.DB_ID
const COLLECTION_USERINFO_ID = process.env.COLLECTION_USERINFO_ID

export default async ({req, res, log, error}) => {
    const client = new Client()
    client.setEndpoint('https://cloud.appwrite.io/v1')
    client.setProject(PROJECT_ID)
g
    const db = new Databases(client)

    if (req.method == 'delete') {
        const data = JSON.parse(body)
        return res.send({ data: data })
        // return res.send({ message: "user was deleted" })
    } else {
        return res.status(405).json({ message: "405: Invaid method" })
    }
}