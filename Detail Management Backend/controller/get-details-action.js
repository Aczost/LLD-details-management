module.exports = function makeGetDetailsAction({ getDetails }) {
    return async function getDetailsAction({ req, res }) {
        let displayData = await getDetails({});
        if (displayData) {
            return res.status(200).json({
                status: "Fetched succesfully",
                data: displayData,
            });
        }
        else {
            return res.status(404).json({
                status: "fail",
                message: "Details not found",
            });
        }
    }
}