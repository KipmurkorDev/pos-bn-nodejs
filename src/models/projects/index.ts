import { IProject } from "../../types/projects"
import { model, Schema } from "mongoose"

const projectSchema: Schema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },

        lastName: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
)

export default model<IProject>("Project", projectSchema)
