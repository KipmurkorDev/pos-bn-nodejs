import { Router } from "express"
import { getProjects, addProject, updateProject, deleteProject } from "../../controllers/projects"
import { authenticateToken } from '../jwt'

const router: Router = Router()

router.get("/projects", authenticateToken, getProjects)

router.post("/add-project", authenticateToken, addProject)

router.put("/edit-project/:id", authenticateToken, updateProject)

router.delete("/delete-project/:id", authenticateToken, deleteProject)

export default router
