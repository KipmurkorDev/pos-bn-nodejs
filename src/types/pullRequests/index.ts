import mongoose, { Document } from 'mongoose';

// Define interfaces for nested objects
interface IUser {
    login: string;
    id: number;
    avatar_url: string;
    // Add other user properties as needed
}

interface IHeadBase {
    label: string;
    ref: string;
    sha: string;
}

interface ILinks {
    self: { href: string };
    html: { href: string };
    issue: { href: string };
    comments: { href: string };
    review_comments: { href: string };
    review_comment: { href: string };
    commits: { href: string };
    statuses: { href: string };
}

export interface IPullRequest extends Document {
    projectId: string;
    url: string;
    id: number;
    node_id: string;
    html_url: string;
    diff_url: string;
    patch_url: string;
    issue_url: string;
    number: number;
    state: string;
    locked: boolean;
    title: string;
    user: IUser;
    body: string | null;
    created_at: Date;
    updated_at: Date;
    closed_at: Date | null;
    merged_at: Date | null;
    merge_commit_sha: string;
    assignee: null;
    assignees: string[];
    requested_reviewers: string[];
    requested_teams: string[];
    labels: string[];
    milestone: null;
    draft: boolean;
    commits_url: string;
    review_comments_url: string;
    review_comment_url: string;
    comments_url: string;
    statuses_url: string;
    head: IHeadBase;
    base: IHeadBase;
    _links: ILinks;
    author_association: string;
    auto_merge: null;
    active_lock_reason: null;
}