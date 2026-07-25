import mongoose, { Schema, Document } from "mongoose";

// Was declared in the interface (`status: string`) but never added to the
// schema — TypeScript thought it existed, MongoDB never actually stored it.
export enum messageStatus {
    NEW = "new",
    CONTACTED = "contacted",
    CONVERTED = "converted",
    CLOSED = "closed"
}

interface ChatMessageDocument extends Document {
    name: string;
    email: string;
    phone: string;
    subject: string;
    service: string;
    budget: string;
    message: string;
    status: messageStatus;
}

const ChatMessageDbSchema: Schema<ChatMessageDocument> = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        index: true
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        index: true,
        lowercase: true
    },

    phone: {
        type: String,
        required: [true, "Phone No. is required"]
        // `unique` removed — this is a public lead-capture form. The same
        // person legitimately submitting a second inquiry would previously
        // have hit a duplicate-key error here.
    },

    subject: {
        type: String,
        trim: true,
        index: true,
        required: [true, "Subject is required"],
    },

    service: {
        type: String,
        required: [true, "Service is required"],
    },

    budget: {
        type: String,
        default: "",
    },

    message: {
        type: String,
        trim: true,
        required: [true, "Message is required"]
    },

    status: {
        type: String,
        enum: Object.values(messageStatus),
        default: messageStatus.NEW
    }
}, { timestamps: true });

export const ChatMessageModel = mongoose.model<ChatMessageDocument>(
    "ChatMessage",
    ChatMessageDbSchema
);
