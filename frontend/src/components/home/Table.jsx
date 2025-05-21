import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useUserStore } from '../../store/userStore'
import { useEffect } from 'react'
import { format, parseISO } from 'date-fns';
import Delete from './Delete';
import Update from './Update';


const Tables = () => {

  const [ showDelete, setShowDelete] = useState(false)
  const [ showUpdate, setShowUpdate] = useState(false)
  const [singleUser, setSingleUser]  = useState(false)

const {fetchUsers, users} = useUserStore()

useEffect(() => {
 fetchUsers()
},[fetchUsers])

// console.log('User details:', users)
const handleDeleteToggle = (info) => {
  // setSingleUser((prev) => prev.id === id)
  setSingleUser(info)
  setShowDelete(!showDelete)

  console.log('Sing user:' , singleUser)

}

const handleUpdateToggle = (info) => {
  // setSingleUser((prev) => prev.id === id)
  setSingleUser(info)
  setShowUpdate(!showUpdate)

  console.log('Sing user:' , singleUser)

}


  return (
    <div className='min-h-[76vh] 2xl:h-[300px] flex items-center justify-center md:p-5 p-2 w-full'>

      {showUpdate && (
  <div
    onClick={() => setShowUpdate(!showUpdate)}
    className="fixed inset-0 left-0 top-0 z-10 bg-opacity-50 backdrop-blur-sm cursor-pointer"
  ></div>
)}

{showDelete && (
  <div
    onClick={() => setShowDelete(!showDelete)}
    className="fixed inset-0 left-0 top-0 z-10 bg-opacity-50 backdrop-blur-sm cursor-pointer"
  ></div>
)}

    
 { showDelete &&   <div className='fixed left-0 top-[250px] md:top-[120px] z-20 w-full p-3 md:p-0'>
         <Delete  setShowDelete={setShowDelete}
          singleUser={singleUser} /> 
        </div> }

             { showUpdate && 
               <div className='fixed left-0 top-[250px] md:top-[100px] lg:top-[20px] z-20 w-full p-3 md:p-0'>
                 <Update   setShowUpdate={setShowUpdate}  singleUser={singleUser} /> 
                </div> }

<h1 className='font-semibold text-xl text-center'>Seamfix Backend Student List </h1>

        <div className='md:max-w-[900px] w-full'>
      
        <Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="md:w-[100px]">Id</TableHead>
      <TableHead  className="text-[12px] md:text-base" >Name</TableHead>
      <TableHead  className="text-[12px] md:text-base" >Email</TableHead>
      <TableHead className="text-left  text-[10px] md:text-base">Age</TableHead>
            <TableHead className="text-left">Created at</TableHead>
            <TableCell className="text-left font-bold">Actions</TableCell>
    </TableRow>
  </TableHeader>
  
  <TableBody>
    {
  users.map((use,index) => ( 
    <TableRow key={use._id}>


 
      <TableCell className="font-medium">{index + 1}</TableCell>
      <TableCell className="text-[10px] md:text-base">{use.firstName} {use.lastName}</TableCell>
      <TableCell className="text-[10px] md:text-base" >{use.email}</TableCell>
            <TableCell  className="text-[10px] md:text-base"  > {format(parseISO(use.createdAt), 'dd-MM-yyyy')} </TableCell>
      <TableCell className="text-left">{use.age}</TableCell>
            <TableCell className="text-left">
                <div className='flex items-center gap-2 cursor-pointer'>
                    <i  onClick={() => handleUpdateToggle(use)}
                    className="ri-edit-2-fill"></i>
                    <i  onClick={() => handleDeleteToggle(use)}
                     className="ri-delete-bin-5-line text-red-500"></i>
                </div>
            </TableCell>

          
    </TableRow>
       ))
            }

  </TableBody>
</Table>
      
        </div>

    </div>
  )
}

export default Tables