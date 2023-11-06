module.exports = function makeAddDetailsInBulk({ detailsDb, detailsDbInMongo }) {
    return async function addDetailsInBulk({ arrayToInsert }) {
        try {
            const resultArr = []
            // await detailsDb.deleteAllDetailsFromDataBase({})
            await detailsDbInMongo.deleteAllDetailsFromMongoDB({})
            for (let item of arrayToInsert){
                let createObj = {
                    name: item.name,
                    description:item.description,
                    isCompleted:item.isCompleted,
                    createdAt: item.createdAt,
                    duration: item.duration,
                    endedAt: item.endedAt,
                    inProcess: item.inProcess,
                    pickedBy: item.pickedBy,
                    startedAt: item.startedAt,
                }
                // const result = await detailsDb.createBulkDetailsInDataBase({createObj});
                const result = await detailsDbInMongo.createBulkDetailsInMongoDB({createObj});
                resultArr.push(result)
            }
            if(resultArr.length){
                return resultArr
            }
        } catch (error) {
            throw error
        }
    }
}