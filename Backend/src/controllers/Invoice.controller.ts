import { asyncHandler } from "../utils/asyncHandler"
import ApiError from "../utils/apiError"
import ApiResponse from "../utils/apiResponse"
import { InvoiceModel } from "../models/Invoice.model"
import mongoose from "mongoose"

/**
 * Generates a unique invoice number.
 * Format: INV-YYYYMMDD-XXXX
 * - YYYYMMDD = current date
 * - XXXX = random 4-digit number
 */
function generateInvoiceNumber(): string {
    const now = new Date();

    // Format date as YYYYMMDD
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    // Generate a random 4-digit number
    const randomPart = Math.floor(1000 + Math.random() * 9000);

    return `INV-${year}${month}${day}-${randomPart}`;
}

// Example usage:
// console.log(generateInvoiceNumber()); // e.g., INV-20260728-4821


const createInvoice = asyncHandler(async (req, res) => {
    const { user, project, payment, items } = req.body;
    if (!mongoose.Types.ObjectId.isValid(user)) {
        throw new ApiError(400, "Invalid User Id")
    }

    if (!mongoose.Types.ObjectId.isValid(project)) {
        throw new ApiError(400, "Invalide Project Id")
    }

    // if (payment) {
    //     if (!mongoose.Types.ObjectId.isValid(payment)) {
    //         throw new ApiError(400, "Invalide Payment Id")
    //     }
    // }

    if (!Array.isArray(items)) {
        throw new ApiError(400, "Ivalide Argument: Expected an array of object")
    }

    let lineTotal = 0;
    
    for (const obj of items) {
        if (typeof obj !== 'object' || obj === null) {
            throw new ApiError(400, "Each item must be a non-null object")
        }

        Object.entries(obj).map(item => (
            lineTotal += item.quantity * item.unitPrice
        ))
    }

    const invoiceNumber = generateInvoiceNumber();
    const subtotal = 

    const invoiceData: Record<string, unknown> = {
        user,
        project,
        items,
        invoiceNumber,

    }

})
const getInvoices = asyncHandler(async (req, res) => {

})
const getInvoiceById = asyncHandler(async (req, res) => {

})
const updateInvoiceStatus = asyncHandler(async (req, res) => {

})
const deleteInvoice = asyncHandler(async (req, res) => {

})

export {
    createInvoice,
    getInvoiceById,
    getInvoices,
    updateInvoiceStatus,
    deleteInvoice
}