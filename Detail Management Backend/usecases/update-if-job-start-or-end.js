module.exports = function makeUpdateJobDetails({ detailsDb, detailsDbInMongo }) {
  return async function updateJobDetails({ id, designBy, designStartedAt, designEndedAt, laserBy, laserStartedAt, laserEndedAt, benderBy, benderStartedAt, benderEndedAt, fittingBy, fittingStartedAt, fittingEndedAt, creasingBy, creasingStartedAt, creasingEndedAt ,deliveryBy, deliveryStartedAt, deliveryEndedAt, startedAt, endedAt, duration, inProcess }) {
    try {
      //  return await detailsDb.updateJobDetails({
      //   designBy, designStartedAt, designEndedAt, laserBy, laserStartedAt, laserEndedAt, benderBy, benderStartedAt, benderEndedAt, fittingBy, fittingStartedAt, fittingEndedAt, creasingBy, creasingStartedAt, creasingEndedAt ,deliveryBy, deliveryStartedAt, deliveryEndedAt, startedAt, endedAt, duration, id, inProcess
      // });
       return await detailsDbInMongo.updateJobDetails({
        id,
        updates: {
        designBy, designStartedAt, designEndedAt, laserBy, laserStartedAt, laserEndedAt, benderBy, benderStartedAt, benderEndedAt, fittingBy, fittingStartedAt, fittingEndedAt, creasingBy, creasingStartedAt, creasingEndedAt ,deliveryBy, deliveryStartedAt, deliveryEndedAt, startedAt, endedAt, duration, inProcess
      },
    });
      
    } catch (error) {
      throw error
    }
  }
}