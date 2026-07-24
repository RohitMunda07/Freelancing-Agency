import mongoose, { Schema, Document } from "mongoose";
import { UserModel } from "./user.model";

export interface MailDocument {
    user: mongoose.Types.ObjectId | null;
    recipient: string;
    subject: string;
    template: string;
    // status: enum;
    sentAt: Date | null;
}

const MailDbSchema: Schema<MailDocument> = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: UserModel,
        required: [true, "Ref of user is required"],
        default: null
    },
    recipient: {
        type: String,
        required: [true, "Recipient is rquired"]
    },
    subject: {
        type: String,
        required: [true, "Subject is required"]
    },
    template: {
        type: String
    },
    // status: {
    //     type: enum
    // },
    sentAt: {
        type: Date,
        default: null
    }
}, { timestamps: true })

export const MailModel = mongoose.model<MailDocument>(
    "MailModel",
    MailDbSchema
)