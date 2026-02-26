import { useState } from 'react'
import AddPaymentModal from './AddPaymentModal'

const PaymentsSection = ({ invoice, onUpdate }) => {
    const [showModal, setShowModal] = useState(false)

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-700">Payments</h2>
                {invoice.status !== 'PAID' && (
                    <button
                        onClick={() => setShowModal(true)}
                        className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                    >
                        + Add Payment
                    </button>
                )}
            </div>

            {invoice.payments.length === 0 ? (
                <p className="text-gray-400 text-sm">No payments yet.</p>
            ) : (
                <div className="space-y-2">
                    {invoice.payments.map((payment) => (
                        <div key={payment._id} className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-lg">
                            <span className="text-sm text-gray-600">
                                {new Date(payment.paymentDate).toLocaleDateString()}
                            </span>
                            <span className="text-sm font-semibold text-green-600">
                                +${payment.amount.toFixed(2)}
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {showModal && (
                <AddPaymentModal
                    invoice={invoice}
                    onClose={() => setShowModal(false)}
                    onUpdate={onUpdate}
                />
            )}
        </div>
    )
}

export default PaymentsSection