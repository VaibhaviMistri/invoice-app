import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createInvoice } from '../services/api'

const CreateInvoice = () => {
    const navigate = useNavigate()
    const [invoiceNumber, setInvoiceNumber] = useState('')
    const [customerName, setCustomerName] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [lineItems, setLineItems] = useState([
        { description: '', quantity: 1, unitPrice: 0 }
    ])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleLineItemChange = (index, field, value) => {
        const updated = [...lineItems]
        updated[index][field] = field === 'description' ? value : parseFloat(value) || 0
        setLineItems(updated)
    }

    const addLineItem = () => {
        setLineItems([...lineItems, { description: '', quantity: 1, unitPrice: 0 }])
    }

    const removeLineItem = (index) => {
        if (lineItems.length === 1) return
        setLineItems(lineItems.filter((_, i) => i !== index))
    }

    const calculateTotal = () => {
        return lineItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
    }

    const handleSubmit = async () => {
        setError(null)
        if (!invoiceNumber.trim()) return setError('Invoice Number is required')
        if (!customerName.trim()) return setError('Customer name is required')
        if (!dueDate) return setError('Due date is required')
        if (lineItems.some(item => !item.description.trim())) return setError('All line items must have a description')

        try {
            setLoading(true)
            const { data } = await createInvoice({ invoiceNumber, customerName, dueDate, lineItems })
            navigate(`/invoices/${data.invoice._id}`)
        } catch (error) {
            setError(`Failed to create invoice. Please try again:${error}`)
        } finally {
            setLoading(false)
        }
    }

    const total = calculateTotal()
    const today = new Date().toLocaleDateString()

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Create Invoice</h1>
                    <button
                        onClick={() => navigate('/')}
                        className="text-sm text-gray-500 hover:text-gray-700 transition"
                    >
                        ← Back to Invoices
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-8">

                    {/* LEFT SIDE - Form */}
                    <div className="bg-white rounded-2xl shadow-md p-6 space-y-5">
                        <h2 className="text-lg font-semibold text-gray-700">Invoice Details</h2>
                        <div className="space-y-1">
                            <label className="text-sm text-gray-600">Invoice Number</label>
                            <input
                                type="text"
                                value={invoiceNumber}
                                onChange={(e) => setInvoiceNumber(e.target.value)}
                                placeholder="Enter Invoice Number"
                                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        {/* Customer Name */}
                        <div className="space-y-1">
                            <label className="text-sm text-gray-600">Customer Name</label>
                            <input
                                type="text"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                placeholder="Enter customer name"
                                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        {/* Due Date */}
                        <div className="space-y-1">
                            <label className="text-sm text-gray-600">Due Date</label>
                            <input
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        {/* Line Items */}
                        <div className="space-y-3">
                            <label className="text-sm text-gray-600">Line Items</label>
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="text-gray-600">
                                        <th className="px-3 py-2 text-left rounded-tl-lg">Items</th>
                                        <th className="px-3 py-2 text-left w-16">Qty</th>
                                        <th className="px-3 py-2 text-left w-24">Unit Price</th>
                                        <th className="px-3 py-2 text-right w-20">Total</th>
                                        <th className="px-3 py-2 rounded-tr-lg w-8"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lineItems.map((item, index) => (
                                        <tr key={index} className="border-b border-gray-100">
                                            <td className="px-1 py-1.5">
                                                <input
                                                    type="text"
                                                    value={item.description}
                                                    onChange={(e) => handleLineItemChange(index, 'description', e.target.value)}
                                                    placeholder="Description"
                                                    className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                />
                                            </td>
                                            <td className="px-1 py-1.5">
                                                <input
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={(e) => handleLineItemChange(index, 'quantity', e.target.value)}
                                                    min="1"
                                                    className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                />
                                            </td>
                                            <td className="px-1 py-1.5">
                                                <input
                                                    type="number"
                                                    value={item.unitPrice}
                                                    onChange={(e) => handleLineItemChange(index, 'unitPrice', e.target.value)}
                                                    min="0"
                                                    className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                />
                                            </td>
                                            <td className="px-3 py-1.5 text-right font-medium text-gray-700">
                                                ${(item.quantity * item.unitPrice).toFixed(2)}
                                            </td>
                                            <td className="px-1 py-1.5 text-center">
                                                <button
                                                    onClick={() => removeLineItem(index)}
                                                    className="text-red-400 hover:text-red-600 text-lg transition"
                                                >
                                                    ×
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button
                                onClick={addLineItem}
                                className="text-sm text-blue-600 hover:text-blue-800 transition"
                            >
                                + Add Line Item
                            </button>
                        </div>

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {loading ? 'Creating...' : 'Create Invoice'}
                        </button>
                    </div>

                    {/* RIGHT SIDE - Live Preview */}
                    <div className="bg-white rounded-2xl shadow-md p-6 space-y-5">
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <h2 className="text-xl font-bold text-gray-800">
                                    {invoiceNumber || 'Invoice Number'}
                                </h2>
                                <h2 className="text-xl font-bold text-gray-800">
                                    {customerName || 'Customer Name'}
                                </h2>
                                <p className="text-sm text-gray-500">Issue Date: {today}</p>
                                <p className="text-sm text-gray-500">
                                    Due Date: {dueDate ? new Date(dueDate).toLocaleDateString() : '—'}
                                </p>
                            </div>
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-600">
                                DRAFT
                            </span>
                        </div>

                        {/* Preview Line Items */}
                        <div>
                            <table className="w-full text-sm text-left">
                                <thead>
                                    <tr className="bg-gray-100 text-gray-600">
                                        <th className="px-3 py-2 rounded-tl-lg">Description</th>
                                        <th className="px-3 py-2">Qty</th>
                                        <th className="px-3 py-2">Unit Price</th>
                                        <th className="px-3 py-2 rounded-tr-lg text-right">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lineItems.map((item, index) => (
                                        <tr key={index} className="border-b border-gray-100">
                                            <td className="px-3 py-2 text-gray-700">{item.description || '—'}</td>
                                            <td className="px-3 py-2 text-gray-700">{item.quantity}</td>
                                            <td className="px-3 py-2 text-gray-700">${item.unitPrice.toFixed(2)}</td>
                                            <td className="px-3 py-2 text-gray-700 text-right">
                                                ${(item.quantity * item.unitPrice).toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Preview Totals */}
                        <div className="flex justify-end">
                            <div className="w-64 space-y-2">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Total</span>
                                    <span className="font-medium text-gray-800">${total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Amount Paid</span>
                                    <span className="font-medium text-green-600">$0.00</span>
                                </div>
                                <div className="border-t border-gray-200 pt-2 flex justify-between text-sm">
                                    <span className="font-semibold text-gray-700">Balance Due</span>
                                    <span className="font-bold text-red-500">${total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CreateInvoice