module.exports = function makeAddDetailsInBulkAction({ addDetailsInBulk }) {
    return async function addDetailsInBulkAction({ req, res }) {
        try {
            if (req.body.length) {
                const bulkDetails = await addDetailsInBulk({ arrayToInsert: req.body })
                return res.status(200).json({
                    status: "Added All Details Succesfully",
                    data: bulkDetails,
                });
            }
            else{
                throw 'Empty Body Received'
            }
        } catch (error) {
            return res.status(400).json({
                status: "Failed",
                message: error,
            });
        }
    }
}