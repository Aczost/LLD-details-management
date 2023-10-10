module.exports = function makeUpdateIfTaskCompletedAction({updateIfTaskCompleted}){
    return async function updateIfTaskCompletedAction({req, res}){
        try {
            const {id} = req.params
            const {status} = req.body
            let displayData = await updateIfTaskCompleted({id, status})
            return res.status(200).json({
                status: "Updated succesfully",
                data: displayData,
            });
        } catch (error) {
            return res.status(400).json({
                status: "fail",
                message: error,
            });
        }
    }
}