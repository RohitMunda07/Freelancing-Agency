import mongoose, { Schema, Document } from "mongoose";

// Was fully commented out. Mirrors Message/Payment/Invoice status handling.
export enum mailStatus {
    PENDING = "pending",
    SENT = "sent",
    FAILED = "failed"
}

// Was just `interface MailDocument` — missing `extends Document`, so it had
// no `_id`, `.save()`, or timestamps at the type level despite the schema
// having `timestamps: true`.
export interface MailDocument extends Document {
    user: mongoose.Types.ObjectId;
    recipient: string;
    subject: string;
    template: string;
    status: mailStatus;
    sentAt: Date | null;
}

const MailDbSchema: Schema<MailDocument> = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "UserModel",
        required: [true, "Ref of user is required"]
    },
    recipient: {
        type: String,
        required: [true, "Recipient is required"]
    },
    subject: {
        type: String,
        required: [true, "Subject is required"]
    },
    template: {
        type: String
    },
    status: {
        type: String,
        enum: Object.values(mailStatus),
        default: mailStatus.PENDING
    },
    sentAt: {
        type: Date,
        default: null
    }
}, { timestamps: true })

export const MailModel = mongoose.model<MailDocument>(
    "MailModel",
    MailDbSchema
)
