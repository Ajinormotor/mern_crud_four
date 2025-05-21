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

    
 { showDelete &&   <div className='fixed left-0 top-[250px] 
  z-20 w-full p-3 md:p-0'>
         <Delete  setShowDelete={setShowDelete}
          singleUser={singleUser} /> 
        </div> }

             { showUpdate && 
               <div className='fixed left-0 top-[150px] lg:top-[20px] z-20 w-full p-3 md:p-0'>
                 <Update   setShowUpdate={setShowUpdate}  singleUser={singleUser} /> 
                </div> }

                <div className='flex flex-col gap-5'>


<h1 className='font-semibold text-xl text-center'>Seamfix Backend Student List </h1>

     <div className="w-full max-w-[900px] mx-auto px-2">
  <div className="overflow-x-auto">
    <Table>
      <TableCaption className="text-xs sm:text-sm mb-2">
       Birlliant backend student
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[60px] table-cell text-xs sm:text-sm">
            Id
          </TableHead>
          <TableHead className="text-xs sm:text-sm">Name</TableHead>
          <TableHead className="text-xs sm:text-sm">Email</TableHead>
          <TableHead className="text-xs sm:text-sm text-left">Age</TableHead>
          <TableHead className="text-xs sm:text-sm text-left hidden md:table-cell">
            Created At
          </TableHead>
          <TableHead className="text-xs sm:text-sm text-left">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((use, index) => (
          <TableRow key={use._id}>
            <TableCell className="font-medium text-xs sm:text-sm md:table-cell">
              {index + 1}
            </TableCell>
            <TableCell className="text-xs sm:text-sm">
              {use.firstName} {use.lastName}
            </TableCell>
            <TableCell className="text-xs sm:text-sm">{use.email}</TableCell>
            <TableCell className="text-xs sm:text-sm">{use.age}</TableCell>
            <TableCell className="text-xs sm:text-sm hidden md:table-cell">
              {format(parseISO(use.createdAt), 'dd-MM-yyyy')}
            </TableCell>
            <TableCell className="text-left">
              <div className="flex items-center gap-3 cursor-pointer">
                <i
                  onClick={() => handleUpdateToggle(use)}
                  className="ri-edit-2-fill text-base sm:text-lg hover:text-blue-500"
                ></i>
                <i
                  onClick={() => handleDeleteToggle(use)}
                  className="ri-delete-bin-5-line text-base sm:text-lg text-red-500 hover:text-red-700"
                ></i>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
</div>


  
  </div>


    </div>
  )
}

export default Tables