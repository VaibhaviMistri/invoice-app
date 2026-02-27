import mongoose from "mongoose"

const invoiceSchema = new mongoose.Schema({
    invoiceNumber: {
        type: String,
        required: true,
        unique: true,
    },
    customerName: {
        type: String,
        required: true,
    },
    issueDate: {
        type: Date,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['DRAFT', 'PAID'],
        default: 'DRAFT',
    },
    total: {
        type: Number,
        default: 0,
    },
    amountPaid: {
        type: Number,
        default: 0,
    },
    balanceDue: {
        type: Number,
        default: 0,
    },
    isArchived: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

invoiceSchema.virtual("isOverdue").get(function () {
  return this.status !== "PAID" && new Date(this.dueDate) < new Date();
});

// Make sure virtuals are included in JSON response
invoiceSchema.set("toJSON", { virtuals: true });
invoiceSchema.set("toObject", { virtuals: true });

export default mongoose.model("Invoice", invoiceSchema)