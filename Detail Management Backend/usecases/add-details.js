module.exports = function makeAddDetails({detailsDb, moment}) {
    return async function addDetails({name, createdBy, description, cutting, creasing, plywood}) {
        try {
            return await detailsDb.createDetailsInDataBase({name, createdBy ,description, cutting, creasing, plywood, createdAt: moment.tz('Asia/Calcutta').format('dddd DD-MM-YYYY hh:mm:ss A ')});
        } catch (error) {
            throw error;
        }
    }
}