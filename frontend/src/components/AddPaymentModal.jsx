import { useState } from 'react'
import { addPayment } from '../services/api'

const AddPaymentModal = ({ invoice, onClose, onUpdate }) => {
    const [amount, setAmount] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        setError(null)
        const parsedAmount = parseFloat(amount)

        if (!parsedAmount || parsedAmount <= 0) {
            setError('Amount must be greater than 0')
            return
        }

        if (parsedAmount > invoice.balanceDue) {
            setError(`Amount cannot exceed balance due ($${invoice.balanceDue.toFixed(2)})`)
            return
        }

        try {
            setLoading(true)
            await addPayment(invoice._id, parsedAmount)
            onUpdate()
            onClose()
        } catch (err) {
            setError('Failed to add payment. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-96 space-y-4">
                <h2 className="text-lg font-semibold text-gray-800">Add Payment</h2>

                <div className="space-y-1">
                    <label className="text-sm text-gray-600">Amount</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder={`Max: $${invoice.balanceDue.toFixed(2)}`}
                        className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                )}

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : 'Add Payment'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddPaymentModal