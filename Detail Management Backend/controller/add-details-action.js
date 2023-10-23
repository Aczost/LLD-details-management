module.exports = function makeAddDetailsAction({addDetails}){
    return async function addDetailsAction({req, res}){
        try {
            let {name, createdBy, description, cutting, creasing, plywood} = req.body
            const details = await addDetails({name, createdBy, description, cutting, creasing, plywood})
            if(details){
                return res.status(200).json({
                    status: "Added succesfully",
                    data: details[0],
                });
            }
        } catch (error) {
            return res.status(400).json({
                status: "fail",
                message: error,
            });
        }
        
    }
}