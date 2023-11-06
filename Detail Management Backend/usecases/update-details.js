module.exports = function makeUpdateDetails({ detailsDb, detailsDbInMongo }) {
    return async function updateDetails({ id, name, description, cutting, creasing, plywood }) {
        try {
            // return detailsDb.upateDetailsInDataBase({
            //     id,
            //     name,
            //     description,
            //     cutting,
            //     creasing,
            //     plywood,
            // })
            return detailsDbInMongo.updateDetailsInMongoDB({
                id,
                updates: {
                    name,
                    description,
                    cutting,
                    creasing,
                    plywood,
                }
            })
        } catch (error) {
            throw error
        }
    }
}