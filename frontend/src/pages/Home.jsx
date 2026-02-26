import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
    const [invoices, setInvoices] = useState([])
    const [showArchived, setShowArchived] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:8000/api/invoices?showArchived=${showArchived}`)
            .then(({ data }) => setInvoices(data))
    }, [showArchived])

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Invoices</h1>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowArchived(!showArchived)}
                            className={`text-sm px-4 py-2 rounded-lg font-medium shadow-sm active:scale-95 transition cursor-pointer ${showArchived
                                    ? 'bg-gray-600 text-white hover:bg-gray-700'
                                    : 'bg-gray-500 text-white hover:bg-gray-600'
                                }`}
                        >
                            {showArchived ? 'Hide Archived' : 'Show Archived'}
                        </button>
                        <button
                            onClick={() => navigate('/invoices/create')}
                            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                        >
                            + Create Invoice
                        </button>
                    </div>
                </div>

                {invoices.length === 0 ? (
                    <p className="text-gray-400 text-sm">
                        {showArchived ? 'No archived invoices found.' : 'No invoices found.'}
                    </p>
                ) : (
                    <div className="space-y-3">
                        {invoices.map((invoice) => (
                            <div
                                key={invoice._id}
                                onClick={() => navigate(`/invoices/${invoice._id}`)}
                                className={`bg-white rounded-xl shadow-sm px-6 py-4 flex justify-between items-center cursor-pointer hover:shadow-md transition ${invoice.isArchived ? 'opacity-60' : ''
                                    }`}
                            >
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-semibold text-gray-800">{invoice.invoiceNumber}</p>
                                        {invoice.isArchived && (
                                            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                                                Archived
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-500">{invoice.customerName}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-sm font-medium text-gray-700">
                                        ${invoice.total.toFixed(2)}
                                    </span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${invoice.status === 'PAID'
                                            ? 'bg-green-100 text-green-600'
                                            : 'bg-yellow-100 text-yellow-600'
                                        }`}>
                                        {invoice.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home