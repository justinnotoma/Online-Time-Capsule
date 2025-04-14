import { Client, Databases } from "node-appwrite"

const PROJECT_ID = process.env.PROJECT_ID
const DB_ID = process.env.DB_ID
const COLLECTION_USERINFO_ID = process.env.COLLECTION_USERINFO_ID

export default async ({req, res, log, error}) => {
    const client = new Client()
    client.setEndpoint('https://cloud.appwrite.io/v1')
    client.setProject(PROJECT_ID)
    const db = new Databases(client)

    if (req.method == 'DELETE') {
        const data = JSON.parse(body)
        return res.json({ data: data })
    } else {
        return res.json({
            code: 405,
            message: "Method must be a DELETE method",
            type: "Invaid Method"
        })
    }
}