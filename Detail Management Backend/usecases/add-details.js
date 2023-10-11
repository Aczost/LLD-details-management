module.exports = function makeAddDetails({detailsDb, moment}) {
    return async function addDetails({name, description}) {
        try {
            return await detailsDb.createDetailsInDataBase({name, description, createdAt: moment.tz('Asia/Calcutta').format('dddd DD-MM-YYYY hh:mm:ss A ')});
        } catch (error) {
            throw error;
        }
    }
}