module.exports = function makeUpdateDetails({detailsDb}){
    return async function updateDetails({id, name, description, cutting, creasing, plywood}){
        try {
            return detailsDb.upateDetailsInDataBase({id, name, description, cutting, creasing, plywood})
        } catch (error) {
            throw error
        }
    }
}