module.exports = function makeGetDetails({detailsDb, detailsDbInMongo}){
    return async function getDetails({}){
        try {
            // let details = await detailsDb.getDetailsFromDataBase({})
            let details = await detailsDbInMongo.getDetailsFromMongoDB({})
            return details
        } catch (error) {
            throw error;
        }
    }
}