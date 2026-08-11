import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
    createInvoice,
    getInvoiceById,
    getInvoices,
    updateInvoiceStatus,
    deleteInvoice
} from "../controllers/Invoice.controller.js"

const router = Router()

router.route("/invoices").post(verifyJWT, createInvoice)
router.route("/invoices/:invoiceId").get(verifyJWT, getInvoiceById)
router.route("/invoices").get(verifyJWT, getInvoices)
router.route("/invoices/:invoiceId").patch(verifyJWT, updateInvoiceStatus)
router.route("/invoices/:invoiceId").delete(verifyJWT, deleteInvoice)

export default router