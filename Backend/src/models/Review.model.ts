import mongoose, { Schema, Document } from "mongoose";

// This was missing entirely — only a "// check for status" comment existed.
// Mirrors the moderation flow every other status field already has.
export enum reviewStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected"
}

export interface FeedbackDocument extends Document {
    user: mongoose.Types.ObjectId;
    project: mongoose.Types.ObjectId;
    rating: number;
    comment: string;
    status: reviewStatus;
    isVisible: boolean;
}

const FeedbackDbSchema: Schema<FeedbackDocument> = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "UserModel",
        required: [true, "User ref is required"]
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: "ProjectModel",
        required: [true, "Project ref is required"]
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
    status: {
        type: String,
        enum: Object.values(reviewStatus),
        default: reviewStatus.PENDING
    },
    isVisible: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

// Was `{ user: 1 }` unique — that limited each user to ONE review, ever,
// across every project. Compound index lets them review each project once.
FeedbackDbSchema.index(
    { user: 1, project: 1 },
    { unique: true }
)

export const FeedbackModel = mongoose.model<FeedbackDocument>("FeedbackModel", FeedbackDbSchema)
