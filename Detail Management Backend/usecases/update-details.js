module.exports = function makeUpdateDetails({detailsDb}){
    return async function updateDetails({id, name, description}){
        try {
            return detailsDb.upateDetailsInDataBase({id, name, description})
        } catch (error) {
            throw error
        }
    }
}