import React, { useState } from 'react'
import { Button, Form, Input } from 'antd'

import './login.css'
import useLoginController from './login-controller';
import image from '../../assets/LINK_LASER_DIE-removebg-preview.png'
const Login = () => {

  const [fetch, setFetch] = useState(false);
  const { handleGetOtp, handleOtpSubmit } = useLoginController(setFetch)

  return (
    <div class="center-container">
      <Form
        className='login'
        name="login-form"
        initialValues={{ email: 'linkdiesotp44@gmail.com' }}
        onFinish={(loginFormValues) => handleOtpSubmit(loginFormValues)}
      >
        <div>
          <img src={image} alt="#Logo" style={{ width: "50%", height: "auto", marginLeft: '20%' }} />
        </div>
        <Form.Item
          className='login-form'
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: 'Please enter your email!',
            },
          ]}
        >
          <Input disabled={true} />
        </Form.Item>
        <Form.Item
          className='login-form'
          name="otp"
          label="OTP"
          rules={[
            { required: true, message: 'Please enter the OTP.' },
            { pattern: /^[0-9]{4}$/, message: 'Please enter a 4-digit OTP containing only numbers' }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className='login-form'
        >
          <Button className='form-btn'  type="primary" htmlType="submit">
            Login
          </Button>
          <Button className='form-btn' type="primary" loading={fetch} onClick={handleGetOtp}>
            Get OTP
          </Button>
        </Form.Item>
      </Form>
    </div>

  )
}

export default Login
