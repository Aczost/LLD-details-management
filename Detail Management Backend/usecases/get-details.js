module.exports = function makeGetDetails({detailsDb}){
    return async function getDetails({}){
        try {
            let details = await detailsDb.getDetailsFromDataBase({})
            return details
        } catch (error) {
            throw error;
        }
    }
}