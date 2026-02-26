import { useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { getInvoiceDetails } from "../services/api"
import InvoiceHeader from "../components/InvoiceHeader"
import LineItemsTable from "../components/LineItemsTable"
import TotalsSection from "../components/TotalSection"
import PaymentsSection from "../components/PaymentsSection"

const InvoiceDetails = () => {
    const { id } = useParams()
    const [invoice, setInvoice] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate();
    
    const fetchInvoice = useCallback(async () => {
        try {
            const { data } = await getInvoiceDetails(id)
            setInvoice(data)
        } catch (error) {
            setError(error)
        }
        finally {
            setLoading(false)
        }
    }, [id])

    useEffect(() => {
        fetchInvoice()
    }, [fetchInvoice])

    if (loading) return <div className="flex justify-center items-center h-screen text-gray-500">Loading...</div>
    if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>
    if (!invoice) return null

  return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
              <button
                  onClick={() => navigate('/')}
                  className="text-sm bg-gray-200 text-gray-700 p-2 rounded-2xl hover:bg-gray-300 transition ml-267 mb-3"
              >
                  ← Back to Invoices
              </button>
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8 space-y-8">
              <InvoiceHeader invoice={invoice} onUpdate={fetchInvoice} />
              <LineItemsTable lineItems={invoice.lineItems} />
              <TotalsSection invoice={invoice} />
              <PaymentsSection invoice={invoice} onUpdate={fetchInvoice} />
          </div>
      </div>
  )
}

export default InvoiceDetails