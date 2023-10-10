module.exports = function makeUpdateIfTaskCompleted({detailsDb}){
    return async function updateIfTaskCompleted({id, status}){
        try {
            return await detailsDb.updateIfTaskCompletedInDataBase({id, status});
        } catch (error) {
            throw error
        }
    }
}