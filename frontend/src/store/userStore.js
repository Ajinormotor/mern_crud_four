import {create} from 'zustand'
import axios from 'axios'




export const useUserStore = create((set) => ({
 users: [],
  isLoading: false,
  error: null,
  message: null,

//   
    fetchUsers: async() => {
        set({isLoading: true, error:null})

        try {
             const response = await axios.get('/api/users')

            
        set({users: response?.data.data, isLoading:false})

        } catch (error) {

            set({
                isLoading: false,
                error: error?.response.data.message || 'failed to fetch users'
            })

            throw error
            
        }
       

    },

    // get single user

    // create Users
    createUser: async (formData) => {
              set({isLoading: true, error:null})

        try {

            if(!formData.firstName || !formData.lastName || !formData.email ||!formData.age){
                throw Error("Please fill in all fields")
            }
               const response = await axios.post('/api/users', formData)
          
           const { message, success, data } = response.data;
set({  isLoading: false });
return { message, success, data };


            
        } catch (error) {
                 set({
                isLoading: false,
                error: error?.response.data.message || 'failed to fetch users'
            })

            throw error
            
        }

    },

    //
    updateUser : async(id, updateFormData) => {
            set({isLoading: true, error: null, message: null})

        try {
  const response = await axios.put(`/api/users/${id}`, updateFormData)

  const {data , message, success} = response.data
  set({user: data, message:message, isLoading:false})
   return { message, success }; 

        } catch (error) {
                     set({
                isLoading: false,
                error: error?.response.data.message || 'Error updating user'
            })

            throw error
            
            
        }

    },

    // /delete users
    deleteUser: async(id) => {
        set({isLoading: true, error: null, message: null})

        try {
  const response = await axios.delete(`/api/users/${id}`)

  const {message, success} = response.data
  set({ success, isLoading: false})
  return{ message, success}
            
        } catch (error) {
                     set({
                isLoading: false,
                error: error?.response.data.message || 'failed to fetch users'
            })

            throw error
            
        }

    },
    

}))