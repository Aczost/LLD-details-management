module.exports = function makeUpdateIfTaskCompleted({detailsDb, detailsDbInMongo}){
    return async function updateIfTaskCompleted({id, status}){
        try {
            // return await detailsDb.updateIfTaskCompletedInDataBase({id, status});
            return await detailsDbInMongo.updateIfTaskCompletedInDataBase({id, status});
        } catch (error) {
            throw error
        }
    }
}