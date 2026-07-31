import { asyncHandler } from "../utils/asyncHandler.js"
import ApiError from "../utils/apiError.js"
import ApiResponse from "../utils/apiResponse.js"
import { InvoiceModel } from "../models/Invoice.model.js"
import mongoose from "mongoose"
import { CreateInvoiceSchema, InvoiceZodSchema, UpdateInvoiceStatusSchema } from "../validators/invoice.schema.js"
import { ProjectModel } from "../models/Project.model.js"

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
    const randomPart = Math.floor(100000 + Math.random() * 900000);

    return `INV-${year}${month}${day}-${randomPart}`;
}

// Example usage:
// console.log(generateInvoiceNumber()); // e.g., INV-20260728-4821


const createInvoice = asyncHandler(async (req, res) => {

    const parsed = CreateInvoiceSchema.safeParse(req.body)

    if (!parsed.success) {
        throw new ApiError(400, parsed.error.issues[0]?.message || "Validation failed", [], "")
    }

    const { project, items, subtotal, tax, dueDate } = parsed.data

    if (!mongoose.isValidObjectId(project)) {
        throw new ApiError(400, "Invalid Project Id", [], "")
    }

    const existingProject = await ProjectModel.findById(project)
    if (!existingProject) {
        throw new ApiError(404, "Project not found", [], "")
    }

    const user = existingProject.user

    const total = Math.round((subtotal + tax) * 100) / 100

    // invoiceNumber has a unique index — retry on an actual collision
    // instead of assuming a 6-digit random suffix can never collide.
    const MAX_ATTEMPTS = 5
    let newInvoice = null
    let lastError: unknown = null

    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
        const invoiceNumber = generateInvoiceNumber()

        try {
            newInvoice = await InvoiceModel.create({
                user,
                project,
                items,
                invoiceNumber,
                subtotal,
                tax,
                total,
                dueDate,
            })
            break
        } catch (error: any) {
            // 11000 = MongoDB duplicate key error. Anything else should
            // fail immediately rather than retrying blindly.
            if (error?.code === 11000 && error?.keyPattern?.invoiceNumber) {
                lastError = error
                continue
            }
            throw error
        }
    }

    if (!newInvoice) {
        throw new ApiError(500, "Could not generate a unique invoice number, please try again", [], String(lastError))
    }

    return res
        .status(201)
        .json(
            new ApiResponse(201, newInvoice, "Invoice created successfully")
        )
})

const getInvoices = asyncHandler(async (req, res) => {
    if (!req.user) {
        throw new ApiError(401, "Unauthorized", [], "")
    }

    const filter = req.user.role === "admin" ? {} : { user: req.user._id }

    const invoices = await InvoiceModel
        .find(filter)
        .populate("project", "name stack")
        .sort({ createdAt: -1 })

    return res
        .status(200)
        .json(new ApiResponse(200, invoices, "Invoices fetched successfull"))
})

const getInvoiceById = asyncHandler(async (req, res) => {
    const { invoiceId } = req.params as { invoiceId: string };
    if (!mongoose.Types.ObjectId.isValid(invoiceId)) {
        throw new ApiError(400, "Invalid Invoice Id", [], "")
    }

    const existingInvoice = await InvoiceModel
        .findById(invoiceId)
        .populate("project", "name stack");

    if (!existingInvoice) {
        throw new ApiError(404, "No Invoice Found")
    }

    // Neither admin nor client requested the invoice
    // Was completely missing — any authenticated caller could fetch any
    // invoice by ID, exposing another client's billing details.
    if (req.user?.role !== "admin" && existingInvoice.user.toString() !== req.user?._id?.toString()) {
        throw new ApiError(403, "Forbidden", [], "")
    }

    return res.status(200).json(
        new ApiResponse(200, existingInvoice, "Fetch the invoice successfully")
    )
})

const updateInvoiceStatus = asyncHandler(async (req, res) => {

    if (req.user?.role !== "admin") {
        throw new ApiError(403, "Only an admin can update invoice status", [], "")
    }

    const { invoiceId } = req.params as { invoiceId: string };
    if (!mongoose.Types.ObjectId.isValid(invoiceId)) {
        throw new ApiError(400, "Invalid Invoice Id")
    }

    const parsed = UpdateInvoiceStatusSchema.safeParse(req.body)

    if (!parsed.success) {
        throw new ApiError(400, parsed.error.issues[0]?.message || "Validation failed", [], "")
    }

    const existingInvoice = await InvoiceModel.findByIdAndUpdate(
        invoiceId,
        { $set: { status: parsed.data.status } },
        { new: true, runValidators: true }
    );

    if (!existingInvoice) {
        throw new ApiError(404, "No Invoice Found")
    }

})

const deleteInvoice = asyncHandler(async (req, res) => {

    if (req.user?.role !== "admin") {
        throw new ApiError(403, "Only an admin can delete an invoice", [], "")
    }

    const { invoiceId } = req.params as { invoiceId: string };
    if (!mongoose.Types.ObjectId.isValid(invoiceId)) {
        throw new ApiError(400, "Invalid Invoice Id")
    }

    const existingInvoice = await InvoiceModel.findByIdAndDelete(invoiceId);
    if (!existingInvoice) {
        throw new ApiError(404, "No Invoice Found", [], "")
    }

    return res.status(200).json(
        new ApiResponse(200, {}, "Invoice Deleted Successfully")
    )
})

export {
    createInvoice,
    getInvoiceById,
    getInvoices,
    updateInvoiceStatus,
    deleteInvoice
}