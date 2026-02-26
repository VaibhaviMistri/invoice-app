const LineItemsTable = ({ lineItems }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Line Items</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-gray-100 text-gray-600">
              <th className="px-4 py-3 rounded-tl-lg">Description</th>
              <th className="px-4 py-3">Quantity</th>
              <th className="px-4 py-3">Unit Price</th>
              <th className="px-4 py-3 rounded-tr-lg text-right">Line Total</th>
            </tr>
          </thead>
          <tbody>
            {lineItems.map((item) => (
              <tr key={item._id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                <td className="px-4 py-3 text-gray-700">{item.description}</td>
                <td className="px-4 py-3 text-gray-700">{item.quantity}</td>
                <td className="px-4 py-3 text-gray-700">${item.unitPrice.toFixed(2)}</td>
                <td className="px-4 py-3 text-gray-700 text-right">${item.lineTotal.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LineItemsTable