import mongoose from "mongoose";
import dotenv from "dotenv";
import Invoice from "./models/Invoice.js";
import InvoiceLine from "./models/InvoiceLine.js";
import Payment from "./models/Payment.js";

dotenv.config();

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected");

  // Clear existing data
  await Invoice.deleteMany();
  await InvoiceLine.deleteMany();
  await Payment.deleteMany();

  // Create invoice
  const invoice = await Invoice.create({
    invoiceNumber: "INV-001",
    customerName: "Vaibhavi Mistri",
    issueDate: new Date("2024-01-01"),
    dueDate: new Date("2024-01-31"),
    status: "DRAFT",
    total: 500,
    amountPaid: 100,
    balanceDue: 400,
    isArchived: false,
  });

  // Create line items
  await InvoiceLine.create([
    {
      invoiceId: invoice._id,
      description: "Web Design",
      quantity: 2,
      unitPrice: 100,
    },
    {
      invoiceId: invoice._id,
      description: "Backend Development",
      quantity: 3,
      unitPrice: 100,
    },
  ]);

  // Create a payment
  await Payment.create({
    invoiceId: invoice._id,
    amount: 100,
    paymentDate: new Date("2024-01-10"),
  });

  console.log("Seed data created successfully");
  console.log("Invoice ID:", invoice._id.toString());
  process.exit();
};

seed();