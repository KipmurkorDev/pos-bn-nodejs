import { Router } from "express"
import { getUserProjects, addProject, updateProject, deleteProject, getProject, getGlobalProjects } from "../../controllers/projects"
import { authenticateToken } from '../jwt'
import { getPullRequests, getGitHubIssues } from '../../middlewares/getPullRequests'

const router: Router = Router()

router.get("/projects/global", authenticateToken, getGlobalProjects)

router.get("/projects/user/:userId", authenticateToken, getUserProjects)

router.get("/projects/:projectId", authenticateToken, getProject)

router.post("/add-project", authenticateToken, getPullRequests, getGitHubIssues, addProject)

router.put("/edit-project/:projectId", authenticateToken, updateProject)

router.delete("/delete-project/:projectId", authenticateToken, deleteProject)

export default router
