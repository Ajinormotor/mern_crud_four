import React from 'react'

import Tables from './Table'
import Create from './Create'
import { useState } from 'react'
import Navbar from '../../common/Navbar'
import Footer from '../../common/Footer'


const HomeIndex = () => {
const [ showCreate, setShowCreate] = useState(false)



  return (
    <div className='min-h-[300px] relative overflow-hidden w-full 2xl:max-w-[1800px]'>

{showCreate && (
  <div
    onClick={() => setShowCreate(!showCreate)}
    className="fixed inset-0 left-0 top-0 z-10 bg-opacity-50 backdrop-blur-sm cursor-pointer"
  ></div>
)}



    <Navbar  showCreate={showCreate} setShowCreate={setShowCreate} />

 { showCreate &&   <div className='fixed left-0 top-[150px]  lg:top-[20px] z-20 
 w-full p-3 md;p-0'>
         <Create  showCreate={showCreate} setShowCreate={setShowCreate}/> 
        </div> }

    

        <Tables     />


        <Footer  />
    </div>
  )
}

export default HomeIndex