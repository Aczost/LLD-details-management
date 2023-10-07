module.exports = function makeGetDetails({detailsDb}){
    return async function getDetails({}){
        let details = await detailsDb.getDetailsFromDataBase({})
        return details
    }
}