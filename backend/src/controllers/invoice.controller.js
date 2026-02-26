import Invoice from "../models/Invoice.js";
import InvoiceLine from "../models/InvoiceLine.js";
import Payment from "../models/Payment.js";

export const createInvoice = async (req, res) => {
  try {
    const { invoiceNumber, customerName, dueDate, lineItems } = req.body;

    // Calculate total from line items
    const total = lineItems.reduce((sum, item) => {
      return sum + item.quantity * item.unitPrice;
    }, 0);

    // Create invoice
    const invoice = await Invoice.create({
      invoiceNumber,
      customerName,
      issueDate: new Date(),
      dueDate,
      status: "DRAFT",
      total,
      amountPaid: 0,
      balanceDue: total,
      isArchived: false,
    });

    // Create line items
    const lines = lineItems.map((item) => ({
      invoiceId: invoice._id,
      description: item.description,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      lineTotal: item.quantity * item.unitPrice,
    }));

    await InvoiceLine.insertMany(lines);

    res.status(201).json({ message: "Invoice created successfully", invoice });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllInvoices = async (req, res) => {
  try {
    const { showArchived } = req.query;
    const filter = showArchived === "true" ? {} : { isArchived: false };
    const invoices = await Invoice.find(filter);
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getInvoiceDetails = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) return res.status(404).json({ message: "Invoice not found" });

    const lineItems = await InvoiceLine.find({ invoiceId: req.params.id });
    const payments = await Payment.find({ invoiceId: req.params.id });

    res.json({
      ...invoice.toObject(),
      lineItems,
      payments,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addPayment = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) return res.status(404).json({ message: "Invoice not found" });

    const { amount } = req.body;

    if (!amount || amount <= 0)
      return res.status(400).json({ message: "Amount must be greater than 0" });

    if (amount > invoice.balanceDue)
      return res.status(400).json({ message: "Amout exceeds balance due" });

    const payment = new Payment({
      invoiceId: invoice._id,
      amount,
      paymentDate: new Date(),
    });

    await payment.save();

    invoice.amountPaid += amount;
    invoice.balanceDue -= amount;
    if (invoice.balanceDue === 0) invoice.status = "PAID";

    await invoice.save();

    res
      .status(201)
      .json({ message: "Payment added successfully", payment, invoice });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const archiveInvoice = async (req, res) => {
  try {
    const { id } = req.body;
    const invoice = await Invoice.findByIdAndUpdate(
      id,
      { isArchived: true },
      { new: true },
    );

    if (!invoice) return res.status(404).json({ message: "Invoice not found" });
    res.json({ message: "Invoice archived successfully", invoice });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const restoreInvoice = async (req, res) => {
  try {
    const { id } = req.body;
    const invoice = await Invoice.findByIdAndUpdate(
      id,
      { isArchived: false },
      { new: true },
    );
    if (!invoice) return res.status(404).json({ message: "Invoice not found" });

    res.json({ message: "Invoice restored successfully", invoice });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};