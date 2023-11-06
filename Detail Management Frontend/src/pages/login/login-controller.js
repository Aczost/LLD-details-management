import { message } from "antd";
import { handleGetOtpCall } from "../../api/details-managment-api";
import { useAppStore } from "../../store/store";
import {useNavigate} from 'react-router-dom'

import handleCookies from "../../api/authentication/login";

const useLoginController = (setFetch) => {

  const navigate  = useNavigate();
  const { setOtpValueFromApi, otpValueFromApi,  } = useAppStore();
  // console.log('otp value api', otpValueFromApi);

  const handleGetOtp = async () => {
    setFetch(true)
    const response = await handleGetOtpCall();
    handleCookies();
    setOtpValueFromApi(response.data.data);
    setFetch(false)
    message.info('OTP sent to your email.')
  }

  const handleOtpSubmit = (loginFormValues) => {
    if(loginFormValues.otp === otpValueFromApi) {
      navigate('dashboard')
    } else {
      message.error('Invalid OTP')
    }
  }
  return {
    handleGetOtp,
    handleOtpSubmit
  }
}

export default useLoginController