import mongoose, { Schema, Document } from "mongoose";
interface ChatMessageDocument extends Document {
    name: string;
    email: string;
    phone: string;
    subject: string;
    service: string;
    budget: string;
    message: string;
    status: string;
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
        required: true,
        unique: [true, "Phone No. is required"],
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
    }
}, { timestamps: true });

export const ChatMessageModel = mongoose.model<ChatMessageDocument>(
    "ChatMessage",
    ChatMessageDbSchema
);