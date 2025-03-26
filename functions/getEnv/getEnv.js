const projectID = process.env.project_ID

export default async ({req, res, logs, error}) => {
    if (req.method == 'GET') res.json( {"prjectID": projectID} )
}