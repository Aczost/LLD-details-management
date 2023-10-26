import React, { useState } from 'react'
import { useAppStore } from '../../store/store'
import { LoadingOutlined } from '@ant-design/icons';
import { RingLoader } from 'react-spinners'

const Loading = () => {
  const { isLoading } = useAppStore();
  return (
    <>
      <div style={{
        zIndex: '1',
        position: 'absolute',
        top: "40%",
        marginLeft: '48%',
      }}>
        {/* {isLoading?alert( 'Loading...', isLoading ): null} */}
        {isLoading && (
          <div style={{ fontSize: '25px', backgroundColor:"black"}}><RingLoader color='blue'/></div>
          )}
      </div>
    </>
  )
}

export default Loading