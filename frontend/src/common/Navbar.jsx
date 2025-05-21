import React from 'react'
import logo from "../assets/image/seamsfix_logo.png"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"



const Navbar = ({showCreate, setShowCreate}) => {
  return (
    <div className='w-full flex items-center justify-between md:p-5 p-3 bg-black'>

        <div className='flex items-center gap-1'>
            <img src={logo}
            alt='' loading='lazy'
            className=''/>
            <h1 className='text-white font-semibold text-2xl'>Seamfix</h1>
        </div>

        <div className='hidden md:block'>
    <div className="flex w-full  items-center space-x-1">
      <Input type="email" placeholder="Email" className="w-[400px]" />
      <Button type="submit" className="bg-white text-black"><i className="ri-search-line"></i></Button>
    </div>
        </div>

        <div onClick={() => setShowCreate(!showCreate)}
         className='cursor-pointer'>
            <Button variant="destructive" className="cursor-pointer">
<h1 className='text-white text-base'>Create</h1>
            </Button>
        </div>

    </div>
  )
}

export default Navbar