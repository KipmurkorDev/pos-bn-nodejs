import mongoose from 'mongoose';

import { IProjectIssue } from '../../types/projectIssues'

const projectIssueSchema = new mongoose.Schema<IProjectIssue>({
    projectId: { type: String, required: true },
    pullRequestId: { type: String, required: true },
});

const ProjectIssue = mongoose.model<IProjectIssue>('ProjectIssue', projectIssueSchema);

export default ProjectIssue;
