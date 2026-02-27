import { archiveInvoice, restoreInvoice } from '../services/api'

const InvoiceHeader = ({ invoice, onUpdate }) => {

  const handleArchive = async () => {
    await archiveInvoice(invoice._id)
    onUpdate()
  }

  const handleRestore = async () => {
    await restoreInvoice(invoice._id)
    onUpdate()
  }

  return (
    <div className="flex justify-between items-start">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-gray-800">{invoice.invoiceNumber}</h1>
        <p className="text-gray-500 text-sm">Customer: <span className="text-gray-700 font-medium">{invoice.customerName}</span></p>
        <p className="text-gray-500 text-sm">Issue Date: <span className="text-gray-700">{new Date(invoice.issueDate).toLocaleDateString()}</span></p>
        <p className="text-gray-500 text-sm">Due Date: <span className="text-gray-700">{new Date(invoice.dueDate).toLocaleDateString()}</span></p>
      </div>

      <div className="flex flex-col items-end gap-3">
        {/* Status Badge */}
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${invoice.status === 'PAID'
            ? 'bg-green-100 text-green-600'
            : invoice.isOverdue
              ? 'bg-red-100 text-red-600'
              : 'bg-yellow-100 text-yellow-600'
          }`}>
          {invoice.status === 'PAID' ? 'PAID' : invoice.isOverdue ? 'OVERDUE' : 'DRAFT'}
        </span>

        {/* Archive / Restore Button */}
        {invoice.isArchived ? (
          <button
            onClick={handleRestore}
            className="text-sm px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 active:scale-95 transition cursor-pointer shadow-sm"
          >
            Restore Invoice
          </button>
        ) : (
          <button
            onClick={handleArchive}
            className="text-sm px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 active:scale-95 transition cursor-pointer shadow-sm"
          >
            Archive Invoice
          </button>
        )}
      </div>
    </div>
  )
}

export default InvoiceHeader