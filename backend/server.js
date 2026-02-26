import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./src/db.js"
import invoiceRoutes from "./src/routes/invoice.routes.js"

dotenv.config()
connectDB()

const app = express()
app.use(cors())
app.use(express.json())

app.get("/test", (req, res) => {
  res.json({ message: "Server is working" });
});
app.use("/api/invoices", invoiceRoutes);

const PORT = process.env.PORT || 8000
app.listen(PORT,()=> console.log(`Server running on PORT ${PORT}`))