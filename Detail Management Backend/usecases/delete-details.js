module.exports = function makeDeleteDetails({detailsDb}){
    return async function deleteDetails({id}){
        try {
            return await detailsDb.deleteDetailsInDataBase({id})
        } catch (error) {
            throw error
        }
    }
}