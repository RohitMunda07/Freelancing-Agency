import mongoose, { Schema, Document } from "mongoose";
import { invoiceStatus } from "./TransactionModel";
import { UserModel } from "./user.model";

export enum transactionPaymentMode {
    CARD = "card",
    UPI = "upi",
    ACCOUNT_PAYMENT = "account_payment"
}

export enum currencyType {
    INR = "inr",
    OTHERS = "others"
}

export interface TransactionDocument extends Document {
    user: mongoose.Types.ObjectId | null;
    amount: number;
    currency: currencyType;

    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;

    paymentStatus: string;
    paidAt: Date | null;

    paymentMethod: transactionPaymentMode;
    paymentGatewayId: string;
    paymentUserId: mongoose.Types.ObjectId | null;
}

const TransactionDbSchema: Schema<TransactionDocument> = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: UserModel,
        required: [true, "Ref of user is required"],
        default: null
    },
    amount: {
        type: Number,
        required: [true, "Amount is required"],
        default: 0
    },
    currency: {
        type: String,
        enum: Object.values(currencyType),
        required: [true, "Currency is required"],
        default: currencyType.INR
    },

    razorpayOrderId: {
        type: String,
        required: [true, "RazorpayOrderId is required"],
        default: null,
    },
    razorpayPaymentId: {
        type: String,
        required: [true, "razorpayPaymentId is required"],
        default: null,
    },
    razorpaySignature: {
        type: String,
        required: [true, "RazorpayOrderId is required"],
        default: null,
    },

    paymentMethod: {
        type: String,
        enum: Object.values(transactionPaymentMode),
        required: true,
        default: null
    },
    paymentStatus: {
        type: String,
        enum: ["Pending", "Success", "Failed"],
        required: true,
        default: invoiceStatus.PENDING
    },
    paidAt: {
        type: Date,
        required: [true, "Paid At value is required"],
        default: null
    },
    paymentGatewayId: {
        type: String,
    },
    paymentUserId: {
        type: Schema.Types.ObjectId,
        ref: "UserModel",
        required: true
    }
}, { timestamps: true })

export const TransactionModel = mongoose.model<TransactionDocument>("TransactionModel", TransactionDbSchema)