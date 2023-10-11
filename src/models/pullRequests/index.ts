import mongoose, { Document } from 'mongoose';

import { IPullRequest } from '../../types/pullRequests'

const pullRequestSchema = new mongoose.Schema<IPullRequest>({
    projectId: { type: String, required: true },
    url: { type: String, required: true },
    id: { type: Number, required: true },
    node_id: { type: String, required: true },
    html_url: { type: String, required: true },
    diff_url: { type: String, required: true },
    patch_url: { type: String, required: true },
    issue_url: { type: String, required: true },
    number: { type: Number, required: true },
    state: { type: String, required: true },
    locked: { type: Boolean, required: true },
    title: { type: String, required: true },
    body: { type: String, required: false },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: true },
    closed_at: { type: Date, required: false },
    merged_at: { type: Date, required: false },
    merge_commit_sha: { type: String, required: true },
    assignees: [String],
    requested_reviewers: [String],
    requested_teams: [String],
    labels: [String],
    draft: { type: Boolean, required: true },
    commits_url: { type: String, required: true },
    review_comments_url: { type: String, required: true },
    review_comment_url: { type: String, required: true },
    comments_url: { type: String, required: true },
    statuses_url: { type: String, required: true },
    author_association: { type: String, required: true },
});

const PullRequest = mongoose.model<IPullRequest>('PullRequest', pullRequestSchema);

export default PullRequest;
