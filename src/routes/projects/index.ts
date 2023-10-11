import { Router } from "express"
import { getProjects, addProject, updateProject, deleteProject, getProject } from "../../controllers/projects"
import { authenticateToken } from '../jwt'
import { getPullRequests, getGitHubIssues } from '../../middlewares/getPullRequests'

const router: Router = Router()

router.get("/projects", authenticateToken, getProjects)

router.get("/projects/:_id", authenticateToken, getProject)

router.post("/add-project", authenticateToken, getPullRequests, getGitHubIssues, addProject)

router.put("/edit-project/:_id", authenticateToken, updateProject)

router.delete("/delete-project/:_id", authenticateToken, deleteProject)

export default router
