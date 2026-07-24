import mongoose, { Schema, Document } from "mongoose";
import { UserModel } from "./user.model";
import { ProjectModel } from "./Project.model";

export interface FeedbackDocument extends Document {
    user: mongoose.Types.ObjectId | null;
    project: mongoose.Types.ObjectId | null;

    rating: number;

    comment: string;

    // check fot status from ER-diagram
    isVisible: boolean;
}

const FeedbackDbSchema: Schema<FeedbackDocument> = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: UserModel,
        required: [true, "User ref is required"],
        default: null
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: ProjectModel,
        required: [true, "Project ref is required"],
        default: null
    },

    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },

    comment: {
        type: String,
        trim: true
    },

    isVisible: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

FeedbackDbSchema.index(
    { user: 1, },
    { unique: true }
)

export const FeedbackModel = mongoose.model<FeedbackDocument>("FeedbackModel", FeedbackDbSchema)