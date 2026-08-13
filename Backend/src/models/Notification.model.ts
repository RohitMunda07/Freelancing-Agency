import mongoose, { Schema, Document } from "mongoose";
export enum NotificationStatus {
    READ = "read",
    PENDING = "pending"
}

export interface NotificationDocument {
    name: string,
    email: string,
    message: string,
    status: string
}

const NotificationDbSchema: Schema<NotificationDocument> = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true
    },
    message: {
        type: String,
        required: [true, "Message is required"],
        trim: true
    },
    status: {
        type: String,
        enum: Object.values(NotificationStatus),
        default: NotificationStatus.PENDING
    }
}, { timestamps: true })

export const NotificationModel = mongoose.model<NotificationDocument>(
    "NotificationModel",
    NotificationDbSchema
)