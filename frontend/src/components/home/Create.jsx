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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from 'react'
import { useUserStore } from '../../store/userStore'
import { toast } from 'react-toastify'

import ClipLoader from "react-spinners/ClipLoader";


const Create = ({ setShowCreate}) => {

 

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: ''

  })

  const {createUser, isLoading} = useUserStore()

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const {message, success } = await createUser(formData);
    
if(success){
   toast.success(message || 'User created successfully');
}
    setFormData({   firstName: '',
    lastName: '',
    email: '',
    age: ''})
    setShowCreate(false)
    window.location.reload();
  } catch (error) {
    toast.error(error.message || 'Error occurred');
  }
};

 

  return (
    <div className=' w-full flex items-center justify-center'>
<div className='max-w-[500px] w-full'>
  <Card className="">

      <CardHeader>
        <CardTitle>Create User</CardTitle>
        {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit}>

          <div className="grid w-full items-center gap-4">

                  
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">First Name</Label>
              <Input id="name" placeholder="Enter your Full Name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName:e.target.value})} />
            </div>

                <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Last Name</Label>
              <Input id="name" placeholder="Enter your Full Name"
              value={formData.lastName}
                 onChange={(e) => setFormData({ ...formData, lastName:e.target.value})} />
            </div>

                  
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Email</Label>
              <Input id="email" placeholder="Name of your project"  type="email"
              value={formData.email}
                 onChange={(e) => setFormData({ ...formData,  email:e.target.value})}
              />
            </div>

                <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Age</Label>
              <Input id="age" placeholder="Enter your Full Name"
              value={formData.age}
                 onChange={(e) => setFormData({ ...formData, age:e.target.value})} />
            </div>

                <Button type="submit"> 
          {isLoading ? <ClipLoader color='white' size={10} /> : "Create "}</Button>
 

          </div>
        </form>
      </CardContent>

      {/* <CardFooter className="flex justify-between"> */}
        {/* <Button variant="outline">Cancel</Button> */}
        {/* <Button type="submit"> 
          {isLoading ? <ClipLoader color='white' size={5} /> : "Create "}</Button>
      </CardFooter> */}

    </Card>
</div>

    </div>
  )
}

export default Create