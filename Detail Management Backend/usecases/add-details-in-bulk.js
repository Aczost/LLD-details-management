module.exports = function makeAddDetailsInBulk({ detailsDb }) {
    return async function addDetailsInBulk({ arrayToInsert }) {
        try {
            const resultArr = []
            await detailsDb.deleteAllDetailsFromDataBase({})
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
                const result = await detailsDb.createBulkDetailsInDataBase({createObj});
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