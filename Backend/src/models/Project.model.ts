import mongoose, { Schema, Document } from "mongoose";

export enum projectStatus {
    STARTED = "started",
    UNDER_PROCESS = "under_process",
    TESTING = "testing",
    COMPLETED = "completed",
    DELIVERED = "delivered"
}

export interface ProjectDocument extends Document {
    user: mongoose.Types.ObjectId;
    name: string;
    stack: string;
    status: projectStatus;
    progress: number;
    dueDate: Date | null;
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
    }
}, { timestamps: true })

export const ProjectModel = mongoose.model<ProjectDocument>(
    "ProjectModel",
    ProjectDbSchema
)
