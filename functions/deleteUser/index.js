import { Client, Databases, Query } from "node-appwrite"

const PROJECT_ID = process.env.PROJECT_ID
const DB_ID = process.env.DB_ID
const COLLECTION_USERINFO_ID = process.env.COLLECTION_USERINFO_ID

export default async ({req, res, log, error}) => {
    const client = new Client()
    client.setEndpoint('https://cloud.appwrite.io/v1')
    client.setProject(PROJECT_ID)
    const db = new Databases(client)

    if (req.method == 'DELETE') {
        // {"userId":"324d34resw","message":"test"}
        const data = JSON.parse(req.body)

        try {
            const reqDB = await db.listDocuments(
                DB_ID,
                COLLECTION_USERINFO_ID,
                Query.equal('userId', [data["userId"]])
            )
        } catch (error) {
            return res.json({
                code: error["code"],
                message: error["message"],
                type: error["type"]
            })    
        }

        return res.json({ data: reqDB.documents })
    } else {
        return res.json({
            code: 405,
            message: "Method must be a DELETE method",
            type: "Invaid Method"
        })
    }
}