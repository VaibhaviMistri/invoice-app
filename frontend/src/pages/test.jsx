{
    invoices.length === 0 ? (
        <p className="text-gray-400 text-sm">No invoices found.</p>
    ) : showArchived ? (
    <div className="space-y-3">
                {invoices.filter(invoice => invoice.isArchived).map((invoice) => (
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
        ) : (
                <div className="space-y-3">
                    {invoices.filter(invoice => !(invoice.isArchived)).map((invoice) => (
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
    )
}