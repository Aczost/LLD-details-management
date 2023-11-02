import React from 'react'
import deleteCookie from '../../api/authentication/logout'

import { Button } from 'antd'
import { LogoutOutlined } from '@ant-design/icons';
import { MdLogout } from 'react-icons/md'

const Logout = () => {
  return (
    <Button type='secondary' danger><MdLogout onClick={deleteCookie} style={{ color: '#FF0000', fontSize: '25px' }} /></Button>
  )
}

export default Logout