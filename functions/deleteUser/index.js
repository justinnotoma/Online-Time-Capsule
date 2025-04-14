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
            const reqUserInfo = await db.listDocuments(
                DB_ID,
                COLLECTION_USERINFO_ID,
                [
                    Query.equal('userToken', [data["userId"]])
                ]
            )

            db.deleteDocument(
                DB_ID,
                COLLECTION_USERINFO_ID,
                reqUserInfo.documents[0].$id
            )

            return res.json({ data: reqDB.documents })
        } catch (error) {
            return res.json({
                code: error["code"],
                message: error["message"],
                type: error["type"]
            })    
        }

    } else {
        return res.json({
            code: 405,
            message: "Method must be a DELETE method",
            type: "Invaid Method"
        })
    }
}