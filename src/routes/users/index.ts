import { Router } from "express"
import { getUsers, addUser, updateUser, deleteUser, loginUser } from "../../controllers/users"

const router: Router = Router()

router.get("/users", getUsers)

router.post("/signup", addUser)

router.post("/login", loginUser)

router.put("/edit-user/:id", updateUser)

router.delete("/delete-user/:id", deleteUser)



export default router