module.exports = function makeDeleteDetails({detailsDb, detailsDbInMongo}){
    return async function deleteDetails({id}){
        try {
            // return await detailsDb.deleteDetailsInDataBase({id})
            return await detailsDbInMongo.deleteDetailsInMongoDB({id})
        } catch (error) {
            throw error
        }
    }
}