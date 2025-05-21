import express from "express"
import { createUser, deleteUser, getAllUser, getSingleUser, updateUser } from "../controllers/user.controller.js"

const router = express.Router()

// get All Users
router.get('/', getAllUser)

// Get Single Users
router.get('/:id', getSingleUser)

// Create Users
router.post('/', createUser)

// UpdateUsers
router.put('/:id', updateUser)

// Delete Users
router.delete('/:id', deleteUser)


export default router