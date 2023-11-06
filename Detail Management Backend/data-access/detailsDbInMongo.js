module.exports = function makeDetailsDbInMongo({ db, DetailsModel }) {
    return Object.freeze({
        createDetailsInMongoDB,
        getDetailsFromMongoDB,
        updateDetailsInMongoDB,
        updateIfTaskCompletedInMongoDB,
        deleteDetailsInMongoDB,
        getLastDetailsFromMongoDB,
        deleteAllDetailsFromMongoDB,
        updateJobDetails,
        createBulkDetailsInMongoDB,
    });

    async function createBulkDetailsInMongoDB({createObj}) {
        const result = await DetailsModel.insertMany(createObj);
        return result;
    }

    async function createDetailsInMongoDB({createObj}) {
        if (!createObj.isCompleted) {
            createObj.isCompleted = false;
        }
        const result = await DetailsModel.create(createObj);
        return result;
    }

    async function getDetailsFromMongoDB() {
        const result = await DetailsModel.find({});
        return result;
    }

    async function updateDetailsInMongoDB({id, updates}) {        
        const result = await DetailsModel.findByIdAndUpdate(id, updates, { new: true });
        return result;
    }

    async function updateIfTaskCompletedInMongoDB({id, status}) {
        const result = await DetailsModel.findByIdAndUpdate(id, { isCompleted: status }, { new: true });
        return result;
    }

    async function deleteDetailsInMongoDB({id}) {
        const result = await DetailsModel.findByIdAndDelete(id);
        return result;
    }

    async function getLastDetailsFromMongoDB() {
        const result = await DetailsModel.findOne({}).sort({ _id: -1 }).exec();
        return result;
    }

    async function deleteAllDetailsFromMongoDB() {
        const result = await DetailsModel.deleteMany({});
        return result;
    }

    async function updateJobDetails({id, updates}) {
        const result = await DetailsModel.findByIdAndUpdate(id, updates, { new: true });
        return result;
    }

}


