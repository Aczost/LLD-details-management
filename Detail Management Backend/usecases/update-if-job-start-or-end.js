module.exports = function makeUpdateJobDetails({ detailsDb }) {
  return async function updateJobDetails({ id, designBy, designStartedAt, designEndedAt, laserBy, laserStartedAt, laserEndedAt, benderBy, benderStartedAt, benderEndedAt, fittingBy, fittingStartedAt, fittingEndedAt, creasingBy, creasingStartedAt, creasingEndedAt ,startedAt, endedAt, duration, inProcess }) {
    try {
       return await detailsDb.updateJobDetails({
        designBy, designStartedAt, designEndedAt, laserBy, laserStartedAt, laserEndedAt, benderBy, benderStartedAt, benderEndedAt, fittingBy, fittingStartedAt, fittingEndedAt, creasingBy, creasingStartedAt, creasingEndedAt ,startedAt, endedAt, duration, id, inProcess
      });
      
    } catch (error) {
      throw error
    }
  }
}