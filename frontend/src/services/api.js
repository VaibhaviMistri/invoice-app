import axios from "axios"

const API = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const createInvoice = (data) => API.post("/invoices/create", data);
export const getAllInvoices = () => API.get("/invoices")
export const getInvoiceDetails = (id) => API.get(`/invoices/${id}`)
export const addPayment = (id, amount) => API.post(`/invoices/${id}/payments`, { amount })
export const archiveInvoice = (id) => API.post("/invoices/archive", { id });
export const restoreInvoice = (id) => API.post("/invoices/restore", { id });