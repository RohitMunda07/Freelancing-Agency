import mongoose, { Schema, Document } from "mongoose";

export enum invoiceStatus {
    PENDING = "pending",
    PAID = "paid",
    FAILED = "failed"
}

export interface InvoiceItem {
    description: string;
    quantity: number;
    rate: number;
    amount: number;
}

export interface InvoiceDocument extends Document {
    user: mongoose.Types.ObjectId;
    project: mongoose.Types.ObjectId;
    payment: mongoose.Types.ObjectId | null;
    invoiceNumber: string;
    // Was being validated in the controller but never actually stored
    // anywhere — the model had no field for it, so items were silently
    // dropped on every create.
    items: InvoiceItem[];
    subtotal: number;
    tax: number;
    total: number;
    status: invoiceStatus;
    pdfUrl?: string;
    dueDate: Date | null;
}

const InvoiceItemSchema = new Schema<InvoiceItem>(
    {
        description: { type: String, required: true, trim: true },
        quantity: { type: Number, default: 1 },
        rate: { type: Number, required: true },
        amount: { type: Number, required: true },
    },
    { _id: false }
)

const InvoiceDbSchema: Schema<InvoiceDocument> = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "UserModel",
        required: [true, "Ref of user is required"]
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: "ProjectModel",
        required: [true, "Project ref is required"]
    },
    payment: {
        // was `types:` (typo) — Mongoose didn't recognize the key, so this
        // field silently wasn't behaving as an ObjectId ref before.
        type: Schema.Types.ObjectId,
        ref: "TransactionModel"
        // no `required` — an invoice can exist (draft/sent) before it's paid
    },
    invoiceNumber: {
        type: String,
        required: [true, "Invoice Number is required"],
        unique: true
    },
    items: {
        type: [InvoiceItemSchema],
        default: []
    },
    subtotal: {
        type: Number,
        required: [true, "Subtotal is required"],
        default: 0
    },
    tax: {
        type: Number,
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
        type: String
        // no longer required — PDF is generated after the invoice exists
    },
    dueDate: {
        type: Date,
        default: null
    },
}, { timestamps: true })

export const InvoiceModel = mongoose.model<InvoiceDocument>(
    "InvoiceModel",
    InvoiceDbSchema
)