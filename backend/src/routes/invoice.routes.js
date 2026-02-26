import express from "express";
import {
  createInvoice,
  getAllInvoices,
  getInvoiceDetails,
  addPayment,
  archiveInvoice,
  restoreInvoice
} from "../controllers/invoice.controller.js";

const router = express.Router();

router.post("/create", createInvoice);
router.get("/", getAllInvoices);
router.get("/:id", getInvoiceDetails);
router.post("/:id/payments", addPayment);
router.post("/archive", archiveInvoice);
router.post("/restore", restoreInvoice);

export default router;