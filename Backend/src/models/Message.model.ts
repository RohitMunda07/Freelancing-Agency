import mongoose, { Schema, Document } from "mongoose";
interface MessageDocument extends Document {
    name: string;
    email: string;
    phone: string;
    subject: string;
    service: string;
    budget: string;
    message: string;
    status: string;
}

const MessageDbSchema: Schema<MessageDocument> = new Schema({
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
        index: true
    },
    phone: {
        
    }
}, { timestamps: true })