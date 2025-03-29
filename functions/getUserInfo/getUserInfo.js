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
            const respone = await db.listDocuments(
                DB_ID,
                COLLECTION_USERINFO_ID,
                /* [
                    Query.equal('userToken', req.body['userID'])
                ] */
            )

            return res.json( {"results": respone.documents, "request body": req.body['userID']} )
        } catch (error) {
            return res.json( {"error": error} )
        }
    }
    /* const db = new Databases(client)

    if (req.method == 'GET') {
        try {
            const respone = await db.listDocuments(
                DB_ID,
                COLLECTION_USERINFO_ID
            )   
        } catch (error) {
            return res.json({"error": error})
        }
        
        return res.json(respone.documents)
    }

    return res.send("Test fail") */
}