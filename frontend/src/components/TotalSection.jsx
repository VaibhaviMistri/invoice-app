const TotalsSection = ({ invoice }) => {
    return (
        <div className="flex justify-end">
            <div className="w-72 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Total</span>
                    <span className="font-medium text-gray-800">${invoice.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Amount Paid</span>
                    <span className="font-medium text-green-600">${invoice.amountPaid.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between text-sm">
                    <span className="font-semibold text-gray-700">Balance Due</span>
                    <span className="font-bold text-red-500">${invoice.balanceDue.toFixed(2)}</span>
                </div>
            </div>
        </div>
    )
}

export default TotalsSection