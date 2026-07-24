import mongoose, { Schema, Document } from "mongoose";
import { UserModel } from "./user.model";

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
    dueDate: Date;
}

const ProjectDbSchema: Schema<ProjectDocument> = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: UserModel,
        required: [true, "Ref of user is required"],
        default: null
    },
    name: {
        type: String,
        trim: true,
        required: [true, "Project name is rquired"]
    },
    stack: {
        type: String,
        // check this 
    },
    status: {
        type: String,
        enum: Object.values(projectStatus),
        default: projectStatus.STARTED
    },
    progress: {
        type: Number,
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