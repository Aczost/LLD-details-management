module.exports = function makeUpdateIfJobStartOrEndAction({updateJobDetails}){
  return async function updateIfJobStartOrEndAction({req, res}){
      try {
          const {id} = req.params
          const {designBy, designStartedAt, designEndedAt, laserBy, laserStartedAt, laserEndedAt, benderBy, benderStartedAt, benderEndedAt, fittingBy, fittingStartedAt, fittingEndedAt, creasingBy, creasingStartedAt, creasingEndedAt, deliveryBy, deliveryStartedAt, deliveryEndedAt, startedAt, endedAt, duration, inProcess} = req.body
          let displayData = await updateJobDetails({id, designBy, designStartedAt, designEndedAt, laserBy, laserStartedAt, laserEndedAt, benderBy, benderStartedAt, benderEndedAt, fittingBy, fittingStartedAt, fittingEndedAt ,creasingBy, creasingStartedAt, creasingEndedAt, deliveryBy, deliveryStartedAt, deliveryEndedAt ,startedAt, endedAt, duration, inProcess})
          return res.status(200).json({
              status: "Updated succesfully",
              data: displayData,
          });
      } catch (error) {
          return res.status(400).json({
              status: "fail",
              message: error,
          });
      }
  }
}