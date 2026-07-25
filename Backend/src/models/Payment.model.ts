import mongoose, { Schema, Document } from "mongoose";

export enum transactionPaymentMode {
    CARD = "card",
    UPI = "upi",
    ACCOUNT_PAYMENT = "account_payment"
}

export enum currencyType {
    INR = "inr",
    OTHERS = "others"
}

// Defined locally instead of importing invoiceStatus from TransactionModel.ts —
// that import was the other half of the circular dependency, and Payment's
// status shouldn't be borrowing Invoice's enum anyway (different lifecycles).
export enum paymentStatus {
    PENDING = "pending",
    SUCCESS = "success",
    FAILED = "failed"
}

export interface TransactionDocument extends Document {
    user: mongoose.Types.ObjectId;
    amount: number;
    currency: currencyType;

    razorpayOrderId: string;
    razorpayPaymentId?: string;
    razorpaySignature?: string;

    paymentStatus: paymentStatus;
    paidAt?: Date;

    paymentMethod?: transactionPaymentMode;
    paymentGatewayId?: string;
}

const TransactionDbSchema: Schema<TransactionDocument> = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "UserModel", // string ref — no need to import the User model at all
        required: [true, "Ref of user is required"]
    },
    amount: {
        type: Number,
        required: [true, "Amount is required"]
    },
    currency: {
        type: String,
        enum: Object.values(currencyType),
        default: currencyType.INR
    },

    razorpayOrderId: {
        type: String,
        required: [true, "RazorpayOrderId is required"]
    },
    // Only known once Razorpay confirms the payment — can't be required at creation
    razorpayPaymentId: {
        type: String
    },
    razorpaySignature: {
        type: String
    },

    paymentMethod: {
        type: String,
        enum: Object.values(transactionPaymentMode)
    },
    paymentStatus: {
        type: String,
        enum: Object.values(paymentStatus),
        default: paymentStatus.PENDING
    },
    paidAt: {
        type: Date
    },
    paymentGatewayId: {
        type: String
    }
    // removed `paymentUserId` — it duplicated `user` above, same ObjectId ref
}, { timestamps: true })

export const TransactionModel = mongoose.model<TransactionDocument>("TransactionModel", TransactionDbSchema)
