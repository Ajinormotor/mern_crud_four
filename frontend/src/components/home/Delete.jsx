import React from 'react'
 
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useUserStore } from '../../store/userStore'
import { toast, ToastContainer} from 'react-toastify'


const Delete = ({singleUser, setShowDelete }) => {

  const {deleteUser}  = useUserStore()

    const handleDelete = async() => {


      try {
         const {message, success} = await deleteUser(singleUser._id)
      if(success){
        toast.success(message || 'Deleted successfull')
      }
      setShowDelete(false)
       window.location.reload();
    
      } catch (error) {
        toast.error(error.message || 'Delete failed')
      }
     



}

 


  return (
    <div className=' w-full flex items-center justify-center'>

         
            <ToastContainer />
<div className='max-w-[500px] w-full'>

    <Card className="">
   <CardHeader>
        <CardTitle>Delete User</CardTitle>
        {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
      </CardHeader>

      <CardContent>
  

          <div className="grid w-full items-center justify-center gap-4">

<div className='flex flex-col'>
  <h1 className='font-medium md:text-2xl text-xl'> Are you sure you want to delete</h1>
            <p className='font-bold text-center'>{singleUser.firstName} {singleUser.lastName}</p>
</div>
          


<div className='flex items-center justify-center gap-3 w-full'>

  <Button onClick={() => setShowDelete(false)}
   className="cursor-pointer bg-black">Cancel</Button>

    <Button onClick={handleDelete}
    className="cursor-pointer bg-red-500">Confirm</Button>

</div>

          </div>
    
      </CardContent>


    </Card>

  </div>

    </div>
  )
}

export default Delete