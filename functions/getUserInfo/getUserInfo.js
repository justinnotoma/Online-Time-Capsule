import { Client, Databases, Query } from "node-appwrite"

const PROJECT_ID = process.env.PROJECT_ID
const DB_ID = process.env.DB_ID
const COLLECTION_USERINFO_ID = process.env.COLLECTION_USERINFO_ID

export default async ({req, res, log, error}) => {
    const client = new Client()
    client.setEndpoint('https://cloud.appwrite.io/v1')
    client.setProject(PROJECT_ID)
    const db = new Databases(client)

    if (req.method == "GET") {
        try {
            const reqDB = await db.listDocuments(
                DB_ID,
                COLLECTION_USERINFO_ID,
                [
                    Query.equal( "userToken", [JSON.parse(req.body["userID"])] )
                ]
            )

            return res.json( {"results": reqDB.documents, "request body": req.body} )
        } catch (error) {
            return res.json( {"error": error} )
        }
    }
}