import { Router } from "express"
import {
    getUserPullRequests, addPullRequest, updatePullRequest,
    deletePullRequest, getPullRequest, getGlobalPullRequests
} from "../../controllers/pullRequests"
import { authenticateToken } from '../jwt'

const router: Router = Router()

router.get("/pullRequests/global", authenticateToken, getGlobalPullRequests)

router.get("/pullRequests/user/:userId", authenticateToken, getUserPullRequests)

router.get("/pullRequests/:pullRequestId", authenticateToken, getPullRequest)

router.post("/add-pullRequest", authenticateToken, addPullRequest)

router.put("/edit-pullRequest/:pullRequestId", authenticateToken, updatePullRequest)

router.delete("/delete-pullRequest/:pullRequestId", authenticateToken, deletePullRequest)

export default router
