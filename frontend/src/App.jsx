import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import CreateInvoice from "./pages/CreateInvoice"
import InvoiceDetails from "./pages/InvoiceDetails"

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/invoices/create",
      element: <CreateInvoice />
    },
    {
      path: "/invoices/:id",
      element: <InvoiceDetails />
    }
  ])

  return <RouterProvider router={appRouter} />
}

export default App