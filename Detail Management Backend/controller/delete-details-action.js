module.exports = function makeDeleteDetailsAction({Joi, deleteDetails}){
    return async function deleteDetailsAction({req, res}){
        const {id} = req.params
        const {error, value} = validateInput({id})
        if(error){
            return res.status(403).json({
                status: "Validation Error",
                message: error.details[0].message,
            });
        }
        if(value){
            const {id} = value;
            try {
                const deletedItem = await deleteDetails({id}); 
                return res.status(200).json({
                    status: "Deleted succesfully",
                    data: deletedItem,
                });
            } catch (error) {
                return res.status(400).json({
                    status: "fail",
                    message: error,
                });
            }

        }
    }

    function validateInput({id}){
        const schema = Joi.object({
            id: Joi.number().integer().required()
        })
        return schema.validate({id})
    }
}