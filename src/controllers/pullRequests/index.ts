import { Response, Request } from "express"
import { IPullRequest } from "../../types/pullRequests"
import PullRequest from "../../models/pullRequests"

export const getGlobalPullRequests = async (req: Request, res: Response): Promise<void> => {
    try {
        const globalPullRequests: IPullRequest[] = await PullRequest.find()
        res.status(200).json({ globalPullRequests })
    } catch (error) {
        throw error
    }
}

export const getUserPullRequests = async (req: Request, res: Response): Promise<void> => {
    try {
        const userPullRequests: IPullRequest[] = await PullRequest.find({ _id: req.params.userId })
        res.status(200).json({ userPullRequests })
    } catch (error) {
        throw error
    }
}

export const getPullRequest = async (req: Request, res: Response): Promise<void> => {
    try {
        const pullRequest: IPullRequest | null = await PullRequest.findOne({ _id: req.params.pullRequestId })
        res.status(200).json({ pullRequest })
    } catch (error) {
        throw error
    }
}


export const addPullRequest = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body

        const pullRequest: IPullRequest = new PullRequest({
            name: body.name,
            description: body.description,
            link: body.link,
        })

        const newPullRequest: IPullRequest = await pullRequest.save()

        res
            .status(201)
            .json({ message: "PullRequest added", pullRequest: newPullRequest })
    } catch (error) {
        throw error
    }
}

export const updatePullRequest = async (req: Request, res: Response): Promise<void> => {
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

export const deletePullRequest = async (req: Request, res: Response): Promise<void> => {
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
