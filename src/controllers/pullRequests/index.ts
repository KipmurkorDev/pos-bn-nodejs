import { Response, Request } from "express"
import { IPullRequest } from "../../types/pullRequests"
import PullRequest from "../../models/pullRequests"

const getPullRequests = async (req: Request, res: Response): Promise<void> => {
    try {
        const pullRequests: IPullRequest[] = await PullRequest.find()
        res.status(200).json({ pullRequests })
    } catch (error) {
        throw error
    }
}

const addPullRequest = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body


        const pullRequest: IPullRequest = new PullRequest({
            name: body.name,
            description: body.description,
            link: body.link,
        })


        const newPullRequest: IPullRequest = await pullRequest.save()
        const allPullRequests: IPullRequest[] = await PullRequest.find()

        res
            .status(201)
            .json({ message: "PullRequest added", pullRequest: newPullRequest, pullRequests: allPullRequests })
    } catch (error) {
        throw error
    }
}

const updatePullRequest = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            params: { id },
            body,
        } = req
        const updatePullRequest: IPullRequest | null = await PullRequest.findByIdAndUpdate(
            { _id: id },
            body
        )
        const allPullRequests: IPullRequest[] = await PullRequest.find()
        res.status(200).json({
            message: "PullRequest updated",
            pullRequest: updatePullRequest,
            pullRequests: allPullRequests,
        })
    } catch (error) {
        throw error
    }
}

const deletePullRequest = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedPullRequest: IPullRequest | null = await PullRequest.findByIdAndRemove(
            req.params.id
        )
        const allPullRequests: IPullRequest[] = await PullRequest.find()
        res.status(200).json({
            message: "PullRequest deleted",
            pullRequest: deletedPullRequest,
            pullRequests: allPullRequests,
        })
    } catch (error) {
        throw error
    }
}

export { getPullRequests, addPullRequest, updatePullRequest, deletePullRequest }



