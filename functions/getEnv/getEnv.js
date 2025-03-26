const projectID = process.env.project_ID

export default async ({req, res, logs, error}) => {
    if (req.method == 'GET') return res.json( {"prjectID": projectID} )
    else return res.json( {'error': "Error 405: must be a GET request"} )
}