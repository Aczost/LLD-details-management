module.exports = function makeUpdateDetailsAction({Joi, updateDetails}){
    return async function updateDetailsAction({req, res}){
        try {
        const {id} = req.params
        const {name, description, cutting, creasing, plywood} = req.body
        const {error, value} = validateInput({id}) 
        if(error){
            throw error.details[0].message
        }
        if(value){
            const updatedDetail = await updateDetails({id, name, description, cutting, creasing, plywood});
            return res.status(200).json({
                status: "Updated succesfully",
                data: updatedDetail,
            });
        }
        } catch (error) {
            return res.status(400).json({
                status: "Failed",
                message: error,
            });
        }
    }

    function validateInput({id}){
        const schema = Joi.object({
            id: Joi.string().required()
        })
        return schema.validate({id})
    }
}