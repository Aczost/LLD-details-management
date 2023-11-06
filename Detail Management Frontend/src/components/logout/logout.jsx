import React from 'react'
import deleteCookie from '../../api/authentication/logout'

import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import { MdLogout } from 'react-icons/md'

const Logout = () => {
  const navigate = useNavigate();
  return (
    <Button type='secondary' danger><MdLogout onClick={()=>deleteCookie(navigate)} style={{ color: '#FF0000', fontSize: '25px' }} /></Button>
  )
}

export default Logout