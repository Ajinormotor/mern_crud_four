import React from 'react'

import HomeIndex from '../components/home'
import { ToastContainer } from "react-toastify"

const HomePage = () => {
  return (
    <div className='w-full flex items-center justify-center'>
   
      <ToastContainer />
        <HomeIndex />
   
    </div>
  )
}

export default HomePage