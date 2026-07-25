import mongoose, { Schema, Document, ObjectId } from "mongoose";
import { UserModel } from "./User.model";
import { TransactionModel } from "./Payment.model";
import { ProjectModel } from "./Project.model";

export enum invoiceStatus {
    PENDING = "pending",
    PAID = "paid",
    FAILED = "failed"
}

interface InvoiceDocument extends Document {
    user: mongoose.Types.ObjectId | null;
    project: mongoose.ObjectId | null;
    payment: mongoose.ObjectId | null;
    invoiceNumber: string;
    subtotal: number;
    tax: number;
    total: number;
    status: invoiceStatus;
    pdfUrl: string;
    dueDate: Date | null;
}

const InvoiceDbSchema: Schema<InvoiceDocument> = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: UserModel,
        required: [true, "Ref of user is required"],
        default: null
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: ProjectModel,
        required: [true, "Project ref is required"],
        default: null
    },
    payment: {
        types: Schema.Types.ObjectId,
        ref: TransactionModel,
        required: [true, "Payment ref is required"],
        default: null
    },
    invoiceNumber: {
        type: String,
        required: [true, "Invoice Number is required"],
        default: ""
    },
    subtotal: {
        type: Number,
        required: [true, "Subtotal is required"],
        default: 0
    },
    tax: {
        type: Number,
        required: [true, "Tax is required"],
        default: 0
    },
    total: {
        type: Number,
        required: [true, "Total is required"],
        default: 0
    },
    status: {
        type: String,
        enum: Object.values(invoiceStatus),
        default: invoiceStatus.PENDING
    },
    pdfUrl: {
        type: String,
        required: [true, "PDF URL is required"],
        default: ""
    },
    dueDate: {
        type: Date,
        required: [true, "Due Date is required"],
        default: null
    },

}, { timestamps: true })

export const InvoiceModel = mongoose.model<InvoiceDocument>(
    "InvoiceModel",
    InvoiceDbSchema
)