module.exports = function makeAddDetailsInBulk({ detailsDb }) {
    return async function addDetailsInBulk({ arrayToInsert }) {
        try {
            const resultArr = []
            await detailsDb.deleteAllDetailsFromDataBase({})
            for (let item of arrayToInsert){
                const result = await detailsDb.createDetailsInDataBase({
                    name: item.name,
                    description:item.description,
                    isCompleted:item.isCompleted,
                    createdAt: item.createdAt,
                });
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