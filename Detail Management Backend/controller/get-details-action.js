module.exports = function makeGetDetailsAction({ getDetails }) {
    return async function getDetailsAction({ req, res }) {
        try {
            let displayData = await getDetails({});
            return res.status(200).json({
                status: "Fetched succesfully",
                data: displayData,
            });
        } catch (error) {
            return res.status(404).json({
                status: "fail",
                message: error,
            });
        }
    }
}