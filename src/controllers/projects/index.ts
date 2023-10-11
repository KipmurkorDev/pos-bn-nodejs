import { Response, Request } from "express"
import { IProject } from "../../types/projects"
import Project from "../../models/projects"

const getProjects = async (req: Request, res: Response): Promise<void> => {
    try {
        const projects: IProject[] = await Project.find()
        res.status(200).json({ projects })
    } catch (error) {
        throw error
    }
}
export const getProject = async (req: Request, res: Response): Promise<void> => {
    try {
        const project: IProject | null = await Project.findOne({ _id: req.params._id })
        res.status(200).json({ project })
    } catch (error) {
        throw error
    }
}


const addProject = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<IProject, "name" | "description" | "link">
        console.log({ body })

        const project: IProject = new Project({
            name: body.name,
            description: body.description,
            link: body.link,
        })


        const newProject: IProject = await project.save()
        const allProjects: IProject[] = await Project.find()

        res
            .status(201)
            .json({ message: "Project added", project: newProject, projects: allProjects })
    } catch (error) {
        throw error
    }
}

const updateProject = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            params: { id },
            body,
        } = req
        const updateProject: IProject | null = await Project.findByIdAndUpdate(
            { _id: id },
            body
        )
        const allProjects: IProject[] = await Project.find()
        res.status(200).json({
            message: "Project updated",
            project: updateProject,
            projects: allProjects,
        })
    } catch (error) {
        throw error
    }
}

const deleteProject = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedProject: IProject | null = await Project.findByIdAndRemove(
            req.params.id
        )
        const allProjects: IProject[] = await Project.find()
        res.status(200).json({
            message: "Project deleted",
            project: deletedProject,
            projects: allProjects,
        })
    } catch (error) {
        throw error
    }
}

export { getProjects, addProject, updateProject, deleteProject }



