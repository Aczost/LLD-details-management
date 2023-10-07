module.exports = function makeAddDetails({ detailsDb }) {
    return async function addDetails({ name, description }) {
        try {
            return await detailsDb.createDetailsInDataBase({ name, description });
        } catch (error) {
            throw error;
        }
    }
}