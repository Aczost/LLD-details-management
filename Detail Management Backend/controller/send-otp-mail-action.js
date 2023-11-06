module.exports = function makeSendOtpMailAction({sendOtpMail}){
    return async function sendOtpMailAction({req, res}){
        try {
            let displayData = await sendOtpMail({})
            return res.status(200).json({
                status: "Mail Sent succesfully",
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