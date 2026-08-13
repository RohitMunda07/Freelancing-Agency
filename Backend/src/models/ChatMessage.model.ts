import mongoose, { Schema, Document } from "mongoose";

export enum messageStatus {
    NEW = "new",
    CONTACTED = "contacted",
    CONVERTED = "converted",
    CLOSED = "closed"
}

export enum messageType {
    QUICK = "quick",
    PROJECT = "project"
}

interface ChatMessageDocument extends Document {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    service?: string;
    budget?: string;
    message: string;
    type: messageType;
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
        trim: true
    },

    subject: {
        type: String,
        trim: true,
        index: true
    },

    service: {
        type: String,
        trim: true
    },

    budget: {
        type: String,
        default: ""
    },

    message: {
        type: String,
        trim: true,
        required: [true, "Message is required"]
    },

    type: {
        type: String,
        enum: Object.values(messageType),
        required: true,
        default: messageType.QUICK
    },

    status: {
        type: String,
        enum: Object.values(messageStatus),
        default: messageStatus.NEW
    }

}, {
    timestamps: true
});

export const ChatMessageModel = mongoose.model<ChatMessageDocument>(
    "ChatMessage",
    ChatMessageDbSchema
);