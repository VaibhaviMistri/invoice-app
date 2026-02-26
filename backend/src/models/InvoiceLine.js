import mongoose from "mongoose";

const invoiceLineSchema = new mongoose.Schema(
  {
    invoiceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
    lineTotal: {
      type: Number,
    },
  },
  { timestamps: true },
);

invoiceLineSchema.pre("save", async function () {
  this.lineTotal = this.quantity * this.unitPrice;
});

export default mongoose.model("InvoiceLine", invoiceLineSchema);
