import mongoose, { Schema, Document } from "mongoose";

export enum projectStatus {
    STARTED = "started",
    UNDER_PROCESS = "under_process",
    TESTING = "testing",
    COMPLETED = "completed",
    DELIVERED = "delivered"
}

// Was `lable` — typo, fixed before anything downstream starts depending on
// the wrong spelling. `_id` is intentionally left at Mongoose's default
// (true) so each milestone gets a stable subdocument ID — that's what
// toggleMilestone below targets instead of an array index.
export interface Milestone {
    label: string,
    done: boolean,
    completedAt: Date | null
}

const milestoneDbSchema: Schema<Milestone> = new Schema({
    label: {
        type: String,
        required: [true, "Label is required"],
        trim: true
    },
    done: {
        type: Boolean,
        required: true,
        default: false
    },
    completedAt: { type: Date, default: null },
})

export interface ProjectDocument extends Document {
    user: mongoose.Types.ObjectId;
    name: string;
    stack: string;
    status: projectStatus;
    progress: number;
    dueDate: Date | null;
    milestones: Milestone[]
}

const ProjectDbSchema: Schema<ProjectDocument> = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "UserModel",
        required: [true, "Ref of user is required"]
    },
    name: {
        type: String,
        trim: true,
        required: [true, "Project name is required"]
    },
    stack: {
        type: String,
        required: [true, "Stack is required"]
    },
    status: {
        type: String,
        enum: Object.values(projectStatus),
        default: projectStatus.STARTED
    },
    progress: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    dueDate: {
        type: Date,
        default: null
    },
    milestones: {
        type: [milestoneDbSchema],
        default: []
    }
}, { timestamps: true })

export const ProjectModel = mongoose.model<ProjectDocument>(
    "ProjectModel",
    ProjectDbSchema
)