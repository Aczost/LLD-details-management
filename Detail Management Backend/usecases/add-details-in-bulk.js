module.exports = function makeAddDetailsInBulk({ detailsDb, detailsDbInMongo }) {
    return async function addDetailsInBulk({ arrayToInsert }) {
        try {
            // await detailsDb.deleteAllDetailsFromDataBase({})
            await detailsDbInMongo.deleteAllDetailsFromMongoDB({})
            const resultArr = []
            for (let item of arrayToInsert){
                let createObj = {
                    name: item.name,
                    description:item.description,
                    cutting: item.cutting? item.cutting : null,
                    plywood: item.plywood? item.plywood : null,
                    creasing: item.creasing? item.creasing : null,
                    isCompleted:item.isCompleted,
                    inProcess: item.inProcess,
                    createdAt: item.createdAt,
                    startedAt: item.startedAt ? item.startedAt : null,
                    designBy: item.designBy ? item.designBy : null,
                    designStartedAt: item.designStartedAt ? item.designStartedAt : null,
                    designEndedAt: item.designEndedAt? item.designEndedAt:null,
                    laserBy: item.laserBy?item.laserBy:null,
                    laserStartedAt: item.laserStartedAt?item.laserStartedAt:null,
                    laserEndedAt: item.laserEndedAt?item.laserEndedAt:null,
                    benderBy: item.benderBy?item.benderBy:null,
                    benderStartedAt: item.benderStartedAt?item.benderStartedAt:null,
                    benderEndedAt:item.benderEndedAt?item.benderEndedAt:null,
                    fittingBy: item.fittingBy? item.fittingBy:null,
                    fittingStartedAt: item.fittingStartedAt?item.fittingStartedAt:null,
                    fittingEndedAt: item.fittingEndedAt? item.fittingEndedAt:null,
                    creasingBy: item.creasingBy?item.creasingBy:null,
                    creasingStartedAt: item.creasingStartedAt?item.creasingStartedAt:null,
                    creasingEndedAt:item.creasingEndedAt?item.creasingEndedAt:null,
                    deliveryBy:item.deliveryBy?item.deliveryBy:null,
                    deliveryStartedAt: item.deliveryStartedAt? item.deliveryStartedAt:null,
                    deliveryEndedAt: item.deliveryEndedAt? item.deliveryEndedAt: null,
                    duration: item.duration ? item.duration: null,
                    endedAt: item.endedAt? item.endedAt : null,
                    createdBy: item.createdBy,
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