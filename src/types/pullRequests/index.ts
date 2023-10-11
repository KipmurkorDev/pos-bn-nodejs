import { Document } from 'mongoose';

interface IUser {
    username: string;
    id: number;
    // Add other user properties as needed
}

interface IMilestone {
    title: string;
    // Add other milestone properties as needed
}

interface IBase {
    ref: string;
    sha: string;
    // Add other base branch properties as needed
}

interface IHead {
    ref: string;
    sha: string;
    // Add other head branch properties as needed
}

export interface IPullRequest extends Document {
    projectId: String;
    number: number;
    title: string;
    user: IUser;
    state: string;
    created_at: Date;
    updated_at: Date;
    body: string;
    html_url: string;
    labels: string[];
    assignees: string[];
    milestone: IMilestone;
    base: IBase;
    head: IHead;
}
